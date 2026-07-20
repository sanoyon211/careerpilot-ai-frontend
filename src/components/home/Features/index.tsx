"use client";

import { Cpu, FileCheck2, Bot, ShieldCheck, Zap, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "Groq Agentic AI Search",
    desc: "Uses Groq Llama 3.3 70B LLM to understand candidate skill depth and match roles accurately based on intent.",
    accent: "bg-[#2563EB]/10 text-[#2563EB]",
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
    accent: "bg-[#2563EB]/10 text-[#2563EB]",
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] bg-[#F4F7FE] border border-[#E2E8F0] px-3.5 py-1.5 rounded-full">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            Engineered for Modern Tech Talent
          </h2>
          <p className="text-[#64748B] text-base font-medium">
            Everything you need to navigate job search, resume scoring, and technical interviews with AI precision.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-8 hover:-translate-y-1 hover:shadow-xl hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`h-12 w-12 rounded-2xl ${feature.accent} flex items-center justify-center mb-6`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E293B] mb-3">{feature.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed font-medium">{feature.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
