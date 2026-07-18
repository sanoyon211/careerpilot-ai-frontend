"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/common/Button"
import { MessageSquare, FileSearch, Sparkles } from "lucide-react"

export function AISection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3.5 w-3.5 mr-1" /> Agentic AI
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Your personal career copilot</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the power of autonomous AI agents working tirelessly to boost your career. From mock interviews to real-time market analysis, our AI does the heavy lifting.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1 rounded text-primary">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Interactive Chat Assistant</h4>
                  <p className="text-sm text-muted-foreground">Ask questions about companies, interview tips, or salary negotiations.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-1 rounded text-primary">
                  <FileSearch className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold">Automated Document Intelligence</h4>
                  <p className="text-sm text-muted-foreground">Extracts skills, experience, and context from your uploaded files instantly.</p>
                </div>
              </li>
            </ul>
            <div className="pt-6">
              <Button size="lg">Try AI Assistant Now</Button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-blue-600 rounded-[2rem] opacity-20 blur-xl"></div>
            <div className="relative glass-morphism rounded-2xl p-6 shadow-2xl overflow-hidden border border-white/10 bg-card">
              <div className="flex items-center gap-3 border-b pb-4 mb-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">ai-agent-terminal</div>
              </div>
              <div className="space-y-4 font-mono text-sm">
                <div className="flex gap-2">
                  <span className="text-primary">{">"}</span>
                  <span className="text-foreground">Analyzing user resume...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">Found 5 years React experience</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">Identified leadership skills</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-primary">{">"}</span>
                  <span className="text-foreground">Querying global job market...</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-muted-foreground">Found 12 high-match Senior Frontend roles</span>
                </div>
                <div className="flex gap-2 mt-4">
                  <span className="text-primary animate-pulse">_</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
