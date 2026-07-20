"use client";

import Link from "next/link";

export function DashboardRecentApps({ recentApps }: { recentApps: any[] }) {
  return (
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
  );
}
