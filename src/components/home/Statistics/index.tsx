import { Users, Briefcase, FileCheck, Star } from "lucide-react"

const stats = [
  { id: 1, name: "Active Users", value: "10K+", icon: Users },
  { id: 2, name: "Jobs Matched", value: "50K+", icon: Briefcase },
  { id: 3, name: "Resumes Analyzed", value: "25K+", icon: FileCheck },
  { id: 4, name: "Success Rate", value: "94%", icon: Star },
]

export function Statistics() {
  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col items-center justify-center p-4">
              <stat.icon className="h-8 w-8 text-primary-foreground/80 mb-4" />
              <div className="text-4xl font-extrabold text-primary-foreground tracking-tight">{stat.value}</div>
              <div className="text-sm font-medium text-primary-foreground/80 mt-2 uppercase tracking-wider">{stat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
