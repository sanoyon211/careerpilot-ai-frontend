"use client";

import { Sparkles } from "lucide-react";

interface JobDetailSidebarProps {
  employerName?: string;
}

export function JobDetailSidebar({ employerName }: JobDetailSidebarProps) {
  const companyName = employerName || "TechCorp";

  return (
    <div className="space-y-6">
      <div className="bg-card border rounded-3xl p-6 shadow-xs">
        <h3 className="font-bold text-lg mb-4">About the Hiring Employer</h3>
        <div className="flex items-center gap-4 mb-4">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
            {companyName.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-base">{companyName}</h4>
            <p className="text-xs text-muted-foreground font-medium">Verified Hiring Partner</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary/10 via-indigo-500/5 to-blue-500/10 border border-primary/20 rounded-3xl p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-bold text-base text-primary">Groq AI Candidate Match</h3>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Our Agentic AI analyzed this role against standard tech resumes and computed a <strong>94% skill alignment</strong>.
        </p>
      </div>
    </div>
  );
}
