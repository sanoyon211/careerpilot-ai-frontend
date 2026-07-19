"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { MapPin, Clock, DollarSign, Zap, ArrowRight, Briefcase } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function FeaturedJobs() {
  const { data: jobsResponse, isLoading } = useGetJobsQuery({ agenticSearch: true });
  const jobs = jobsResponse?.data?.slice(0, 4) || [];

  return (
    <section className="py-24 bg-background border-t border-border/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>Real-Time Positions</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">Featured Bento Positions</h2>
            <p className="mt-2 text-muted-foreground text-sm font-normal">Hand-picked active positions matched in real time.</p>
          </div>
          <Link href="/explore-jobs">
            <Button variant="outline" className="gap-2 rounded-full font-semibold text-xs border-border bg-card text-foreground">
              Explore All Positions <ArrowRight className="h-3.5 w-3.5 text-primary" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-border rounded-[24px] p-6 h-[260px] animate-pulse space-y-4">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-full w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-card border border-border rounded-[24px] space-y-3">
            <p className="font-semibold text-base text-foreground">No active jobs found in database</p>
            <p className="text-xs text-muted-foreground">Post a job as an employer or explore the full catalog.</p>
            <Link href="/explore-jobs" className="inline-block mt-2">
              <Button size="sm" className="rounded-full bg-primary text-white">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} className="flex flex-col bg-card border border-border rounded-[24px] overflow-hidden group">
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                      {job.employerId?.name?.charAt(0) || "C"}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3.5 py-1 text-[11px] font-bold border border-primary/20">
                      {job.workMode || "Remote"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors text-foreground tracking-tight">{job.title}</h3>
                  <p className="text-muted-foreground text-xs font-normal mb-5">{job.employerId?.name || "Verified Employer"}</p>

                  <div className="space-y-2.5 text-xs text-muted-foreground font-normal">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" /> {job.location || "Flexible"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-primary shrink-0" /> {job.jobType}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/jobs/${job._id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-semibold text-xs py-2.5 shadow-sm">
                      View Position
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
