"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Edit, Trash2, Eye, MoreVertical, PlusCircle, Search, Filter, Sparkles, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useGetEmployerJobsQuery, useDeleteJobMutation, useUpdateJobMutation, Job } from "@/redux/api/jobsApi";
import { toast } from "sonner";
import { SwalConfirm } from "@/utils/swal";

export default function ManageJobsPage() {
  const { data: jobsResponse, isLoading } = useGetEmployerJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
  const [updateJob, { isLoading: isUpdating }] = useUpdateJobMutation();
  const postedJobs = jobsResponse?.data || [];

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [promotingJob, setPromotingJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Form State for Edit Modal
  const [editTitle, setEditTitle] = useState("");
  const [editJobType, setEditJobType] = useState<Job["jobType"]>("Full-time");
  const [editWorkMode, setEditWorkMode] = useState<Job["workMode"]>("Remote");
  const [editLocation, setEditLocation] = useState("");
  const [editSalary, setEditSalary] = useState("");
  const [editStatus, setEditStatus] = useState<Job["status"]>("Active");

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setEditTitle(job.title);
    setEditJobType(job.jobType);
    setEditWorkMode(job.workMode);
    setEditLocation(job.location);
    setEditSalary(job.salaryRange || "");
    setEditStatus(job.status);
  };

  const handleUpdateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;

    toast.promise(
      updateJob({
        id: editingJob._id,
        body: {
          title: editTitle,
          jobType: editJobType,
          workMode: editWorkMode,
          location: editLocation,
          salaryRange: editSalary,
          status: editStatus,
        },
      }).unwrap(),
      {
        loading: "Updating job details...",
        success: () => {
          setEditingJob(null);
          return "Job listing updated successfully!";
        },
        error: (err) => err?.data?.message || "Failed to update job",
      }
    );
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await SwalConfirm(
      "Delete Job Listing?",
      "Are you sure you want to permanently delete this job posting?",
      "Yes, Delete Job",
      "warning"
    );

    if (isConfirmed) {
      toast.promise(deleteJob(id).unwrap(), {
        loading: "Deleting job...",
        success: "Job posting deleted successfully",
        error: (err) => err?.data?.message || "Failed to delete job",
      });
    }
  };

  const handlePromoteConfirm = (job: Job) => {
    toast.promise(
      updateJob({
        id: job._id,
        body: { status: "Active" },
      }).unwrap(),
      {
        loading: "Promoting job to Featured status...",
        success: () => {
          setPromotingJob(null);
          return `${job.title} is now a Featured Priority Job!`;
        },
        error: "Failed to promote job",
      }
    );
  };

  // Filter jobs by search query and status dropdown
  const filteredJobs = postedJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
          <p className="text-muted-foreground mt-1">View, edit, promote, and manage all your posted job listings.</p>
        </div>
        <Link href="/add-job">
          <Button className="gap-2 bg-primary hover:bg-primary/90 rounded-xl">
            <PlusCircle className="h-4 w-4" /> Post New Job
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-3xl shadow-xs overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4 bg-muted/10">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search jobs by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground ml-2" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Draft">Draft</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="overflow-x-auto hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-muted/20 text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-4 px-6 font-bold">Job Title</th>
                <th className="py-4 px-6 font-bold">Status</th>
                <th className="py-4 px-6 font-bold">Applicants</th>
                <th className="py-4 px-6 font-bold">Posted Date</th>
                <th className="py-4 px-6 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {isLoading && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent mx-auto mb-2" />
                    Loading your job listings...
                  </td>
                </tr>
              )}

              {!isLoading && filteredJobs.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-muted-foreground">
                    No jobs found. Post a new job to get started.
                  </td>
                </tr>
              )}

              {filteredJobs.map((job) => (
                <tr key={job._id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-base text-foreground">{job.title}</div>
                    <div className="text-xs text-muted-foreground font-medium mt-0.5">
                      {job.jobType} • {job.workMode} • {job.location}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        job.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                          : job.status === "Closed"
                          ? "bg-red-500/10 text-red-600 border border-red-500/20"
                          : "bg-gray-500/10 text-gray-600 border border-gray-500/20"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">{job.applicantsCount || 0}</span>
                      <Link href={`/manage-jobs/${job._id}/applications`} className="text-xs font-bold text-primary hover:underline">
                        View
                      </Link>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-xs text-muted-foreground font-medium">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPromotingJob(job)}
                        className="gap-1 text-amber-600 hover:text-amber-700 hover:bg-amber-500/10 border-amber-500/30 rounded-xl"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> Promote
                      </Button>

                      <Link href={`/jobs/${job._id}`}>
                        <Button variant="outline" size="icon" className="h-8 w-8 rounded-lg" title="View Job Details">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg"
                        title="Edit Job"
                        onClick={() => openEditModal(job)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-lg text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-200"
                        title="Delete Job"
                        onClick={() => handleDelete(job._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y">
          {filteredJobs.map((job) => (
            <div key={job._id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-base">{job.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{job.jobType} • {job.location}</p>
                </div>
                <span className="text-xs font-bold text-emerald-600">{job.status}</span>
              </div>
              <div className="flex items-center justify-between gap-2 pt-2">
                <Link href={`/jobs/${job._id}`}>
                  <Button size="sm" variant="outline" className="text-xs">View</Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => openEditModal(job)} className="text-xs">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => handleDelete(job._id)} className="text-xs">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Job Modal */}
      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-xl font-bold">Edit Job Details</h2>
              <button onClick={() => setEditingJob(null)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Job Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Job Type</label>
                  <select
                    value={editJobType}
                    onChange={(e) => setEditJobType(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Work Mode</label>
                  <select
                    value={editWorkMode}
                    onChange={(e) => setEditWorkMode(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Location</label>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Status</label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase block mb-1">Salary Range</label>
                <input
                  type="text"
                  value={editSalary}
                  onChange={(e) => setEditSalary(e.target.value)}
                  placeholder="e.g. $120,000 - $140,000 / year"
                  className="w-full p-2.5 rounded-xl border bg-background text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setEditingJob(null)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isUpdating} className="bg-primary hover:bg-primary/90">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Promote Job Modal */}
      {promotingJob && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-center">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
              <Sparkles className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-bold">Promote Job Listing</h2>
            <p className="text-sm text-muted-foreground">
              Featured jobs receive <strong>5x more views</strong> and top placement in candidates' AI match results.
            </p>
            <div className="bg-muted/30 p-3 rounded-2xl border text-left text-xs space-y-1">
              <p className="font-bold text-foreground">{promotingJob.title}</p>
              <p className="text-muted-foreground">{promotingJob.location} • {promotingJob.jobType}</p>
            </div>
            <div className="pt-2 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setPromotingJob(null)}>
                Cancel
              </Button>
              <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white gap-1.5" onClick={() => handlePromoteConfirm(promotingJob)}>
                <CheckCircle2 className="h-4 w-4" /> Activate Priority
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
