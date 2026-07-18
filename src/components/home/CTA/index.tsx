import { Button } from "@/components/common/Button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 bg-card border rounded-3xl p-12 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Ready to accelerate your career?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of professionals who are using Agentic AI to find better jobs, faster. Your next big opportunity is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Get Started for Free <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground sm:ml-4">No credit card required.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
