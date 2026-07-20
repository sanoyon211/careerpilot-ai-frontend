"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";
import { Button } from "@/components/common/Button";
import { ArrowLeft } from "lucide-react";
import { useGetJobByIdQuery } from "@/redux/api/jobsApi";
import { useApplyForJobMutation } from "@/redux/api/applicationApi";
import { useGenerateCoverLetterMutation } from "@/redux/api/aiApi";
import { useGetMyResumeQuery } from "@/redux/api/resumeApi";
import { toast } from "sonner";
import { JobDetailHeader } from "@/components/jobs/JobDetailHeader";
import { JobDetailDescription } from "@/components/jobs/JobDetailDescription";
import { JobDetailSidebar } from "@/components/jobs/JobDetailSidebar";
import { JobApplyModal } from "@/components/jobs/JobApplyModal";

export default function JobDetailsPage() {
  const routeParams = useParams<{ id: string }>();
  const id = routeParams.id;
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user);
  const { data: jobResponse, isLoading } = useGetJobByIdQuery(id);
  const { data: resumeResponse } = useGetMyResumeQuery(undefined, { skip: !user || user?.role !== "job-seeker" });

  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const [generateCoverLetter, { isLoading: isGenerating }] = useGenerateCoverLetterMutation();

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
          return "Application submitted successfully!";
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
        <Link href="/explore-jobs" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to explore jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <JobDetailHeader
              job={job}
              isAppliedSuccess={isAppliedSuccess}
              onOpenApplyModal={handleOpenApplyModal}
              onGenerateCoverLetter={handleGenerateAICoverLetter}
              isGenerating={isGenerating}
              coverLetter={coverLetter}
            />

            <JobDetailDescription fullDescription={job.fullDescription} />
          </div>

          <JobDetailSidebar employerName={job.employerId?.name} />
        </div>
      </div>

      {isApplyModalOpen && (
        <JobApplyModal
          jobTitle={job.title}
          employerName={job.employerId?.name}
          applicantName={applicantName}
          setApplicantName={setApplicantName}
          applicantEmail={applicantEmail}
          setApplicantEmail={setApplicantEmail}
          applicantPhone={applicantPhone}
          setApplicantPhone={setApplicantPhone}
          coverLetter={coverLetter}
          setCoverLetter={setCoverLetter}
          onClose={() => setIsApplyModalOpen(false)}
          onSubmit={handleConfirmApplication}
          onGenerateAICoverLetter={handleGenerateAICoverLetter}
          isApplying={isApplying}
        />
      )}
    </div>
  );
}
