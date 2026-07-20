"use client";

import Link from "next/link";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export function DashboardHealthSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
        <h3 className="font-extrabold text-base text-[#1E293B] mb-4">
          Workspace Health
        </h3>

        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-[#1E293B]">Verification Status</span>
            <span className="text-[#8B5CF6] font-extrabold">Active</span>
          </div>
          <div className="h-2.5 w-full bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
            <div className="h-full bg-[#8B5CF6] rounded-lg w-[100%]"></div>
          </div>
        </div>

        <ul className="space-y-3 text-xs text-[#64748B] font-semibold mb-8">
          <li className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shrink-0" /> Groq Llama 3.3 AI Engine Active
          </li>
          <li className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] shrink-0" /> Socket.io Real-Time System Active
          </li>
        </ul>

        <Link href="/profile">
          <Button variant="outline" className="w-full rounded-lg text-xs font-extrabold py-3">
            View Profile Settings
          </Button>
        </Link>
      </div>
    </div>
  );
}
