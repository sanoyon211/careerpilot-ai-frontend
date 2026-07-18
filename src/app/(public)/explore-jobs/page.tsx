"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/common/Button"
import { Search, MapPin, Briefcase, DollarSign, Clock, Filter, Sparkles } from "lucide-react"

// Mock Data
const MOCK_JOBS = [
  { id: "1", title: "Senior Frontend Engineer", company: "TechCorp Inc.", location: "San Francisco, CA (Remote)", type: "Full-time", salary: "$120k - $160k", posted: "2 days ago", tags: ["React", "Next.js", "TypeScript"], isAiMatch: true },
  { id: "2", title: "Product Designer", company: "DesignHub", location: "New York, NY", type: "Full-time", salary: "$100k - $130k", posted: "1 day ago", tags: ["Figma", "UI/UX", "Prototyping"], isAiMatch: false },
  { id: "3", title: "Backend Developer", company: "DataSystems", location: "Austin, TX (Hybrid)", type: "Contract", salary: "$80 - $110 / hr", posted: "3 hours ago", tags: ["Node.js", "MongoDB", "Express"], isAiMatch: true },
  { id: "4", title: "Marketing Manager", company: "GrowthScale", location: "Remote", type: "Full-time", salary: "$90k - $120k", posted: "5 days ago", tags: ["SEO", "Content", "Strategy"], isAiMatch: false },
  { id: "5", title: "AI Research Scientist", company: "OpenAI Labs", location: "San Francisco, CA", type: "Full-time", salary: "$150k - $250k", posted: "Just now", tags: ["Python", "PyTorch", "LLMs"], isAiMatch: true },
  { id: "6", title: "DevOps Engineer", company: "CloudNet", location: "Remote", type: "Full-time", salary: "$130k - $170k", posted: "1 week ago", tags: ["AWS", "Kubernetes", "CI/CD"], isAiMatch: false },
  { id: "7", title: "iOS Developer", company: "AppWorks", location: "London, UK", type: "Full-time", salary: "£70k - £90k", posted: "4 days ago", tags: ["Swift", "iOS", "Mobile"], isAiMatch: false },
  { id: "8", title: "Data Analyst", company: "FinTech Solutions", location: "Chicago, IL", type: "Full-time", salary: "$80k - $110k", posted: "2 days ago", tags: ["SQL", "Tableau", "Python"], isAiMatch: true },
]

export default function ExploreJobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)

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
                  <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" defaultChecked />
                  <span className="text-sm">Only show AI matched jobs</span>
                </label>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Job Type</h3>
                <div className="space-y-2">
                  {["Full-time", "Part-time", "Contract", "Freelance", "Internship"].map(type => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
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
                      <input type="checkbox" className="rounded border-input text-primary focus:ring-primary" />
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

            {/* Desktop: 4 cols? The rules say "Desktop view: 4 cards per row". Let's do grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {MOCK_JOBS.map((job) => (
                <div key={job.id} className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all hover:border-primary/50 group flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      {job.company.charAt(0)}
                    </div>
                    {job.isAiMatch && (
                      <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        <Sparkles className="h-3 w-3" /> High Match
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-lg line-clamp-1 mb-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-1">{job.company}</p>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <MapPin className="h-4 w-4 shrink-0" /> <span className="line-clamp-1">{job.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <Briefcase className="h-4 w-4 shrink-0" /> {job.type}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <DollarSign className="h-4 w-4 shrink-0" /> {job.salary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.tags.map(tag => (
                      <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t">
                    <span className="flex items-center text-xs text-muted-foreground gap-1">
                      <Clock className="h-3.5 w-3.5" /> {job.posted}
                    </span>
                    <Link href={`/jobs/${job.id}`}>
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
