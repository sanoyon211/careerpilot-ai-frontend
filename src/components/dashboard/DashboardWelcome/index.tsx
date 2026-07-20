"use client";

import Link from "next/link";
import { PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";

interface DashboardWelcomeProps {
  userName?: string;
  isEmployer: boolean;
}

export function DashboardWelcome({ userName, isEmployer }: DashboardWelcomeProps) {
  return (
    <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
          Welcome back, {userName || "User"}!
        </h1>
        <p className="text-[#64748B] font-medium mt-1.5 text-base">
          Here is what's happening with your {isEmployer ? "employer workspace" : "job search"} today.
        </p>
      </div>

      {isEmployer ? (
        <Link href="/add-job">
          <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-extrabold px-8 py-3 text-sm">
            Post New Job
          </Button>
        </Link>
      ) : (
        <Link href="/explore-jobs">
          <Button variant="ai" className="rounded-full font-extrabold px-8 py-3 text-sm">
            Find AI Job Matches
          </Button>
        </Link>
      )}
    </div>
  );
}
