"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { MessageSquare, FileSearch, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

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
            <div className="inline-flex items-center rounded-full border px-3.5 py-1 text-xs font-extrabold bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3.5 w-3.5 mr-1.5" /> Groq Llama 3.3 Agentic Engine
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
              Your autonomous AI career copilot.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Experience the power of intelligent LLM agents working 24/7 to accelerate your career trajectory. From ATS resume evaluation to real-time skill matching, our AI handles the complexity.
            </p>

            <ul className="space-y-4 pt-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-xl text-primary shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base">Interactive AI Career Assistant</h4>
                  <p className="text-sm text-muted-foreground">Ask questions about target companies, interview prep, or salary negotiation strategies.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 bg-primary/10 p-2 rounded-xl text-primary shrink-0">
                  <FileSearch className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-base">Automated Resume & ATS Intelligence</h4>
                  <p className="text-sm text-muted-foreground">Extracts skills, experience, and context from your PDF files to score job readiness.</p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/ai-chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90 rounded-2xl gap-2 font-bold px-8 shadow-sm">
                  Launch AI Assistant <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-indigo-600 to-sky-500 rounded-[2.5rem] opacity-20 blur-2xl"></div>
            <div className="relative rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden border border-border bg-card/90 backdrop-blur-md">
              <div className="flex items-center gap-3 border-b pb-4 mb-4">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-amber-500/80"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80"></div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">agentic-ai-terminal.ts</div>
              </div>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{">"}</span>
                  <span className="text-foreground font-semibold">Parsing uploaded resume.pdf...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Found 5+ years React & TypeScript experience</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Verified backend Node.js & MongoDB architecture skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{">"}</span>
                  <span className="text-foreground font-semibold">Querying live database job postings...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Matched 10 high-precision Senior Developer roles</span>
                </div>
                <div className="flex items-center gap-2 mt-4 text-primary font-bold">
                  <span className="animate-pulse">_ Execution complete. Ready for candidate submission.</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
