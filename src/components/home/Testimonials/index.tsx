import { Card, CardContent, CardHeader } from "@/components/common/Card";
import { Star, ShieldCheck } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Senior Full Stack Engineer",
    company: "Vercel",
    content: "CareerPilot AI completely transformed my job search. The Groq LLM resume analyzer caught critical ATS optimization gaps I'd been making. Landed my lead role in 3 weeks!",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "AI Infrastructure Lead",
    company: "Stripe",
    content: "The intent-based agentic search algorithm is incredible. Instead of scrolling through hundreds of generic postings, I matched directly with 5 high-impact engineering roles.",
    initials: "MC",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Staff Product Designer",
    company: "Figma",
    content: "The AI Career Coach and real-time candidate pipeline gave me complete clarity during salary negotiation and interview prep. Hands down the best career platform.",
    initials: "ER",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Trusted by Top Software Engineers & Leaders
          </h2>
          <p className="text-base text-muted-foreground font-medium">
            Hear from professionals who accelerated their career trajectory with CareerPilot AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border border-border/80 rounded-3xl p-6 shadow-xs hover:border-primary/50 transition-all flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 flex flex-row items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-indigo-600 text-white flex items-center justify-center font-extrabold text-base shadow-xs">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-foreground flex items-center gap-1.5">
                      {testimonial.name} <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-muted-foreground font-semibold">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed font-serif italic">
                    "{testimonial.content}"
                  </p>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
