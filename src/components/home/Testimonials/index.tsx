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
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground">
            Loved by professionals worldwide.
          </h2>
          <p className="text-base text-muted-foreground font-normal">
            Hear from software engineers who accelerated their career trajectory with CareerPilot AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white dark:bg-[#161617] border border-black/[0.06] dark:border-white/[0.08] rounded-[28px] p-8 flex flex-col justify-between">
              <div>
                <CardHeader className="p-0 flex flex-row items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-full bg-[#0071e3] text-white flex items-center justify-center font-bold text-base shadow-sm">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-foreground tracking-tight flex items-center gap-1.5">
                      {testimonial.name} <ShieldCheck className="h-4 w-4 text-emerald-500" />
                    </h4>
                    <p className="text-xs text-muted-foreground font-normal">
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
                  <p className="text-muted-foreground text-sm leading-relaxed font-normal">
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
