"use client"

import { useState } from "react"
import { useGetJobApplicationsQuery, useUpdateApplicationStatusMutation } from "@/redux/api/applicationApi"
import { Button } from "@/components/common/Button"
import { ArrowLeft, User, FileText, ChevronRight, Check, X, Clock } from "lucide-react"
import Link from "next/link"

const COLUMNS = [
  { id: "Applied", title: "Applied", color: "bg-gray-100 dark:bg-gray-800/50" },
  { id: "In Review", title: "In Review", color: "bg-blue-50 dark:bg-blue-900/20" },
  { id: "Interview", title: "Interview", color: "bg-purple-50 dark:bg-purple-900/20" },
  { id: "Hired", title: "Hired", color: "bg-green-50 dark:bg-green-900/20" },
  { id: "Rejected", title: "Rejected", color: "bg-red-50 dark:bg-red-900/20" },
]

export default function JobApplicationsBoard({ params }: { params: { jobId: string } }) {
  const { data: appsResponse, isLoading } = useGetJobApplicationsQuery(params.jobId)
  const [updateStatus, { isLoading: isUpdating }] = useUpdateApplicationStatusMutation()
  
  const applications = appsResponse?.data || []

  const handleStatusChange = async (appId: string, newStatus: string) => {
    try {
      await updateStatus({ id: appId, status: newStatus }).unwrap()
    } catch (error) {
      console.error(error)
      alert("Failed to update status")
    }
  }

  if (isLoading) {
    return <div className="p-12 text-center text-muted-foreground animate-pulse">Loading board...</div>
  }

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] -m-4 sm:-m-8">
      {/* Header */}
      <div className="bg-card border-b p-4 sm:px-8 shadow-sm z-10 shrink-0">
        <Link href="/manage-jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-2 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to jobs
        </Link>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-bold text-2xl">Application Pipeline</h1>
            <p className="text-sm text-muted-foreground">Manage candidates for this role</p>
          </div>
          <div className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
            {applications.length} Total Applicants
          </div>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto p-4 sm:p-8 bg-muted/10">
        <div className="flex gap-6 min-w-max h-full pb-4">
          {COLUMNS.map((column) => {
            const columnApps = applications.filter((app: any) => app.status === column.id)
            
            return (
              <div key={column.id} className={`w-80 flex flex-col rounded-2xl border ${column.color} shadow-sm overflow-hidden`}>
                {/* Column Header */}
                <div className="p-4 border-b bg-background/50 backdrop-blur-sm flex justify-between items-center">
                  <h3 className="font-semibold">{column.title}</h3>
                  <span className="bg-background px-2 py-0.5 rounded-full text-xs font-medium border shadow-sm">
                    {columnApps.length}
                  </span>
                </div>
                
                {/* Column Cards */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {columnApps.length === 0 ? (
                    <div className="text-center p-4 text-xs text-muted-foreground opacity-50">Empty</div>
                  ) : (
                    columnApps.map((app: any) => (
                      <div key={app._id} className="bg-card border rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors group">
                        <div className="flex items-start gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center shrink-0 border">
                            <User className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-sm truncate">{app.applicantId?.name || "Applicant"}</h4>
                            <p className="text-xs text-muted-foreground truncate">{app.applicantId?.email || "No email"}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs bg-muted px-2 py-1 rounded hover:bg-muted/80 transition-colors">
                            <FileText className="h-3.5 w-3.5" /> View Resume
                          </a>
                        </div>
                        
                        {/* Status Actions */}
                        <div className="pt-3 border-t">
                          <label className="text-[10px] uppercase font-semibold text-muted-foreground mb-1 block">Move to:</label>
                          <select 
                            className="w-full text-xs border rounded p-1.5 bg-background focus:ring-primary focus:border-primary"
                            value={app.status}
                            onChange={(e) => handleStatusChange(app._id, e.target.value)}
                            disabled={isUpdating}
                          >
                            {COLUMNS.map(col => (
                              <option key={col.id} value={col.id}>{col.title}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
