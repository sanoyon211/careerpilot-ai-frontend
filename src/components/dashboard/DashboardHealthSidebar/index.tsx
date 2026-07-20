"use client";

import Link from "next/link";
import { TrendingUp, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/common/Button";

export function DashboardHealthSidebar() {
  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-3xl p-6 shadow-xs">
        <h3 className="font-bold text-base mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Workspace Health
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-xs font-bold">
            <span>Verification Status</span>
            <span className="text-emerald-600">Active</span>
          </div>
          <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[100%]"></div>
          </div>
        </div>

        <ul className="space-y-2 text-xs text-muted-foreground font-medium mb-6">
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Groq Llama 3.3 AI Engine Active
          </li>
          <li className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Socket.io Real-Time Notifications
          </li>
        </ul>

        <Link href="/profile">
          <Button variant="outline" className="w-full rounded-xl text-xs font-bold">
            View Company Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}
