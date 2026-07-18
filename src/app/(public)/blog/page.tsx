"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/common/Button"

// Mock Blog Posts
const POSTS = [
  {
    id: 1,
    title: "How Agentic AI is Changing Recruitment in 2026",
    excerpt: "Discover how large language models and autonomous agents are removing bias and speeding up the hiring process globally.",
    category: "AI Trends",
    author: "Dr. Sarah Chen",
    date: "July 12, 2026",
    readTime: "5 min read",
    color: "from-blue-500 to-cyan-400" // For placeholder gradient
  },
  {
    id: 2,
    title: "5 Tips to Optimize Your Resume for LLM Scanners",
    excerpt: "Traditional ATS systems are out. Learn how to format your resume so modern AI systems can accurately extract your skills.",
    category: "Career Advice",
    author: "Marcus Johnson",
    date: "July 08, 2026",
    readTime: "4 min read",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    title: "The Rise of Asynchronous AI Interviews",
    excerpt: "Preparing for a mock interview with an AI agent? Here is everything you need to know to ace your next technical round.",
    category: "Interview Prep",
    author: "Elena Rodriguez",
    date: "July 02, 2026",
    readTime: "7 min read",
    color: "from-orange-400 to-rose-400"
  },
  {
    id: 4,
    title: "Understanding Salary Trends with AI Data Analysis",
    excerpt: "We analyzed over 2 million job postings using our data analyzer to bring you the most accurate salary bands for software engineers.",
    category: "Market Insights",
    author: "Tech Insights Team",
    date: "June 28, 2026",
    readTime: "10 min read",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: 5,
    title: "Remote Work in 2026: What Employers Actually Want",
    excerpt: "The hybrid vs remote debate continues, but our AI matching data shows a clear shift in what top tech companies are offering.",
    category: "Workplace",
    author: "David Kim",
    date: "June 21, 2026",
    readTime: "6 min read",
    color: "from-indigo-500 to-blue-600"
  },
  {
    id: 6,
    title: "CareerPilot AI Secures New Funding to Expand Globally",
    excerpt: "We are thrilled to announce our latest milestone in our mission to build the world's most intelligent career copilot.",
    category: "Company News",
    author: "CEO Office",
    date: "June 15, 2026",
    readTime: "3 min read",
    color: "from-gray-700 to-gray-900"
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Insights & Resources</h1>
          <p className="text-lg text-muted-foreground">
            The latest news, career advice, and AI trends from the CareerPilot team.
          </p>
        </div>

        {/* Featured Post (First item) */}
        <div className="mb-16">
          <Link href={`/blog/${POSTS[0].id}`} className="group flex flex-col md:flex-row bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className={`md:w-1/2 h-64 md:h-auto bg-gradient-to-br ${POSTS[0].color} relative`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
                {POSTS[0].category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                {POSTS[0].title}
              </h2>
              <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
                {POSTS[0].excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
                <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {POSTS[0].author}</span>
                <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {POSTS[0].date}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {POSTS.slice(1).map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              {/* Image Placeholder */}
              <div className={`h-48 w-full bg-gradient-to-br ${post.color} relative`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-primary font-medium text-xs tracking-wider uppercase">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t mt-auto">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5" />
                    <span className="truncate max-w-[100px]">{post.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="mt-16 text-center">
          <Button variant="outline" size="lg" className="rounded-full px-8">
            Load More Articles
          </Button>
        </div>

      </div>
    </div>
  )
}
