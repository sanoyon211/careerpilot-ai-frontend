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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F4F7FE] border border-[#E2E8F0] p-4 rounded-2xl shadow-xs">
        <p className="text-sm text-[#64748B] font-medium">
          Showing <strong className="text-[#1E293B] font-extrabold">{jobs.length}</strong> of{" "}
          <strong className="text-[#1E293B] font-extrabold">{totalJobs}</strong> jobs
          {agenticSearch && <span className="ml-2 text-xs text-[#8B5CF6] font-extrabold">(AI Intent Match Active)</span>}
        </p>

        <div className="flex items-center gap-2 text-xs font-bold text-[#64748B]">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 flex flex-col h-[300px] animate-pulse space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-slate-200"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              <div className="space-y-2 pt-2 flex-1">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-4/5"></div>
              </div>
              <div className="h-10 bg-slate-200 rounded-xl w-full mt-auto"></div>
            </div>
          ))}

        {!isLoading && totalJobs === 0 && (
          <div className="col-span-full text-center py-16 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] space-y-3">
            <p className="font-extrabold text-lg text-[#1E293B]">No jobs found matching your criteria</p>
            <p className="text-xs text-[#64748B] max-w-sm mx-auto font-medium">
              Try broadening your search query or clearing filter options.
            </p>
            <Button variant="outline" size="sm" onClick={onClearFilters} className="mt-2 rounded-xl font-bold">
              Clear Filters
            </Button>
          </div>
        )}

        {!isLoading &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 hover:-translate-y-1 hover:shadow-xl hover:border-[#CBD5E1] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#2563EB] text-white font-extrabold text-xl flex items-center justify-center shadow-xs">
                    {job.employerId?.name?.charAt(0) || "C"}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white text-[#2563EB] px-3 py-1 text-xs font-bold border border-[#E2E8F0] shadow-2xs">
                    {job.workMode || "Remote"}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg line-clamp-1 mb-1 text-[#1E293B] group-hover:text-[#2563EB] transition-colors">
                  {job.title}
                </h3>
                <p className="text-[#64748B] text-xs font-semibold mb-4">{job.employerId?.name || "Verified Employer"}</p>

                <div className="space-y-2 mb-6 text-xs font-semibold text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-[#2563EB] shrink-0" />
                    <span className="line-clamp-1">{job.location || "Flexible"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-3.5 w-3.5 text-[#2563EB] shrink-0" /> {job.jobType}
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center text-emerald-600 font-extrabold gap-2">
                      <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="flex items-center text-[11px] text-[#64748B] font-semibold gap-1">
                  <Clock className="h-3 w-3" /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/jobs/${job._id}`}>
                  <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-bold px-5">
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
            className="gap-1 rounded-xl font-bold"
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
                className="w-9 h-9 p-0 font-extrabold rounded-xl"
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
            className="gap-1 rounded-xl font-bold"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </main>
  );
}
