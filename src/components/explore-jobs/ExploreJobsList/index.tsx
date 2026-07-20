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
    <main className="flex-1 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAFAFA] border border-[#E5E7EB] p-5 rounded-2xl">
        <p className="text-sm text-[#64748B] font-medium">
          Showing <strong className="text-[#0F172A] font-black">{jobs.length}</strong> of{" "}
          <strong className="text-[#0F172A] font-black">{totalJobs}</strong> jobs
          {agenticSearch && <span className="ml-2 text-xs text-[#8B5CF6] font-black">(AI Intent Match Active)</span>}
        </p>

        <div className="flex items-center gap-2 text-xs font-extrabold text-[#64748B]">
          <span>Page {currentPage} of {totalPages}</span>
        </div>
      </div>

      {/* Grid expanding on large viewports */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-7 flex flex-col h-[300px] animate-pulse space-y-4">
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
          <div className="col-span-full text-center py-20 bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] space-y-4">
            <p className="font-black text-xl text-[#0F172A]">No jobs found matching your criteria</p>
            <p className="text-sm text-[#64748B] max-w-md mx-auto font-medium">
              Try broadening your search query or clearing filter options.
            </p>
            <Button variant="outline" size="sm" onClick={onClearFilters} className="mt-2 rounded-xl font-extrabold px-6">
              Clear Filters
            </Button>
          </div>
        )}

        {!isLoading &&
          jobs.map((job) => (
            <div
              key={job._id}
              className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-7 hover:border-[#CBD5E1] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-[#0F172A] text-white font-black text-xl flex items-center justify-center">
                    {job.employerId?.name?.charAt(0) || "C"}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-white text-[#8B5CF6] px-3.5 py-1 text-xs font-extrabold border border-[#E5E7EB]">
                    {job.workMode || "Remote"}
                  </span>
                </div>

                <h3 className="font-extrabold text-lg line-clamp-1 mb-1 text-[#0F172A] group-hover:text-[#8B5CF6] transition-colors">
                  {job.title}
                </h3>
                <p className="text-[#64748B] text-xs font-semibold mb-5">{job.employerId?.name || "Verified Employer"}</p>

                <div className="space-y-2.5 mb-6 text-xs font-semibold text-[#64748B]">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-[#0F172A] shrink-0" strokeWidth={1.5} />
                    <span className="line-clamp-1">{job.location || "Flexible"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-[#0F172A] shrink-0" strokeWidth={1.5} /> {job.jobType}
                  </div>
                  {job.salaryRange && (
                    <div className="flex items-center text-emerald-600 font-extrabold gap-2">
                      <DollarSign className="h-4 w-4 shrink-0 text-[#0F172A]" strokeWidth={1.5} /> {job.salaryRange}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="flex items-center text-[11px] text-[#64748B] font-semibold gap-1">
                  <Clock className="h-4 w-4 text-[#0F172A]" strokeWidth={1.5} /> {new Date(job.createdAt).toLocaleDateString()}
                </span>
                <Link href={`/jobs/${job._id}`}>
                  <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full font-extrabold px-6">
                    View Position
                  </Button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-16 flex justify-center items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            className="rounded-xl font-bold"
          >
            Previous
          </Button>

          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(pageNum)}
                className={`w-10 h-10 p-0 font-extrabold rounded-xl ${
                  currentPage === pageNum ? "bg-[#8B5CF6] text-white" : ""
                }`}
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
            className="rounded-xl font-bold"
          >
            Next
          </Button>
        </div>
      )}
    </main>
  );
}
