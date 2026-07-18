"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Edit, Trash2, Eye, MoreVertical, PlusCircle, Search, Filter, Sparkles } from "lucide-react"
import Link from "next/link"
import { useGetEmployerJobsQuery, useDeleteJobMutation } from "@/redux/api/jobsApi"
import { toast } from "sonner"

export default function ManageJobsPage() {
  const { data: jobsResponse, isLoading, isError } = useGetEmployerJobsQuery()
  const [deleteJob] = useDeleteJobMutation()
  const postedJobs = jobsResponse?.data || []

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this job?")) {
      toast.promise(
        deleteJob(id).unwrap(),
        {
          loading: 'Deleting job...',
          success: 'Job deleted successfully',
          error: (err) => err.data?.message || 'Failed to delete job'
        }
      )
    }
  }
  return (
    <div className="max-w-6xl space-y-6">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
          <p className="text-muted-foreground mt-1">View and manage all your posted job listings.</p>
        </div>
        <Link href="/add-job">
          <Button className="gap-2"><PlusCircle className="h-4 w-4" /> Post New Job</Button>
        </Link>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4 bg-muted/10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search jobs..." 
              className="w-full pl-9 pr-3 py-2 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2"><Filter className="h-4 w-4" /> Filter</Button>
            <select className="border rounded-md px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary">
              <option>All Status</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-muted/20 text-sm">
                <th className="py-4 px-6 font-semibold">Job Title</th>
                <th className="py-4 px-6 font-semibold">Status</th>
                <th className="py-4 px-6 font-semibold">Applicants</th>
                <th className="py-4 px-6 font-semibold">Posted Date</th>
                <th className="py-4 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">Loading your jobs...</td>
                </tr>
              )}
              {!isLoading && postedJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">You haven't posted any jobs yet.</td>
                </tr>
              )}
              {postedJobs.map((job) => (
                <tr key={job._id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-semibold text-base">{job.title}</div>
                    <div className="text-sm text-muted-foreground">{job.jobType} • {job.location}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold
                      ${job.status === "Active" ? "bg-green-500/10 text-green-600" : 
                        job.status === "Closed" ? "bg-red-500/10 text-red-600" : 
                        "bg-gray-500/10 text-gray-600"}`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{job.applicantsCount || 0}</span>
                      <Link href={`/manage-jobs/${job._id}/applications`} className="text-xs text-primary hover:underline">View</Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-muted-foreground">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href="/payment">
                        <Button variant="outline" size="sm" className="gap-1 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50 border-yellow-200">
                          <Sparkles className="h-3.5 w-3.5" /> Promote
                        </Button>
                      </Link>
                      <Button variant="outline" size="icon" className="h-8 w-8" title="View Job">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8" title="Edit Job">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete" onClick={() => handleDelete(job._id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className="md:hidden divide-y">
          {isLoading && <div className="p-4 text-center text-muted-foreground">Loading...</div>}
          {postedJobs.map((job) => (
            <div key={job._id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{job.title}</h3>
                  <div className="text-sm text-muted-foreground mt-0.5">{job.location}</div>
                </div>
                <button className="text-muted-foreground p-1"><MoreVertical className="h-5 w-5" /></button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold
                      ${job.status === "Active" ? "bg-green-500/10 text-green-600" : 
                        job.status === "Closed" ? "bg-red-500/10 text-red-600" : 
                        "bg-gray-500/10 text-gray-600"}`}
                >
                  {job.status}
                </span>
                <span className="text-muted-foreground">{job.applicantsCount || 0} applicants</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
