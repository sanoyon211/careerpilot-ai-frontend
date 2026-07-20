"use client";

import { X, User, Mail, Phone, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/common/Button";

interface JobApplyModalProps {
  jobTitle: string;
  employerName?: string;
  applicantName: string;
  setApplicantName: (val: string) => void;
  applicantEmail: string;
  setApplicantEmail: (val: string) => void;
  applicantPhone: string;
  setApplicantPhone: (val: string) => void;
  coverLetter: string;
  setCoverLetter: (val: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onGenerateAICoverLetter: () => void;
  isApplying: boolean;
}

export function JobApplyModal({
  jobTitle,
  employerName,
  applicantName,
  setApplicantName,
  applicantEmail,
  setApplicantEmail,
  applicantPhone,
  setApplicantPhone,
  coverLetter,
  setCoverLetter,
  onClose,
  onSubmit,
  onGenerateAICoverLetter,
  isApplying,
}: JobApplyModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card border rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h2 className="text-xl font-bold">Apply for Position</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{jobTitle} at {employerName || "Employer"}</p>
          </div>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-primary" /> Full Name
              </label>
              <input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Your Full Name"
                className="w-full px-3.5 py-2 rounded-xl border bg-background text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-primary" /> Email Address
              </label>
              <input
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2 rounded-xl border bg-background text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-primary" /> Phone Number
            </label>
            <input
              type="text"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full px-3.5 py-2 rounded-xl border bg-background text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-muted-foreground uppercase">
                Cover Letter / Note to Employer (Optional)
              </label>
              <button
                type="button"
                onClick={onGenerateAICoverLetter}
                className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3 w-3" /> Auto-Generate AI
              </button>
            </div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit for this role..."
              className="w-full h-28 p-3 rounded-2xl border bg-background text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary resize-y"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" className="rounded-xl" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isApplying} className="bg-primary hover:bg-primary/90 rounded-xl px-6 gap-2">
              <Send className="h-4 w-4" /> Confirm & Send Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
