"use client";

import Link from "next/link";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export function DashboardHealthSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 shadow-subtle">
        <h3 className="font-extrabold text-base text-[#1E293B] mb-4 flex items-center gap-2">
          <TrendingUp className="h-4.5 w-4.5 text-[#2563EB]" /> Workspace Health
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#1E293B]">Verification Status</span>
            <span className="text-emerald-600 font-extrabold">Active</span>
          </div>
          <div className="h-2.5 w-full bg-white border border-[#E2E8F0] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[100%]"></div>
          </div>
        </div>

        <ul className="space-y-3 text-xs text-[#64748B] font-semibold mb-8">
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Groq Llama 3.3 AI Engine Active
          </li>
          <li className="flex items-center gap-2.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Socket.io Real-Time System Active
          </li>
        </ul>

        <Link href="/profile">
          <Button variant="outline" className="w-full rounded-xl text-xs font-extrabold py-3">
            View Profile Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}
