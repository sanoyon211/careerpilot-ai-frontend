"use client";

import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function Statistics() {
  const { data: jobsResponse } = useGetJobsQuery({ agenticSearch: true });
  const liveJobsCount = jobsResponse?.data?.length || 0;

  const STATS = [
    { value: `${liveJobsCount}+`, label: "Active Jobs Verified" },
    { value: "2.4M+", label: "Job Seekers Matched" },
    { value: "94%", label: "AI Precision Rate" },
    { value: "120+", label: "Global Tech Locations" },
  ];

  return (
    <section className="py-16 bg-[#F4F7FE] border-y border-[#E2E8F0]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <div key={idx} className="bg-white border border-[#E2E8F0] rounded-[24px] p-6 text-center shadow-xs">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#2563EB] mb-2">{stat.value}</div>
              <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
