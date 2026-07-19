"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Button } from "@/components/common/Button"
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Building, Users, Globe, Share2, Bookmark, CheckCircle2, Sparkles, FileText } from "lucide-react"
import { useGetJobByIdQuery } from "@/redux/api/jobsApi"
import { useApplyForJobMutation } from "@/redux/api/applicationApi"
import { useGenerateCoverLetterMutation } from "@/redux/api/aiApi"
import { useGetMyResumeQuery } from "@/redux/api/resumeApi"
import { toast } from "sonner"

export default function JobDetailsPage() {
  const routeParams = useParams<{ id: string }>();
  const id = routeParams.id;
  const { data: jobResponse, isLoading } = useGetJobByIdQuery(id)
  const { data: resumeResponse } = useGetMyResumeQuery()
  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation()
  const [generateCoverLetter, { isLoading: isGenerating }] = useGenerateCoverLetterMutation()
  
  const [coverLetter, setCoverLetter] = useState<string | null>(null)

  const handleApply = async () => {
    const resumeUrl = resumeResponse?.data?.fileUrl || '';
    toast.promise(
      applyForJob({ jobId: id, resumeUrl, coverLetter: coverLetter || undefined }).unwrap(),
      {
        loading: 'Submitting application...',
        success: 'Successfully applied for this job!',
        error: (err) => err.data?.message || 'Failed to apply. Have you already applied or uploaded your resume?'
      }
    )
  }

  const handleGenerateCoverLetter = async () => {
    if (!resumeResponse?.data) {
      alert("Please upload and parse your resume first in the dashboard.");
      return;
    }
    
    try {
      const result = await generateCoverLetter({
        jobDescription: jobResponse?.data?.fullDescription || "",
        resumeData: resumeResponse.data.parsedData
      }).unwrap();
      setCoverLetter(result.data);
    } catch (error) {
      console.error(error);
      alert("Failed to generate cover letter.");
    }
  }

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading job details...</div>
  }

  const job = jobResponse?.data
  if (!job) {
    return <div className="min-h-screen flex items-center justify-center">Job not found</div>
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Back Navigation */}
        <Link href="/explore-jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Section */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-muted flex items-center justify-center text-2xl sm:text-3xl font-bold text-muted-foreground border">
                    {job.employerId?.name?.charAt(0) || "C"}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{job.title}</h1>
                    </div>
                    <div className="text-lg text-primary font-medium mb-4">{job.employerId?.name || "Company"}</div>
                    
                    <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {job.jobType}</span>
                      {job.salaryRange && <span className="flex items-center gap-1.5 text-green-600 font-medium"><DollarSign className="h-4 w-4" /> {job.salaryRange}</span>}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 flex-wrap">
                <Button size="lg" className="flex-1 sm:flex-none sm:w-48 text-base" onClick={handleApply} isLoading={isApplying}>Apply Now</Button>
                <Button variant="outline" size="lg" className="gap-2" onClick={handleGenerateCoverLetter} isLoading={isGenerating}>
                  <Sparkles className="h-4 w-4 text-blue-500" /> AI Cover Letter
                </Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Bookmark className="h-4 w-4" /> Save Job
                </Button>
                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground self-center">
                  <Clock className="h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()} • {job.applicantsCount || 0} applicants
                </div>
              </div>
              
              {/* Cover Letter Display */}
              {coverLetter && (
                <div className="mt-6 bg-muted/30 border rounded-xl p-6">
                  <h3 className="font-bold mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-primary"/> Generated Cover Letter</h3>
                  <div className="whitespace-pre-line text-sm leading-relaxed font-serif">
                    {coverLetter}
                  </div>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
              <section>
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {job.fullDescription}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* About Company Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">About the Company</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground border">
                  {job.employerId?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <h4 className="font-semibold text-base">{job.employerId?.name || "Company"}</h4>
                  <Link href="#" className="text-sm text-primary hover:underline">View Profile</Link>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <h3 className="font-bold text-lg mb-2">Spread the word</h3>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Share2 className="h-4 w-4" /> Share via Link
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Share on LinkedIn
              </Button>
            </div>

            {/* AI Insights Card (Optional Teaser) */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-primary">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Based on your uploaded resume, you have a <strong>92% match</strong> for this role. Your experience with Next.js and TypeScript aligns perfectly with the requirements.
              </p>
              <Button variant="default" size="sm" className="w-full">
                View Full Analysis
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
