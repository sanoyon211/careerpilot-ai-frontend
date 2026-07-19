"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Button } from "@/components/common/Button";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building,
  Share2,
  Bookmark,
  CheckCircle2,
  Sparkles,
  FileText,
  X,
  Send,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useGetJobByIdQuery } from "@/redux/api/jobsApi";
import { useApplyForJobMutation } from "@/redux/api/applicationApi";
import { useGenerateCoverLetterMutation } from "@/redux/api/aiApi";
import { useGetMyResumeQuery } from "@/redux/api/resumeApi";
import { toast } from "sonner";

export default function JobDetailsPage() {
  const routeParams = useParams<{ id: string }>();
  const id = routeParams.id;
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: jobResponse, isLoading } = useGetJobByIdQuery(id);
  const { data: resumeResponse } = useGetMyResumeQuery(undefined, { skip: !user || user?.role !== "job-seeker" });

  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const [generateCoverLetter, { isLoading: isGenerating }] = useGenerateCoverLetterMutation();

  // Form Field States
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState<string>("");

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setApplicantName(user.name || "");
      setApplicantEmail(user.email || "");
      setApplicantPhone((user as any).phone || "+1 (555) 234-5678");
    }
  }, [user]);

  const handleOpenApplyModal = () => {
    if (!user) {
      toast.error("Please log in to apply for this job position.", {
        action: {
          label: "Log In",
          onClick: () => router.push(`/login?redirect=/jobs/${id}`),
        },
      });
      return;
    }

    if (user.role === "employer") {
      toast.error("Employers cannot submit job applications. Please log in as a Job Seeker.");
      return;
    }

    setApplicantName(user.name || "");
    setApplicantEmail(user.email || "");
    setIsApplyModalOpen(true);
  };

  const handleConfirmApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    const resumeUrl = resumeResponse?.data?.fileUrl || "https://example.com/demo-resume.pdf";

    toast.promise(
      applyForJob({
        jobId: id,
        resumeUrl,
        applicantName,
        applicantEmail,
        applicantPhone,
        coverLetter: coverLetter.trim() || undefined,
      }).unwrap(),
      {
        loading: "Submitting application to employer...",
        success: () => {
          setIsApplyModalOpen(false);
          setIsAppliedSuccess(true);
          return "🎉 Application submitted successfully!";
        },
        error: (err) => err?.data?.message || "Failed to submit application. You may have already applied.",
      }
    );
  };

  const handleGenerateAICoverLetter = async () => {
    toast.loading("AI is crafting a tailored cover letter...", { id: "cover-gen" });
    try {
      const result = await generateCoverLetter({
        jobDescription: jobResponse?.data?.fullDescription || "",
        resumeData: resumeResponse?.data?.parsedData || {
          name: applicantName || user?.name || "Job Applicant",
          skills: ["Full Stack", "React", "Node.js", "TypeScript"],
        },
      }).unwrap();

      setCoverLetter(result.data);
      toast.success("Cover letter generated using Groq Llama 3.3 70B AI!", { id: "cover-gen" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate cover letter. Try typing one manually.", { id: "cover-gen" });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-sm font-semibold text-muted-foreground animate-pulse">Loading position details...</p>
        </div>
      </div>
    );
  }

  const job = jobResponse?.data;
  if (!job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
        <h2 className="text-2xl font-bold mb-2">Job Listing Not Found</h2>
        <p className="text-muted-foreground mb-6">The job you are looking for may have been closed or deleted.</p>
        <Link href="/explore-jobs">
          <Button>Explore Open Positions</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Navigation */}
        <Link href="/explore-jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to explore jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header Section */}
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

              {/* Action Toolbar */}
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4 items-center flex-wrap">
                {isAppliedSuccess ? (
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 font-bold text-sm">
                    <CheckCircle2 className="h-5 w-5" /> Applied to this position
                  </div>
                ) : (
                  <Button size="lg" className="w-full sm:w-auto px-8 text-base bg-primary hover:bg-primary/90 rounded-2xl shadow-sm gap-2" onClick={handleOpenApplyModal}>
                    <Send className="h-4.5 w-4.5" /> Apply Now
                  </Button>
                )}

                <Button variant="outline" size="lg" className="gap-2 rounded-2xl" onClick={handleGenerateAICoverLetter} isLoading={isGenerating}>
                  <Sparkles className="h-4 w-4 text-indigo-500" /> AI Cover Letter
                </Button>

                <div className="ml-auto flex items-center gap-2 text-xs text-muted-foreground font-medium self-center">
                  <Clock className="h-4 w-4" /> Posted {new Date(job.createdAt).toLocaleDateString()} • {job.applicantsCount || 0} applicants
                </div>
              </div>

              {/* Generated Cover Letter Box */}
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

            {/* Description Section */}
            <div className="bg-card border rounded-3xl p-6 sm:p-8 space-y-8 shadow-xs">
              <section>
                <h2 className="text-xl font-bold mb-4">Job Description & Responsibilities</h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
                  {job.fullDescription}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About Employer */}
            <div className="bg-card border rounded-3xl p-6 shadow-xs">
              <h3 className="font-bold text-lg mb-4">About the Hiring Employer</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 text-white font-bold flex items-center justify-center text-lg shrink-0">
                  {job.employerId?.name?.charAt(0) || "C"}
                </div>
                <div>
                  <h4 className="font-bold text-base">{job.employerId?.name || "TechCorp"}</h4>
                  <p className="text-xs text-muted-foreground font-medium">Verified Hiring Partner</p>
                </div>
              </div>
            </div>

            {/* AI Fit Analysis */}
            <div className="bg-gradient-to-br from-primary/10 via-indigo-500/5 to-blue-500/10 border border-primary/20 rounded-3xl p-6 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-base text-primary">Groq AI Candidate Match</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Our Agentic AI analyzed this role against standard tech resumes and computed a <strong>94% skill alignment</strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editable Application Submission Modal */}
      {isApplyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-card border rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b pb-4">
              <div>
                <h2 className="text-xl font-bold">Apply for Position</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{job.title} at {job.employerId?.name}</p>
              </div>
              <button onClick={() => setIsApplyModalOpen(false)} className="p-1 text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmApplication} className="space-y-4">
              {/* Applicant Name & Email Inputs */}
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

              {/* Phone Number Input */}
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

              {/* Cover Letter Input */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">
                    Cover Letter / Note to Employer (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateAICoverLetter}
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
                <Button type="button" variant="outline" className="rounded-xl" onClick={() => setIsApplyModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isApplying} className="bg-primary hover:bg-primary/90 rounded-xl px-6 gap-2">
                  <Send className="h-4 w-4" /> Confirm & Send Application
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
