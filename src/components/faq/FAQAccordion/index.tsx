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
    category: "General",
    questions: [
      { q: "What is CareerPilot AI?", a: "CareerPilot AI is an advanced job matching and career development platform that uses Agentic AI to connect talent with the right opportunities automatically." },
      { q: "Is it free for job seekers?", a: "Yes, our core features including resume analysis, basic job matching, and applying for jobs are completely free for candidates." },
    ]
  },
  {
    category: "AI Features",
    questions: [
      { q: "How does the AI Resume Analyzer work?", a: "When you upload your resume (PDF/DOCX), our LLM-powered engine extracts your skills, experience, and education, then automatically maps them against live job postings to find your perfect match." },
      { q: "What is the AI Chat Assistant?", a: "It's a conversational AI integrated into your dashboard. You can ask it for interview tips, salary negotiation advice, or even to summarize a complex job description." },
    ]
  },
  {
    category: "For Employers",
    questions: [
      { q: "How does CareerPilot AI help recruiters?", a: "Instead of manually screening hundreds of resumes, our AI pre-screens and ranks candidates based on how well their verified skills match your job requirements." },
      { q: "Can I integrate with my ATS?", a: "Yes! We offer API integrations with popular Applicant Tracking Systems. Please contact our sales team for more details." },
    ]
  }
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-5 text-left focus:outline-none"
      >
        <span className="font-semibold text-lg">{question}</span>
        {isOpen ? (
          <Minus className="h-5 w-5 text-primary shrink-0 ml-4" />
        ) : (
          <Plus className="h-5 w-5 text-muted-foreground shrink-0 ml-4" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-muted-foreground leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export function FAQAccordion({ faqs = DEFAULT_FAQS }: { faqs?: FAQCategory[] }) {
  return (
    <div className="space-y-12">
      {faqs.map((section, idx) => (
        <div key={idx} className="bg-card border rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-primary">{section.category}</h2>
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
