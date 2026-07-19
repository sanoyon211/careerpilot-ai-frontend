import { Button } from "@/components/common/Button";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="text-center space-y-8 bg-[#000000] border border-white/10 rounded-3xl p-10 sm:p-20 shadow-2xl text-white">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 border border-white/20">
            <Sparkles className="h-3.5 w-3.5 text-[#0071e3]" />
            <span>Accelerate Your Career Today</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            Ready to find your next position?
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
            Join thousands of software engineers using Groq Llama 3.3 Agentic AI to match with global technology companies.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-8 font-semibold bg-[#0071e3] hover:bg-[#0077ed] text-white gap-2 rounded-full h-[50px] shadow-lg">
                Get Started Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" /> Free tier forever. No card required.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
