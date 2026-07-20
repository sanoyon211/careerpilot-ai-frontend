"use client";

import { useGetJobsQuery } from "@/redux/api/jobsApi";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutStats } from "@/components/about/AboutStats";
import { AboutMission } from "@/components/about/AboutMission";
import { AboutValues } from "@/components/about/AboutValues";

export default function AboutPage() {
  const { data: jobsResponse } = useGetJobsQuery({ agenticSearch: true });
  const realJobsCount = jobsResponse?.data?.length || 0;

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <AboutHero />
        <AboutStats realJobsCount={realJobsCount} />
        <AboutMission />
        <AboutValues />
      </div>
    </div>
  );
}
