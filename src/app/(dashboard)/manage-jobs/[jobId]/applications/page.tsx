"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  useGetJobApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  Application,
} from "@/redux/api/applicationApi";
import { Button } from "@/components/common/Button";
import {
  ArrowLeft,
  User,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  Trash2,
  Mail,
  Phone,
  Sparkles,
  X,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const COLUMNS = [
  { id: "Applied", title: "Applied", color: "bg-slate-100 dark:bg-slate-800/50" },
  { id: "In Review", title: "In Review", color: "bg-blue-50 dark:bg-blue-950/20" },
  { id: "Shortlisted", title: "Shortlisted", color: "bg-purple-50 dark:bg-purple-950/20" },
  { id: "Hired", title: "Hired", color: "bg-emerald-50 dark:bg-emerald-950/20" },
  { id: "Rejected", title: "Rejected", color: "bg-red-50 dark:bg-red-950/20" },
];

export default function JobApplicationsBoard() {
  const routeParams = useParams<{ jobId: string }>();
  const jobId = routeParams.jobId;

  const { data: appsResponse, isLoading } = useGetJobApplicationsQuery(jobId);
  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation();
  const [deleteApp] = useDeleteApplicationMutation();

  const [draggedAppId, setDraggedAppId] = useState<string | null>(null);
  const [dragOverColId, setDragOverColId] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Application | null>(null);

  const applications = appsResponse?.data || [];

  const handleStatusChange = async (appId: string, newStatus: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    toast.promise(updateStatus({ id: appId, status: newStatus }).unwrap(), {
      loading: "Updating status...",
      success: `Candidate moved to ${newStatus}! Notification sent to applicant.`,
      error: (err) => err?.data?.message || "Failed to update status",
    });
  };

  const handleDeleteApplication = async (appId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (confirm("Are you sure you want to remove this application from the pipeline?")) {
      toast.promise(deleteApp(appId).unwrap(), {
        loading: "Removing application...",
        success: () => {
          setSelectedCandidate(null);
          return "Application removed successfully";
        },
        error: (err) => err?.data?.message || "Failed to delete application",
      });
    }
  };

  const handleDragStart = (e: React.DragEvent, appId: string) => {
    setDraggedAppId(appId);
    e.dataTransfer.setData("appId", appId);
  };

  const handleDragOver = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (dragOverColId !== colId) {
      setDragOverColId(colId);
    }
  };

  const handleDragLeave = () => {
    setDragOverColId(null);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    setDragOverColId(null);
    const appId = e.dataTransfer.getData("appId");
    if (appId && draggedAppId === appId) {
      const app = applications.find((a: any) => a._id === appId);
      if (app && app.status !== colId) {
        handleStatusChange(appId, colId);
      }
    }
    setDraggedAppId(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm font-semibold text-muted-foreground animate-pulse">Loading Application Pipeline...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -m-4 sm:-m-8">
      {/* Header Bar */}
      <div className="bg-card border-b p-4 sm:px-8 shadow-xs z-10 shrink-0">
        <Link href="/manage-jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-2 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Manage Jobs
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-extrabold text-2xl tracking-tight">Candidate Review Pipeline</h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Click any candidate card to view full profile details or drag & drop across hiring stages.
            </p>
          </div>
          <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 self-start sm:self-auto">
            <Sparkles className="h-4 w-4" />
            <span>{applications.length} Total Applicants</span>
          </div>
        </div>
      </div>

      {/* Kanban Board Container */}
      <div className="flex-1 overflow-x-auto p-4 sm:p-8 bg-muted/10">
        <div className="flex gap-6 min-w-max h-full pb-4">
          {COLUMNS.map((column) => {
            const columnApps = applications.filter((app: any) => {
              if (column.id === "In Review") return app.status === "In Review" || app.status === "Reviewed";
              return app.status === column.id;
            });
            const isDragOver = dragOverColId === column.id;

            return (
              <div
                key={column.id}
                className={`w-84 flex flex-col rounded-3xl border ${column.color} shadow-xs overflow-hidden transition-all duration-200 ${
                  isDragOver ? "ring-2 ring-primary ring-offset-2 scale-[1.01]" : ""
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b bg-background/60 backdrop-blur-md flex justify-between items-center">
                  <h3 className="font-bold text-sm tracking-tight">{column.title}</h3>
                  <span className="bg-background px-2.5 py-0.5 rounded-full text-xs font-bold border shadow-2xs">
                    {columnApps.length}
                  </span>
                </div>

                {/* Candidate Cards Column */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnApps.length === 0 ? (
                    <div className="text-center py-12 px-4 text-xs font-semibold text-muted-foreground opacity-60 border-2 border-dashed border-muted/50 rounded-2xl">
                      Drag candidates here
                    </div>
                  ) : (
                    columnApps.map((app: any) => {
                      const applicant = app.applicantId;
                      const candidateName = app.applicantName || applicant?.name || "Job Seeker Candidate";
                      const candidateEmail = app.applicantEmail || applicant?.email || "No email provided";
                      const initials = candidateName.charAt(0).toUpperCase();

                      return (
                        <div
                          key={app._id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, app._id)}
                          onDragEnd={() => setDraggedAppId(null)}
                          onClick={() => setSelectedCandidate(app)}
                          className={`bg-card border rounded-2xl p-4 shadow-xs hover:border-primary transition-all group cursor-pointer select-none ${
                            draggedAppId === app._id ? "opacity-50 scale-95" : ""
                          } ${isUpdating ? "pointer-events-none opacity-80" : ""}`}
                        >
                          <div className="flex items-start gap-3 mb-3">
                            {applicant?.avatar ? (
                              <img src={applicant.avatar} alt="" className="h-10 w-10 rounded-full object-cover border shrink-0" />
                            ) : (
                              <div className="h-10 w-10 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center shrink-0 border text-sm shadow-2xs">
                                {initials}
                              </div>
                            )}

                            <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                                {candidateName}
                              </h4>
                              <p className="text-xs text-muted-foreground truncate font-medium">{candidateEmail}</p>
                            </div>
                          </div>

                          {/* Cover Letter Snippet */}
                          {app.coverLetter && (
                            <div className="bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border text-[11px] text-muted-foreground line-clamp-2 mb-3 italic">
                              "{app.coverLetter}"
                            </div>
                          )}

                          {/* Candidate Actions */}
                          <div className="space-y-2 pt-1 border-t">
                            <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" /> {new Date(app.createdAt).toLocaleDateString()}
                              </span>
                              {app.resumeUrl && (
                                <a
                                  href={app.resumeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="text-primary hover:underline font-bold inline-flex items-center gap-1"
                                >
                                  Resume <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>

                            <div className="grid grid-cols-3 gap-1 pt-1">
                              <button
                                onClick={(e) => handleStatusChange(app._id, "Shortlisted", e)}
                                className="p-1.5 text-[10px] font-bold rounded-lg bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 border border-indigo-500/20 transition-all text-center"
                                title="Shortlist Candidate"
                              >
                                Shortlist
                              </button>
                              <button
                                onClick={(e) => handleStatusChange(app._id, "Hired", e)}
                                className="p-1.5 text-[10px] font-bold rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all text-center"
                                title="Hire Candidate"
                              >
                                Hire
                              </button>
                              <button
                                onClick={(e) => handleStatusChange(app._id, "Rejected", e)}
                                className="p-1.5 text-[10px] font-bold rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 border border-red-500/20 transition-all text-center"
                                title="Reject Candidate"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Candidate Profile Details Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b pb-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white font-extrabold text-xl flex items-center justify-center shrink-0 shadow-md">
                  {(selectedCandidate.applicantName || selectedCandidate.applicantId?.name || "A").charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {selectedCandidate.applicantName || selectedCandidate.applicantId?.name || "Candidate"}
                  </h2>
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                    <Mail className="h-3.5 w-3.5" /> {selectedCandidate.applicantEmail || selectedCandidate.applicantId?.email || "No email"}
                  </p>
                  {selectedCandidate.applicantPhone && (
                    <p className="text-xs text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                      <Phone className="h-3.5 w-3.5 text-emerald-600" /> {selectedCandidate.applicantPhone}
                    </p>
                  )}
                </div>
              </div>

              <button onClick={() => setSelectedCandidate(null)} className="p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Current Hiring Stage</p>
                  <span className="inline-block px-3.5 py-1 rounded-full text-xs font-extrabold bg-primary/10 text-primary border border-primary/20">
                    {selectedCandidate.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-muted-foreground uppercase mb-1">Submitted Date</p>
                  <p className="text-xs font-medium text-foreground">{new Date(selectedCandidate.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedCandidate.coverLetter && (
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-muted-foreground uppercase">Cover Letter / Note</p>
                  <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 text-xs leading-relaxed text-muted-foreground whitespace-pre-line font-serif max-h-48 overflow-y-auto">
                    {selectedCandidate.coverLetter}
                  </div>
                </div>
              )}

              {selectedCandidate.resumeUrl && (
                <div className="pt-1">
                  <a
                    href={selectedCandidate.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-primary text-primary-foreground font-bold text-xs hover:bg-primary/90 transition-all shadow-sm"
                  >
                    <FileText className="h-4 w-4" /> View Full Resume / PDF Document
                  </a>
                </div>
              )}
            </div>

            <div className="pt-2 border-t flex items-center justify-between gap-3">
              <Button
                variant="outline"
                onClick={(e) => handleDeleteApplication(selectedCandidate._id, e)}
                className="text-red-600 hover:bg-red-500/10 border-red-200 text-xs rounded-xl gap-1.5"
              >
                <Trash2 className="h-4 w-4" /> Delete Application
              </Button>

              <Button variant="outline" onClick={() => setSelectedCandidate(null)} className="text-xs rounded-xl font-bold">
                Close Modal
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
