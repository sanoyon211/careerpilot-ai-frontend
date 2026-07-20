"use client";

import { Cpu } from "lucide-react";

export function AboutHero() {
  return (
    <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/30">
        <Cpu className="h-4 w-4" />
        <span>Groq Llama 3.3 70B AI Engine</span>
      </div>
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0F172A]">
        Revolutionizing the Way You Find Work
      </h1>
      <p className="text-lg sm:text-xl text-[#64748B] font-medium leading-relaxed max-w-3xl mx-auto">
        CareerPilot AI is built on the belief that finding your dream job shouldn't be a struggle. We combine cutting-edge Agentic AI with a human-centric approach to match top talent with global opportunities.
      </p>
    </div>
  );
}
