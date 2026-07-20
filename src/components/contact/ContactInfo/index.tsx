"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export function ContactInfo() {
  return (
    <div className="lg:col-span-1 space-y-8">
      <div className="bg-card border rounded-2xl p-8 shadow-sm">
        <h3 className="text-xl font-bold mb-6">Contact Information</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-sm">Email Us</h4>
              <p className="text-muted-foreground text-xs font-medium">support@careerpilot.ai</p>
              <p className="text-muted-foreground text-xs font-medium">partnerships@careerpilot.ai</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-sm">Call Us</h4>
              <p className="text-muted-foreground text-xs font-medium">+1 (555) 123-4567</p>
              <p className="text-muted-foreground text-xs font-medium">Mon-Fri, 9am-6pm EST</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-3 rounded-full text-primary shrink-0">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-sm">Headquarters</h4>
              <p className="text-muted-foreground text-xs font-medium">123 Innovation Drive</p>
              <p className="text-muted-foreground text-xs font-medium">San Francisco, CA 94105</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
