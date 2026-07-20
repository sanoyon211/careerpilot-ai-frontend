"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Filter } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";
import { ExploreJobsHeader } from "@/components/explore-jobs/ExploreJobsHeader";
import { ExploreJobsFilter } from "@/components/explore-jobs/ExploreJobsFilter";
import { ExploreJobsList } from "@/components/explore-jobs/ExploreJobsList";

const JOBS_PER_PAGE = 6;

export default function ExploreJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [jobType, setJobType] = useState<string>("");
  const [workMode, setWorkMode] = useState<string>("");
  const [agenticSearch, setAgenticSearch] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { data: jobsResponse, isLoading } = useGetJobsQuery({
    searchTerm: searchQuery || undefined,
    jobType: jobType || undefined,
    workMode: workMode || undefined,
    agenticSearch,
  });

  let jobs = jobsResponse?.data || [];

  if (locationQuery.trim()) {
    jobs = jobs.filter((job) =>
      job.location?.toLowerCase().includes(locationQuery.toLowerCase())
    );
  }

  const totalJobs = jobs.length;
  const totalPages = Math.max(1, Math.ceil(totalJobs / JOBS_PER_PAGE));
  const currentPageClamped = Math.min(currentPage, totalPages);
  const paginatedJobs = jobs.slice(
    (currentPageClamped - 1) * JOBS_PER_PAGE,
    currentPageClamped * JOBS_PER_PAGE
  );

  const clearAllFilters = () => {
    setSearchQuery("");
    setLocationQuery("");
    setJobType("");
    setWorkMode("");
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <ExploreJobsHeader
          searchQuery={searchQuery}
          setSearchQuery={(val) => {
            setSearchQuery(val);
            setCurrentPage(1);
          }}
          locationQuery={locationQuery}
          setLocationQuery={(val) => {
            setLocationQuery(val);
            setCurrentPage(1);
          }}
        />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" /> Filters
              </span>
              <span>{showFilters ? "Hide" : "Show"}</span>
            </Button>
          </div>

          <ExploreJobsFilter
            agenticSearch={agenticSearch}
            setAgenticSearch={setAgenticSearch}
            jobType={jobType}
            setJobType={(val) => {
              setJobType(val);
              setCurrentPage(1);
            }}
            workMode={workMode}
            setWorkMode={(val) => {
              setWorkMode(val);
              setCurrentPage(1);
            }}
            searchQuery={searchQuery}
            locationQuery={locationQuery}
            onClearFilters={clearAllFilters}
            showFilters={showFilters}
          />

          <ExploreJobsList
            jobs={paginatedJobs}
            isLoading={isLoading}
            totalJobs={totalJobs}
            currentPage={currentPageClamped}
            totalPages={totalPages}
            agenticSearch={agenticSearch}
            onPageChange={setCurrentPage}
            onClearFilters={clearAllFilters}
          />
        </div>
      </div>
    </div>
  );
}
