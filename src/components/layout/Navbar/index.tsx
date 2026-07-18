"use client"

import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Sparkles } from "lucide-react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { logout } from "@/redux/slices/authSlice"

export function Navbar() {
  const { user } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">CareerPilot AI</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/explore-jobs" className="transition-colors hover:text-primary">Explore Jobs</Link>
          <Link href="/about" className="transition-colors hover:text-primary">About</Link>
          <Link href="/faq" className="transition-colors hover:text-primary">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" className="hidden sm:inline-flex">Dashboard</Button>
              </Link>
              <Button onClick={() => {
                dispatch(logout());
                // Remove cookie too
                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.href = "/";
              }}>Logout</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
