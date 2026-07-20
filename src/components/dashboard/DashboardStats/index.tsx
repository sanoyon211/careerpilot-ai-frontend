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
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 flex items-center gap-4 shadow-xs">
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 bg-white border border-[#E2E8F0] ${stat.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E293B]">{stat.value}</div>
              <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider">{stat.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
