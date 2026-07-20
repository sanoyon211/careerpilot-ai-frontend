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
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] text-center mb-16">Our Core Values</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {values.map((value, idx) => {
          const Icon = value.icon;
          return (
            <div key={idx} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8 sm:p-10 hover:border-[#CBD5E1] transition-all">
              <Icon className="h-12 w-12 text-[#8B5CF6] mb-6" />
              <h3 className="text-2xl font-extrabold text-[#0F172A] mb-3">{value.title}</h3>
              <p className="text-[#64748B] leading-relaxed text-base font-medium">{value.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
