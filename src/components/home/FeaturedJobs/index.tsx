"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Card, CardContent, CardFooter } from "@/components/common/Card";
import { MapPin, Clock, DollarSign, Sparkles, ArrowRight } from "lucide-react";
import { useGetJobsQuery } from "@/redux/api/jobsApi";

export function FeaturedJobs() {
  const { data: jobsResponse, isLoading } = useGetJobsQuery({ agenticSearch: true });
  const jobs = jobsResponse?.data?.slice(0, 4) || [];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Real-Time Database Jobs</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Top AI-Matched Active Jobs</h2>
            <p className="mt-2 text-muted-foreground">Opportunities curated based on real-time market trends and AI matching.</p>
          </div>
          <Link href="/explore-jobs">
            <Button variant="outline" className="gap-2">
              View All Jobs <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-card border rounded-3xl p-6 h-[260px] animate-pulse space-y-4">
                <div className="h-10 w-10 bg-muted rounded-xl"></div>
                <div className="h-5 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded-xl w-full mt-auto"></div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 bg-card border rounded-3xl space-y-3">
            <p className="font-bold text-base">No active jobs found in database</p>
            <p className="text-xs text-muted-foreground">Post a job as an employer or explore jobs catalog.</p>
            <Link href="/explore-jobs" className="inline-block mt-2">
              <Button size="sm">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {jobs.map((job) => (
              <Card key={job._id} className="flex flex-col hover:shadow-xl transition-all border-border/60 hover:border-primary/50 group">
                <CardContent className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center font-bold text-primary text-xl group-hover:bg-primary group-hover:text-white transition-colors">
                      {job.employerId?.name?.charAt(0) || "C"}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600 border border-emerald-500/20">
                      {job.workMode || "Remote"}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{job.title}</h3>
                  <p className="text-muted-foreground text-xs font-semibold mb-4">{job.employerId?.name || "Verified Employer"}</p>

                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> {job.location || "Flexible"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5 text-indigo-500 shrink-0" /> {job.jobType}
                    </div>
                    {job.salaryRange && (
                      <div className="flex items-center gap-2 font-bold text-emerald-600">
                        <DollarSign className="h-3.5 w-3.5 shrink-0" /> {job.salaryRange}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-6 pt-0">
                  <Link href={`/jobs/${job._id}`} className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl">View Details</Button>
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
