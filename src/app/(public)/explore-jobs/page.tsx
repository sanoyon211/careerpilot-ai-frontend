"use client";

import { useState } from "react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";
import { ExploreJobsHeader } from "@/components/explore-jobs/ExploreJobsHeader";
import { ExploreJobsFilter } from "@/components/explore-jobs/ExploreJobsFilter";
import { ExploreJobsList } from "@/components/explore-jobs/ExploreJobsList";
import { SlidersHorizontal } from "lucide-react";

export default function ExploreJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [jobType, setJobType] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [agenticSearch, setAgenticSearch] = useState(true);
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
    agenticSearch,
  };

  if (searchQuery) queryParams.search = searchQuery;
  if (locationQuery) queryParams.location = locationQuery;
  if (jobType) queryParams.jobType = jobType;
  if (workMode) queryParams.workMode = workMode;

  const { data: jobsResponse, isLoading } = useGetJobsQuery(queryParams);

  const jobs = jobsResponse?.data || [];
  const meta = jobsResponse?.meta || { total: 0, page: 1, limit: 12, totalPages: 1 };

  const handleClearFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setJobType("");
    setWorkMode("");
    setPage(1);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20 space-y-8">
      <ExploreJobsHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        locationQuery={locationQuery}
        setLocationQuery={setLocationQuery}
        onSearch={() => setPage(1)}
      />

      <div className="lg:hidden flex justify-end">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 text-xs font-extrabold bg-[#FAFAFA] border border-[#E5E7EB] px-4 py-2.5 rounded-lg text-[#0F172A]"
        >
          <SlidersHorizontal className="h-4 w-4 text-[#8B5CF6]" />
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        <ExploreJobsFilter
          agenticSearch={agenticSearch}
          setAgenticSearch={setAgenticSearch}
          jobType={jobType}
          setJobType={setJobType}
          workMode={workMode}
          setWorkMode={setWorkMode}
          searchQuery={searchQuery}
          locationQuery={locationQuery}
          onClearFilters={handleClearFilters}
          showFilters={showFilters}
        />

        <ExploreJobsList
          jobs={jobs}
          isLoading={isLoading}
          totalJobs={meta.total}
          currentPage={meta.page}
          totalPages={meta.totalPages}
          agenticSearch={agenticSearch}
          onPageChange={(p) => setPage(p)}
          onClearFilters={handleClearFilters}
        />
      </div>
    </div>
  );
}
