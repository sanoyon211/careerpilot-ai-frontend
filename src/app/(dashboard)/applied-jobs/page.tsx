"use client";

import { useState } from "react";
import { Building2, MapPin, DollarSign, Clock, ChevronRight, FileText, Sparkles } from "lucide-react";
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
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Shortlisted":
      case "Interview":
        return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      case "Reviewed":
      case "In Review":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Rejected":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applied Jobs History</h1>
        <p className="text-muted-foreground mt-1">Track the real-time status and progress of all your job applications.</p>
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden shadow-xs">
        {/* Filter Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 hide-scrollbar">
            {["All", "Applied", "Reviewed", "Shortlisted", "Hired", "Rejected"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
                className="rounded-full text-xs font-bold shrink-0"
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* Applications List */}
        <div className="divide-y">
          {isLoading && (
            <div className="p-12 text-center text-muted-foreground">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
              Loading your application history...
            </div>
          )}

          {!isLoading && filteredApps.length === 0 && (
            <div className="p-12 text-center bg-card">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">No applications found</h3>
              <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
                You haven't submitted any job applications under this status yet.
              </p>
              <Link href="/explore-jobs">
                <Button className="bg-primary hover:bg-primary/90 rounded-xl">Explore Open Positions</Button>
              </Link>
            </div>
          )}

          {filteredApps.map((app: any) => {
            const job = app.jobId;

            return (
              <div key={app._id} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl font-bold text-primary shrink-0 border">
                      {job?.title?.charAt(0) || "J"}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors">
                        {job?.title || "Job Listing"}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-muted-foreground font-medium">
                        {job?.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5 text-indigo-500" /> {job.location}
                          </span>
                        )}
                        {job?.salaryRange && (
                          <span className="flex items-center gap-1 font-semibold text-emerald-600">
                            <DollarSign className="h-3.5 w-3.5" /> {job.salaryRange}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t md:border-0 pt-4 md:pt-0">
                    <div className="flex flex-col items-start md:items-end gap-1">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1 font-medium">
                        <Clock className="h-3 w-3" /> Applied {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {job?._id && (
                      <Link href={`/jobs/${job._id}`}>
                        <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl">
                          <ChevronRight className="h-4.5 w-4.5" />
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
