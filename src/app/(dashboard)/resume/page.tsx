"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Trash2, Download } from "lucide-react"
import { useGetRecommendationsQuery } from "@/redux/api/recommendationApi"
import { useGetMyResumeQuery, useUploadFileMutation, useParseResumeMutation, useDeleteResumeMutation } from "@/redux/api/resumeApi"
import Link from "next/link"
import { toast } from "sonner"

export default function ResumePage() {
  const { data: resumeResponse, isLoading: isLoadingResume } = useGetMyResumeQuery();
  const resume = resumeResponse?.data;
  
  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();
  const [parseResume, { isLoading: isParsing }] = useParseResumeMutation();
  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();

  const isWorking = isUploadingFile || isParsing || isDeleting;
  
  const { data: recData, isLoading: isLoadingRecs } = useGetRecommendationsQuery(undefined, {
    skip: !resume,
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        // Step 1: Upload file
        toast.loading("Uploading file...", { id: "resume-upload" });
        const uploadRes = await uploadFile(formData).unwrap();
        const fileUrl = uploadRes.data.url;
        
        // Step 2: Parse resume
        toast.loading("AI is analyzing your resume...", { id: "resume-upload" });
        await parseResume({ fileUrl, fileName: file.name }).unwrap();
        
        toast.success("Resume parsed successfully!", { id: "resume-upload" });
      } catch (error: any) {
        // console.error(error); // Commented out to prevent Next.js dev overlay
        toast.error(error.data?.message || "Failed to process resume", { id: "resume-upload" });
      }
    }
  }

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your resume?")) {
      try {
        toast.loading("Deleting resume...", { id: "resume-delete" });
        await deleteResume().unwrap();
        toast.success("Resume deleted successfully", { id: "resume-delete" });
      } catch (error: any) {
        toast.error(error.data?.message || "Failed to delete resume", { id: "resume-delete" });
      }
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume & AI Match</h1>
        <p className="text-muted-foreground mt-1">Upload your resume to let our Agentic AI extract your skills and find your perfect job matches.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Upload Section */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Manage Resume</h2>
            
            {isLoadingResume ? (
              <div className="p-4 text-center text-muted-foreground animate-pulse">Loading resume data...</div>
            ) : resume ? (
              <div className="border rounded-xl p-4 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{resume.fileName || "Uploaded Resume"}</h3>
                    <p className="text-xs text-muted-foreground">Uploaded on {new Date(resume.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Download">
                      <Download className="h-4 w-4" />
                    </Button>
                  </a>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" title="Delete Resume" onClick={handleDelete} isLoading={isDeleting}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center bg-muted/10 hover:bg-muted/30 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full text-primary mb-4">
                  <UploadCloud className="h-8 w-8" />
                </div>
                <h3 className="font-semibold mb-1">Upload your resume</h3>
                <p className="text-sm text-muted-foreground mb-6">PDF, DOCX up to 5MB</p>
                <input 
                  type="file" 
                  id="resume-upload" 
                  className="hidden" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleUpload}
                />
                <Button asChild isLoading={isWorking}>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {isWorking ? "Processing..." : "Browse Files"}
                  </label>
                </Button>
              </div>
            )}
            
            {resume && (resume.parsedData?.technicalSkills?.length > 0 || resume.parsedData?.softSkills?.length > 0) && (
              <div className="mt-6 bg-green-500/10 text-green-700 p-4 rounded-lg flex items-start gap-3 text-sm">
                <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Successfully Parsed by AI</p>
                  <p className="mt-1 opacity-90">Our AI has successfully read your resume. Your skills and experience are now being used to match you with relevant jobs.</p>
                </div>
              </div>
            )}
          </div>

          {/* AI Extracted Data */}
          {resume && resume.parsedData && (
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> AI Extracted Skills
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.parsedData.technicalSkills?.map((skill: string) => (
                      <span key={skill} className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-md font-medium">
                        {skill}
                      </span>
                    )) || <span className="text-muted-foreground text-sm">No technical skills extracted.</span>}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.parsedData.softSkills?.map((skill: string) => (
                      <span key={skill} className="bg-muted text-foreground border text-sm px-3 py-1.5 rounded-md font-medium">
                        {skill}
                      </span>
                    )) || <span className="text-muted-foreground text-sm">No soft skills extracted.</span>}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Experience Summary</h3>
                  <p className="text-sm leading-relaxed">
                    {resume.parsedData.experienceSummary || "No experience summary available."}
                  </p>
                </div>

                {resume.parsedData.atsScore !== undefined && (
                  <div className="border-t pt-4 mt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">ATS Score</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl font-bold text-primary">{resume.parsedData.atsScore}/100</div>
                      <div className="w-full bg-muted rounded-full h-2.5">
                        <div className="bg-primary h-2.5 rounded-full" style={{ width: `${resume.parsedData.atsScore}%` }}></div>
                      </div>
                    </div>
                    {resume.parsedData.atsFeedback && resume.parsedData.atsFeedback.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold mb-2">Feedback to improve:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {resume.parsedData.atsFeedback.map((feedback: string, i: number) => (
                            <li key={i}>{feedback}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* AI Job Matches */}
          {resume && (
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" /> AI Matched Jobs
                </h2>
              </div>

              {isLoadingRecs ? (
                <div className="text-center py-8 text-muted-foreground animate-pulse">
                  Analyzing your profile against available jobs...
                </div>
              ) : recData?.data?.recommendedJobs?.length ? (
                <div className="space-y-4">
                  {recData.data.recommendedJobs.map((rec) => (
                    <div key={rec.jobId} className="border rounded-xl p-4 hover:border-primary/50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{rec.jobId}</h3>
                        <span className="bg-green-500/10 text-green-600 text-xs font-semibold px-2 py-1 rounded-md">
                          {rec.matchPercentage}% Match
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{rec.reason}</p>
                      <Link href={`/jobs/${rec.jobId}`}>
                        <Button variant="outline" size="sm" className="w-full">View Job</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No perfect matches found at this time. We'll keep looking!
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-blue-600 rounded-2xl p-6 text-primary-foreground shadow-sm">
            <h3 className="font-bold text-lg mb-2">How AI Matching Works</h3>
            <p className="text-sm opacity-90 leading-relaxed mb-4">
              When you upload your resume, our Agentic AI analyzes not just keywords, but the context of your experience. It then autonomously searches thousands of job listings to find roles where you have the highest probability of success.
            </p>
            <ul className="space-y-2 text-sm opacity-90">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Contextual skill mapping</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Seniority level detection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4" /> Culture fit prediction</li>
            </ul>
          </div>

          <div className="bg-card border rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-2 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500" /> Privacy Note
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your resume is stored securely and is only shared with employers when you explicitly apply for a job. We do not sell your personal data.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}
