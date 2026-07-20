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
        <div key={idx} className="bg-card border rounded-2xl p-6 text-center shadow-sm">
          <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
