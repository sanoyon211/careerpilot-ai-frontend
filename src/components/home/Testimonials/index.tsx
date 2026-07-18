import { Card, CardContent, CardHeader } from "@/components/common/Card"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Product Manager",
    content: "CareerPilot AI completely transformed my job search. The AI resume analyzer caught mistakes I'd been making for years. Landed my dream role in 3 weeks!",
    initials: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Software Engineer",
    content: "The smart matching algorithm is incredible. Instead of scrolling through hundreds of irrelevant postings, I only applied to 5 jobs and got 3 interviews.",
    initials: "MC"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Marketing Director",
    content: "The personalized career roadmap helped me identify exactly which skills I needed to upgrade to reach the Director level. Worth every penny.",
    initials: "ER"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight">Loved by professionals worldwide</h2>
          <p className="mt-4 text-muted-foreground">Don't just take our word for it. See what our users have to say.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-muted/50 border-none shadow-none">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
