"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Mail, Lock, User, UserPlus, ArrowLeft } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("candidate")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Static behavior
    console.log("Registration attempted with", { name, email, password, role })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[30%] h-[30%] rounded-full bg-blue-500/10 blur-3xl"></div>
      </div>

      <div className="w-full max-w-md my-8">
        <div className="bg-card border rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  CareerPilot AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Create an account</h1>
              <p className="text-sm text-muted-foreground mt-2">
                Join thousands of professionals finding their dream jobs
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-2">
                <label
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all ${
                    role === "candidate" ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  <input type="radio" name="role" value="candidate" checked={role === "candidate"} onChange={() => setRole("candidate")} className="sr-only" />
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">Job Seeker</span>
                </label>
                <label
                  className={`cursor-pointer border rounded-lg p-3 flex flex-col items-center justify-center gap-2 transition-all ${
                    role === "employer" ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-muted"
                  }`}
                >
                  <input type="radio" name="role" value="employer" checked={role === "employer"} onChange={() => setRole("employer")} className="sr-only" />
                  <UserPlus className="h-5 w-5" />
                  <span className="text-sm font-medium">Employer</span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="name">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-10"
                    required
                  />
                </div>
              </div>

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

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full gap-2 mt-4">
                Create Account
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <div className="mt-6">
                <Button variant="outline" type="button" className="w-full" onClick={() => {}}>
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    <path d="M1 1h22v22H1z" fill="none" />
                  </svg>
                  Sign up with Google
                </Button>
              </div>
            </div>
          </div>
          
          <div className="bg-muted/50 p-4 text-center border-t text-sm text-muted-foreground flex justify-between items-center px-8">
            <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" /> Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
