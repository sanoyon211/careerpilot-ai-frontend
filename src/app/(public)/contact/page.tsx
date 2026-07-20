"use client";

import { ContactHeader } from "@/components/contact/ContactHeader";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <ContactHeader />
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <ContactInfo />
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
