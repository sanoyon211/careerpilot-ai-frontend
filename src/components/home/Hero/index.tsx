"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Search, Sparkles, Cpu, ArrowRight, ShieldCheck, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      {/* Ambient Radial Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#8B5CF6]/10 blur-[120px] pointer-events-none" />

      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        {/* Top Header Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center space-y-6 max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/30">
            <span>Autonomous Groq Llama 3.3 70B AI Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]">
            Where Top Tech Talent Meets <br className="hidden sm:inline" />
            <span className="text-[#8B5CF6]">Autonomous Career Intelligence</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#64748B] max-w-3xl font-medium leading-relaxed">
            Eliminate traditional hiring friction. Our Agentic AI matches your verified skills with top global tech roles and optimizes your ATS readiness in real time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link href="/explore-jobs">
              <Button size="lg" className="w-full sm:w-auto bg-[#8B5CF6] hover:bg-[#7C3AED] text-white text-base font-extrabold px-8 py-3.5">
                Explore Open Roles
              </Button>
            </Link>
            <Link href="/ai-chat">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto bg-[#0F172A] hover:bg-[#1E293B] text-white text-base font-extrabold px-8 py-3.5">
                Launch AI Coach
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Bento Grid Showcase scaling to 1440px */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8"
        >
          {/* Bento Card 1: AI Agentic Matching */}
          <div className="md:col-span-7 bg-[#FAFAFA] border border-[#E5E7EB] rounded-2xl p-8 md:p-12 relative overflow-hidden hover:border-[#CBD5E1] transition-all group flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-black uppercase tracking-wider text-[#8B5CF6]">Agentic AI Engine</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] mb-4 group-hover:text-[#8B5CF6] transition-colors">
                Intent-Driven Job Matching
              </h3>
              <p className="text-base text-[#64748B] leading-relaxed max-w-xl mb-8 font-medium">
                Unlike legacy keyword filters, our LLM agent understands project context, system architecture depth, and career trajectory alignment.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-extrabold">
              <span className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[#0F172A]">94% Skill Accuracy</span>
              <span className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[#8B5CF6]">Real-Time Scoring</span>
              <span className="bg-white border border-[#E5E7EB] px-4 py-2 rounded-lg text-[#8B5CF6]">Zero Bias</span>
            </div>
          </div>

          {/* Bento Card 2: ATS Resume Analyzer */}
          <div className="md:col-span-5 bg-white border border-[#E5E7EB] rounded-2xl p-8 md:p-12 hover:border-[#8B5CF6]/50 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-black text-[#8B5CF6] bg-white px-3.5 py-1 rounded-lg border border-[#E5E7EB]">AI Feature</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">ATS Resume Optimizer</h3>
              <p className="text-sm sm:text-base text-[#64748B] leading-relaxed mb-8 font-medium">
                Upload your resume PDF and instantly receive AI-powered feedback on keyword density, formatting, and role recommendations.
              </p>
            </div>
            <Link href="/resume">
              <Button size="sm" variant="ai" className="w-full rounded-xl text-xs py-3 font-extrabold">
                Check Resume Score
              </Button>
            </Link>
          </div>

          {/* Bento Card 3: Metrics Banner */}
          <div className="md:col-span-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
            <div className="text-3xl font-black text-[#0F172A]">2,500+</div>
            <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-0.5">Active Verified Jobs</div>
          </div>

          {/* Bento Card 4: Employer Match */}
          <div className="md:col-span-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
            <div className="text-3xl font-black text-[#0F172A]">100%</div>
            <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-0.5">Verified Companies</div>
          </div>

          {/* Bento Card 5: Fast Track Applications */}
          <div className="md:col-span-4 bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
            <div className="text-3xl font-black text-[#0F172A]">Instant</div>
            <div className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-0.5">AI Cover Letter Gen</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
