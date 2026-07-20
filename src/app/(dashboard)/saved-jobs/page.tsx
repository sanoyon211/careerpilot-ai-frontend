"use client";

import { MapPin, DollarSign, Clock, Bookmark, Trash2, ExternalLink, Sparkles } from "lucide-react";
import { Button } from "@/components/common/Button";
import Link from "next/link";
import { useGetSavedJobsQuery, useRemoveSavedJobMutation } from "@/redux/api/savedJobsApi";
import { toast } from "sonner";

export default function SavedJobsPage() {
  const { data: response, isLoading } = useGetSavedJobsQuery();
  const [removeSavedJob] = useRemoveSavedJobMutation();
  const savedJobs = response?.data || [];

  const handleRemove = async (id: string) => {
    try {
      await removeSavedJob(id).unwrap();
      toast.success("Job removed from saved list");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to remove job");
    }
  };

  if (isLoading) {
    return <div className="p-16 text-center text-[#64748B] font-semibold">Loading saved jobs...</div>;
  }

  return (
    <div className="max-w-6xl space-y-8 pb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1E293B]">Saved Jobs</h1>
        <p className="text-[#64748B] font-medium mt-1 text-sm">Jobs you've bookmarked for later review.</p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedJobs.map((item) => {
            const job = item.job;
            if (!job) return null;
            return (
              <div
                key={item._id}
                className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-7 hover:border-[#CBD5E1] transition-all flex flex-col relative group"
              >
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-5 right-5 p-2.5 bg-white border border-[#E5E7EB] rounded-full text-[#64748B] hover:text-red-600 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100 z-10 cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="h-4 w-4 text-[#0F172A]" strokeWidth={1.5} />
                </button>

                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[#8B5CF6] text-white flex items-center justify-center text-xl font-extrabold shrink-0">
                    {job.company?.charAt(0) || "C"}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-[#1E293B] line-clamp-1 pr-6">{job.title}</h3>
                    <p className="text-xs font-semibold text-[#64748B] mt-0.5">{job.company}</p>
                  </div>
                </div>

                {job.isAiMatch && (
                  <div className="mb-4">
                    <span className="inline-flex items-center bg-[#F3E8FF] border border-[#8B5CF6]/30 text-[#8B5CF6] text-xs font-extrabold px-3 py-1 rounded-lg">
                      High AI Match
                    </span>
                  </div>
                )}

                <div className="space-y-2 mb-6 mt-auto text-xs font-semibold text-[#64748B]">
                  <div>{job.location || "Location not specified"}</div>
                  {job.salaryRange && (
                    <div className="text-[#0F172A] font-extrabold">{job.salaryRange}</div>
                  )}
                  <div>Saved {new Date(item.createdAt).toLocaleDateString()}</div>
                </div>

                <div className="flex gap-3 mt-auto border-t border-[#E5E7EB] pt-4">
                  <Link href={`/jobs/${job._id}`} className="flex-1">
                    <Button className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg font-bold">Apply Now</Button>
                  </Link>
                  <Link href={`/jobs/${job._id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-lg font-bold">
                      Details
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-16 text-center">
          <h3 className="text-xl font-extrabold text-[#1E293B] mb-2">No saved jobs</h3>
          <p className="text-[#64748B] text-sm font-medium mb-6">You haven't bookmarked any jobs yet. Start exploring to find your perfect match.</p>
          <Link href="/explore-jobs">
            <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg font-extrabold px-8 py-3">
              Explore Jobs
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
