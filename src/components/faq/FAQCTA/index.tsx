"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";

export function FAQCTA() {
  return (
    <div className="mt-16 bg-[#F4F7FE] border border-[#E2E8F0] rounded-[24px] p-8 text-center max-w-2xl mx-auto shadow-xs">
      <div className="bg-[#2563EB]/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#2563EB]">
        <MessageCircle className="h-8 w-8" />
      </div>
      <h3 className="text-2xl font-extrabold text-[#1E293B] mb-2">Still have questions?</h3>
      <p className="text-[#64748B] font-medium mb-6">
        Can't find the answer you're looking for? Please reach out to our support team.
      </p>
      <Link href="/contact">
        <Button size="lg" className="bg-[#2563EB] hover:bg-[#1D4ED8] font-bold rounded-xl px-8">
          Get in Touch
        </Button>
      </Link>
    </div>
  );
}
