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
    description: "Upload your resume and get instant feedback, score, and actionable improvement suggestions.",
    icon: FileText,
  },
  {
    title: "Career Roadmaps",
    description: "Generate personalized learning paths to bridge the gap between your current skills and your dream job.",
    icon: Zap,
  },
  {
    title: "One-Click Apply",
    description: "Apply to multiple curated jobs instantly with your AI-optimized profile and generated cover letters.",
    icon: Briefcase,
  }
]

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to land your dream job</h2>
          <p className="mt-4 text-lg text-muted-foreground">Powered by advanced Agentic AI algorithms.</p>
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
              <Card className="h-full border-border/50 bg-background/50 hover:bg-background transition-colors hover:shadow-md hover:border-primary/20">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
