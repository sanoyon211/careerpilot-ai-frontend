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
    <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-[#2563EB] text-white font-extrabold flex items-center justify-center text-2xl sm:text-3xl shadow-md">
            {job.employerId?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#1E293B]">{job.title}</h1>
            <div className="text-base text-[#2563EB] font-extrabold mt-1 mb-4">{job.employerId?.name || "Company"}</div>

            <div className="flex flex-wrap gap-y-3 gap-x-6 text-xs sm:text-sm text-[#64748B] font-semibold">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#2563EB]" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-[#2563EB]" /> {job.jobType} • {job.workMode}</span>
              {job.salaryRange && (
                <span className="flex items-center gap-1.5 text-emerald-600 font-extrabold"><DollarSign className="h-4 w-4" /> {job.salaryRange}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row gap-4 items-center flex-wrap">
        {isAppliedSuccess ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" /> Applied to this position
          </div>
        ) : (
          <Button size="lg" className="w-full sm:w-auto px-8 text-base bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-extrabold shadow-sm gap-2" onClick={onOpenApplyModal}>
            <Send className="h-4.5 w-4.5" /> Apply Now
          </Button>
        )}

        <Button variant="ai" size="lg" className="gap-2 rounded-2xl font-extrabold" onClick={onGenerateCoverLetter} isLoading={isGenerating}>
          <Sparkles className="h-4 w-4 text-white" /> AI Cover Letter
        </Button>

        <div className="ml-auto flex items-center gap-2 text-xs text-[#64748B] font-semibold self-center">
          <Clock className="h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()} • {job.applicantsCount || 0} applicants
        </div>
      </div>

      {coverLetter && (
        <div className="mt-6 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs">
          <h3 className="font-extrabold text-sm mb-3 flex items-center gap-2 text-[#8B5CF6]">
            <FileText className="h-4 w-4" /> AI Generated Cover Letter
          </h3>
          <div className="whitespace-pre-line text-xs leading-relaxed font-sans text-[#1E293B]">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
