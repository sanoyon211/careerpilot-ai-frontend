"use client";

import { FAQHeader } from "@/components/faq/FAQHeader";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQCTA } from "@/components/faq/FAQCTA";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <FAQHeader />
        <FAQAccordion />
        <FAQCTA />
      </div>
    </div>
  );
}
