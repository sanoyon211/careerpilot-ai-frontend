"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { MapPin, Briefcase, DollarSign, Clock, ArrowRight } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function FeaturedJobs() {
  const { data: jobsResponse, isLoading } = useGetJobsQuery({ agenticSearch: true });
  const jobs = jobsResponse?.data?.slice(0, 8) || [];

  return (
    <section className="py-24 bg-white">
      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/30 px-4 py-1.5 rounded-lg">
              Live Opportunities
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight mt-3">
              Featured Job Listings
            </h2>
          </div>
          <Link href="/explore-jobs">
            <Button variant="outline" className="text-sm font-extrabold px-6">
              View All Positions
            </Button>
          </Link>
        </div>

        {/* 4 Columns Grid on Extra Wide Monitors */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-6 animate-pulse space-y-4 h-[280px]">
                <div className="h-10 w-10 rounded-full bg-slate-200"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}

          {!isLoading && jobs.length === 0 && (
            <div className="col-span-full text-center py-16 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl">
              <p className="font-extrabold text-[#0F172A]">No featured jobs available right now.</p>
            </div>
          )}

          {!isLoading &&
            jobs.map((job) => (
              <div
                key={job._id}
                className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-7 hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-5">
                    <div className="h-12 w-12 rounded-xl bg-[#0F172A] text-white font-black text-xl flex items-center justify-center">
                      {job.employerId?.name?.charAt(0) || "C"}
                    </div>
                    <span className="inline-flex items-center rounded-lg bg-white text-[#8B5CF6] px-3 py-1 text-xs font-extrabold border border-[#E5E7EB]">
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
                    <Button size="sm" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg font-extrabold px-5">
                      View Position
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
