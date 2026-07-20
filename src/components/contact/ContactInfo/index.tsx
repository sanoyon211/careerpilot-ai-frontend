"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="lg:col-span-1 space-y-8">
      <div className="bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-8 sm:p-10">
        <h3 className="text-2xl font-extrabold text-[#0F172A] mb-8">Contact Information</h3>
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="bg-white border border-[#E5E7EB] p-3.5 rounded-2xl text-[#8B5CF6] shrink-0">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#0F172A] mb-1">Email Us</h4>
              <p className="text-[#64748B] text-sm font-semibold">support@careerpilot.ai</p>
              <p className="text-[#64748B] text-sm font-semibold">partnerships@careerpilot.ai</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white border border-[#E5E7EB] p-3.5 rounded-2xl text-[#8B5CF6] shrink-0">
              <Phone className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#0F172A] mb-1">Call Us</h4>
              <p className="text-[#64748B] text-sm font-semibold">+1 (555) 123-4567</p>
              <p className="text-[#64748B] text-sm font-semibold">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-white border border-[#E5E7EB] p-3.5 rounded-2xl text-[#8B5CF6] shrink-0">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base text-[#0F172A] mb-1">Headquarters</h4>
              <p className="text-[#64748B] text-sm font-semibold">123 Innovation Drive</p>
              <p className="text-[#64748B] text-sm font-semibold">San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
