"use client";

import { Cpu, Search, MapPin } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

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
    <div className="mb-12 space-y-6 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/30">
        <Cpu className="h-4 w-4" />
        <span>Agentic AI Powered Job Search</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A]">Find Your Next High-Impact Career</h1>
      <p className="text-[#64748B] text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
        Discover active job opportunities matched to your technical background using Groq Llama 3.3 70B AI.
      </p>

      <div className="flex flex-col sm:flex-row gap-3.5 max-w-4xl mx-auto pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-[#64748B]" />
          <Input
            placeholder="Job title, keywords, or skills..."
            className="pl-12 h-12 text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative flex-1 sm:max-w-[260px]">
          <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-[#64748B]" />
          <Input
            placeholder="City or Remote..."
            className="pl-12 h-12 text-base"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <Button size="lg" onClick={onSearch} className="rounded-2xl px-9 h-12 bg-[#8B5CF6] hover:bg-[#7C3AED] font-extrabold text-white shadow-md shadow-purple-600/20">
          Search
        </Button>
      </div>
    </div>
  );
}
