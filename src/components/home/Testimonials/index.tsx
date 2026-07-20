"use client";

import { Star, Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote: "CareerPilot AI's resume match feature analyzed my technical background and recommended roles I wouldn't have found manually. Landed my Senior Fullstack role in 2 weeks!",
    author: "Alex Morgan",
    role: "Senior Full Stack Engineer",
    company: "Vercel Partner",
    stars: 5,
  },
  {
    quote: "As a technical recruiter, pre-screening 500+ candidates used to take days. Groq Agentic AI ranks candidate skills with remarkable precision.",
    author: "Sarah Jenkins",
    role: "Head of Talent",
    company: "CloudScale Systems",
    stars: 5,
  },
  {
    quote: "The 24/7 AI Chat Coach gave me exact salary band insights and system design interview tips that boosted my confidence during final rounds.",
    author: "David Chen",
    role: "DevOps Architect",
    company: "DataEngine Global",
    stars: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/20 px-3.5 py-1.5 rounded-full">
            User Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E293B] tracking-tight">
            Trusted by Talent & Employers
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] p-8 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6 text-amber-500">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-[#2563EB]/20 mb-3" />
                <p className="text-sm text-[#1E293B] font-medium leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#2563EB] text-white font-extrabold flex items-center justify-center text-sm shadow-xs">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#1E293B]">{item.author}</h4>
                  <p className="text-xs text-[#64748B] font-semibold">{item.role} • {item.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
