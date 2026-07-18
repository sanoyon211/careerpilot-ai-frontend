"use client"

import Link from "next/link"
import { Button } from "@/components/common/Button"
import { ArrowLeft, MapPin, Briefcase, DollarSign, Clock, Building, Users, Globe, Share2, Bookmark, CheckCircle2, Sparkles } from "lucide-react"

// Mock Data
const JOB = {
  id: "1",
  title: "Senior Frontend Engineer",
  company: "TechCorp Inc.",
  location: "San Francisco, CA (Remote)",
  type: "Full-time",
  salary: "$120k - $160k",
  posted: "2 days ago",
  applicants: 45,
  isAiMatch: true,
  description: `We are looking for an experienced Senior Frontend Engineer to join our core product team. You will be responsible for building and maintaining our primary web application, ensuring a seamless and highly interactive user experience.

As a Senior Frontend Engineer at TechCorp, you will collaborate closely with designers, product managers, and backend engineers to translate complex requirements into elegant, high-performing user interfaces.`,
  responsibilities: [
    "Architect and develop scalable frontend features using React, Next.js, and TypeScript.",
    "Optimize application performance for maximum speed and scalability.",
    "Lead code reviews, provide technical guidance, and mentor junior developers.",
    "Collaborate with UX/UI designers to ensure technical feasibility of designs.",
    "Establish and promote frontend engineering best practices across the team."
  ],
  requirements: [
    "5+ years of professional experience building complex web applications.",
    "Deep expertise in React.js and its ecosystem (Hooks, Context, Redux/Zustand).",
    "Strong proficiency in TypeScript and modern JavaScript (ES6+).",
    "Experience with server-side rendering frameworks like Next.js.",
    "Solid understanding of web performance optimization techniques.",
    "Excellent communication and collaboration skills."
  ],
  benefits: [
    "Competitive salary and equity package",
    "Comprehensive health, dental, and vision insurance",
    "Flexible unlimited PTO policy",
    "Remote-first culture with home office stipend",
    "Annual learning and development budget ($2,000)"
  ],
  companyInfo: {
    name: "TechCorp Inc.",
    industry: "SaaS / Technology",
    size: "500-1000 employees",
    website: "https://techcorp.example.com",
    founded: "2015"
  }
}

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  // Static page, using mock data for params.id

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Back Navigation */}
        <Link href="/explore-jobs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to all jobs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Header Section */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                <div className="flex items-start gap-6">
                  <div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-xl bg-muted flex items-center justify-center text-2xl sm:text-3xl font-bold text-muted-foreground border">
                    {JOB.company.charAt(0)}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{JOB.title}</h1>
                      {JOB.isAiMatch && (
                        <span className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                          <Sparkles className="h-3 w-3" /> High AI Match
                        </span>
                      )}
                    </div>
                    <div className="text-lg text-primary font-medium mb-4">{JOB.company}</div>
                    
                    <div className="flex flex-wrap gap-y-3 gap-x-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {JOB.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase className="h-4 w-4" /> {JOB.type}</span>
                      <span className="flex items-center gap-1.5 text-green-600 font-medium"><DollarSign className="h-4 w-4" /> {JOB.salary}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="flex-1 sm:flex-none sm:w-48 text-base">Apply Now</Button>
                <Button variant="outline" size="lg" className="gap-2">
                  <Bookmark className="h-4 w-4" /> Save Job
                </Button>
                <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground self-center">
                  <Clock className="h-4 w-4" /> Posted {JOB.posted} • {JOB.applicants} applicants
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="bg-card border rounded-2xl p-6 sm:p-8 space-y-8 shadow-sm">
              <section>
                <h2 className="text-xl font-bold mb-4">Job Description</h2>
                <div className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {JOB.description}
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Key Responsibilities</h2>
                <ul className="space-y-3">
                  {JOB.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {JOB.requirements.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">Benefits & Perks</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {JOB.benefits.map((item, idx) => (
                    <div key={idx} className="bg-muted/50 p-3 rounded-lg text-sm text-muted-foreground flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="space-y-6">
            
            {/* About Company Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-lg mb-4">About the Company</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-lg bg-muted flex items-center justify-center text-xl font-bold text-muted-foreground border">
                  {JOB.company.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-base">{JOB.companyInfo.name}</h4>
                  <Link href="#" className="text-sm text-primary hover:underline">View Profile</Link>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium ml-auto">{JOB.companyInfo.industry}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Size:</span>
                  <span className="font-medium ml-auto">{JOB.companyInfo.size}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Website:</span>
                  <Link href="#" className="font-medium ml-auto text-primary hover:underline truncate max-w-[120px]">
                    {JOB.companyInfo.website.replace('https://', '')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col gap-3">
              <h3 className="font-bold text-lg mb-2">Spread the word</h3>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <Share2 className="h-4 w-4" /> Share via Link
              </Button>
              <Button variant="outline" className="w-full gap-2 justify-start">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                Share on LinkedIn
              </Button>
            </div>

            {/* AI Insights Card (Optional Teaser) */}
            <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 border border-primary/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <h3 className="font-bold text-lg text-primary">AI Insights</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                Based on your uploaded resume, you have a <strong>92% match</strong> for this role. Your experience with Next.js and TypeScript aligns perfectly with the requirements.
              </p>
              <Button variant="default" size="sm" className="w-full">
                View Full Analysis
              </Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
