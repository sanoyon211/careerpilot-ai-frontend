"use client"

import { Building2, MapPin, DollarSign, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/common/Button"
import Link from "next/link"

const APPLIED_JOBS = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechCorp Inc.", location: "Remote", salary: "$120k-$160k", appliedDate: "2 days ago", status: "In Review", statusColor: "text-blue-600 bg-blue-500/10" },
  { id: 2, title: "React Developer", company: "WebWorks Solutions", location: "New York, NY", salary: "$90k-$130k", appliedDate: "1 week ago", status: "Interview", statusColor: "text-purple-600 bg-purple-500/10" },
  { id: 3, title: "Full Stack Engineer", company: "DataSystems", location: "Austin, TX", salary: "$110k-$140k", appliedDate: "2 weeks ago", status: "Applied", statusColor: "text-gray-600 bg-gray-500/10" },
  { id: 4, title: "UI/UX Developer", company: "Creative Minds", location: "Remote", salary: "$95k-$125k", appliedDate: "1 month ago", status: "Rejected", statusColor: "text-red-600 bg-red-500/10" },
]

export default function AppliedJobsPage() {
  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Applied Jobs</h1>
        <p className="text-muted-foreground mt-1">Track the status of your job applications.</p>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        {/* Header/Filters */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/10">
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
            <Button variant="default" size="sm" className="rounded-full">All (4)</Button>
            <Button variant="outline" size="sm" className="rounded-full">In Review (1)</Button>
            <Button variant="outline" size="sm" className="rounded-full">Interview (1)</Button>
            <Button variant="outline" size="sm" className="rounded-full">Offers (0)</Button>
          </div>
          <select className="border rounded-md px-3 py-1.5 text-sm w-full sm:w-auto">
            <option>Newest First</option>
            <option>Oldest First</option>
          </select>
        </div>

        {/* List */}
        <div className="divide-y">
          {APPLIED_JOBS.map(job => (
            <div key={job.id} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="flex items-start gap-4 flex-1">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground shrink-0 border">
                    {job.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors cursor-pointer">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> {job.company}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {job.location}</span>
                      <span className="flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {job.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-6 md:w-1/3 border-t md:border-0 pt-4 md:pt-0">
                  <div className="flex flex-col items-start md:items-end gap-1">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.statusColor}`}>
                      {job.status}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Applied {job.appliedDate}
                    </span>
                  </div>
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
