"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Filter,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Layers,
  XCircle,
} from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

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
        {/* Header & Search */}
        <div className="mb-12 space-y-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="h-3.5 w-3.5" />
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
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <div className="relative flex-1 sm:max-w-[220px]">
              <MapPin className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="City or Remote..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
            </div>
            <Button size="lg" className="rounded-2xl px-8 h-[50px] bg-primary hover:bg-primary/90 font-bold">
              Search
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
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

          {/* Sidebar Filters */}
          <aside className={`lg:w-64 shrink-0 space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-card border rounded-3xl p-6 space-y-6 shadow-xs">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> AI Search Mode
                </h3>
                {(jobType || workMode || searchQuery || locationQuery) && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1 font-medium"
                  >
                    <XCircle className="h-3.5 w-3.5" /> Clear
                  </button>
                )}
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer bg-primary/5 p-3 rounded-2xl border border-primary/20">
                <input
                  type="checkbox"
                  className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                  checked={agenticSearch}
                  onChange={(e) => setAgenticSearch(e.target.checked)}
                />
                <div>
                  <span className="text-xs font-bold text-primary flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Agentic AI Matching
                  </span>
                  <span className="text-[10px] text-muted-foreground block mt-0.5">Understands intent & skill context</span>
                </div>
              </label>

              <div className="border-t pt-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Job Type</h3>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Internship"].map((type) => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={jobType === type}
                        onChange={(e) => {
                          setJobType(e.target.checked ? type : "");
                          setCurrentPage(1);
                        }}
                        className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground mb-3">Work Mode</h3>
                <div className="space-y-2">
                  {["Remote", "On-site", "Hybrid"].map((mode) => (
                    <label key={mode} className="flex items-center gap-2.5 cursor-pointer text-sm font-medium">
                      <input
                        type="checkbox"
                        checked={workMode === mode}
                        onChange={(e) => {
                          setWorkMode(e.target.checked ? mode : "");
                          setCurrentPage(1);
                        }}
                        className="rounded border-input text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>{mode}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings Grid */}
          <main className="flex-1 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card border p-4 rounded-2xl shadow-xs">
              <p className="text-sm text-muted-foreground">
                Showing <strong className="text-foreground font-bold">{paginatedJobs.length}</strong> of{" "}
                <strong className="text-foreground font-bold">{totalJobs}</strong> jobs
                {agenticSearch && <span className="ml-2 text-xs text-primary font-semibold">(AI Intent Match Active)</span>}
              </p>

              <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                <span>Page {currentPageClamped} of {totalPages}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-card border rounded-3xl p-6 flex flex-col h-[320px] animate-pulse space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-muted"></div>
                    <div className="h-6 bg-muted rounded w-3/4"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                    <div className="space-y-2 pt-2 flex-1">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-4/5"></div>
                    </div>
                    <div className="h-10 bg-muted rounded-xl w-full mt-auto"></div>
                  </div>
                ))}

              {!isLoading && totalJobs === 0 && (
                <div className="col-span-full text-center py-16 bg-card border rounded-3xl space-y-3">
                  <p className="font-bold text-lg">No jobs found matching your criteria</p>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Try broadening your search query or clearing filter options.
                  </p>
                  <Button variant="outline" size="sm" onClick={clearAllFilters} className="mt-2 rounded-xl">
                    Clear Filters
                  </Button>
                </div>
              )}

              {!isLoading &&
                paginatedJobs.map((job) => (
                  <div
                    key={job._id}
                    className="bg-card border rounded-3xl p-6 hover:shadow-lg transition-all hover:border-primary/50 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary font-extrabold text-xl flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          {job.employerId?.name?.charAt(0) || "C"}
                        </div>
                        <span className="bg-slate-100 dark:bg-slate-800 text-foreground text-[11px] font-bold px-2.5 py-1 rounded-full">
                          {job.workMode || "Remote"}
                        </span>
                      </div>

                      <h3 className="font-bold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-muted-foreground text-xs font-semibold mb-4">{job.employerId?.name || "Verified Employer"}</p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                          <span className="line-clamp-1">{job.location || "Flexible"}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground gap-2">
                          <Briefcase className="h-3.5 w-3.5 shrink-0 text-indigo-500" /> {job.jobType}
                        </div>
                        {job.salaryRange && (
                          <div className="flex items-center text-xs text-emerald-600 font-semibold gap-2">
                            <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between">
                      <span className="flex items-center text-[11px] text-muted-foreground gap-1">
                        <Clock className="h-3 w-3" /> {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                      <Link href={`/jobs/${job._id}`}>
                        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white rounded-xl font-bold">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPageClamped === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className="gap-1 rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4" /> Previous
                </Button>

                {Array.from({ length: totalPages }).map((_, idx) => {
                  const pageNum = idx + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPageClamped === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-9 h-9 p-0 font-bold rounded-xl"
                    >
                      {pageNum}
                    </Button>
                  );
                })}

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPageClamped === totalPages}
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  className="gap-1 rounded-xl"
                >
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
