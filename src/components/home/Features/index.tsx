"use client"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/common/Card"
import { Briefcase, FileText, Target, Zap } from "lucide-react"

const features = [
  {
    title: "Smart Job Matching",
    description: "Our AI analyzes your skills and matches you with roles that perfectly align with your career goals.",
    icon: Target,
  },
  {
    title: "AI Resume Analysis",
    description: "Upload your resume and get instant feedback, ATS scores, and actionable improvement suggestions.",
    icon: FileText,
  },
  {
    title: "Career Roadmaps",
    description: "Generate personalized learning paths to bridge the gap between your current skills and your dream job.",
    icon: Zap,
  },
  {
    title: "Direct Talent Connection",
    description: "Apply to multiple curated jobs instantly with your AI-optimized profile and generated cover letters.",
    icon: Briefcase,
  }
]

export function Features() {
  return (
    <section className="py-24 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold tracking-widest text-rose-600 uppercase">
            WHY CAREERPILOT AI
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
            Build your team <span className="font-serif-italic text-rose-600 font-normal">at startup speed.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-normal">
            Everything candidate-first and recruiter-ready powered by Gemini & Groq AI models.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-rose-100 dark:border-zinc-800 bg-card rounded-3xl p-2 hover:border-rose-300 dark:hover:border-rose-900 transition-all hover:shadow-xl group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-100 dark:border-rose-900 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <feature.icon className="h-6 w-6 text-rose-600" />
                  </div>
                  <CardTitle className="text-xl font-extrabold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed text-muted-foreground font-normal">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

