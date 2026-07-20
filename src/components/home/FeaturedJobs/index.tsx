"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { MapPin, DollarSign, Zap, ArrowRight, Briefcase } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function FeaturedJobs() {
  const { data: jobsResponse, isLoading } = useGetJobsQuery({ agenticSearch: true });
  const jobs = jobsResponse?.data?.slice(0, 4) || [];

  return (
    <section className="py-24 bg-background border-t border-border/50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-900 mb-3">
              <Zap className="h-3.5 w-3.5 text-rose-600" />
              <span>Real-Time Positions</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Featured <span className="font-serif-italic text-rose-600 font-normal">tech positions.</span>
            </h2>
            <p className="mt-2 text-muted-foreground text-sm font-normal">Hand-picked active positions matched in real time.</p>
          </div>
          <Link href="/explore-jobs">
            <Button variant="outline" className="gap-2 rounded-full font-bold text-xs border-zinc-300 dark:border-zinc-700 hover:border-rose-300">
              Explore All Jobs <ArrowRight className="h-3.5 w-3.5 text-rose-600" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border border-rose-100 dark:border-zinc-800 rounded-3xl p-6 h-[260px] animate-pulse space-y-4">
                <div className="h-10 w-10 bg-muted rounded-full"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-full w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-card border border-rose-100 dark:border-zinc-800 rounded-3xl space-y-3">
            <p className="font-bold text-base text-foreground">No active jobs found in database</p>
            <p className="text-xs text-muted-foreground">Post a job as a recruiter or explore the full catalog.</p>
            <Link href="/explore-jobs" className="inline-block mt-2">
              <Button size="sm" className="rounded-full bg-rose-600 text-white font-bold">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} className="flex flex-col bg-card border border-rose-100 dark:border-zinc-800 rounded-3xl overflow-hidden group hover:border-rose-300 transition-all hover:shadow-xl">
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-5">
                    <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                      {job.employerId?.name?.charAt(0) || "C"}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 px-3 py-0.5 text-[11px] font-bold border border-rose-200 dark:border-rose-900">
                      {job.workMode || "Remote"}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-lg line-clamp-1 group-hover:text-rose-600 transition-colors text-foreground tracking-tight">{job.title}</h3>
                  <p className="text-muted-foreground text-xs font-normal mb-5">{job.employerId?.name || "Verified Employer"}</p>

                  <div className="space-y-2.5 text-xs text-muted-foreground font-normal">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-rose-500 shrink-0" /> {job.location || "Flexible"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-3.5 w-3.5 text-rose-500 shrink-0" /> {job.jobType}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 font-extrabold text-emerald-600 dark:text-emerald-400">
                        <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/jobs/${job._id}`} className="w-full">
                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white rounded-full font-bold text-xs py-2.5 shadow-md shadow-rose-500/20">
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

