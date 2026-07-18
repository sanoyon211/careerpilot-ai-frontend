"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import { UploadCloud, FileText, CheckCircle2, AlertCircle, Sparkles, Trash2, Download } from "lucide-react"
import { useGetRecommendationsQuery } from "@/redux/api/recommendationApi"
import Link from "next/link"

export default function ResumePage() {
  const [isUploading, setIsUploading] = useState(false)
  const [hasResume, setHasResume] = useState(true)

  const { data: recData, isLoading: isLoadingRecs } = useGetRecommendationsQuery(undefined, {
    skip: !hasResume,
  });

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)
      // Simulate upload & AI parsing
      setTimeout(() => {
        setIsUploading(false)
        setHasResume(true)
      }, 2000)
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
            
            {hasResume ? (
              <div className="border rounded-xl p-4 flex items-center justify-between bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">john_doe_resume_2026.pdf</h3>
                    <p className="text-xs text-muted-foreground">Uploaded on July 10, 2026 • 2.4 MB</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0" title="Download">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-8 w-8 p-0 text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => setHasResume(false)} title="Delete">
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
                <Button asChild isLoading={isUploading}>
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    Browse Files
                  </label>
                </Button>
              </div>
            )}
            
            {hasResume && (
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
          <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" /> AI Extracted Skills
              </h2>
              <Button variant="outline" size="sm">Edit Skills</Button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "GraphQL", "Redux", "Git"].map(skill => (
                    <span key={skill} className="bg-secondary text-secondary-foreground text-sm px-3 py-1.5 rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Soft Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["Team Leadership", "Agile Methodology", "Problem Solving", "Communication"].map(skill => (
                    <span key={skill} className="bg-muted text-foreground border text-sm px-3 py-1.5 rounded-md font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Experience Summary</h3>
                <p className="text-sm leading-relaxed">
                  5+ years of experience as a Frontend Engineer. Strong focus on building scalable web applications using React and Next.js. Led a team of 3 developers in previous role at TechCorp.
                </p>
              </div>
            </div>
          </div>

          {/* AI Job Matches */}
          {hasResume && (
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
