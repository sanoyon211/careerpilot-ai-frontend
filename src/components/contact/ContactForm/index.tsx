"use client";

import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/common/Input";
import { Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    toast.loading("Sending your message...", { id: "contact-submit" });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Message sent successfully!", { id: "contact-submit" });
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-8 shadow-xs">
        {isSubmitted ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 mb-4 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-extrabold text-[#1E293B]">Message Sent Successfully!</h3>
            <p className="text-[#64748B] max-w-md mx-auto text-sm font-medium">
              Thank you for reaching out to us. One of our team members will get back to you within 24 hours.
            </p>
            <Button variant="outline" className="mt-6 rounded-xl font-bold" onClick={() => setIsSubmitted(false)}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]" htmlFor="name">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]" htmlFor="email">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]" htmlFor="subject">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B]" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                className="flex min-h-[140px] w-full rounded-2xl border border-[#E2E8F0] bg-white px-4 py-3 text-sm font-medium text-[#1E293B] placeholder:text-[#64748B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] shadow-xs resize-y"
                placeholder="Write your message here..."
              />
            </div>

            <Button type="submit" isLoading={isSubmitting} size="lg" className="w-full sm:w-auto px-8 gap-2 bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl font-bold">
              <Send className="h-4 w-4" /> Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
