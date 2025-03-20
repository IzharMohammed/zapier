"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission logic here
  }

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="space-y-2 text-center">
          <Link href="/" className="inline-block">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-orange-500"></div>
              <span className="text-xl font-bold">connectify</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="text-muted-foreground">Enter your information to get started</p>
        </div>
        <div className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
              Sign Up
            </Button>
          </form>
          <Separator />
          <Button variant="outline" className="w-full">
            Sign up with Google
          </Button>
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-orange-500 hover:underline">
              Log in
            </Link>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
      <div className="mt-6">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-orange-500">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  )
}

