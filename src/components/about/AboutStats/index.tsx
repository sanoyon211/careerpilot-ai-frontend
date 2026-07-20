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
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
      {stats.map((stat, idx) => (
        <div key={idx} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-8 text-center">
          <div className="text-4xl sm:text-5xl font-black text-[#8B5CF6] mb-2">{stat.value}</div>
          <div className="text-xs font-black text-[#64748B] uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
