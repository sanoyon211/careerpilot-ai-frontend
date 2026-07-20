"use client";

import Link from "next/link";

export function DashboardRecentApps({ recentApps }: { recentApps: any[] }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#1E293B]">Recent Applications</h2>
        <Link href="/applied-jobs" className="text-xs font-extrabold text-[#2563EB] hover:underline">
          View All History
        </Link>
      </div>

      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-xs">
        <div className="divide-y divide-[#E2E8F0]">
          {recentApps.length > 0 ? (
            recentApps.map((app: any) => {
              const job = app.jobId;
              let statusColor = "text-[#64748B] bg-white border-[#E2E8F0]";
              if (app.status === "Reviewed" || app.status === "Shortlisted") statusColor = "text-[#2563EB] bg-blue-50 border-blue-200";
              if (app.status === "Hired") statusColor = "text-emerald-600 bg-emerald-50 border-emerald-200";
              if (app.status === "Rejected") statusColor = "text-red-600 bg-red-50 border-red-200";

              return (
                <div key={app._id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-white transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#2563EB] text-white flex items-center justify-center text-base font-extrabold shrink-0">
                      {job?.title?.charAt(0) || "J"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-[#1E293B]">{job?.title || "Job Title"}</h3>
                      <p className="text-xs font-semibold text-[#64748B]">{job?.location || "Remote"}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${statusColor}`}>
                    {app.status}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-[#64748B] font-semibold">
              No applications submitted yet. Explore open roles to get started.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
