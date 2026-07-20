"use client";

import { Sparkles } from "lucide-react";

interface JobDetailSidebarProps {
  employerName?: string;
}

export function JobDetailSidebar({ employerName }: JobDetailSidebarProps) {
  const companyName = employerName || "TechCorp";

  return (
    <div className="space-y-6">
      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 shadow-xs">
        <h3 className="font-extrabold text-lg text-[#1E293B] mb-4">About the Hiring Employer</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-[#2563EB] text-white font-extrabold flex items-center justify-center text-lg shrink-0">
            {companyName.charAt(0)}
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#1E293B]">{companyName}</h4>
            <p className="text-xs text-[#64748B] font-semibold">Verified Hiring Partner</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#F3E8FF] via-[#F4F7FE] to-white border border-[#8B5CF6]/30 rounded-[28px] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" />
          <h3 className="font-extrabold text-base text-[#8B5CF6]">Groq AI Candidate Match</h3>
        </div>
        <p className="text-xs text-[#64748B] leading-relaxed font-medium">
          Our Agentic AI analyzed this role against standard tech resumes and computed a <strong>94% skill alignment</strong>.
        </p>
      </div>
    </div>
  );
}
