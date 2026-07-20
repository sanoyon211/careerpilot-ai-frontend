"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

export interface FAQItem {
  q: string;
  a: string;
}

export interface FAQCategory {
  category: string;
  questions: FAQItem[];
}

const DEFAULT_FAQS: FAQCategory[] = [
  {
    category: "General Platform",
    questions: [
      { q: "What is CareerPilot AI?", a: "CareerPilot AI is an advanced job matching and career development platform that uses Agentic AI to connect talent with verified opportunities automatically." },
      { q: "Is it free for job seekers?", a: "Yes, our core features including resume analysis, basic job matching, and applying for jobs are completely free for candidates." },
    ]
  },
  {
    category: "AI Features & Intelligence",
    questions: [
      { q: "How does the AI Resume Analyzer work?", a: "When you upload your resume (PDF/DOCX), our Groq LLM-powered engine extracts your skills, experience, and education, then automatically maps them against live job postings to find your perfect match." },
      { q: "What is the AI Chat Assistant?", a: "It's a conversational AI integrated into your dashboard. You can ask it for interview tips, salary negotiation advice, or even to summarize a complex job description." },
    ]
  },
  {
    category: "For Employers & Recruiters",
    questions: [
      { q: "How does CareerPilot AI help recruiters?", a: "Instead of manually screening hundreds of resumes, our AI pre-screens and ranks candidates based on how well their verified skills match your job requirements." },
      { q: "Can I integrate with my ATS?", a: "Yes! We offer API integrations with popular Applicant Tracking Systems. Please contact our team for details." },
    ]
  }
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E5E7EB] last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-6 text-left focus:outline-none cursor-pointer group"
      >
        <span className="font-extrabold text-lg sm:text-xl text-[#0F172A] group-hover:text-[#8B5CF6] transition-colors">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-[#8B5CF6] shrink-0 ml-4" />
        ) : (
          <Plus className="h-5 w-5 text-[#64748B] shrink-0 ml-4 group-hover:text-[#8B5CF6] transition-colors" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-[#64748B] leading-relaxed font-medium text-base">{answer}</p>
      </div>
    </div>
  );
}

export function FAQAccordion({ faqs = DEFAULT_FAQS }: { faqs?: FAQCategory[] }) {
  return (
    <div className="space-y-10">
      {faqs.map((section, idx) => (
        <div key={idx} className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-8 md:p-12">
          <h2 className="text-2xl font-extrabold mb-6 text-[#8B5CF6]">{section.category}</h2>
          <div className="flex flex-col">
            {section.questions.map((faq, fIdx) => (
              <AccordionItem key={fIdx} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
