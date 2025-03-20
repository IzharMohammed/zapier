"use client"

import { Circle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ZapNodeProps {
  id: number
  type: "trigger" | "action"
  number: number
  selected: boolean
  app: any
  onClick: () => void
}

export default function ZapNode({ id, type, number, selected, app, onClick }: ZapNodeProps) {
  return (
    <Card
      className={`w-full max-w-md border-dashed cursor-pointer hover:border-primary transition-colors ${selected ? "border-solid border-primary" : ""}`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={`rounded-full p-1 ${type === "trigger" ? "bg-amber-100" : "bg-blue-100"}`}>
            <Circle className={`h-5 w-5 ${type === "trigger" ? "text-amber-500" : "text-blue-500"}`} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                {number}. {type === "trigger" ? "Trigger" : "Action"}
              </span>
            </div>
            <div className="mt-1 text-sm">
              {selected && app ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-100 rounded-md flex items-center justify-center">{app.icon}</div>
                  <span>{app.name}</span>
                </div>
              ) : (
                <span className="text-muted-foreground">
                  {type === "trigger"
                    ? "Select the event that starts your Zap"
                    : "Select the event for your Zap to run"}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

