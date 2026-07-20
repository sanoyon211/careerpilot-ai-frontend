"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

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
    <section className="py-24 bg-white">
      {/* Fluid Full-Width Container */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20 space-y-4"
        >
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#8B5CF6] bg-[#F3E8FF] border border-[#8B5CF6]/30 px-4 py-1.5 rounded-lg">
            User Success Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
            Trusted by Talent & Employers
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl p-8 sm:p-10 hover:border-[#CBD5E1] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6 text-amber-500">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400" strokeWidth={1.5} />
                  ))}
                </div>
                <p className="text-base text-[#0F172A] font-medium leading-relaxed mb-8">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#E5E7EB] flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-[#0F172A] text-white font-extrabold flex items-center justify-center text-base">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-extrabold text-base text-[#0F172A]">{item.author}</h4>
                  <p className="text-xs text-[#64748B] font-semibold">{item.role} • {item.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
