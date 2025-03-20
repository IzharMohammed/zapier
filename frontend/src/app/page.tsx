import Link from "next/link"
import { ArrowRight, Facebook, Slack, NotebookIcon as Notion, ChromeIcon as Google } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 bg-orange-500"></div>
              <span className="text-xl font-bold">connectify</span>
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="#" className="text-sm font-medium hover:text-orange-500">
                Products
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-orange-500">
                Solutions
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-orange-500">
                Resources
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-orange-500">
                Enterprise
              </Link>
              <Link href="#" className="text-sm font-medium hover:text-orange-500">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="#" className="hidden md:block text-sm font-medium hover:text-orange-500">
              Explore apps
            </Link>
            <Link href="#" className="hidden md:block text-sm font-medium hover:text-orange-500">
              Contact sales
            </Link>
            <Link href="/login" className="text-sm font-medium hover:text-orange-500">
              Log in
            </Link>
            <Link href="/signup">
              <Button className="bg-orange-500 hover:bg-orange-600">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-12 md:py-24 lg:py-32">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm">
                <span className="font-medium">New</span> Connectify Enterprise is here{" "}
                <ArrowRight className="ml-1 h-4 w-4 inline" />
              </div>
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Automate without limits</h1>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no
                delays. The only limit is your imagination.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                  Start free with email
                </Button>
                <Button size="lg" variant="outline" className="gap-2">
                  <Google className="h-5 w-5" />
                  Start free with Google
                </Button>
              </div>
            </div>
            <div className="relative h-[500px] w-full rounded-lg border bg-background p-4">
              <div className="flex flex-col gap-6">
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-green-500"></div>
                    <span className="font-medium">Workflow</span>
                  </div>
                  <div className="mt-2 text-sm">1. New website form submission</div>
                </div>
                <div className="mx-auto h-8 w-0.5 bg-gray-200"></div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-blue-500"></div>
                    <span className="font-medium">Action</span>
                  </div>
                  <div className="mt-2 text-sm">2. Add a new app to your Zap</div>
                </div>
                <div className="mx-auto h-8 w-0.5 bg-gray-200"></div>
                <div className="rounded-lg border bg-card p-4 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-orange-500"></div>
                    <span className="font-medium">Tables</span>
                  </div>
                  <div className="mt-2 text-sm">3. Add a new record</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-gray-50 py-12 md:py-24">
          <div className="container">
            <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Trusted by thousands of companies
            </h2>
            <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-16">
              <Facebook className="h-8 w-8 text-gray-400" />
              <Slack className="h-8 w-8 text-gray-400" />
              <Notion className="h-8 w-8 text-gray-400" />
              <Google className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-gray-50">
        <div className="container py-8 md:py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-medium">Product</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Company</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-500 hover:text-orange-500">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Connectify. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

