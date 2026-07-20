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
        <h2 className="text-xl font-bold">Your Active Job Postings</h2>
        <Link href="/manage-jobs" className="text-xs font-bold text-primary hover:underline">
          Manage All Jobs
        </Link>
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden shadow-xs">
        <div className="divide-y">
          {employerJobs.length > 0 ? (
            employerJobs.map((job: any) => (
              <div key={job._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-600 font-bold flex items-center justify-center text-sm border shrink-0">
                    {job.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-foreground">{job.title}</h3>
                    <p className="text-xs text-muted-foreground font-medium">{job.jobType} • {job.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
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
            <div className="p-8 text-center text-xs text-muted-foreground font-medium">
              You haven't posted any jobs yet. Click "Post New Job" above.
            </div>
          )}
        </div>
      </div>

      {chartData && (
        <div className="grid sm:grid-cols-2 gap-6 mt-6">
          <div className="bg-card border rounded-3xl p-6 shadow-xs">
            <h3 className="font-bold text-base mb-4">Job Views & Applications</h3>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.viewsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={11} />
                  <YAxis axisLine={false} tickLine={false} fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                  <Legend iconType="circle" />
                  <Line type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-6 shadow-xs">
            <h3 className="font-bold text-base mb-4">Candidate Pipeline Breakdown</h3>
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
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
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
