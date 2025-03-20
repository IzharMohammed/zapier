"use client"

import { useState, useRef } from "react"
import { X, Search, Home, Grid, Zap, Wrench } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useDraggable } from "@/hooks/use-draggable"

// Mock app data
const apps = [
    { id: 1, name: "Facebook Lead Ads", icon: <div className="text-blue-600">F</div>, category: "apps" },
    { id: 2, name: "Google Calendar", icon: <div className="text-blue-500">G</div>, category: "apps" },
    { id: 3, name: "Google Drive", icon: <div className="text-green-500">G</div>, category: "apps" },
    { id: 4, name: "Google Forms", icon: <div className="text-purple-500">G</div>, category: "apps" },
    { id: 5, name: "Gmail", icon: <div className="text-red-500">G</div>, category: "apps" },
    { id: 6, name: "Google Sheets", icon: <div className="text-green-600">G</div>, category: "apps" },
    { id: 7, name: "HubSpot", icon: <div className="text-orange-500">H</div>, category: "apps" },
    { id: 8, name: "Mailchimp", icon: <div className="text-yellow-500">M</div>, category: "apps" },
    { id: 9, name: "Notion", icon: <div className="text-gray-800">N</div>, category: "apps" },
    { id: 10, name: "Slack", icon: <div className="text-purple-600">S</div>, category: "apps" },
    { id: 11, name: "Calendly", icon: <div className="text-blue-400">C</div>, category: "apps" },
    { id: 12, name: "Typeform", icon: <div className="text-gray-700">T</div>, category: "apps" },
    { id: 13, name: "Webhooks", icon: <div className="text-orange-500">W</div>, category: "tools" },
    { id: 14, name: "Schedule", icon: <div className="text-orange-500">S</div>, category: "tools" },
    { id: 15, name: "Email", icon: <div className="text-orange-500">E</div>, category: "tools" },
    { id: 16, name: "RSS", icon: <div className="text-orange-500">R</div>, category: "tools" },
    { id: 17, name: "Code", icon: <div className="text-orange-500">C</div>, category: "tools" },
    { id: 18, name: "Email Parser", icon: <div className="text-orange-500">E</div>, category: "tools" },
    { id: 19, name: "Sub-Zap", icon: <div className="text-orange-500">S</div>, category: "tools" },
    { id: 20, name: "Chatbots", icon: <div className="text-orange-500">C</div>, category: "products" },
    { id: 21, name: "Interfaces", icon: <div className="text-orange-500">I</div>, category: "products" },
    { id: 22, name: "Tables", icon: <div className="text-orange-500">T</div>, category: "products" },
]

interface AppSelectionModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (app: any) => void
    nodeType: "trigger" | "action"
}

export default function AppSelectionModal({ isOpen, onClose, onSelect, nodeType }: AppSelectionModalProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const [activeTab, setActiveTab] = useState("apps")
    const dialogRef = useRef<HTMLDivElement>(null)
    //@ts-ignore
    const { position, handleMouseDown } = useDraggable(dialogRef)

    const filteredApps = apps.filter(
        (app) =>
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) && (activeTab === "all" || app.category === activeTab),
    )

    const topApps = filteredApps.filter((app) => app.category === "apps").slice(0, 10)
    const popularTools = filteredApps.filter((app) => app.category === "tools").slice(0, 7)
    const zapierProducts = filteredApps.filter((app) => app.category === "products").slice(0, 3)

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent
                ref={dialogRef}
                className="sm:max-w-[600px] p-0 overflow-hidden"
                style={{
                    position: "fixed",
                    top: `${position.y}px`,
                    left: `${position.x}px`,
                    transform: "none",
                }}
            >
                <div className="bg-gray-100 p-3 flex items-center justify-between cursor-move" onMouseDown={handleMouseDown}>
                    <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-500" />
                        <Input
                            placeholder="Search 7,000+ apps and tools..."
                            className="h-8 border-none bg-transparent focus-visible:ring-0"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-4">
                    <Tabs defaultValue="apps" value={activeTab} onValueChange={setActiveTab}>
                        <TabsList className="grid grid-cols-4 mb-4">
                            <TabsTrigger value="all" className="flex items-center gap-1">
                                <Home className="h-4 w-4" />
                                All
                            </TabsTrigger>
                            <TabsTrigger value="apps" className="flex items-center gap-1">
                                <Grid className="h-4 w-4" />
                                Apps
                            </TabsTrigger>
                            <TabsTrigger value="products" className="flex items-center gap-1">
                                <Zap className="h-4 w-4" />
                                Zapier products
                            </TabsTrigger>
                            <TabsTrigger value="tools" className="flex items-center gap-1">
                                <Wrench className="h-4 w-4" />
                                Built-in tools
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <div className="overflow-y-auto max-h-[400px] pr-2">
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Your top apps</h3>
                                <div className="space-y-3">
                                    {topApps.map((app) => (
                                        <button
                                            key={app.id}
                                            className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded-md transition-colors"
                                            onClick={() => onSelect(app)}
                                        >
                                            <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">{app.icon}</div>
                                            <span className="text-sm">{app.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Popular built-in tools</h3>
                                <div className="space-y-3">
                                    {popularTools.map((tool) => (
                                        <button
                                            key={tool.id}
                                            className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded-md transition-colors"
                                            onClick={() => onSelect(tool)}
                                        >
                                            <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center text-orange-500">
                                                {tool.icon}
                                            </div>
                                            <span className="text-sm">{tool.name}</span>
                                        </button>
                                    ))}
                                </div>

                                {zapierProducts.length > 0 && (
                                    <>
                                        <h3 className="text-sm font-medium text-gray-500 mt-6 mb-3">New Zapier products</h3>
                                        <div className="space-y-3">
                                            {zapierProducts.map((product) => (
                                                <button
                                                    key={product.id}
                                                    className="flex items-center gap-2 w-full text-left hover:bg-gray-50 p-1 rounded-md transition-colors"
                                                    onClick={() => onSelect(product)}
                                                >
                                                    <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center text-orange-500">
                                                        {product.icon}
                                                    </div>
                                                    <span className="text-sm">{product.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

