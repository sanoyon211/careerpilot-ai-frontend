"use client"

import { Building2, Globe, Users2, Sparkles, Target, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">Revolutionizing the way you find work.</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            CareerPilot AI is built on the belief that finding your dream job shouldn't be a struggle. We combine cutting-edge Agentic AI with a human-centric approach to match top talent with global opportunities.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: "500K+", label: "Active Jobs" },
            { value: "2M+", label: "Job Seekers" },
            { value: "92%", label: "AI Match Rate" },
            { value: "150+", label: "Countries" },
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border rounded-2xl p-6 text-center shadow-sm">
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-24 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              To empower professionals worldwide by providing them with an autonomous, intelligent career copilot. We aim to eliminate the bias and friction in traditional hiring processes, ensuring every candidate is evaluated on their true potential.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                { icon: Target, text: "Precision matching through LLM analysis" },
                { icon: Zap, text: "Real-time market insights and salary trends" },
                { icon: Users2, text: "Fostering direct connections between talent and teams" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-blue-500/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-card border rounded-3xl p-8 aspect-square flex flex-col justify-center items-center text-center shadow-lg">
               <div className="h-24 w-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                 <Sparkles className="h-12 w-12 text-primary" />
               </div>
               <h3 className="text-2xl font-bold mb-4">Powered by Agentic AI</h3>
               <p className="text-muted-foreground">Our intelligent agents work 24/7 to analyze your resume, mock interview you, and find roles that perfectly align with your career trajectory.</p>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Users2, title: "Candidate First", desc: "We prioritize the experience and privacy of job seekers above all else." },
              { icon: Globe, title: "Borderless Opportunities", desc: "Talent is global. We connect you with remote and relocation opportunities worldwide." },
              { icon: Building2, title: "Transparent Hiring", desc: "No more black holes. We ensure you get actionable feedback and insights." },
            ].map((value, idx) => (
              <div key={idx} className="bg-card border rounded-2xl p-8 hover:border-primary/50 transition-colors shadow-sm">
                <value.icon className="h-10 w-10 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
