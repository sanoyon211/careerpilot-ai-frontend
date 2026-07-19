"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, ArrowRight, ShieldCheck, Zap } from "lucide-react";
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
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      {/* Apple-style subtle Radial Glow */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-gradient-to-b from-primary/15 via-primary/5 to-transparent blur-[140px]" />

      <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
        {/* Apple Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-secondary text-foreground border border-border/60 mb-8 shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Groq Llama 3.3 70B AI Engine</span>
          {totalJobsCount > 0 && (
            <span className="ml-1 bg-primary text-white font-bold px-2.5 py-0.5 rounded-full text-[10px]">
              {totalJobsCount} Active Roles
            </span>
          )}
        </motion.div>

        {/* Apple Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-black tracking-tight text-5xl sm:text-7xl md:text-8xl leading-[1.05] text-foreground"
        >
          Career Copilot. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground via-primary to-primary/80">
            Powered by Groq AI.
          </span>
        </motion.h1>

        {/* Apple Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal"
        >
          Match with top tech positions worldwide, score ATS resume compatibility, and accelerate your career trajectory effortlessly.
        </motion.p>

        {/* Apple Search Input */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSearchSubmit}
          className="mt-10 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3 p-2 rounded-full bg-card border border-border/80 shadow-2xl backdrop-blur-xl"
        >
          <div className="relative flex-1 w-full pl-3">
            <Search className="absolute left-5 top-3.5 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Job title, skill (React, Node, Groq, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm font-medium border-none bg-transparent focus:outline-none focus:ring-0 text-foreground"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto px-8 font-semibold bg-primary hover:bg-primary/90 text-white rounded-full h-[46px] shadow-sm">
            Search Jobs <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        {/* Trending Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground"
        >
          <span className="text-foreground font-semibold">Popular:</span>
          {["Full Stack", "Frontend React", "Backend Cloud", "AI Engineer"].map((tag) => (
            <Link
              key={tag}
              href={`/explore-jobs?searchTerm=${encodeURIComponent(tag)}`}
              className="hover:text-primary transition-colors px-3 py-1 rounded-full bg-secondary text-foreground text-[11px] font-medium"
            >
              {tag}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
