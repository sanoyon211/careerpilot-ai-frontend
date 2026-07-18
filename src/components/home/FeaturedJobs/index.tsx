import { Button } from "@/components/common/Button"
import { Card, CardContent, CardFooter } from "@/components/common/Card"
import { MapPin, Clock, DollarSign } from "lucide-react"

const mockJobs = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechNova", location: "Remote", type: "Full-time", salary: "$120k - $150k", match: 98 },
  { id: 2, title: "Product Designer", company: "Creative Solutions", location: "New York, NY", type: "Full-time", salary: "$110k - $140k", match: 92 },
  { id: 3, title: "Backend Developer", company: "DataFlow", location: "San Francisco, CA", type: "Contract", salary: "$90/hr", match: 88 },
  { id: 4, title: "AI Researcher", company: "Future Labs", location: "Remote", type: "Full-time", salary: "$140k - $180k", match: 85 },
]

export function FeaturedJobs() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Top AI-Matched Jobs</h2>
            <p className="mt-2 text-muted-foreground">Opportunities curated based on market trends.</p>
          </div>
          <Button variant="outline">View All Jobs</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {mockJobs.map((job) => (
            <Card key={job.id} className="flex flex-col hover:shadow-lg transition-all border-border/50 hover:border-primary/30">
              <CardContent className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center font-bold text-primary text-xl">
                    {job.company.charAt(0)}
                  </div>
                  <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                    {job.match}% Match
                  </span>
                </div>
                <h3 className="font-semibold text-lg line-clamp-1">{job.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{job.company}</p>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {job.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {job.type}
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" /> {job.salary}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
