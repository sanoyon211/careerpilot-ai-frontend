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
import { SwalConfirm } from "@/utils/swal";

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
    const isConfirmed = await SwalConfirm(
      "Delete Resume?",
      "Are you sure you want to delete your stored resume and AI analysis?",
      "Yes, Delete Resume",
      "warning"
    );

    if (isConfirmed) {
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
    if (score >= 75) return { label: "Strong Candidate Fit", color: "bg-[#2563EB]/10 text-[#2563EB] border-[#2563EB]/20" };
    return { label: "Needs Optimization", color: "bg-amber-500/10 text-amber-600 border-amber-500/20" };
  };

  return (
    <div className="max-w-6xl space-y-8 pb-10">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-[#F4F7FE] text-[#1E293B] p-8 sm:p-10 rounded-[28px] shadow-subtle border border-[#E2E8F0]">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-[#F3E8FF] text-[#8B5CF6] border border-[#8B5CF6]/20">
            <Zap className="h-4 w-4" />
            <span>Agentic AI Engine Active (Groq Llama 3.3 70B)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">Resume & AI Match</h1>
          <p className="text-[#64748B] text-base max-w-2xl leading-relaxed font-medium">
            Upload your resume to extract key technical competencies, compute your ATS Readiness Score, identify skill gaps, and match with top opportunities.
          </p>
        </div>
        
        {resume && (
          <div className="flex items-center gap-3 shrink-0">
            <Button
              variant="ai"
              size="lg"
              onClick={handleReAnalyze}
              isLoading={isParsing}
              className="font-extrabold rounded-2xl shadow-md shadow-purple-500/20 px-6 gap-2"
            >
              <RefreshCw className="h-4 w-4" /> Re-Analyze
            </Button>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Left Content Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Upload & Manage Card */}
          <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 sm:p-10 shadow-subtle">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold flex items-center gap-2 text-[#1E293B]">
                  <FileText className="h-5 w-5 text-[#2563EB]" /> Manage Your Resume
                </h2>
                <p className="text-xs font-medium text-[#64748B] mt-1">PDF or DOCX documents up to 5MB</p>
              </div>
            </div>

            {isLoadingResume ? (
              <div className="p-12 text-center text-[#64748B] animate-pulse flex flex-col items-center justify-center gap-3 font-semibold">
                <RefreshCw className="h-8 w-8 animate-spin text-[#2563EB]" />
                <p>Loading your resume profile...</p>
              </div>
            ) : resume ? (
              <div className="space-y-4">
                <div className="border border-[#E2E8F0] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-xs">
                  <div className="flex items-center gap-4">
                    <div className="bg-[#2563EB] text-white p-4 rounded-2xl shadow-md shadow-blue-500/15">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-[#1E293B]">{resume.fileName || "Uploaded Resume"}</h3>
                      <div className="flex items-center gap-3 mt-1 text-xs text-[#64748B] font-semibold">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" /> Uploaded {new Date(resume.createdAt).toLocaleDateString()}
                        </span>
                        <span className="bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded-full font-extrabold text-[11px] border border-emerald-500/20">
                          Parsed
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="h-10 px-4 gap-1.5 font-bold rounded-xl" title="Download Resume">
                        <Download className="h-4 w-4" /> Download
                      </Button>
                    </a>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-10 w-10 p-0 text-red-600 hover:bg-red-50 rounded-xl"
                      title="Delete Resume"
                      onClick={handleDelete}
                      isLoading={isDeleting}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 p-5 rounded-2xl flex items-start gap-3.5 text-sm font-medium">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-extrabold text-[#1E293B]">AI Resume Parsing Complete</p>
                    <p className="text-xs text-[#64748B] font-medium leading-relaxed mt-1">
                      Your resume has been indexed by Groq Llama 3.3 70B. Technical skills are active for intent-driven job matching.
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
                className={`border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition-all ${
                  dragActive
                    ? "border-[#2563EB] bg-blue-50/50 scale-[1.01]"
                    : "border-[#CBD5E1] bg-white hover:border-[#2563EB] hover:bg-[#F4F7FE]"
                }`}
              >
                <div className="bg-[#2563EB]/10 text-[#2563EB] p-4 rounded-2xl mb-4 shadow-2xs">
                  <UploadCloud className="h-10 w-10" />
                </div>
                <h3 className="font-extrabold text-lg text-[#1E293B] mb-1">Drag & drop your resume here</h3>
                <p className="text-xs text-[#64748B] font-medium mb-6 max-w-sm">
                  Supports PDF and DOCX files. Groq AI will parse your skills in seconds.
                </p>
                <input
                  type="file"
                  id="resume-upload-input"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                />
                <Button asChild isLoading={isWorking} className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-2xl font-extrabold shadow-md shadow-blue-500/15">
                  <label htmlFor="resume-upload-input" className="cursor-pointer">
                    {isWorking ? "Parsing Resume..." : "Browse Computer Files"}
                  </label>
                </Button>
              </div>
            )}
          </div>

          {/* Dominant Feature Card: ATS Score & Analytics */}
          {resume && (
            <div className="bg-gradient-to-br from-[#F3E8FF] via-[#F4F7FE] to-white border border-[#8B5CF6]/30 rounded-[28px] p-8 sm:p-10 shadow-subtle space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2 text-[#1E293B]">
                    <Award className="h-6 w-6 text-[#8B5CF6]" /> ATS Compatibility Score
                  </h2>
                  <p className="text-xs text-[#64748B] font-semibold mt-1">Automated screening assessment against ATS standards</p>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold border ${getScoreBadge(atsScore).color}`}>
                  {getScoreBadge(atsScore).label}
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="text-4xl font-black text-[#2563EB]">{atsScore}</span>
                  <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-1.5">ATS Score / 100</span>
                </div>
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="text-3xl font-extrabold text-[#8B5CF6]">{resume.parsedData?.technicalSkills?.length || 0}</span>
                  <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-1.5">Tech Skills Extracted</span>
                </div>
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-xs">
                  <span className="text-3xl font-extrabold text-emerald-600">{recData?.data?.recommendedJobs?.length || 0}</span>
                  <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mt-1.5">Matched Active Jobs</span>
                </div>
              </div>

              {/* Score Bar */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-extrabold text-[#1E293B]">
                  <span>ATS Readiness Gauge</span>
                  <span>{atsScore}%</span>
                </div>
                <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden border border-[#E2E8F0]">
                  <div
                    className="bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] h-full rounded-full transition-all duration-1000"
                    style={{ width: `${atsScore}%` }}
                  />
                </div>
              </div>

              {/* ATS Improvement Suggestions */}
              {resume.parsedData?.atsFeedback && resume.parsedData.atsFeedback.length > 0 && (
                <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl space-y-3 shadow-xs">
                  <h4 className="text-xs font-extrabold text-amber-600 uppercase tracking-wider flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" /> Recommended ATS Improvements
                  </h4>
                  <ul className="space-y-2 pl-1">
                    {resume.parsedData.atsFeedback.map((item: string, idx: number) => (
                      <li key={idx} className="text-xs font-medium text-[#1E293B] flex items-start gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* AI Extracted Skills Breakdown (#F4EEFF Skill Bubbles with Thin Purple Border) */}
          {resume && resume.parsedData && (
            <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 sm:p-10 shadow-subtle space-y-8">
              <h2 className="text-xl font-extrabold flex items-center gap-2 border-b border-[#E2E8F0] pb-4 text-[#1E293B]">
                <Sparkles className="h-5 w-5 text-[#8B5CF6]" /> Extracted Skill Matrix
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#8B5CF6]" /> Technical Skills
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {resume.parsedData.technicalSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-[#F4EEFF] text-[#8B5CF6] border border-[#8B5CF6]/30 text-xs px-4 py-2 rounded-2xl font-extrabold shadow-2xs hover:bg-[#8B5CF6] hover:text-white transition-all cursor-default"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-xs text-[#64748B]">No technical skills detected.</span>}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mb-4 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-600" /> Soft Skills & Traits
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {resume.parsedData.softSkills?.map((skill: string) => (
                      <span
                        key={skill}
                        className="bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs px-4 py-2 rounded-2xl font-extrabold shadow-2xs"
                      >
                        {skill}
                      </span>
                    )) || <span className="text-xs text-[#64748B]">No soft skills detected.</span>}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0]">
                  <h3 className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider mb-3">Experience Summary</h3>
                  <div className="bg-white border border-[#E2E8F0] rounded-2xl p-5 text-sm leading-relaxed text-[#1E293B] font-medium italic shadow-xs">
                    "{resume.parsedData.experienceSummary || "No summary provided."}"
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Skill Gap & Career Advice Card */}
          {recData?.data?.recommendedSkills && recData.data.recommendedSkills.length > 0 && (
            <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 sm:p-10 shadow-subtle space-y-6">
              <div>
                <h2 className="text-xl font-extrabold flex items-center gap-2 text-[#1E293B]">
                  <Target className="h-5 w-5 text-[#2563EB]" /> AI Skill Gap Analysis & Target Skills
                </h2>
                <p className="text-xs text-[#64748B] font-medium mt-1">Acquiring these skills will increase your match rate for higher-paying roles</p>
              </div>

              <div className="grid gap-4">
                {recData.data.recommendedSkills.map((skill, idx) => (
                  <div key={idx} className="border border-[#E2E8F0] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white shadow-xs">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-[#1E293B]">{skill.name}</span>
                        <span
                          className={`text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full border ${
                            skill.importance === "High"
                              ? "bg-rose-50 text-rose-600 border-rose-200"
                              : skill.importance === "Medium"
                              ? "bg-amber-50 text-amber-600 border-amber-200"
                              : "bg-blue-50 text-[#2563EB] border-blue-200"
                          }`}
                        >
                          {skill.importance} Priority
                        </span>
                      </div>
                      <p className="text-xs text-[#64748B] font-medium">{skill.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* AI Matched Jobs Section */}
          {resume && (
            <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 sm:p-10 shadow-subtle space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
                <div>
                  <h2 className="text-xl font-extrabold flex items-center gap-2 text-[#1E293B]">
                    <Briefcase className="h-5 w-5 text-[#2563EB]" /> AI Matched Job Opportunities
                  </h2>
                  <p className="text-xs text-[#64748B] font-medium mt-1">Roles autonomously ranked by skill similarity score</p>
                </div>
                {recData?.data?.recommendedJobs?.length ? (
                  <span className="bg-[#2563EB] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-xs">
                    {recData.data.recommendedJobs.length} Matches Found
                  </span>
                ) : null}
              </div>

              {isLoadingRecs ? (
                <div className="text-center py-12 text-[#64748B] animate-pulse space-y-3 font-semibold">
                  <RefreshCw className="h-8 w-8 animate-spin mx-auto text-[#2563EB]" />
                  <p className="text-sm">Groq Llama 3.3 70B is analyzing candidate-job alignment...</p>
                </div>
              ) : recData?.data?.recommendedJobs?.length ? (
                <div className="grid gap-6">
                  {recData.data.recommendedJobs.map((rec) => {
                    const job = rec.jobDetails;
                    return (
                      <div
                        key={rec.jobId}
                        className="border border-[#E2E8F0] rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all bg-white"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-extrabold text-lg text-[#1E293B]">
                              {job?.title || "Matching Position"}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2.5 text-xs text-[#64748B] font-semibold mt-1">
                              {job?.category && <span className="bg-[#F4F7FE] px-3 py-1 rounded-full border border-[#E2E8F0]">{job.category}</span>}
                              {job?.location && (
                                <span className="flex items-center gap-1">
                                  <MapPin className="h-3.5 w-3.5 text-[#2563EB]" /> {job.location}
                                </span>
                              )}
                              {job?.workMode && <span className="text-[#2563EB] font-bold">{job.workMode}</span>}
                              {job?.salaryRange && (
                                <span className="flex items-center gap-1 text-emerald-600 font-extrabold">
                                  <DollarSign className="h-3.5 w-3.5" /> {job.salaryRange}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <span className="bg-[#F3E8FF] border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-2xs">
                              {rec.matchPercentage}% Match
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#64748B] mb-5 line-clamp-2 leading-relaxed bg-[#F4F7FE] border border-[#E2E8F0] p-4 rounded-xl font-medium">
                          <strong className="text-[#1E293B] font-bold">AI Match Rationale: </strong>
                          {rec.reason}
                        </p>

                        <div className="flex justify-end">
                          <Link href={`/jobs/${job?._id || rec.jobId}`}>
                            <Button size="sm" className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white gap-1 rounded-full font-bold px-6">
                              View & Apply Job <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-[#64748B] space-y-2 font-medium">
                  <p className="font-extrabold text-sm text-[#1E293B]">No active job matches found at this time.</p>
                  <p className="text-xs">New jobs are posted daily. We will update matches automatically.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Info Column */}
        <div className="space-y-6">
          <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 text-[#1E293B] shadow-subtle space-y-5">
            <div className="bg-[#2563EB]/10 p-3.5 rounded-2xl w-fit text-[#2563EB]">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="font-extrabold text-lg text-[#1E293B]">How Agentic AI Matching Works</h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Our Agentic AI leverages Groq Llama 3.3 70B to analyze contextual experience rather than plain keywords. It evaluates candidate capability and domain depth against live job requirements.
            </p>
            <ul className="space-y-3 text-xs pt-2 font-bold text-[#1E293B]">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Contextual Skill & Experience Mapping
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> ATS Compatibility Score Computation
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" /> Targeted Skill Gap Recommendations
              </li>
            </ul>
          </div>

          <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 shadow-subtle space-y-3">
            <h3 className="font-extrabold text-sm flex items-center gap-2 text-[#1E293B]">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-600" /> Privacy & Security Guarantee
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Your resume data is stored securely and only shared with employers when you explicitly apply for a job posting.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
