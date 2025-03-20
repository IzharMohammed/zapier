"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Undo, Clock, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "sonner"
import ZapNode from "./zap-node"
import AppSelectionModal from "./app-selector-modal"

export default function ZapBuilder() {
    const router = useRouter()
    const [nodes, setNodes] = useState([
        { id: 1, type: "trigger", selected: false, app: null },
        { id: 2, type: "action", selected: false, app: null },
    ])
    const [showModal, setShowModal] = useState(false)
    const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null)
    const [zapName, setZapName] = useState("Untitled Zap")
    const [zapDescription, setZapDescription] = useState("")

    const handleNodeClick = (id: number) => {
        setSelectedNodeId(id)
        setShowModal(true)
    }

    const handleAppSelect = (app: any) => {
        setNodes(nodes.map((node) => (node.id === selectedNodeId ? { ...node, app, selected: true } : node)))
        setShowModal(false)
    }

    const handleAddNode = () => {
        const newId = Math.max(...nodes.map((n) => n.id)) + 1
        setNodes([...nodes, { id: newId, type: "action", selected: false, app: null }])
    }

    const handlePublish = () => {
        // Check if all nodes have apps selected
        const allNodesConfigured = nodes.every((node) => node.app !== null)

        if (!allNodesConfigured) {
            //   toast({
            //     title: "Incomplete Zap",
            //     description: "Please configure all triggers and actions before publishing.",
            //     variant: "destructive",
            //   })
            toast("Incomplete zap");
            return
        }

        // In a real app, you would save the zap to a database here
        // toast({
        //     title: "Zap Published!",
        //     description: "Your Zap has been published successfully.",
        // })
        toast("zap published ...!!!")
        // Navigate to all zaps page
        setTimeout(() => {
            router.push("/all-zaps")
        }, 1500)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <header className="border-b bg-white sticky top-0 z-10">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input type="search" placeholder="Search" className="w-[200px] pl-8 rounded-md bg-muted/30" />
                        </div>
                        <div className="text-xs text-muted-foreground">Ctrl ⌘ F</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Undo className="mr-2 h-4 w-4" />
                            Undo
                        </Button>
                        <Button onClick={handlePublish} className="bg-[#5d25e7] hover:bg-[#4a1db8]">
                            Publish
                        </Button>
                    </div>
                </div>
            </header>

            <div className="flex-1 p-6 max-w-3xl mx-auto w-full">
                <Card className="mb-8 border-gradient">
                    <CardContent className="p-6">
                        <div className="flex items-start gap-3">
                            <div className="bg-[#5d25e7] text-white p-2 rounded-md">
                                <Clock className="h-5 w-5" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-sm font-medium text-muted-foreground">What can I help you automate?</h2>
                                <Input
                                    className="mt-2 text-lg border-none shadow-none focus-visible:ring-0 p-0 h-auto"
                                    placeholder="When I add a reaction to a Slack message, create a card in Trello"
                                    value={zapDescription}
                                    onChange={(e) => setZapDescription(e.target.value)}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="text-center my-6">
                    <div className="flex items-center justify-center gap-4">
                        <div className="h-px bg-gray-200 flex-1" />
                        <span className="text-sm text-muted-foreground">or</span>
                        <div className="h-px bg-gray-200 flex-1" />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    {nodes.map((node, index) => (
                        <div key={node.id} className="flex flex-col items-center">
                            <ZapNode
                                id={node.id}
                                type={node.type}
                                number={index + 1}
                                selected={node.selected}
                                app={node.app}
                                onClick={() => handleNodeClick(node.id)}
                            />

                            {index < nodes.length - 1 && (
                                <div className="h-16 w-px bg-gray-300 relative">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white text-primary border-primary"
                                        onClick={handleAddNode}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}

                    {nodes.length > 0 && (
                        <div className="h-16 w-px bg-gray-300 relative">
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white text-primary border-primary"
                                onClick={handleAddNode}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <AppSelectionModal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSelect={handleAppSelect}
                    nodeType={nodes.find((n) => n.id === selectedNodeId)?.type || "trigger"}
                />
            )}
        </div>
    )
}

