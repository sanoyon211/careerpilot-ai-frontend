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
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-8 sm:p-10 w-full max-w-xl space-y-6">
        <div className="flex justify-between items-center border-b border-[#E5E7EB] pb-5">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Apply for Position</h2>
            <p className="text-xs text-[#64748B] font-semibold mt-1">{jobTitle} at {employerName || "Employer"}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-[#FAFAFA] text-[#64748B] hover:text-[#0F172A]">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#8B5CF6]" /> Full Name
              </label>
              <Input
                type="text"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                placeholder="Your Full Name"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#8B5CF6]" /> Email Address
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

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#64748B] uppercase flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-[#8B5CF6]" /> Phone Number
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
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-[#64748B] uppercase">
                Cover Letter (Optional)
              </label>
              <button
                type="button"
                onClick={onGenerateAICoverLetter}
                className="text-xs font-black text-[#8B5CF6] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" /> Auto-Generate AI
              </button>
            </div>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Introduce yourself and explain why you're a great fit..."
              className="w-full h-32 p-4 rounded-2xl border border-[#E5E7EB] bg-white text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] resize-y"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <Button type="button" variant="outline" className="rounded-lg font-bold px-6" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" isLoading={isApplying} className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg px-8 gap-2 font-extrabold">
              <Send className="h-4 w-4" /> Send Application
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
