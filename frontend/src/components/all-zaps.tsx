"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Search,
  Zap,
  Home,
  Compass,
  Table,
  MessageSquare,
  PaintBucket,
  Users,
  Plus,
  Trash2,
  Filter,
  Bookmark,
  RotateCcw,
  MoreVertical,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for zaps
const mockZaps = [
  {
    id: 1,
    name: "1st zap",
    apps: ["github", "gmail", "notion"],
    location: "Personal",
    lastModified: "34 seconds ago",
    status: "on",
    owner: "M",
  },
]

export default function AllZaps() {
  const [zaps, setZaps] = useState(mockZaps)
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="min-h-screen bg-[#f9f9fa]">
      <header className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="text-orange-500 font-bold text-xl">zapier</div>
            </Link>

            <div className="relative ml-8">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search" className="w-[200px] pl-8 rounded-md" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              Help
            </Button>
            <Button variant="ghost" size="sm">
              Explore apps
            </Button>
            <Button variant="ghost" size="sm">
              Contact Sales
            </Button>
            <Button className="bg-[#5d25e7] hover:bg-[#4a1db8]">Upgrade</Button>
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">M</div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-60 bg-white border-r min-h-[calc(100vh-65px)] p-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 mb-6">
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>

          <nav className="space-y-1">
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <Compass className="h-4 w-4" />
              Discover
            </Link>
            <Link href="/all-zaps" className="flex items-center gap-2 p-2 rounded-md bg-gray-100 text-sm font-medium">
              <Zap className="h-4 w-4" />
              Zaps
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <Table className="h-4 w-4" />
              Tables
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <MessageSquare className="h-4 w-4" />
              Interfaces
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <MessageSquare className="h-4 w-4" />
              Chatbots
              <span className="ml-auto text-xs bg-gray-200 px-1.5 py-0.5 rounded">Beta</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <PaintBucket className="h-4 w-4" />
              Canvas
              <span className="ml-auto text-xs bg-gray-200 px-1.5 py-0.5 rounded">Beta</span>
            </Link>
            <Link href="#" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-sm">
              <Users className="h-4 w-4" />
              Agents
              <span className="ml-auto text-xs bg-gray-200 px-1.5 py-0.5 rounded">Beta</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Zaps</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Trash
              </Button>
              <Button className="bg-[#5d25e7] hover:bg-[#4a1db8]">
                <Plus className="mr-2 h-4 w-4" />
                Create
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-md border mb-6">
            <div className="p-2">
              <Tabs defaultValue="zaps">
                <TabsList className="grid grid-cols-2 w-60">
                  <TabsTrigger value="zaps" className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    Zaps
                  </TabsTrigger>
                  <TabsTrigger value="folders" className="flex items-center gap-1">
                    Folders
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex items-center justify-between border-t p-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  All
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-2 border-t">
              <Input
                type="search"
                placeholder="Search by name or webhook"
                className="w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-t border-b text-sm text-left">
                  <th className="px-4 py-2 font-medium">Name</th>
                  <th className="px-4 py-2 font-medium">Apps</th>
                  <th className="px-4 py-2 font-medium">Location</th>
                  <th className="px-4 py-2 font-medium">Last modified</th>
                  <th className="px-4 py-2 font-medium">Status</th>
                  <th className="px-4 py-2 font-medium">Owner</th>
                  <th className="px-4 py-2 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {zaps.map((zap) => (
                  <tr key={zap.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-orange-500" />
                        <span>{zap.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        {zap.apps.map((app, i) => (
                          <div
                            key={i}
                            className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs"
                          >
                            {app.charAt(0).toUpperCase()}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded bg-gray-100"></div>
                        {zap.location}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{zap.lastModified}</td>
                    <td className="px-4 py-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                        {zap.owner}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 border-t flex items-center justify-between text-sm">
              <div>1-1 of 1</div>
              <div className="flex items-center gap-2">
                <div>25 per page</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

