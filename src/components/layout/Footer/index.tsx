import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#090A0F] text-zinc-400 text-xs border-t border-zinc-900">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-tight text-white font-sans">
                careerpilot<span className="text-rose-500 font-black">:</span><span className="text-xs font-black uppercase tracking-widest text-rose-500 bg-rose-950/80 border border-rose-800 px-2 py-0.5 rounded-full ml-1.5">AI</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              Where great companies meet great talent. AI-powered career assistant matching world-class candidates with top tech opportunities.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
              <span>CareerPilot AI Network Active</span>
            </div>
          </div>

          {/* For Job Seekers */}
          <div>
            <h4 className="font-bold text-xs text-white tracking-widest uppercase mb-4">FOR JOB SEEKERS</h4>
            <ul className="space-y-3 font-medium text-xs">
              <li>
                <Link href="/explore-jobs" className="hover:text-rose-400 transition-colors flex items-center gap-1">
                  Explore Jobs <ArrowUpRight className="h-3 w-3 opacity-50" />
                </Link>
              </li>
              <li>
                <Link href="/resume" className="hover:text-rose-400 transition-colors">
                  AI Resume Match
                </Link>
              </li>
              <li>
                <Link href="/ai-chat" className="hover:text-rose-400 transition-colors">
                  AI Career Coach
                </Link>
              </li>
              <li>
                <Link href="/ai-recommendations" className="hover:text-rose-400 transition-colors">
                  Recommended Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* For Recruiters */}
          <div>
            <h4 className="font-bold text-xs text-white tracking-widest uppercase mb-4">FOR RECRUITERS</h4>
            <ul className="space-y-3 font-medium text-xs">
              <li>
                <Link href="/add-job" className="hover:text-rose-400 transition-colors">
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/manage-jobs" className="hover:text-rose-400 transition-colors">
                  Manage Openings
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-rose-400 transition-colors">
                  Recruiter Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-xs text-white tracking-widest uppercase mb-4">COMPANY</h4>
            <ul className="space-y-3 font-medium text-xs">
              <li>
                <Link href="/about" className="hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-rose-400 transition-colors">
                  FAQ & Support
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-rose-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-zinc-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 font-normal">
          <p>© {new Date().getFullYear()} CareerPilot AI, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-zinc-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-300">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

