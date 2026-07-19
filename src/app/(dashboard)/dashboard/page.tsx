"use client";

import { FileText, Briefcase, Eye, TrendingUp, Sparkles, Clock, CheckCircle2, ChevronRight, Bookmark, Users, PlusCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from "recharts";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetJobSeekerStatsQuery, useGetEmployerStatsQuery } from "@/redux/api/dashboardApi";
import { useGetMyApplicationsQuery } from "@/redux/api/applicationApi";
import { useGetEmployerJobsQuery } from "@/redux/api/jobsApi";

export default function DashboardOverviewPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const isJobSeeker = user?.role === "job-seeker";
  const isEmployer = user?.role === "employer";

  const { data: jobSeekerStats } = useGetJobSeekerStatsQuery(undefined, { skip: !isJobSeeker });
  const { data: employerStats } = useGetEmployerStatsQuery(undefined, { skip: !isEmployer });
  const { data: appsResponse } = useGetMyApplicationsQuery(undefined, { skip: !isJobSeeker });
  const { data: employerJobsResponse } = useGetEmployerJobsQuery(undefined, { skip: !isEmployer });

  const statsData = isJobSeeker ? jobSeekerStats?.data : employerStats?.data;
  const recentApps = appsResponse?.data?.slice(0, 3) || [];
  const employerJobs = employerJobsResponse?.data?.slice(0, 4) || [];

  const STATS = isJobSeeker
    ? [
        { label: "Applied Jobs", value: (statsData as any)?.appliedJobs || 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Saved Jobs", value: (statsData as any)?.savedJobs || 0, icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "AI Match Precision", value: (statsData as any)?.aiMatchScore || "94%", icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-500/10" },
      ]
    : [
        { label: "Posted Jobs", value: (statsData as any)?.postedJobs || 0, icon: Briefcase, color: "text-blue-500", bg: "bg-blue-500/10" },
        { label: "Total Applicants", value: (statsData as any)?.totalApplicants || 0, icon: Users, color: "text-purple-500", bg: "bg-purple-500/10" },
        { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-amber-500", bg: "bg-amber-500/10" },
        { label: "Active Listings", value: (statsData as any)?.postedJobs || 0, icon: Sparkles, color: "text-emerald-500", bg: "bg-emerald-500/10" },
      ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || "User"}!</h1>
          <p className="text-muted-foreground mt-1">Here is what's happening with your {isEmployer ? "employer workspace" : "job search"} today.</p>
        </div>

        {isEmployer ? (
          <Link href="/add-job">
            <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-xl">
              <PlusCircle className="h-4 w-4" /> Post New Job
            </Button>
          </Link>
        ) : (
          <Link href="/explore-jobs">
            <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-xl">
              <Sparkles className="h-4 w-4" /> Find AI Job Matches
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div key={idx} className="bg-card border rounded-3xl p-6 flex items-center gap-4 shadow-xs">
              <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <div className="text-2xl font-extrabold">{stat.value}</div>
                <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seeker View: Recent Applications */}
          {isJobSeeker && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Applications</h2>
                <Link href="/applied-jobs" className="text-xs font-bold text-primary hover:underline">
                  View All History
                </Link>
              </div>

              <div className="bg-card border rounded-3xl overflow-hidden shadow-xs">
                <div className="divide-y">
                  {recentApps.length > 0 ? (
                    recentApps.map((app: any) => {
                      const job = app.jobId;
                      let statusColor = "text-slate-600 bg-slate-500/10 border-slate-500/20";
                      if (app.status === "Reviewed" || app.status === "Shortlisted") statusColor = "text-indigo-600 bg-indigo-500/10 border-indigo-500/20";
                      if (app.status === "Hired") statusColor = "text-emerald-600 bg-emerald-500/10 border-emerald-500/20";
                      if (app.status === "Rejected") statusColor = "text-red-600 bg-red-500/10 border-red-500/20";

                      return (
                        <div key={app._id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-base font-bold text-primary shrink-0 border">
                              {job?.title?.charAt(0) || "J"}
                            </div>
                            <div>
                              <h3 className="font-bold text-sm text-foreground">{job?.title || "Job Title"}</h3>
                              <p className="text-xs text-muted-foreground">{job?.location || "Remote"}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${statusColor}`}>
                            {app.status}
                          </span>
                        </div>
                      );
                    })
                  ) : (
                    <div className="p-8 text-center text-xs text-muted-foreground font-medium">
                      No applications submitted yet. Explore open roles to get started.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Employer View: Active Job Listings with Candidate Count */}
          {isEmployer && (
            <>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your Active Job Postings</h2>
                <Link href="/manage-jobs" className="text-xs font-bold text-primary hover:underline">
                  Manage All Jobs
                </Link>
              </div>

              <div className="bg-card border rounded-3xl overflow-hidden shadow-xs">
                <div className="divide-y">
                  {employerJobs.length > 0 ? (
                    employerJobs.map((job: any) => (
                      <div key={job._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold flex items-center justify-center text-sm border shrink-0">
                            {job.title.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-bold text-sm text-foreground">{job.title}</h3>
                            <p className="text-xs text-muted-foreground font-medium">{job.jobType} • {job.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end sm:self-auto">
                          <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {job.applicantsCount || 0} Applicants
                          </span>
                          <Link href={`/manage-jobs/${job._id}/applications`}>
                            <Button size="sm" variant="outline" className="text-xs rounded-xl font-bold">
                              Review Candidates
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center text-xs text-muted-foreground font-medium">
                      You haven't posted any jobs yet. Click "Post New Job" above.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Charts for Employer */}
          {isEmployer && (statsData as any)?.chartData && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-card border rounded-3xl p-6 shadow-xs">
                <h3 className="font-bold text-base mb-4">Job Views & Applications</h3>
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={(statsData as any).chartData.viewsData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
                      <YAxis axisLine={false} tickLine={false} fontSize={11} />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                      <Legend iconType="circle" />
                      <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-card border rounded-3xl p-6 shadow-xs">
                <h3 className="font-bold text-base mb-4">Candidate Pipeline Breakdown</h3>
                <div className="h-56 w-full flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={(statsData as any).chartData.statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={75}
                        paddingAngle={5}
                        dataKey="value"
                      />
                      <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                      <Legend iconType="circle" verticalAlign="bottom" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="bg-card border rounded-3xl p-6 shadow-xs">
            <h3 className="font-bold text-base mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Workspace Health
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-bold">
                <span>Verification Status</span>
                <span className="text-emerald-600">Active</span>
              </div>
              <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[100%]"></div>
              </div>
            </div>

            <ul className="space-y-2 text-xs text-muted-foreground font-medium mb-6">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Groq Llama 3.3 AI Engine Active
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Socket.io Real-Time Notifications
              </li>
            </ul>

            <Link href="/profile">
              <Button variant="outline" className="w-full rounded-xl text-xs font-bold">
                View Company Profile
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
