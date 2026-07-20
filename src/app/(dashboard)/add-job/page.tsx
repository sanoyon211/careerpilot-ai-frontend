"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Briefcase, MapPin, DollarSign, List, Tag, FileText, Send, Sparkles } from "lucide-react";
import { useCreateJobMutation } from "@/redux/api/jobsApi";
import { useRouter } from "next/navigation";
import { SwalSuccess, SwalError } from "@/utils/swal";

export default function AddJobPage() {
  const [showAiEnhance, setShowAiEnhance] = useState(false);
  const [createJob, { isLoading: isSubmitting }] = useCreateJobMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const jobData = {
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      shortDescription: formData.get("shortDescription") as string,
      fullDescription: formData.get("fullDescription") as string,
      location: formData.get("location") as string,
      workMode: formData.get("workMode") as "Remote" | "Hybrid" | "On-site",
      jobType: formData.get("jobType") as "Full-time" | "Part-time" | "Contract" | "Internship",
      salaryRange: (formData.get("salaryRange") as string) || undefined,
      imageUrl: (formData.get("imageUrl") as string) || undefined,
      status: "Active" as const,
    };

    try {
      await createJob(jobData).unwrap();
      SwalSuccess("Job Posted!", "Your job listing is live and visible to candidates.");
      router.push("/manage-jobs");
    } catch (err: any) {
      SwalError("Failed to Post Job", err.data?.message || "Something went wrong while posting the job.");
    }
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">Post a New Job</h1>
          <p className="text-muted-foreground mt-1 text-sm font-normal">Fill in the details below to publish a new job listing.</p>
        </div>
        <Button variant="outline" className="text-[#8B5CF6] border-[#8B5CF6]/30 bg-[#F3E8FF] hover:bg-[#F3E8FF]/80 rounded-lg font-extrabold text-xs" onClick={() => setShowAiEnhance(true)}>
          AI Enhance
        </Button>
      </div>

      {showAiEnhance && (
        <div className="bg-[#F3E8FF]/60 border border-[#8B5CF6]/30 rounded-xl p-6 shadow-sm">
          <div>
            <h3 className="font-extrabold text-[#8B5CF6] mb-1">AI Job Description Generator</h3>
            <p className="text-sm text-muted-foreground mb-4 font-normal">
              Not sure how to write the perfect description? Type the job title and key requirements, and our AI will generate a professional job post for you.
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="e.g. React Developer with 3 years experience" className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]" />
              <Button size="sm" className="rounded-lg bg-[#8B5CF6] text-white font-extrabold">Generate</Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 sm:p-8 space-y-8">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title *</label>
              <input name="title" type="text" required placeholder="e.g. Senior Frontend Engineer" className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category / Industry *</label>
              <select name="category" required className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="">Select a category</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Design / UX">Design / UX</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description (Summary) *</label>
            <textarea name="shortDescription" required rows={2} placeholder="A brief summary of the role to display on the job card..." className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Job Details</h3>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <input name="location" type="text" required placeholder="e.g. New York, NY" className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Work Mode *</label>
              <select name="workMode" required className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type *</label>
              <select name="jobType" required className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary Range</label>
            <input name="salaryRange" type="text" placeholder="e.g. $100,000 - $130,000" className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            <p className="text-xs text-muted-foreground">Adding a salary range increases applications by up to 30%.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image URL (Optional)</label>
            <div className="relative">
              <input name="imageUrl" type="url" placeholder="https://example.com/image.jpg" className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Full Description</h3>

          <div className="space-y-2">
            <label className="text-sm font-medium">Responsibilities & Requirements *</label>
            <textarea name="fullDescription" required rows={8} placeholder="List the full responsibilities, requirements, and benefits..." className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit" isLoading={isSubmitting} className="bg-[#8B5CF6] hover:bg-[#7C3AED] rounded-lg">
            Publish Job
          </Button>
        </div>
      </form>
    </div>
  );
}
