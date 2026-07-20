"use client";

import { useState } from "react";
import { Building2, MapPin, DollarSign, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useGetMyApplicationsQuery } from "@/redux/api/applicationApi";

export default function AppliedJobsPage() {
  const { data: appsResponse, isLoading } = useGetMyApplicationsQuery();
  const applications = appsResponse?.data || [];
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredApps = applications.filter((app: any) => {
    if (statusFilter === "All") return true;
    return app.status?.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hired":
      case "Shortlisted":
      case "Interview":
      case "Reviewed":
      case "In Review":
        return "bg-[#F3E8FF] text-[#8B5CF6] border-[#8B5CF6]/30";
      case "Rejected":
        return "bg-slate-100 text-[#64748B] border-[#E2E8F0]";
      default:
        return "bg-slate-100 text-[#64748B] border-[#E2E8F0]";
    }
  };

  return (
    <div className="max-w-5xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">Applied Jobs History</h1>
        <p className="text-[#64748B] font-medium mt-1 text-sm">Track the real-time status and progress of all your job applications.</p>
      </div>

      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl overflow-hidden">
        {/* Filter Toolbar */}
        <div className="p-6 border-b border-[#E5E7EB] flex flex-col sm:flex-row justify-between items-center gap-4 bg-white">
          <div className="flex gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 hide-scrollbar">
            {["All", "Applied", "Reviewed", "Shortlisted", "Hired", "Rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg text-xs font-extrabold shrink-0 hover:shadow-xs transition-all ${
                  statusFilter === status ? "bg-[#8B5CF6] text-white" : ""
                }`}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Applications List with 25%+ Padding */}
        <div className="divide-y divide-[#E5E7EB]">
          {isLoading && (
            <div className="p-16 text-center text-[#64748B] font-semibold">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent mx-auto mb-3" />
              Loading your application history...
            </div>
          )}

          {!isLoading && filteredApps.length === 0 && (
            <div className="p-16 text-center bg-[#FAFAFA]">
              <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">No applications found</h3>
              <p className="text-[#64748B] text-sm max-w-sm mx-auto mb-6 font-medium">
                You haven't submitted any job applications under this status yet.
              </p>
              <Link href="/explore-jobs">
                <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg font-extrabold px-8 py-3">
                  Explore Open Positions
                </Button>
              </Link>
            </div>
          )}

          {filteredApps.map((app: any) => {
            const job = app.jobId;

            return (
              <div key={app._id} className="p-6 sm:p-8 hover:bg-white transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-5 flex-1">
                    <div className="h-14 w-14 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center text-xl font-extrabold shrink-0">
                      {job?.title?.charAt(0) || "J"}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-lg text-[#1E293B] hover:text-[#8B5CF6] transition-colors">
                        {job?.title || "Job Listing"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-1.5 text-xs text-[#64748B] font-semibold">
                        {job?.location && <span>{job.location}</span>}
                        {job?.salaryRange && (
                          <span className="font-extrabold text-[#0F172A]">{job.salaryRange}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t md:border-0 border-[#E5E7EB] pt-4 md:pt-0">
                    <div className="flex flex-col items-start md:items-end gap-1.5">
                      <span className={`text-xs font-extrabold px-3.5 py-1 rounded-lg border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-[11px] text-[#64748B] font-semibold">
                        Applied {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {job?._id && (
                      <Link href={`/jobs/${job._id}`}>
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl">
                          View
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
