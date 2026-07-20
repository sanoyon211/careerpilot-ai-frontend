"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    toast.loading("Sending password reset link...", { id: "reset-pw" });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Password reset instructions sent!", { id: "reset-pw" });
    }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="w-full max-w-md">
        <div className="bg-card border rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  CareerPilot AI
                </span>
              </Link>
              <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
              <p className="text-sm text-muted-foreground mt-2">
                {isSubmitted
                  ? "Check your inbox for password reset instructions."
                  : "Enter your registered email address to receive password reset instructions."}
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none" htmlFor="email">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pl-10"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" isLoading={isSubmitting} className="w-full gap-2 mt-4 bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" /> Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="space-y-5 text-center">
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 p-4 rounded-xl flex flex-col items-center gap-2 text-sm">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                  <p className="font-semibold">Reset Link Sent!</p>
                  <p className="text-xs opacity-90">
                    We've sent an email to <strong>{email}</strong> with step-by-step instructions.
                  </p>
                </div>
                <Button variant="outline" onClick={() => setIsSubmitted(false)} className="w-full">
                  Send to a different email
                </Button>
              </div>
            )}
          </div>

          <div className="bg-muted/50 p-4 text-center border-t text-sm text-muted-foreground flex justify-center">
            <Link href="/login" className="font-semibold text-primary hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-3.5 w-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
