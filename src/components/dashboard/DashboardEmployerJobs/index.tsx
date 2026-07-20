"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Legend } from "recharts";

interface DashboardEmployerJobsProps {
  employerJobs: any[];
  chartData?: {
    viewsData: any[];
    statusData: any[];
  };
}

export function DashboardEmployerJobs({ employerJobs, chartData }: DashboardEmployerJobsProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-extrabold text-[#1E293B]">Your Active Job Postings</h2>
        <Link href="/manage-jobs" className="text-xs font-extrabold text-[#8B5CF6] hover:underline">
          Manage All Jobs
        </Link>
      </div>

      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl overflow-hidden mb-8">
        <div className="divide-y divide-[#E5E7EB]">
          {employerJobs.length > 0 ? (
            employerJobs.map((job: any) => (
              <div key={job._id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-[#F3E8FF] text-[#8B5CF6] font-extrabold flex items-center justify-center text-base border border-[#8B5CF6]/20 shrink-0">
                    {job.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#1E293B]">{job.title}</h3>
                    <p className="text-xs font-semibold text-[#64748B] mt-0.5">{job.jobType} • {job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-lg bg-white text-[#8B5CF6] border border-[#E5E7EB]">
                    {job.applicantsCount || 0} Applicants
                  </span>
                  <Link href={`/manage-jobs/${job._id}/applications`}>
                    <Button size="sm" variant="outline" className="text-xs rounded-xl font-bold">
                      Review Candidates
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-10 text-center text-xs text-[#64748B] font-semibold">
              You haven't posted any jobs yet. Click "Post New Job" above.
            </div>
          )}
        </div>
      </div>

      {chartData && (
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
            <h3 className="font-extrabold text-base text-[#1E293B] mb-6">Job Views & Applications</h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} stroke="#64748B" />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} stroke="#64748B" />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "none" }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="applications" stroke="#8B5CF6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8">
            <h3 className="font-extrabold text-base text-[#1E293B] mb-6">Candidate Pipeline Breakdown</h3>
            <div className="h-60 w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E5E7EB", boxShadow: "none" }} />
                  <Legend iconType="circle" verticalAlign="bottom" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
