"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetJobByIdQuery } from "@/redux/api/jobsApi";
import { useApplyForJobMutation } from "@/redux/api/applicationApi";
import { useGenerateCoverLetterMutation } from "@/redux/api/aiApi";
import { useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { JobDetailHeader } from "@/components/jobs/JobDetailHeader";
import { JobDetailDescription } from "@/components/jobs/JobDetailDescription";
import { JobDetailSidebar } from "@/components/jobs/JobDetailSidebar";
import { JobApplyModal } from "@/components/jobs/JobApplyModal";

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const { user } = useAppSelector((state) => state.auth);
  const { data: jobResponse, isLoading: isLoadingJob } = useGetJobByIdQuery(id, { skip: !id });
  const [applyForJob, { isLoading: isApplying }] = useApplyForJobMutation();
  const [generateCoverLetter, { isLoading: isGeneratingCoverLetter }] = useGenerateCoverLetterMutation();

  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applicantName, setApplicantName] = useState(user?.name || "");
  const [applicantEmail, setApplicantEmail] = useState(user?.email || "");
  const [applicantPhone, setApplicantPhone] = useState(user?.phone || "");
  const [coverLetter, setCoverLetter] = useState("");
  const [isAppliedSuccess, setIsAppliedSuccess] = useState(false);

  const job = jobResponse?.data;

  const handleOpenApplyModal = () => {
    if (!user) {
      toast.error("Please login to apply for this job");
      router.push(`/login?redirect=/jobs/${id}`);
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleGenerateAICoverLetter = async () => {
    if (!user) {
      toast.error("Please login to generate cover letter");
      return;
    }

    try {
      toast.loading("Groq AI is crafting your tailored cover letter...", { id: "cover-letter-gen" });
      const res = await generateCoverLetter({ jobId: id }).unwrap();
      const generatedText = res?.data?.coverLetter || res?.coverLetter || "";
      setCoverLetter(generatedText);
      toast.success("AI Cover Letter generated successfully!", { id: "cover-letter-gen" });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to generate cover letter", { id: "cover-letter-gen" });
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await applyForJob({
        jobId: id,
        applicantName,
        applicantEmail,
        applicantPhone,
        coverLetter,
      }).unwrap();

      toast.success("Application submitted successfully!");
      setIsAppliedSuccess(true);
      setIsApplyModalOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to submit application");
    }
  };

  if (isLoadingJob) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 text-center font-bold text-[#64748B] animate-pulse">
        Loading job position details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-20 text-center space-y-4">
        <h2 className="text-2xl font-black text-[#0F172A]">Job position not found</h2>
        <Link href="/explore-jobs">
          <Button variant="outline" className="rounded-full font-bold">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Job Listings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20 space-y-10">
      <Link href="/explore-jobs">
        <Button variant="outline" size="sm" className="gap-2 rounded-full font-extrabold text-xs">
          <ArrowLeft className="h-4 w-4" /> Back to Explore Jobs
        </Button>
      </Link>

      <JobDetailHeader
        job={job}
        isAppliedSuccess={isAppliedSuccess}
        onOpenApplyModal={handleOpenApplyModal}
        onGenerateCoverLetter={handleGenerateAICoverLetter}
        isGenerating={isGeneratingCoverLetter}
        coverLetter={coverLetter}
      />

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <JobDetailDescription fullDescription={job.description} />
        </div>
        <div>
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
          onSubmit={handleApplySubmit}
          onGenerateAICoverLetter={handleGenerateAICoverLetter}
          isApplying={isApplying}
        />
      )}
    </div>
  );
}
