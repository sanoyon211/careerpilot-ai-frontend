"use client";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogFeaturedPost, BlogPost } from "@/components/blog/BlogFeaturedPost";
import { BlogGrid } from "@/components/blog/BlogGrid";

const POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How Agentic AI is Changing Recruitment in 2026",
    excerpt: "Discover how large language models and autonomous agents are removing bias and speeding up the hiring process globally.",
    category: "AI Trends",
    author: "Dr. Sarah Chen",
    date: "July 12, 2026",
    readTime: "5 min read",
    color: "from-blue-500 to-cyan-400"
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
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <BlogHeader />
        <BlogFeaturedPost post={POSTS[0]} />
        <BlogGrid posts={POSTS.slice(1)} />
      </div>
    </div>
  );
}
