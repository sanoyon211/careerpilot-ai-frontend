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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">
          Welcome back, {userName || "User"}!
        </h1>
        <p className="text-[#64748B] font-medium mt-1 text-sm">
          Here is what's happening with your {isEmployer ? "employer workspace" : "job search"} today.
        </p>
      </div>

      {isEmployer ? (
        <Link href="/add-job">
          <Button className="gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-full font-extrabold shadow-md shadow-blue-500/20">
            <PlusCircle className="h-4 w-4" /> Post New Job
          </Button>
        </Link>
      ) : (
        <Link href="/explore-jobs">
          <Button variant="ai" className="gap-2 rounded-full font-extrabold shadow-md shadow-purple-500/20">
            <Sparkles className="h-4 w-4" /> Find AI Job Matches
          </Button>
        </Link>
      )}
    </div>
  );
}
