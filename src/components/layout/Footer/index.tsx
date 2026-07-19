import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Globe, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-secondary/30 backdrop-blur-xl text-muted-foreground text-xs">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-base font-bold tracking-tight text-foreground">
                CareerPilot <span className="text-primary font-black">AI</span>
              </span>
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-sm font-normal">
              Autonomous Agentic AI Career Copilot. Matching world-class talent with global engineering opportunities powered by Groq Llama 3.3 70B AI.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Apple HIG & Groq AI Systems Active</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-bold text-xs text-foreground tracking-tight mb-3">Platform</h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/explore-jobs" className="hover:text-foreground transition-colors flex items-center gap-1">
                  Explore Jobs <ArrowUpRight className="h-3 w-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-foreground transition-colors">
                  AI Resume Match
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="hover:text-foreground transition-colors">
                  AI Career Coach
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-xs text-foreground tracking-tight mb-3">Company</h4>
            <ul className="space-y-2.5 font-medium">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition-colors">
                  FAQ & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Security & Intelligence */}
          <div>
            <h4 className="font-bold text-xs text-foreground tracking-tight mb-3">Architecture</h4>
            <ul className="space-y-2.5 font-medium">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Enterprise Auth
              </li>
              <li className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> Groq Llama 3.3
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="h-3.5 w-3.5 text-primary" /> Live Socket Sync
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground gap-4 font-normal">
          <p>Copyright © {new Date().getFullYear()} CareerPilot AI Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
