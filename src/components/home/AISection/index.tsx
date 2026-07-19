"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/common/Button";
import { MessageSquare, FileSearch, BrainCircuit, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function AISection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden border-t border-border/60">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-border px-4 py-1 text-xs font-semibold bg-secondary text-foreground">
              <BrainCircuit className="h-3.5 w-3.5 mr-1.5 text-primary" /> Groq Llama 3.3 Intelligence
            </div>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.08]">
              Your personal <br />
              <span className="text-primary">Career Copilot.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed font-normal">
              Experience the precision of autonomous LLM agents working seamlessly to accelerate your job search, score ATS resume compatibility, and prepare you for interviews.
            </p>

            <ul className="space-y-5 pt-4">
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2.5 rounded-2xl text-primary shrink-0">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground tracking-tight">Interactive AI Career Assistant</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal">Ask questions about target companies, interview questions, or salary negotiation strategies.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="mt-1 bg-primary/10 p-2.5 rounded-2xl text-primary shrink-0">
                  <FileSearch className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-foreground tracking-tight">Automated Resume Intelligence</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground font-normal">Extracts skills, experience, and context from your PDF files to score job readiness instantly.</p>
                </div>
              </li>
            </ul>

            <div className="pt-4">
              <Link href="/ai-chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full gap-2 font-semibold px-8 shadow-sm">
                  Launch Assistant <ArrowRight className="h-4 w-4" />
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
            {/* Apple Bento Feature Container */}
            <div className="relative rounded-[32px] p-7 sm:p-9 shadow-2xl overflow-hidden border border-border bg-card">
              <div className="flex items-center gap-3 border-b border-border pb-4 mb-6">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <div className="text-xs text-muted-foreground font-mono">macOS-agentic-terminal.sh</div>
              </div>

              <div className="space-y-4 font-mono text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{">"}</span>
                  <span className="text-foreground font-semibold">Parsing uploaded resume.pdf...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Found 5+ years React & TypeScript experience</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Verified backend Node.js & MongoDB architecture skills</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">{">"}</span>
                  <span className="text-foreground font-semibold">Querying live database job postings...</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
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
