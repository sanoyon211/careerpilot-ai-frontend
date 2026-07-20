"use client";

import Link from "next/link";
import { Sparkles, Globe, Heart, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-[#E5E7EB] bg-white text-[#0F172A]">
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
                careerpilot<span className="text-[#8B5CF6] font-black">:</span>
                <span className="text-xs font-black uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/30 px-2.5 py-0.5 rounded-lg ml-1.5">
                  AI
                </span>
              </span>
            </Link>
            <p className="text-sm text-[#64748B] leading-relaxed max-w-md font-medium">
              An autonomous, intelligent career copilot combining Groq Llama 3.3 70B AI with human-centric recruitment. Matching talent with verified global opportunities.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs font-extrabold text-[#64748B]">
              <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#8B5CF6]" /> Verified ATS Scoring</span>
              <span className="flex items-center gap-1.5"><Globe className="h-4 w-4 text-[#8B5CF6]" /> Global Reach</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-extrabold text-sm text-[#0F172A] uppercase tracking-wider mb-4">Explore</h4>
            <ul className="space-y-3 text-sm font-bold text-[#64748B]">
              <li>
                <Link href="/explore-jobs" className="hover:text-[#8B5CF6] transition-colors">Find Jobs</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#8B5CF6] transition-colors">About Platform</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#8B5CF6] transition-colors">Frequently Asked Questions</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#8B5CF6] transition-colors">Insights & Blog</Link>
              </li>
            </ul>
          </div>

          {/* AI Platform */}
          <div>
            <h4 className="font-extrabold text-sm text-[#0F172A] uppercase tracking-wider mb-4">AI Features</h4>
            <ul className="space-y-3 text-sm font-bold text-[#64748B]">
              <li>
                <Link href="/ai-chat" className="hover:text-[#8B5CF6] flex items-center gap-1.5 transition-colors">
                  <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" /> AI Career Coach
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-[#8B5CF6] flex items-center gap-1.5 transition-colors">
                  <Sparkles className="h-3.5 w-3.5 text-[#8B5CF6]" /> ATS Resume Scorer
                </Link>
              </li>
              <li>
                <Link href="/explore-jobs" className="hover:text-[#8B5CF6] transition-colors">
                  Agentic AI Search
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Contact */}
          <div>
            <h4 className="font-extrabold text-sm text-[#0F172A] uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3 text-sm font-bold text-[#64748B]">
              <li>
                <Link href="/contact" className="hover:text-[#8B5CF6] transition-colors">Contact Support</Link>
              </li>
              <li>
                <span className="text-[#64748B]">Privacy Policy</span>
              </li>
              <li>
                <span className="text-[#64748B]">Terms of Service</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-[#64748B]">
          <p>© 2026 CareerPilot AI Inc. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" /> powered by Groq Llama 3.3 70B AI
          </p>
        </div>
      </div>
    </footer>
  );
}
