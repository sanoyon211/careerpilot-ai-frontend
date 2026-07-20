"use client";

import { Sparkles } from "lucide-react";

export function AboutHero() {
  return (
    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
        <Sparkles className="h-4 w-4" />
        <span>Groq Llama 3.3 70B AI Engine</span>
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
        Revolutionizing the way you find work.
      </h1>
      <p className="text-lg text-muted-foreground leading-relaxed">
        CareerPilot AI is built on the belief that finding your dream job shouldn't be a struggle. We combine cutting-edge Agentic AI with a human-centric approach to match top talent with global opportunities.
      </p>
    </div>
  );
}
