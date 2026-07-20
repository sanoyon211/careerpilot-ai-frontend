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
    <div className="bg-card border rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
        <div className="flex items-start gap-6">
          <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white font-extrabold flex items-center justify-center text-2xl sm:text-3xl shadow-md">
            {job.employerId?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">{job.title}</h1>
            <div className="text-base text-primary font-bold mt-1 mb-4">{job.employerId?.name || "Company"}</div>

            <div className="flex flex-wrap gap-y-3 gap-x-6 text-xs sm:text-sm text-muted-foreground font-medium">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-indigo-500" /> {job.location}</span>
              <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-primary" /> {job.jobType} • {job.workMode}</span>
              {job.salaryRange && (
                <span className="flex items-center gap-1.5 text-emerald-600 font-bold"><DollarSign className="h-4 w-4" /> {job.salaryRange}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 items-center flex-wrap">
        {isAppliedSuccess ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-sm">
            <CheckCircle2 className="h-5 w-5" /> Applied to this position
          </div>
        ) : (
          <Button size="lg" className="w-full sm:w-auto px-8 text-base bg-primary hover:bg-primary/90 rounded-2xl shadow-sm gap-2" onClick={onOpenApplyModal}>
            <Send className="h-4.5 w-4.5" /> Apply Now
          </Button>
        )}

        <Button variant="outline" size="lg" className="gap-2 rounded-2xl" onClick={onGenerateCoverLetter} isLoading={isGenerating}>
          <Sparkles className="h-4 w-4 text-indigo-500" /> AI Cover Letter
        </Button>

        <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground font-medium self-center">
          <Clock className="h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()} • {job.applicantsCount || 0} applicants
        </div>
      </div>

      {coverLetter && (
        <div className="mt-6 bg-slate-50 dark:bg-slate-900 border rounded-2xl p-6">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2 text-primary">
            <FileText className="h-4 w-4" /> AI Generated Cover Letter
          </h3>
          <div className="whitespace-pre-line text-xs leading-relaxed font-serif text-muted-foreground">
            {coverLetter}
          </div>
        </div>
      )}
    </div>
  );
}
