"use client";

import { X, User, Mail, Phone, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";

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
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E2E8F0] rounded-[32px] p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5">
        <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#1E293B]">Apply for Position</h2>
            <p className="text-xs text-[#64748B] font-medium mt-0.5">{jobTitle} at {employerName || "Employer"}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#F4F7FE] text-[#64748B] hover:text-[#1E293B]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-[#2563EB]" /> Full Name
              </label>
              <Input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Your Full Name"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-[#2563EB]" /> Email Address
              </label>
              <Input
                type="email"
                value={applicantEmail}
                onChange={(e) => setApplicantEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1">
              <Phone className="h-3.5 w-3.5 text-[#2563EB]" /> Phone Number
            </label>
            <Input
              type="text"
              value={applicantPhone}
              onChange={(e) => setApplicantPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              required
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold text-[#64748B] uppercase">
                Cover Letter (Optional)
              </label>
              <button
                type="button"
                onClick={onGenerateAICoverLetter}
                className="text-xs font-extrabold text-[#8B5CF6] hover:underline flex items-center gap-1"
              >
                <Sparkles className="h-3.5 w-3.5" /> Auto-Generate AI
              </button>
            </div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit..."
              className="w-full h-28 p-3 rounded-2xl border border-[#E2E8F0] bg-[#F4F7FE] text-xs font-medium text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] resize-y"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Button type="button" variant="outline" className="rounded-xl font-bold" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isApplying} className="bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl px-6 gap-2 font-extrabold">
              <Send className="h-4 w-4" /> Send Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
