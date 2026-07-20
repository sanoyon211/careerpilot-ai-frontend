"use client";

import { Users2, Globe, Building2 } from "lucide-react";

export function AboutValues() {
  const values = [
    { icon: Users2, title: "Candidate First", desc: "We prioritize the experience and privacy of job seekers above all else." },
    { icon: Globe, title: "Borderless Opportunities", desc: "Talent is global. We connect you with remote and relocation opportunities worldwide." },
    { icon: Building2, title: "Transparent Hiring", desc: "No more black holes. We ensure you get actionable AI feedback and insights." },
  ];

  return (
    <div className="mb-16">
      <h2 className="text-3xl font-extrabold text-[#1E293B] text-center mb-12">Our Core Values</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((value, idx) => {
          const Icon = value.icon;
          return (
            <div key={idx} className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-8 hover:-translate-y-1 hover:border-[#CBD5E1] transition-all shadow-xs">
              <Icon className="h-10 w-10 text-[#2563EB] mb-6" />
              <h3 className="text-xl font-extrabold text-[#1E293B] mb-3">{value.title}</h3>
              <p className="text-[#64748B] leading-relaxed text-sm font-medium">{value.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
