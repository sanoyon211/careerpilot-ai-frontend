"use client"

import { FileText, Briefcase, Eye, TrendingUp, Sparkles, Clock, CheckCircle2, ChevronRight } from "lucide-react"
import { Button } from "@/components/common/Button"
import Link from "next/link"

const STATS = [
  { label: "Applied Jobs", value: "12", icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Saved Jobs", value: "8", icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "Profile Views", value: "45", icon: Eye, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "AI Match Score", value: "92%", icon: Sparkles, color: "text-green-500", bg: "bg-green-500/10" },
]

// Assuming Bookmark is imported, wait, let me use Bookmark instead of imported Eye/Briefcase where needed.
import { Bookmark } from "lucide-react"

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your job search today.</p>
        </div>
        <Link href="/explore-jobs">
          <Button className="gap-2"><Sparkles className="h-4 w-4" /> Find New Matches</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <div key={idx} className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
            <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Recent Applications */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Applications</h2>
            <Link href="/applied-jobs" className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y">
              {[
                { title: "Senior Frontend Engineer", company: "TechCorp", status: "In Review", statusColor: "text-blue-600 bg-blue-500/10", date: "2 days ago" },
                { title: "React Developer", company: "WebWorks", status: "Interview", statusColor: "text-purple-600 bg-purple-500/10", date: "1 week ago" },
                { title: "Full Stack Developer", company: "DataSystems", status: "Applied", statusColor: "text-gray-600 bg-gray-500/10", date: "2 weeks ago" },
              ].map((app, idx) => (
                <div key={idx} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground">
                      {app.company.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-base">{app.title}</h3>
                      <p className="text-sm text-muted-foreground">{app.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-1/3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${app.statusColor}`}>
                      {app.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {app.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Profile Completion / AI Tips */}
        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" /> Profile Strength
            </h3>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-sm font-medium">
                <span>Intermediate</span>
                <span className="text-primary">70%</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[70%]"></div>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" /> Resume parsed successfully
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 border-2 rounded-full border-muted-foreground shrink-0"></div> Add GitHub portfolio link (+15%)
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <div className="h-4 w-4 border-2 rounded-full border-muted-foreground shrink-0"></div> Complete AI Mock Interview (+15%)
              </li>
            </ul>

            <Link href="/profile">
              <Button variant="outline" className="w-full">Complete Profile</Button>
            </Link>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-6 shadow-sm relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h3 className="font-bold text-lg text-primary flex items-center gap-2">
                <Sparkles className="h-5 w-5" /> AI Coach Advice
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Based on your recent applications, you have a high success rate with React roles. I suggest highlighting your Next.js experience in your summary to attract more recruiters.
              </p>
              <Link href="/ai-chat" className="inline-flex items-center text-sm font-semibold text-primary hover:underline">
                Chat with Coach <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            <Sparkles className="absolute -bottom-4 -right-4 h-24 w-24 text-primary/10" />
          </div>
        </div>

      </div>
    </div>
  )
}
