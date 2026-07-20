"use client";

import { useGetJobsQuery } from "@/redux/api/jobsApi";
import { motion } from "framer-motion";

export function Statistics() {
  const { data: jobsResponse } = useGetJobsQuery({ agenticSearch: true });
  const liveJobsCount = jobsResponse?.data?.length || 0;

  const STATS = [
    { value: `${liveJobsCount}+`, label: "Active Jobs Verified" },
    { value: "2.4M+", label: "Job Seekers Matched" },
    { value: "94%", label: "AI Precision Rate" },
    { value: "120+", label: "Global Tech Locations" },
  ];

  return (
    <section className="py-20 bg-white border-y border-[#E5E7EB]">
      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8 text-center"
            >
              <div className="text-4xl sm:text-5xl font-black text-[#8B5CF6] mb-2">{stat.value}</div>
              <div className="text-xs font-black text-[#64748B] uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
