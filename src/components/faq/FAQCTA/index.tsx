"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";

export function FAQCTA() {
  return (
    <div className="mt-16 bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] p-10 text-center max-w-3xl mx-auto">
      <div className="bg-[#8B5CF6]/15 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#8B5CF6]">
        <MessageCircle className="h-8 w-8" />
      </div>
      <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] mb-3">Still have questions?</h3>
      <p className="text-[#64748B] text-base font-medium mb-8 max-w-md mx-auto">
        Can't find the answer you're looking for? Please reach out to our support team.
      </p>
      <Link href="/contact">
        <Button size="lg" className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-extrabold rounded-full px-8 py-3.5">
          Get in Touch
        </Button>
      </Link>
    </div>
  );
}
