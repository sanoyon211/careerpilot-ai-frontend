"use client";

import { MapPin, Briefcase, DollarSign, CheckCircle2, Send, Sparkles, Clock, FileText } from "lucide-react";
import { Button } from "@/components/common/Button";

interface JobDetailHeaderProps {
  job: any;
  isAppliedSuccess: boolean;
  onOpenApplyModal: () => void;
  onGenerateCoverLetter: () => void;
  isGenerating: boolean;
  coverLetter?: string;
}

export function JobDetailHeader({
  job,
  isAppliedSuccess,
  onOpenApplyModal,
  onGenerateCoverLetter,
  isGenerating,
  coverLetter,
}: JobDetailHeaderProps) {
  return (
    <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[32px] p-8 sm:p-12 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-8">
        <div className="flex items-start gap-6">
          <div className="h-18 w-18 sm:h-24 sm:w-24 shrink-0 rounded-2xl bg-[#0F172A] text-white font-black flex items-center justify-center text-3xl sm:text-4xl shadow-md">
            {job.employerId?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">{job.title}</h1>
            <div className="text-lg text-[#8B5CF6] font-extrabold mt-1.5 mb-5">{job.employerId?.name || "Company"}</div>

            <div className="flex flex-wrap gap-y-3 gap-x-8 text-xs sm:text-sm text-[#64748B] font-semibold">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#8B5CF6]" /> {job.location}</span>
              <span className="flex items-center gap-2"><Briefcase className="h-4 w-4 text-[#8B5CF6]" /> {job.jobType} • {job.workMode}</span>
              {job.salaryRange && (
                <span className="flex items-center gap-2 text-emerald-600 font-black"><DollarSign className="h-4 w-4" /> {job.salaryRange}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-4 items-center flex-wrap">
        {isAppliedSuccess ? (
          <div className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-extrabold text-sm">
            <CheckCircle2 className="h-5 w-5" /> Applied to this position
          </div>
        ) : (
          <Button size="lg" className="w-full sm:w-auto px-10 py-3.5 text-base bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full font-extrabold shadow-md shadow-purple-600/20 gap-2.5" onClick={onOpenApplyModal}>
            <Send className="h-5 w-5" /> Apply Now
          </Button>
        )}

        <Button variant="outline" size="lg" className="gap-2.5 rounded-full font-extrabold px-8 py-3.5 border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#F3E8FF]" onClick={onGenerateCoverLetter} isLoading={isGenerating}>
          <Sparkles className="h-5 w-5 text-[#8B5CF6]" /> AI Cover Letter
        </Button>

        <div className="ml-auto flex items-center gap-2 text-xs text-[#64748B] font-semibold self-center">
          <Clock className="h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()} • {job.applicantsCount || 0} applicants
        </div>
      </div>

      {coverLetter && (
        <div className="mt-8 bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-xs">
          <h3 className="font-extrabold text-base mb-4 flex items-center gap-2 text-[#8B5CF6]">
            <FileText className="h-5 w-5" /> AI Generated Cover Letter
          </h3>
          <div className="whitespace-pre-line text-sm leading-relaxed font-sans text-[#0F172A] font-medium">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
