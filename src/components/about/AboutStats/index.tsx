"use client";

interface AboutStatsProps {
  realJobsCount: number;
}

export function AboutStats({ realJobsCount }: AboutStatsProps) {
  const stats = [
    { value: `${realJobsCount}+`, label: "Active Jobs" },
    { value: "2.4M+", label: "Job Seekers" },
    { value: "94%", label: "AI Match Precision" },
    { value: "120+", label: "Global Locations" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 text-center shadow-xs">
          <div className="text-3xl font-extrabold text-[#2563EB] mb-2">{stat.value}</div>
          <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
