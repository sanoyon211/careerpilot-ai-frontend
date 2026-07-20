"use client";

import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/common/Button";

interface JobItem {
  _id: string;
  title: string;
  location?: string;
  jobType: string;
  workMode?: string;
  salaryRange?: string;
  createdAt: string;
  employerId?: {
    name?: string;
  };
}

interface ExploreJobsListProps {
  jobs: JobItem[];
  isLoading: boolean;
  totalJobs: number;
  currentPage: number;
  totalPages: number;
  agenticSearch: boolean;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export function ExploreJobsList({
  jobs,
  isLoading,
  totalJobs,
  currentPage,
  totalPages,
  agenticSearch,
  onPageChange,
  onClearFilters,
}: ExploreJobsListProps) {
  return (
    <main className="flex-1 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border p-4 rounded-2xl shadow-xs">
        <p className="text-sm text-muted-foreground">
          Showing <strong className="text-foreground font-bold">{jobs.length}</strong> of{" "}
          <strong className="text-foreground font-bold">{totalJobs}</strong> jobs
          {agenticSearch && <span className="ml-2 text-xs text-primary font-semibold">(AI Intent Match Active)</span>}
        </p>

        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-card border rounded-3xl p-6 flex flex-col h-[320px] animate-pulse space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-muted"></div>
              <div className="h-6 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="space-y-2 pt-2 flex-1">
                <div className="h-4 bg-muted rounded w-full"></div>
                <div className="h-4 bg-muted rounded w-4/5"></div>
              </div>
              <div className="h-10 bg-muted rounded-xl w-full mt-auto"></div>
            </div>
          ))}

        {!isLoading && totalJobs === 0 && (
          <div className="col-span-full text-center py-16 bg-card border rounded-3xl space-y-3">
            <p className="font-bold text-lg">No jobs found matching your criteria</p>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              Try broadening your search query or clearing filter options.
            </p>
            <Button variant="outline" size="sm" onClick={onClearFilters} className="mt-2 rounded-xl">
              Clear Filters
            </Button>
          </div>
        )}

        {!isLoading &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-card border border-border rounded-[24px] p-6 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary text-white font-bold text-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    {job.employerId?.name?.charAt(0) || "C"}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1 text-[11px] font-bold border border-primary/20">
                    {job.workMode || "Remote"}
                  </span>
                </div>

                <h3 className="font-bold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors text-foreground tracking-tight">
                  {job.title}
                </h3>
                <p className="text-muted-foreground text-xs font-normal mb-4">{job.employerId?.name || "Verified Employer"}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-xs text-muted-foreground gap-2 font-normal">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                    <span className="line-clamp-1">{job.location || "Flexible"}</span>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground gap-2 font-normal">
                    <Briefcase className="h-3.5 w-3.5 shrink-0 text-primary" /> {job.jobType}
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400 font-bold gap-2">
                      <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between">
                <span className="flex items-center text-[11px] text-muted-foreground gap-1">
                  <Clock className="h-3 w-3" /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/jobs/${job._id}`}>
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-full font-semibold px-5">
                    View Position
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="gap-1 rounded-xl"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className="w-9 h-9 p-0 font-bold rounded-xl"
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            className="gap-1 rounded-xl"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </main>
  );
}
