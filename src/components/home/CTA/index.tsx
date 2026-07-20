import { Button } from "@/components/common/Button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 relative z-10 max-w-5xl">
        <div className="text-center space-y-8 bg-[#0A0D14] border border-zinc-800 rounded-3xl p-10 sm:p-20 shadow-2xl text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 via-pink-500/5 to-transparent pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 relative z-10">
            <Sparkles className="h-3.5 w-3.5" />
            <span>YOUR NEXT STEP</span>
          </div>

          <h2 className="text-4xl sm:text-7xl font-extrabold tracking-tight text-white leading-tight relative z-10">
            What's <span className="font-serif-italic text-rose-400 font-normal">your next move?</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal relative z-10">
            Whether you are searching for your next dream engineering role or looking to hire top-tier talent, CareerPilot AI is built for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative z-10">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto px-8 font-bold bg-rose-600 hover:bg-rose-700 text-white gap-2 rounded-full h-[50px] shadow-lg shadow-rose-500/30">
                Find a job <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register?role=employer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 font-bold border-zinc-700 text-white hover:bg-zinc-800 rounded-full h-[50px]">
                Post a job
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

