"use client";

import { Briefcase, Eye, Sparkles, Bookmark, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetJobSeekerStatsQuery, useGetEmployerStatsQuery } from "@/redux/api/dashboardApi";
import { useGetMyApplicationsQuery } from "@/redux/api/applicationApi";
import { useGetEmployerJobsQuery } from "@/redux/api/jobsApi";
import { DashboardWelcome } from "@/components/dashboard/DashboardWelcome";
import { DashboardStats } from "@/components/dashboard/DashboardStats";
import { DashboardRecentApps } from "@/components/dashboard/DashboardRecentApps";
import { DashboardEmployerJobs } from "@/components/dashboard/DashboardEmployerJobs";
import { DashboardHealthSidebar } from "@/components/dashboard/DashboardHealthSidebar";

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
        { label: "Applied Jobs", value: (statsData as any)?.appliedJobs || 0, icon: Briefcase, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900" },
        { label: "Saved Jobs", value: (statsData as any)?.savedJobs || 0, icon: Bookmark, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900" },
        { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900" },
        { label: "AI Match Precision", value: (statsData as any)?.aiMatchScore || "94%", icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900" },
      ]
    : [
        { label: "Posted Jobs", value: (statsData as any)?.postedJobs || 0, icon: Briefcase, color: "text-rose-600", bg: "bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900" },
        { label: "Total Applicants", value: (statsData as any)?.totalApplicants || 0, icon: Users, color: "text-purple-600", bg: "bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900" },
        { label: "Profile Views", value: statsData?.profileViews || 0, icon: Eye, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900" },
        { label: "Active Listings", value: (statsData as any)?.postedJobs || 0, icon: Sparkles, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900" },
      ];

  return (
    <div className="space-y-6">
      <DashboardWelcome userName={user?.name} isEmployer={!!isEmployer} />
      <DashboardStats stats={STATS} />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {isJobSeeker && <DashboardRecentApps recentApps={recentApps} />}
          {isEmployer && (
            <DashboardEmployerJobs
              employerJobs={employerJobs}
              chartData={(statsData as any)?.chartData}
            />
          )}
        </div>

        <DashboardHealthSidebar />
      </div>
    </div>
  );
}
