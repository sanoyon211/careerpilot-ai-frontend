"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Trash2,
  Download,
  RefreshCw,
  Briefcase,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  MapPin,
  DollarSign,
  ChevronRight,
  Target,
  Clock,
  Layers
} from "lucide-react";
import { useGetRecommendationsQuery } from "@/redux/api/recommendationApi";
import {
  useGetMyResumeQuery,
  useUploadFileMutation,
  useParseResumeMutation,
  useDeleteResumeMutation,
} from "@/redux/api/resumeApi";
import Link from "next/link";
import { toast } from "sonner";

export default function ResumePage() {
  const [dragActive, setDragActive] = useState(false);
  
  const { data: resumeResponse, isLoading: isLoadingResume, refetch: refetchResume } = useGetMyResumeQuery();
  const resume = resumeResponse?.data;

  const [uploadFile, { isLoading: isUploadingFile }] = useUploadFileMutation();
  const [parseResume, { isLoading: isParsing }] = useParseResumeMutation();
  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();

  const isWorking = isUploadingFile || isParsing || isDeleting;

  const { data: recData, isLoading: isLoadingRecs, refetch: refetchRecs } = useGetRecommendationsQuery(undefined, {
    skip: !resume,
  });

  const processFile = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      toast.loading("Uploading resume file...", { id: "resume-upload" });
      const uploadRes = await uploadFile(formData).unwrap();
      const fileUrl = uploadRes.data.url;

      toast.loading("Groq AI (Llama 3.3 70B) is parsing your resume...", { id: "resume-upload" });
      await parseResume({ fileUrl, fileName: file.name }).unwrap();

      toast.success("Resume uploaded & parsed successfully!", { id: "resume-upload" });
      refetchResume();
      refetchRecs();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to process resume", { id: "resume-upload" });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleReAnalyze = async () => {
    if (!resume?.fileUrl) return;
    try {
      toast.loading("Re-analyzing resume with Groq AI...", { id: "resume-reanalyze" });
      await parseResume({ fileUrl: resume.fileUrl, fileName: resume.fileName }).unwrap();
      toast.success("Resume re-analyzed successfully!", { id: "resume-reanalyze" });
      refetchResume();
      refetchRecs();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to re-analyze resume", { id: "resume-reanalyze" });
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your stored resume?")) {
      try {
        toast.loading("Deleting resume...", { id: "resume-delete" });
        await deleteResume().unwrap();
        toast.success("Resume deleted successfully", { id: "resume-delete" });
        refetchResume();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete resume", { id: "resume-delete" });
      }
    }
  };

  const atsScore = resume?.parsedData?.atsScore ?? 85;
  const getScoreBadge = (score: number) => {
    if (score >= 90) return { label: "Excellent ATS Fit", color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" };
    if (score >= 75) return { label: "Strong Candidate Fit", color: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20" };
    return { label: "Needs Optimization", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
  };

  return (
    <div className="max-w-6xl space-y-8 pb-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <Zap className="h-3.5 w-3.5 text-indigo-400" />
            <span>Agentic AI Engine Active (Groq Llama 3.3 70B & Gemini 2.0)</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Resume & AI Match</h1>
          <p className="text-slate-300 text-sm max-w-2xl leading-relaxed">
            Upload your resume to extract key skills, compute your ATS Readiness Score, identify skill gaps, and autonomously match with top jobs.
          </p>
        </div>
        
        {resume && (
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReAnalyze}
              isLoading={isParsing}
              className="bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700"
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Re-Analyze
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Left Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload & Manage Card */}
          <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="h-5 w-5 text-indigo-600" /> Manage Your Resume
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">PDF or DOCX documents up to 5MB</p>
              </div>
            </div>

            {isLoadingResume ? (
              <div className="p-10 text-center text-muted-foreground animate-pulse flex flex-col items-center justify-center gap-3">
                <RefreshCw className="h-8 w-8 animate-spin text-indigo-600" />
                <p>Loading your resume profile...</p>
              </div>
            ) : resume ? (
              <div className="space-y-4">
                <div className="border border-indigo-100 dark:border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-indigo-50/40 dark:bg-slate-900/40">
                  <div className="flex items-center gap-4">
                    <div className="bg-indigo-600 text-white p-3.5 rounded-xl shadow-md">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-bold text-base text-foreground">{resume.fileName || "Uploaded Resume"}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded font-semibold text-[11px]">
                          Parsed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="h-9 px-3 gap-1.5" title="Download Resume">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-9 p-0 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                      title="Delete Resume"
                      onClick={handleDelete}
                      isLoading={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 p-4 rounded-xl flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">AI Resume Parsing Complete</p>
                    <p className="text-xs opacity-90 mt-0.5 leading-relaxed">
                      Your resume has been indexed by Groq Llama 3.3 70B. Skills and background details are live for real-time job matching.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? "border-indigo-600 bg-indigo-500/10 scale-[1.01]"
                    : "border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30 hover:border-indigo-400 hover:bg-slate-50"
                }`}
              >
                <div className="bg-indigo-600/10 text-indigo-600 p-4 rounded-full mb-4 shadow-sm">
                  <UploadCloud className="h-10 w-10" />
                </div>
                <h3 className="font-bold text-lg mb-1">Drag & drop your resume here</h3>
                <p className="text-xs text-muted-foreground mb-6 max-w-sm">
                  Supports PDF and DOCX files. Groq AI will parse your skills in seconds.
                </p>
                <input
                  type="file"
                  id="resume-upload-input"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Button asChild isLoading={isWorking} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6">
                  <label htmlFor="resume-upload-input" className="cursor-pointer">
                    {isWorking ? "Parsing Resume..." : "Browse Computer Files"}
                  </label>
                </Button>
              </div>
            )}
          </div>

          {/* ATS Score & Analytics Card */}
          {resume && (
            <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Award className="h-5 w-5 text-indigo-600" /> ATS Compatibility Score
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Automated screening assessment against ATS standards</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getScoreBadge(atsScore).color}`}>
                  {getScoreBadge(atsScore).label}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-4xl font-extrabold text-indigo-600">{atsScore}</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">ATS Score / 100</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-foreground">{resume.parsedData?.technicalSkills?.length || 0}</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Tech Skills Extracted</span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-900 border p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                  <span className="text-3xl font-bold text-emerald-600">{recData?.data?.recommendedJobs?.length || 0}</span>
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">Matched Active Jobs</span>
                </div>
              </div>

              {/* Score Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span>ATS Readinss</span>
                  <span>{atsScore}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>

              {/* ATS Improvement Suggestions */}
              {resume.parsedData?.atsFeedback && resume.parsedData.atsFeedback.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-2xl space-y-2">
                  <h4 className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <AlertCircle className="h-4 w-4" /> Recommended ATS Improvements
                  </h4>
                  <ul className="space-y-1.5 pl-1">
                    {resume.parsedData.atsFeedback.map((item: string, idx: number) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* AI Extracted Skills Breakdown */}
          {resume && resume.parsedData && (
            <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <h2 className="text-xl font-bold flex items-center gap-2 border-b pb-4">
                <Sparkles className="h-5 w-5 text-indigo-600" /> Extracted Skill Matrix
              </h2>

              <div className="space-y-5">
                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Layers className="h-4 w-4 text-indigo-500" /> Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.parsedData.technicalSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20 text-xs px-3.5 py-1.5 rounded-xl font-semibold shadow-2xs hover:bg-indigo-500/20 transition-colors"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-xs text-muted-foreground">No technical skills detected.</span>}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <TrendingUp className="h-4 w-4 text-emerald-500" /> Soft Skills & Traits
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {resume.parsedData.softSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 text-xs px-3.5 py-1.5 rounded-xl font-semibold shadow-2xs"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-xs text-muted-foreground">No soft skills detected.</span>}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Experience Summary</h3>
                  <div className="bg-slate-50 dark:bg-slate-900 border rounded-2xl p-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 italic">
                    "{resume.parsedData.experienceSummary || "No summary provided."}"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Skill Gap & Career Advice Card */}
          {recData?.data?.recommendedSkills && recData.data.recommendedSkills.length > 0 && (
            <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" /> AI Skill Gap Analysis & Target Skills
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Acquiring these skills will increase your match rate for higher-paying roles</p>
              </div>

              <div className="grid gap-3">
                {recData.data.recommendedSkills.map((skill, idx) => (
                  <div key={idx} className="border rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/30">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm">{skill.name}</span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            skill.importance === "High"
                              ? "bg-rose-500/10 text-rose-600 border-rose-500/20"
                              : skill.importance === "Medium"
                              ? "bg-amber-500/10 text-amber-600 border-amber-500/20"
                              : "bg-blue-500/10 text-blue-600 border-blue-500/20"
                          }`}
                        >
                          {skill.importance} Priority
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{skill.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Matched Jobs Section */}
          {resume && (
            <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-indigo-600" /> AI Matched Job Opportunities
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Roles autonomously ranked by skill similarity score</p>
                </div>
                {recData?.data?.recommendedJobs?.length ? (
                  <span className="bg-indigo-600 text-white text-xs font-extrabold px-3 py-1 rounded-full">
                    {recData.data.recommendedJobs.length} Matches Found
                  </span>
                ) : null}
              </div>

              {isLoadingRecs ? (
                <div className="text-center py-10 text-muted-foreground animate-pulse space-y-3">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-indigo-600" />
                  <p className="text-sm">Groq Llama 3.3 70B is analyzing candidate-job alignment...</p>
                </div>
              ) : recData?.data?.recommendedJobs?.length ? (
                <div className="grid gap-4">
                  {recData.data.recommendedJobs.map((rec) => {
                    const job = rec.jobDetails;
                    return (
                      <div
                        key={rec.jobId}
                        className="border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-500/50 hover:shadow-md transition-all bg-card"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-foreground">
                              {job?.title || "Matching Position"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                              {job?.category && <span className="bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded font-medium">{job.category}</span>}
                              {job?.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" /> {job.location}
                                </span>
                              )}
                              {job?.workMode && <span className="text-indigo-600 font-semibold">{job.workMode}</span>}
                              {job?.salaryRange && (
                                <span className="flex items-center gap-1 text-emerald-600 font-medium">
                                  <DollarSign className="h-3 w-3" /> {job.salaryRange}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-extrabold px-3 py-1.5 rounded-full">
                              {rec.matchPercentage}% Match
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl">
                          <strong className="text-foreground font-semibold">AI Match Rationale: </strong>
                          {rec.reason}
                        </p>

                        <div className="flex justify-end">
                          <Link href={`/jobs/${job?._id || rec.jobId}`}>
                            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-1">
                              View & Apply Job <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-10 text-muted-foreground space-y-2">
                  <p className="font-semibold text-sm">No active job matches found at this time.</p>
                  <p className="text-xs">New jobs are posted daily. We will update matches automatically.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          
          <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-3xl p-6 text-white shadow-md border border-indigo-900/50 space-y-4">
            <div className="bg-indigo-500/20 p-3 rounded-2xl w-fit text-indigo-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg">How Agentic AI Matching Works</h3>
            <p className="text-xs opacity-90 leading-relaxed text-indigo-100">
              Our Agentic AI leverages Groq Llama 3.3 70B & Gemini 2.0 Flash to analyze contextual experience rather than plain keywords. It evaluates candidate capability, domain depth, and culture fit against live job requirements.
            </p>
            <ul className="space-y-2.5 text-xs pt-2">
              <li className="flex items-center gap-2 text-indigo-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Contextual Skill & Experience Mapping
              </li>
              <li className="flex items-center gap-2 text-indigo-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> ATS Compatibility Score Computation
              </li>
              <li className="flex items-center gap-2 text-indigo-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> Targeted Skill Gap Recommendations
              </li>
            </ul>
          </div>

          <div className="bg-card border rounded-3xl p-6 shadow-sm space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" /> Privacy & Security Guarantee
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your resume data is stored using enterprise encryption. It is only shared with employers when you explicitly apply for a job posting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
