"use client"

import { FileText, Briefcase, Eye, TrendingUp, Sparkles, Clock, CheckCircle2, ChevronRight, Bookmark } from "lucide-react"
import { Button } from "@/components/common/Button"
import Link from "next/link"
import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useGetJobSeekerStatsQuery, useGetEmployerStatsQuery } from "@/redux/api/dashboardApi"
import { useGetMyApplicationsQuery } from "@/redux/api/applicationApi"

export default function DashboardOverviewPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const isJobSeeker = user?.role === 'job-seeker';
  const isEmployer = user?.role === 'employer';

  const { data: jobSeekerStats } = useGetJobSeekerStatsQuery(undefined, { skip: !isJobSeeker });
  const { data: employerStats } = useGetEmployerStatsQuery(undefined, { skip: !isEmployer });
  const { data: appsResponse } = useGetMyApplicationsQuery(undefined, { skip: !isJobSeeker });

  const statsData = isJobSeeker ? jobSeekerStats?.data : employerStats?.data;
  const recentApps = appsResponse?.data?.slice(0, 3) || [];

  const STATS = isJobSeeker ? [
    { label: "Applied Jobs", value: statsData?.appliedJobs || 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Saved Jobs", value: statsData?.savedJobs || 0, icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-orange-500", bg: "bg-orange-500/10" },
    { label: "AI Match Score", value: (statsData as any)?.aiMatchScore || "0%", icon: Sparkles, color: "text-green-500", bg: "bg-green-500/10" },
  ] : [
    { label: "Posted Jobs", value: statsData?.postedJobs || 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Applicants", value: statsData?.totalApplicants || 0, icon: FileText, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || 'User'}!</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your account today.</p>
        </div>
        <Link href="/explore-jobs">
          <Button className="gap-2"><Sparkles className="h-4 w-4" /> Find New Matches</Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card border rounded-2xl p-6 flex items-center gap-4 shadow-sm">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{isJobSeeker ? "Recent Applications" : "Recent Activity"}</h2>
            <Link href={isJobSeeker ? "/applied-jobs" : "/manage-jobs"} className="text-sm text-primary hover:underline font-medium">View All</Link>
          </div>
          
          <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
            <div className="divide-y">
              {recentApps.length > 0 ? recentApps.map((app: any) => {
                const job = app.jobId;
                let statusColor = "text-gray-600 bg-gray-500/10";
                if (app.status === "Reviewed" || app.status === "Shortlisted") statusColor = "text-blue-600 bg-blue-500/10";
                if (app.status === "Hired") statusColor = "text-green-600 bg-green-500/10";
                if (app.status === "Rejected") statusColor = "text-red-600 bg-red-500/10";

                return (
                  <div key={app._id} className="p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground border">
                        {job?.title?.charAt(0) || "J"}
                      </div>
                      <div>
                        <h3 className="font-semibold text-base">{job?.title}</h3>
                        <p className="text-sm text-muted-foreground">{job?.company || "Unknown Company"}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-1/3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${statusColor}`}>
                        {app.status}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                )
              }) : (
                <div className="p-8 text-center text-muted-foreground">
                  No recent activity found.
                </div>
              )}
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
