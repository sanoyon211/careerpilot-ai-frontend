import { Hero } from "@/components/home/Hero"
import { Features } from "@/components/home/Features"
import { AISection } from "@/components/home/AISection"
import { FeaturedJobs } from "@/components/home/FeaturedJobs"
import { Statistics } from "@/components/home/Statistics"
import { Testimonials } from "@/components/home/Testimonials"
import { CTA } from "@/components/home/CTA"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <AISection />
      <FeaturedJobs />
      <Statistics />
      <Testimonials />
      <CTA />
    </div>
  )
}
