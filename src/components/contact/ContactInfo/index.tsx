"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="lg:col-span-1 space-y-8">
      <div className="bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-8 shadow-xs">
        <h3 className="text-xl font-extrabold text-[#1E293B] mb-6">Contact Information</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-[#2563EB]/10 p-3 rounded-full text-[#2563EB] shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-extrabold mb-1 text-sm text-[#1E293B]">Email Us</h4>
              <p className="text-[#64748B] text-xs font-semibold">support@careerpilot.ai</p>
              <p className="text-[#64748B] text-xs font-semibold">partnerships@careerpilot.ai</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#2563EB]/10 p-3 rounded-full text-[#2563EB] shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-extrabold mb-1 text-sm text-[#1E293B]">Call Us</h4>
              <p className="text-[#64748B] text-xs font-semibold">+1 (555) 123-4567</p>
              <p className="text-[#64748B] text-xs font-semibold">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-[#2563EB]/10 p-3 rounded-full text-[#2563EB] shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-extrabold mb-1 text-sm text-[#1E293B]">Headquarters</h4>
              <p className="text-[#64748B] text-xs font-semibold">123 Innovation Drive</p>
              <p className="text-[#64748B] text-xs font-semibold">San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
