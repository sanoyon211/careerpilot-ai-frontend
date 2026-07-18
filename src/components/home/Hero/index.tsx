"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/common/Button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-32">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary opacity-20 blur-[100px]" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-4xl font-extrabold tracking-tight text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Your AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Career Pilot</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl text-lg sm:text-xl text-muted-foreground leading-relaxed"
        >
          Navigate your career with intelligent job matching, AI resume analysis, and personalized roadmaps. Let AI find the perfect role for you.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/explore-jobs">
            <Button size="lg" className="h-12 px-8 text-base w-full sm:w-auto shadow-lg shadow-primary/25">Explore Jobs</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto">Create Free Account</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
