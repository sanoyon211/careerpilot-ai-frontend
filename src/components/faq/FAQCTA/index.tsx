"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/common/Button";

export function FAQCTA() {
  return (
    <div className="mt-16 bg-muted/30 border rounded-2xl p-8 text-center max-w-2xl mx-auto">
      <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <MessageCircle className="h-8 w-8 text-primary" />
      </div>
      <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
      <p className="text-muted-foreground mb-6">
        Can't find the answer you're looking for? Please chat to our friendly team.
      </p>
      <Link href="/contact">
        <Button size="lg">Get in Touch</Button>
      </Link>
    </div>
  );
}
