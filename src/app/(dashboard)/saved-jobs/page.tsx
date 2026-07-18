"use client"

import { MapPin, DollarSign, Clock, Building2, Trash2, ExternalLink, Sparkles, Bookmark } from "lucide-react"
import { Button } from "@/components/common/Button"
import Link from "next/link"

import { useGetSavedJobsQuery, useRemoveSavedJobMutation } from "@/redux/api/savedJobsApi"
import { toast } from "sonner"

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
    return <div className="p-12 text-center text-muted-foreground">Loading saved jobs...</div>;
  }

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Jobs</h1>
        <p className="text-muted-foreground mt-1">Jobs you've bookmarked for later review.</p>
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {savedJobs.map(item => {
            const job = item.job;
            if (!job) return null;
            return (
            <div key={item._id} className="bg-card border rounded-2xl p-6 hover:shadow-md transition-all flex flex-col relative group">
              
              <button 
                onClick={() => handleRemove(item._id)}
                className="absolute top-4 right-4 p-2 bg-background border rounded-full text-muted-foreground hover:text-red-500 hover:border-red-200 transition-colors opacity-0 group-hover:opacity-100 shadow-sm z-10" 
                title="Remove from saved"
              >
                <Trash2 className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground border shrink-0">
                  {job.company?.charAt(0) || "C"}
                </div>
                <div>
                  <h3 className="font-semibold text-lg line-clamp-1 pr-6">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
              </div>

              {job.isAiMatch && (
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                    <Sparkles className="h-3 w-3" /> High AI Match
                  </span>
                </div>
              )}

              <div className="space-y-2 mb-6 mt-auto text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /> {job.location || "Location not specified"}</div>
                {job.salaryRange && <div className="flex items-center gap-2"><DollarSign className="h-4 w-4 shrink-0" /> {job.salaryRange}</div>}
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /> Saved {new Date(item.createdAt).toLocaleDateString()}</div>
              </div>

              <div className="flex gap-2 mt-auto border-t pt-4">
                <Button className="flex-1">Apply Now</Button>
                <Link href={`/jobs/${job._id}`} className="flex-1">
                  <Button variant="outline" className="w-full gap-2">Details <ExternalLink className="h-3.5 w-3.5" /></Button>
                </Link>
              </div>
            </div>
          )})}
        </div>
      ) : (
        <div className="bg-card border border-dashed rounded-2xl p-12 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 text-muted-foreground">
            <Bookmark className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">No saved jobs</h3>
          <p className="text-muted-foreground mb-6">You haven't bookmarked any jobs yet. Start exploring to find your perfect match.</p>
          <Link href="/explore-jobs">
            <Button>Explore Jobs</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
