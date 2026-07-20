"use client";

import { Cpu, Search, MapPin } from "lucide-react";
import { Button } from "@/components/common/Button";

interface ExploreJobsHeaderProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  locationQuery: string;
  setLocationQuery: (val: string) => void;
  onSearch?: () => void;
}

export function ExploreJobsHeader({
  searchQuery,
  setSearchQuery,
  locationQuery,
  setLocationQuery,
  onSearch,
}: ExploreJobsHeaderProps) {
  return (
    <div className="mb-12 space-y-6 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
        <Cpu className="h-3.5 w-3.5" />
        <span>Agentic AI Powered Job Search</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight">Find Your Next High-Impact Career</h1>
      <p className="text-muted-foreground text-base leading-relaxed">
        Discover active job opportunities matched to your technical background using Groq Llama 3.3 70B AI.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Job title, keywords, or skills..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative flex-1 sm:max-w-[220px]">
          <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="City or Remote..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <Button size="lg" onClick={onSearch} className="rounded-2xl px-8 h-[50px] bg-primary hover:bg-primary/90 font-bold">
          Search
        </Button>
      </div>
    </div>
  );
}
