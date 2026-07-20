"use client";

import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <ContactHeader />
      <div className="grid lg:grid-cols-3 gap-12">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>
  );
}
