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
    <div className="mb-12 space-y-6 text-center max-w-3xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/20">
        <Cpu className="h-4 w-4" />
        <span>Agentic AI Powered Job Search</span>
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight text-[#1E293B]">Find Your Next High-Impact Career</h1>
      <p className="text-[#64748B] text-base font-medium leading-relaxed">
        Discover active job opportunities matched to your technical background using Groq Llama 3.3 70B AI.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mx-auto pt-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-[#64748B]" />
          <Input
            placeholder="Job title, keywords, or skills..."
            className="pl-11"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative flex-1 sm:max-w-[220px]">
          <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-[#64748B]" />
          <Input
            placeholder="City or Remote..."
            className="pl-11"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>
        <Button size="lg" onClick={onSearch} className="rounded-2xl px-8 h-[44px] bg-[#2563EB] hover:bg-[#1D4ED8] font-extrabold text-white">
          Search
        </Button>
      </div>
    </div>
  );
}
