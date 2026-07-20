"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Search, Sparkles, Cpu, ArrowRight, ShieldCheck, Zap, Users, TrendingUp } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Top Header Badge */}
        <div className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/20 shadow-xs">
            <Cpu className="h-4 w-4" />
            <span>Autonomous Groq Llama 3.3 70B AI Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#1E293B] leading-[1.1]">
            Where Top Tech Talent Meets <br className="hidden sm:inline" />
            <span className="text-[#2563EB]">Autonomous Career Intelligence</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#64748B] max-w-2xl font-medium leading-relaxed">
            Eliminate traditional hiring friction. Our Agentic AI matches your verified skills with top global tech roles and optimizes your ATS readiness in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
            <Link href="/explore-jobs">
              <Button size="lg" className="w-full sm:w-auto bg-[#2563EB] hover:bg-[#1D4ED8] text-white gap-2 text-base shadow-lg shadow-blue-500/20">
                <Search className="h-5 w-5" /> Explore Open Roles
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button size="lg" variant="ai" className="w-full sm:w-auto gap-2 text-base shadow-lg shadow-purple-500/20">
                <Sparkles className="h-5 w-5" /> Launch AI Coach
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento Grid Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Bento Card 1: AI Agentic Matching */}
          <div className="md:col-span-7 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 relative overflow-hidden shadow-xs hover:border-[#CBD5E1] transition-all group">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2.5 rounded-2xl bg-[#8B5CF6]/10 text-[#8B5CF6]">
                <Cpu className="h-6 w-6" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#8B5CF6]">Agentic AI Engine</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-3 group-hover:text-[#2563EB] transition-colors">
              Intent-Driven Job Matching
            </h3>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-lg mb-6">
              Unlike legacy keyword filters, our LLM agent understands project context, system architecture depth, and career trajectory alignment.
            </p>
            <div className="flex flex-wrap gap-2 text-xs font-bold">
              <span className="bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full text-[#1E293B] shadow-2xs">94% Skill Accuracy</span>
              <span className="bg-white border border-[#E2E8F0] px-3.5 py-1.5 rounded-full text-[#2563EB] shadow-2xs">Real-Time Scoring</span>
              <span className="bg-[#F3E8FF] border border-[#8B5CF6]/20 px-3.5 py-1.5 rounded-full text-[#8B5CF6] shadow-2xs">Zero Bias</span>
            </div>
          </div>

          {/* Bento Card 2: ATS Resume Analyzer */}
          <div className="md:col-span-5 bg-gradient-to-br from-[#F3E8FF] via-[#F4F7FE] to-white border border-[#8B5CF6]/30 rounded-[28px] p-8 shadow-xs hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-[#8B5CF6] text-white">
                  <Sparkles className="h-6 w-6" />
                </div>
                <span className="text-xs font-extrabold text-[#8B5CF6] bg-white px-3 py-1 rounded-full border border-[#8B5CF6]/20 shadow-2xs">AI Feature</span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">ATS Resume Optimizer</h3>
              <p className="text-sm text-[#64748B] leading-relaxed mb-6">
                Upload your resume PDF and instantly receive AI-powered feedback on keyword density, formatting, and role recommendations.
              </p>
            </div>
            <Link href="/resume">
              <Button size="sm" variant="ai" className="w-full gap-2 rounded-xl text-xs">
                Check Resume Score <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Bento Card 3: Metrics Banner */}
          <div className="md:col-span-4 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 flex items-center gap-4 shadow-xs">
            <div className="p-3.5 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] shrink-0">
              <TrendingUp className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E293B]">2,500+</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Active Verified Jobs</div>
            </div>
          </div>

          {/* Bento Card 4: Employer Match */}
          <div className="md:col-span-4 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 flex items-center gap-4 shadow-xs">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0">
              <ShieldCheck className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E293B]">100%</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Verified Companies</div>
            </div>
          </div>

          {/* Bento Card 5: Fast Track Applications */}
          <div className="md:col-span-4 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 flex items-center gap-4 shadow-xs">
            <div className="p-3.5 rounded-2xl bg-indigo-500/10 text-indigo-600 shrink-0">
              <Zap className="h-7 w-7" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#1E293B]">Instant</div>
              <div className="text-xs font-bold text-[#64748B] uppercase tracking-wider">AI Cover Letter Gen</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
