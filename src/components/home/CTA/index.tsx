"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Sparkles, Search, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#2563EB] to-[#8B5CF6] rounded-[36px] p-10 md:p-16 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-extrabold bg-white/15 text-white border border-white/20 backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>Ready to Elevate Your Tech Career?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Start Matching with High-Impact AI Jobs Today
            </h2>

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed max-w-xl mx-auto">
              Join thousands of software engineers, DevOps leaders, and recruiters using CareerPilot AI to revolutionize hiring.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-white text-[#2563EB] hover:bg-slate-100 gap-2 text-base font-extrabold shadow-lg">
                  <Search className="h-5 w-5" /> Get Started Free
                </Button>
              </Link>
              <Link href="/explore-jobs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 gap-2 text-base font-extrabold">
                  Explore Positions <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
