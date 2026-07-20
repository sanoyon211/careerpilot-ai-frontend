"use client";

import Link from "next/link";

export function DashboardRecentApps({ recentApps }: { recentApps: any[] }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#1E293B]">Recent Applications</h2>
        <Link href="/applied-jobs" className="text-xs font-extrabold text-[#8B5CF6] hover:underline">
          View All History
        </Link>
      </div>

      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl overflow-hidden">
        <div className="divide-y divide-[#E5E7EB]">
          {recentApps.length > 0 ? (
            recentApps.map((app: any) => {
              const job = app.jobId;
              let statusColor = "text-[#64748B] bg-white border-[#E5E7EB]";
              if (app.status === "Reviewed" || app.status === "Shortlisted" || app.status === "Hired") statusColor = "text-[#8B5CF6] bg-[#F3E8FF] border-[#8B5CF6]/30";
              if (app.status === "Rejected") statusColor = "text-[#64748B] bg-slate-100 border-[#E2E8F0]";

              return (
                <div key={app._id} className="p-6 flex items-center justify-between gap-6 hover:bg-white transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center text-lg font-extrabold shrink-0">
                      {job?.title?.charAt(0) || "J"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#1E293B]">{job?.title || "Job Title"}</h3>
                      <p className="text-xs font-semibold text-[#64748B] mt-0.5">{job?.location || "Remote"}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3.5 py-1.5 rounded-lg border ${statusColor}`}>
                    {app.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center text-xs text-[#64748B] font-semibold">
              No applications submitted yet. Explore open roles to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
