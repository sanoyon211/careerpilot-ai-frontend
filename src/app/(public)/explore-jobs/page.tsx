"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Sparkles } from "lucide-react"
import { useGetJobsQuery } from "@/redux/api/jobsApi"

export default function ExploreJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [jobType, setJobType] = useState<string>("")
  const [workMode, setWorkMode] = useState<string>("")
  const [agenticSearch, setAgenticSearch] = useState(true)

  const { data: jobsResponse, isLoading, isError } = useGetJobsQuery({
    searchTerm: searchQuery || undefined,
    jobType: jobType || undefined,
    workMode: workMode || undefined,
    agenticSearch
  })

  const jobs = jobsResponse?.data || []

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        {/* Header & Search */}
        <div className="mb-12 space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight">Find Your Next Big Opportunity</h1>
          <p className="text-muted-foreground text-lg">
            Discover thousands of jobs perfectly matched to your skills using our Agentic AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto pt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Job title, keywords, or company" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative flex-1 sm:max-w-[200px]">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Location" 
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-card focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
              />
            </div>
            <Button size="lg" className="rounded-xl px-8 h-[50px]">Search</Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <Button variant="outline" className="w-full flex items-center gap-2" onClick={() => setShowFilters(!showFilters)}>
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>

          {/* Sidebar Filters */}
          <aside className={`lg:w-64 shrink-0 space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-card border rounded-2xl p-6 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" /> AI Match
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="rounded border-input text-primary focus:ring-primary" 
                    checked={agenticSearch}
                    onChange={(e) => setAgenticSearch(e.target.checked)}
                  />
                  <span className="text-sm font-semibold text-primary">✨ Agentic AI Search</span>
                </label>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Job Type</h3>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="jobType"
                        checked={jobType === type}
                        onChange={(e) => setJobType(e.target.checked ? type : "")}
                        className="rounded border-input text-primary focus:ring-primary" 
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Work Mode</h3>
                <div className="space-y-2">
                  {["Remote", "On-site", "Hybrid"].map(mode => (
                    <label key={mode} className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        name="workMode"
                        checked={workMode === mode}
                        onChange={(e) => setWorkMode(e.target.checked ? mode : "")}
                        className="rounded border-input text-primary focus:ring-primary" 
                      />
                      <span className="text-sm">{mode}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Salary Range</h3>
                <input type="range" min="0" max="200" className="w-full accent-primary" />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>$0k</span>
                  <span>$200k+</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Job Listings Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground text-sm">Showing <strong>8</strong> jobs matching your criteria</p>
              <select className="border bg-card rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Most Relevant (AI)</option>
                <option>Newest</option>
                <option>Highest Salary</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {isLoading && (
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-card border rounded-2xl p-6 flex flex-col h-[350px] animate-pulse">
                    <div className="h-12 w-12 rounded-lg bg-muted mb-4"></div>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
                    <div className="space-y-3 mb-6 flex-1">
                      <div className="h-4 bg-muted rounded w-full"></div>
                      <div className="h-4 bg-muted rounded w-5/6"></div>
                      <div className="h-4 bg-muted rounded w-4/6"></div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      <div className="h-6 w-16 bg-muted rounded-md"></div>
                      <div className="h-6 w-16 bg-muted rounded-md"></div>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t">
                      <div className="h-4 w-20 bg-muted rounded"></div>
                      <div className="h-8 w-24 bg-muted rounded-lg"></div>
                    </div>
                  </div>
                ))
              )}
              {!isLoading && jobs.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No jobs found matching your criteria.
                </div>
              )}
              {jobs.map((job) => (
                <div key={job._id} className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary/50 group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {job.employerId?.name?.charAt(0) || "C"}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-1">{job.employerId?.name || "Company"}</p>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <MapPin className="h-4 w-4 shrink-0" /> <span className="line-clamp-1">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Briefcase className="h-4 w-4 shrink-0" /> {job.jobType}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center text-sm text-muted-foreground gap-2">
                        <DollarSign className="h-4 w-4 shrink-0" /> {job.salaryRange}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                      {job.category}
                    </span>
                    <span className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                      {job.workMode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <span className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock className="h-3.5 w-3.5" /> {new Date(job.createdAt).toLocaleDateString()}
                    </span>
                    <Link href={`/jobs/${job._id}`}>
                      <Button variant="default" size="sm" className="rounded-lg">View Details</Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="default" size="sm" className="w-8 h-8 p-0">1</Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0">2</Button>
                <Button variant="outline" size="sm" className="w-8 h-8 p-0">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
