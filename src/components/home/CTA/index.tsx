"use client";

import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Sparkles, Search, ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white">
      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#8B5CF6] rounded-[36px] p-10 md:p-20 text-white text-center shadow-2xl">
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-extrabold bg-white/15 text-white border border-white/20 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-[#8B5CF6]" />
              <span>Ready to Elevate Your Tech Career?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Start Matching with High-Impact AI Jobs Today
            </h2>

            <p className="text-base sm:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto">
              Join thousands of software engineers, DevOps leaders, and recruiters using CareerPilot AI to revolutionize hiring.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto bg-[#8B5CF6] text-white hover:bg-[#7C3AED] gap-2.5 text-base font-extrabold shadow-lg px-8 py-3.5">
                  <Search className="h-5 w-5" /> Get Started Free
                </Button>
              </Link>
              <Link href="/explore-jobs">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/40 text-white hover:bg-white/15 gap-2.5 text-base font-extrabold px-8 py-3.5">
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
