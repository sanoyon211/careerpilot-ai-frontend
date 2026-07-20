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
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <AboutHero />
      <AboutStats realJobsCount={realJobsCount} />
      <AboutMission />
      <AboutValues />
    </div>
  );
}
