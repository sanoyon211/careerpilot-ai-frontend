"use client"

import { useState } from "react"
import { Button } from "@/components/common/Button"
import { Briefcase, MapPin, DollarSign, List, Tag, FileText, Send, Sparkles } from "lucide-react"

export default function AddJobPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAiEnhance, setShowAiEnhance] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Job posted successfully!")
    }, 1500)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Post a New Job</h1>
          <p className="text-muted-foreground mt-1">Fill in the details below to create a new job listing.</p>
        </div>
        <Button variant="outline" className="gap-2 text-primary border-primary/20 bg-primary/5 hover:bg-primary/10" onClick={() => setShowAiEnhance(true)}>
          <Sparkles className="h-4 w-4" /> AI Enhance
        </Button>
      </div>

      {showAiEnhance && (
        <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border border-primary/20 rounded-2xl p-6 shadow-sm flex gap-4">
          <Sparkles className="h-8 w-8 text-primary shrink-0" />
          <div>
            <h3 className="font-bold text-primary mb-1">AI Job Description Generator</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Not sure how to write the perfect description? Just type the job title and key requirements, and our AI will generate a professional, bias-free job post for you.
            </p>
            <div className="flex gap-2">
              <input type="text" placeholder="e.g. React Developer with 3 years experience" className="flex-1 rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              <Button size="sm">Generate</Button>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Basic Information</h3>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title *</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="text" required placeholder="e.g. Senior Frontend Engineer" className="w-full pl-10 pr-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Category / Industry *</label>
              <div className="relative">
                <Tag className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <select required className="w-full pl-10 pr-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
                  <option value="">Select a category</option>
                  <option>Software Engineering</option>
                  <option>Data Science</option>
                  <option>Design / UX</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Short Description (Summary) *</label>
            <textarea required rows={2} placeholder="A brief summary of the role to display on the job card..." className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
          </div>
        </div>

        {/* Job Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Job Details</h3>
          
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Location *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input type="text" required placeholder="e.g. New York, NY" className="w-full pl-10 pr-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Work Mode *</label>
              <select required className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Job Type *</label>
              <select required className="w-full px-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Salary Range</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="e.g. $100,000 - $130,000" className="w-full pl-10 pr-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <p className="text-xs text-muted-foreground">Adding a salary range increases applications by up to 30%.</p>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Full Description</h3>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Responsibilities & Requirements *</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <textarea required rows={8} placeholder="List the full responsibilities, requirements, and benefits..." className="w-full pl-10 pr-3 py-2.5 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit" isLoading={isSubmitting} className="gap-2">
            <Send className="h-4 w-4" /> Publish Job
          </Button>
        </div>

      </form>
    </div>
  )
}
