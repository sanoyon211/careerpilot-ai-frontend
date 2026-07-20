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
    <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 space-y-6 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-[#1E293B] flex items-center gap-2">
            <Cpu className="h-4 w-4 text-[#8B5CF6]" /> AI Search Mode
          </h3>
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="text-xs text-red-500 hover:underline flex items-center gap-1 font-bold cursor-pointer"
            >
              <XCircle className="h-3.5 w-3.5" /> Clear
            </button>
          )}
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer bg-[#F3E8FF] p-3 rounded-2xl border border-[#8B5CF6]/30">
          <input
            type="checkbox"
            className="rounded border-[#8B5CF6] text-[#8B5CF6] focus:ring-[#8B5CF6] h-4 w-4"
            checked={agenticSearch}
            onChange={(e) => setAgenticSearch(e.target.checked)}
          />
          <div>
            <span className="text-xs font-extrabold text-[#8B5CF6] flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5" /> Agentic AI Matching
            </span>
            <span className="text-[10px] text-[#64748B] block font-medium mt-0.5">Understands intent & skill context</span>
          </div>
        </label>

        <div className="border-t border-[#E2E8F0] pt-4">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] mb-3">Job Type</h3>
          <div className="space-y-2">
            {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
              <label key={type} className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-[#1E293B]">
                <input
                  type="checkbox"
                  checked={jobType === type}
                  onChange={(e) => setJobType(e.target.checked ? type : "")}
                  className="rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB] h-4 w-4"
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-[#E2E8F0] pt-4">
          <h3 className="font-extrabold text-xs uppercase tracking-wider text-[#64748B] mb-3">Work Mode</h3>
          <div className="space-y-2">
            {["Remote", "On-site", "Hybrid"].map((mode) => (
              <label key={mode} className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-[#1E293B]">
                <input
                  type="checkbox"
                  checked={workMode === mode}
                  onChange={(e) => setWorkMode(e.target.checked ? mode : "")}
                  className="rounded border-[#E2E8F0] text-[#2563EB] focus:ring-[#2563EB] h-4 w-4"
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
