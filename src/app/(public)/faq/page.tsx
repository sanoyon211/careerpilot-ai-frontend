"use client";

import { FAQHeader } from "@/components/faq/FAQHeader";
import { FAQAccordion } from "@/components/faq/FAQAccordion";
import { FAQCTA } from "@/components/faq/FAQCTA";

export default function FAQPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <FAQHeader />
      <FAQAccordion />
      <FAQCTA />
    </div>
  );
}
