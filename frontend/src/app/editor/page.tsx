import { Suspense } from "react"
import ZapBuilder from "@/components/zapBuilder"
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f9f9fa]">
      <Suspense fallback={<div>Loading...</div>}>
        <ZapBuilder />
        <Toaster />
      </Suspense>
    </main>
  )
}

