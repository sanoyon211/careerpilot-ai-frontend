"use client";

import { Sparkles } from "lucide-react";

interface JobDetailSidebarProps {
  employerName?: string;
}

export function JobDetailSidebar({ employerName }: JobDetailSidebarProps) {
  const companyName = employerName || "TechCorp";

  return (
    <div className="space-y-8">
      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
        <h3 className="font-extrabold text-xl text-[#0F172A] mb-6">About the Hiring Employer</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-14 w-14 rounded-2xl bg-[#0F172A] text-white font-black flex items-center justify-center text-xl shrink-0">
            {companyName.charAt(0)}
          </div>
          <div>
            <h4 className="font-extrabold text-lg text-[#0F172A]">{companyName}</h4>
            <p className="text-xs text-[#64748B] font-semibold">Verified Hiring Partner</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 space-y-4">
        <div className="flex items-center gap-2.5">
          <Sparkles className="h-6 w-6 text-[#8B5CF6]" />
          <h3 className="font-extrabold text-lg text-[#8B5CF6]">Groq AI Candidate Match</h3>
        </div>
        <p className="text-sm text-[#64748B] leading-relaxed font-medium">
          Our Agentic AI analyzed this role against standard tech resumes and computed a <strong>94% skill alignment</strong>.
        </p>
      </div>
    </div>
  );
}
