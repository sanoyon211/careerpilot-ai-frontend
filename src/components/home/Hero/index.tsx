"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, Building2, UserCheck, Briefcase } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const { data: jobsResponse } = useGetJobsQuery({ agenticSearch: true });
  const totalJobsCount = jobsResponse?.data?.length || 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore-jobs?searchTerm=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/explore-jobs");
    }
  };

  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-24 border-b border-border/50">
      {/* Soft Rose Glow Background */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[600px] w-[1000px] rounded-full bg-gradient-to-b from-rose-500/10 via-pink-500/5 to-transparent blur-[120px]" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
        {/* Main Wellfound Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/50 text-rose-600 border border-rose-200 dark:border-rose-900"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>The #1 AI-Powered Talent & Career Platform</span>
            {totalJobsCount > 0 && (
              <span className="bg-rose-600 text-white px-2 py-0.5 rounded-full text-[10px] font-extrabold ml-1">
                {totalJobsCount} Openings
              </span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05]"
          >
            Where great companies <br />
            <span className="font-serif-italic text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 font-normal">
              meet great people.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted-foreground font-normal max-w-2xl mx-auto leading-relaxed"
          >
            Match with top tech roles worldwide, calculate ATS resume scores, and let recruiters reach out directly with AI precision.
          </motion.p>
        </div>

        {/* Wellfound Iconic Dual-Card Section */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: FOR RECRUITERS (Dark Obsidian Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#0A0D14] text-white p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col justify-between relative overflow-hidden group hover:border-zinc-700 transition-all"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-bold tracking-widest text-rose-400 uppercase">
                FOR RECRUITERS
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mt-3 text-white tracking-tight">
                Find your <span className="font-serif-italic text-rose-400 font-normal">next hire.</span>
              </h3>
              <p className="mt-3 text-zinc-400 text-sm leading-relaxed max-w-sm">
                Post jobs for free and connect directly with vetted engineers, designers, and AI specialists.
              </p>

              <div className="mt-6">
                <Link href="/add-job">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold shadow-lg shadow-rose-500/30 gap-2">
                    Post a job <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Candidate Mock Preview Badge */}
            <div className="mt-10 pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-rose-400" />
                <span className="font-semibold text-zinc-200">10,000+ Active Tech Candidates</span>
              </div>
              <span className="text-emerald-400 font-bold bg-emerald-950/80 border border-emerald-800 px-2 py-0.5 rounded-full text-[10px]">
                Ready to Hire
              </span>
            </div>
          </motion.div>

          {/* Card 2: FOR JOB SEEKERS (Soft Blush Card) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#FFF0F4] dark:bg-rose-950/30 text-zinc-900 dark:text-zinc-100 p-8 md:p-10 rounded-3xl border border-rose-200 dark:border-rose-900/60 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-rose-300 transition-all"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <span className="text-xs font-bold tracking-widest text-rose-600 dark:text-rose-400 uppercase">
                FOR JOB SEEKERS
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold mt-3 text-zinc-900 dark:text-white tracking-tight">
                Find your <span className="font-serif-italic text-rose-600 dark:text-rose-400 font-normal">next job.</span>
              </h3>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed max-w-sm">
                Apply directly to top startups & tech teams with transparent salary ranges and AI resume matching.
              </p>

              <div className="mt-6">
                <Link href="/explore-jobs">
                  <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold shadow-lg shadow-rose-500/30 gap-2">
                    Browse all jobs <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Job Seekers Mock Feature Badge */}
            <div className="mt-10 pt-6 border-t border-rose-200/80 dark:border-rose-900/40 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-rose-600" />
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">Direct Application & ATS Match Score</span>
              </div>
              <span className="text-rose-600 font-bold bg-rose-100 dark:bg-rose-900/80 border border-rose-200 dark:border-rose-800 px-2 py-0.5 rounded-full text-[10px]">
                No Middlemen
              </span>
            </div>
          </motion.div>
        </div>

        {/* Global Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSearchSubmit}
          className="mt-12 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 p-2.5 rounded-full bg-card border border-rose-100 dark:border-zinc-800 shadow-2xl backdrop-blur-xl"
        >
          <div className="relative flex-1 w-full pl-3">
            <Search className="absolute left-4 top-3.5 h-4.5 w-4.5 text-rose-500" />
            <input
              type="text"
              placeholder="Search by job title, skill (React, Node, AI, Remote)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-sm font-medium border-none bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto px-8 font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-full h-[48px] shadow-md shadow-rose-500/20">
            Search Jobs <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </motion.form>
      </div>
    </section>
  );
}

