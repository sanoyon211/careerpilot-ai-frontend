"use client";

import { Cpu, FileCheck2, Bot, ShieldCheck, Zap, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "Groq Agentic AI Search",
    desc: "Uses Groq Llama 3.3 70B LLM to understand candidate skill depth and match roles accurately based on intent.",
    accent: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  {
    icon: FileCheck2,
    title: "ATS Resume Analyzer",
    desc: "Extracts key technical competencies, computes ATS readiness scores, and provides immediate optimization tips.",
    accent: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  {
    icon: Bot,
    title: "24/7 AI Career Coach",
    desc: "Integrated conversational assistant ready to guide salary negotiations, interview prep, and career pathing.",
    accent: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  {
    icon: Zap,
    title: "One-Click AI Cover Letter",
    desc: "Automatically drafts personalized, professional cover letters tailored to specific job description requirements.",
    accent: "bg-[#8B5CF6]/10 text-[#8B5CF6]",
  },
  {
    icon: ShieldCheck,
    title: "Pre-Verified Employers",
    desc: "Every job posting comes from verified companies and engineering managers for transparent hiring.",
    accent: "bg-emerald-500/10 text-emerald-600",
  },
  {
    icon: Globe,
    title: "Borderless Tech Hiring",
    desc: "Connects global talent with remote, hybrid, and relocation opportunities across top technology hubs.",
    accent: "bg-indigo-500/10 text-indigo-600",
  },
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/30 px-4 py-1.5 rounded-lg">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Engineered for Modern Tech Talent
          </h2>
          <p className="text-[#64748B] text-base sm:text-lg font-medium leading-relaxed">
            Everything you need to navigate job search, resume scoring, and technical interviews with AI precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8 sm:p-10 hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-extrabold text-[#0F172A] mb-3">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-[#64748B] leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
