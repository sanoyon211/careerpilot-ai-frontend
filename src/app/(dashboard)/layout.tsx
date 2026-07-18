"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, User, FileText, Bookmark, CheckSquare, 
  Settings, LogOut, Menu, X, Sparkles, MessageSquare 
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/common/Button"

const NAV_LINKS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/profile", label: "My Profile", icon: User },
  { href: "/resume", label: "Resume & AI Match", icon: FileText },
  { href: "/saved-jobs", label: "Saved Jobs", icon: Bookmark },
  { href: "/applied-jobs", label: "Applied Jobs", icon: CheckSquare },
  { href: "/ai-chat", label: "AI Career Coach", icon: MessageSquare, isPremium: true },
]

import { PlusCircle, Briefcase } from "lucide-react"

const EMPLOYER_LINKS = [
  { href: "/add-job", label: "Post a Job", icon: PlusCircle },
  { href: "/manage-jobs", label: "Manage Jobs", icon: Briefcase },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
      
      {/* Mobile Topbar */}
      <div className="md:hidden bg-card border-b p-4 flex items-center justify-between sticky top-0 z-20">
        <Link href="/" className="font-bold text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          CareerPilot
        </Link>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        ${isMobileMenuOpen ? "fixed inset-0 top-[73px] z-10 bg-background" : "hidden"} 
        md:block md:w-64 md:shrink-0 bg-card border-r md:sticky md:top-0 md:h-screen overflow-y-auto transition-all
      `}>
        <div className="p-6 hidden md:block border-b">
          <Link href="/" className="font-bold text-2xl tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            CareerPilot AI
          </Link>
        </div>

        <nav className="p-4 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-2 px-3">
            Job Seeker Menu
          </div>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
                {link.isPremium && (
                  <Sparkles className={`h-3 w-3 ml-auto ${isActive ? "text-yellow-300" : "text-yellow-500"}`} />
                )}
              </Link>
            )
          })}
          
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 mt-8 px-3">
            Employer Menu
          </div>
          {EMPLOYER_LINKS.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "bg-primary text-primary-foreground" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <link.icon className="h-4 w-4 shrink-0" />
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto border-t md:absolute md:bottom-0 md:w-full bg-card">
          <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${pathname === "/settings" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
            <Settings className="h-4 w-4 shrink-0" /> Settings
          </Link>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors mt-1">
            <LogOut className="h-4 w-4 shrink-0" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-x-hidden max-w-full">
        {children}
      </main>

    </div>
  )
}