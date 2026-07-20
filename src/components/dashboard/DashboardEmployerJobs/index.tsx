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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#1E293B]">Your Active Job Postings</h2>
        <Link href="/manage-jobs" className="text-xs font-extrabold text-[#2563EB] hover:underline">
          Manage All Jobs
        </Link>
      </div>

      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] overflow-hidden shadow-xs">
        <div className="divide-y divide-[#E2E8F0]">
          {employerJobs.length > 0 ? (
            employerJobs.map((job: any) => (
              <div key={job._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 text-[#2563EB] font-extrabold flex items-center justify-center text-sm border border-[#2563EB]/20 shrink-0">
                    {job.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-[#1E293B]">{job.title}</h3>
                    <p className="text-xs font-semibold text-[#64748B]">{job.jobType} • {job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-white text-[#2563EB] border border-[#E2E8F0]">
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
            <div className="p-8 text-center text-xs text-[#64748B] font-semibold">
              You haven't posted any jobs yet. Click "Post New Job" above.
            </div>
          )}
        </div>
      </div>

      {chartData && (
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-[#1E293B] mb-4">Job Views & Applications</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} stroke="#64748B" />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} stroke="#64748B" />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="views" stroke="#2563EB" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="applications" stroke="#8B5CF6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-6 shadow-xs">
            <h3 className="font-extrabold text-base text-[#1E293B] mb-4">Candidate Pipeline Breakdown</h3>
            <div className="h-56 w-full flex justify-center">
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
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }} />
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
