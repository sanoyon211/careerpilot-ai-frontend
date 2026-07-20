"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Sparkles, Bot, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export function AISection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-[#F3E8FF]/30 to-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="bg-gradient-to-br from-[#F3E8FF] via-[#F4F7FE] to-white border border-[#8B5CF6]/30 rounded-[32px] p-8 md:p-14 shadow-md shadow-purple-500/5">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left AI Text Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-[#8B5CF6] text-white shadow-xs">
                <Sparkles className="h-4 w-4" />
                <span>AI Feature Spotlight</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#1E293B] tracking-tight leading-tight">
                Supercharge Your Career with <br />
                <span className="text-[#8B5CF6]">AI Resume Analyzer & Chat Coach</span>
              </h2>

              <p className="text-base sm:text-lg text-[#64748B] font-medium leading-relaxed">
                Powered by Groq Llama 3.3 70B AI, our intelligent platform scans your resume against live industry postings to extract skills, rank match relevance, and generate instant application recommendations.
              </p>

              <ul className="space-y-3.5 pt-2">
                {[
                  "Real-time ATS parsing and keyword density optimization",
                  "Automated cover letter generation for any job opening",
                  "24/7 conversational career coach for interview strategies",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-bold text-[#1E293B]">
                    <div className="h-6 w-6 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/ai-chat">
                  <Button variant="ai" size="lg" className="gap-2 text-sm shadow-md shadow-purple-500/20">
                    <Bot className="h-5 w-5" /> Start AI Chat Coach
                  </Button>
                </Link>
                <Link href="/resume">
                  <Button variant="outline" size="lg" className="gap-2 text-sm border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#F3E8FF]">
                    <FileText className="h-5 w-5" /> Analyze Resume Free
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side Interactive Card Preview */}
            <div className="bg-white border border-[#E2E8F0] rounded-[28px] p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-2xl bg-[#8B5CF6] text-white flex items-center justify-center font-bold">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#1E293B]">AI Match Insight</h4>
                    <p className="text-xs text-[#64748B]">Groq Llama 3.3 Engine</p>
                  </div>
                </div>
                <span className="text-xs font-black text-[#8B5CF6] bg-[#F3E8FF] px-3 py-1 rounded-full border border-[#8B5CF6]/30">
                  94% Match
                </span>
              </div>

              {/* Sample Chat Bubble */}
              <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-2xl p-4 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8B5CF6]">
                  <Bot className="h-4 w-4" /> CareerPilot Assistant
                </div>
                <p className="text-xs text-[#1E293B] leading-relaxed font-medium">
                  "Your resume shows strong proficiency in TypeScript & Next.js! Adding PostgreSQL ORM examples will boost your ATS score by +12% for Senior Fullstack roles."
                </p>
              </div>

              {/* Sample Action Pills */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs font-bold p-3 bg-slate-50 border rounded-xl">
                  <span className="text-[#1E293B]">ATS Readineess Score</span>
                  <span className="text-emerald-600 font-extrabold">88 / 100</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold p-3 bg-slate-50 border rounded-xl">
                  <span className="text-[#1E293B]">Tailored Cover Letter Status</span>
                  <span className="text-[#2563EB] font-extrabold">Ready to Send</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
