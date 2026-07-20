"use client";

import { Cpu, XCircle } from "lucide-react";

interface ExploreJobsFilterProps {
  agenticSearch: boolean;
  setAgenticSearch: (val: boolean) => void;
  jobType: string;
  setJobType: (val: string) => void;
  workMode: string;
  setWorkMode: (val: string) => void;
  searchQuery: string;
  locationQuery: string;
  onClearFilters: () => void;
  showFilters: boolean;
}

export function ExploreJobsFilter({
  agenticSearch,
  setAgenticSearch,
  jobType,
  setJobType,
  workMode,
  setWorkMode,
  searchQuery,
  locationQuery,
  onClearFilters,
  showFilters,
}: ExploreJobsFilterProps) {
  const hasActiveFilters = Boolean(jobType || workMode || searchQuery || locationQuery);

  return (
    <aside className={`lg:w-72 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-7 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#8B5CF6]" /> AI Search Mode
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-red-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <XCircle className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>

        <label className="flex items-center gap-3 cursor-pointer bg-[#F3E8FF] p-4 rounded-2xl border border-[#8B5CF6]/30">
          <input
            type="checkbox"
            className="rounded border-[#8B5CF6] text-[#8B5CF6] focus:ring-[#8B5CF6] h-4 w-4"
            checked={agenticSearch}
            onChange={(e) => setAgenticSearch(e.target.checked)}
          />
          <div>
            <span className="text-xs font-black text-[#8B5CF6] flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5" /> Agentic AI Matching
            </span>
            <span className="text-[10px] text-[#64748B] block font-semibold mt-0.5">Understands intent & skill context</span>
          </div>
        </label>

        <div className="border-t border-[#E5E7EB] pt-5">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] mb-4">Job Type</h3>
          <div className="space-y-3">
            {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer text-sm font-extrabold text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={jobType === type}
                  onChange={(e) => setJobType(e.target.checked ? type : "")}
                  className="rounded border-[#E5E7EB] text-[#8B5CF6] focus:ring-[#8B5CF6] h-4.5 w-4.5"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] pt-5">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] mb-4">Work Mode</h3>
          <div className="space-y-3">
            {["Remote", "On-site", "Hybrid"].map((mode) => (
              <label key={mode} className="flex items-center gap-3 cursor-pointer text-sm font-extrabold text-[#0F172A]">
                <input
                  type="checkbox"
                  checked={workMode === mode}
                  onChange={(e) => setWorkMode(e.target.checked ? mode : "")}
                  className="rounded border-[#E5E7EB] text-[#8B5CF6] focus:ring-[#8B5CF6] h-4.5 w-4.5"
                />
                <span>{mode}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
