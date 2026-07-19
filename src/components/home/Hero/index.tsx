"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, Sparkles, MapPin, ArrowRight } from "lucide-react";
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
    <section className="relative overflow-hidden bg-background pt-20 pb-28">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[350px] w-[350px] rounded-full bg-primary opacity-15 blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-6"
        >
          <Sparkles className="h-4 w-4" />
          <span>Groq Llama 3.3 70B AI Career Engine</span>
          {totalJobsCount > 0 && (
            <span className="ml-1 bg-primary text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
              {totalJobsCount} Active Jobs
            </span>
          )}
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl font-extrabold tracking-tight text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-600 to-blue-600">Career Pilot</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          Navigate your career with intelligent Groq AI job matching, ATS resume scoring, and custom growth roadmaps. Let AI accelerate your career.
        </motion.p>

        {/* Interactive Dynamic Search Bar */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSearchSubmit}
          className="mt-8 max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2.5 p-2 rounded-2xl bg-card border shadow-xl"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by job title, skill (React, Node, AI)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm border-none bg-transparent focus:outline-none focus:ring-0"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto px-7 rounded-xl font-bold bg-primary hover:bg-primary/90 gap-2">
            Search Jobs <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-muted-foreground"
        >
          <span>Popular searches:</span>
          <Link href="/explore-jobs?searchTerm=Full+Stack" className="hover:text-primary underline-offset-4 hover:underline">
            Full Stack
          </Link>
          <span>•</span>
          <Link href="/explore-jobs?searchTerm=Frontend" className="hover:text-primary underline-offset-4 hover:underline">
            Frontend React
          </Link>
          <span>•</span>
          <Link href="/explore-jobs?searchTerm=Backend" className="hover:text-primary underline-offset-4 hover:underline">
            Node.js Backend
          </Link>
          <span>•</span>
          <Link href="/explore-jobs?searchTerm=AI" className="hover:text-primary underline-offset-4 hover:underline">
            AI Engineer
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
