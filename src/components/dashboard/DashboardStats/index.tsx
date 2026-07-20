"use client";

import { LucideIcon } from "lucide-react";

export interface StatCardItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export function DashboardStats({ stats }: { stats: StatCardItem[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[24px] p-7 hover:border-[#CBD5E1] transition-all duration-300">
            <div className="text-3xl font-extrabold text-[#1E293B]">{stat.value}</div>
            <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
