"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Mail, ArrowLeft, Send } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Static behavior
    console.log("Reset password requested for", { email })
    setIsSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  CareerPilot AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isSubmitted 
                  ? "Check your email for a reset link." 
                  : "Enter your email address and we'll send you a link to reset your password."}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="email">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full gap-2 mt-4">
                  <Send className="h-4 w-4" /> Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="space-y-4 text-center">
                <div className="bg-primary/10 text-primary p-4 rounded-lg text-sm">
                  We've sent an email to <strong>{email}</strong> with instructions to reset your password.
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  Try another email
                </Button>
              </div>
            )}
          </div>
          
          <div className="bg-muted/50 p-4 text-center border-t text-sm text-muted-foreground flex justify-center">
            <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
