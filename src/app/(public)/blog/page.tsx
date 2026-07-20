"use client";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogFeaturedPost, BlogPost } from "@/components/blog/BlogFeaturedPost";
import { BlogGrid } from "@/components/blog/BlogGrid";

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How Agentic AI is Transforming Technical Recruitment in 2026",
    excerpt: "Explore how LLM-powered candidate screening eliminates resume black holes and pairs engineers with high-impact roles automatically.",
    category: "AI Technology",
    author: "Dr. Elena Rostova",
    date: "July 18, 2026",
    readTime: "5 min read",
    color: "from-[#8B5CF6] to-[#0F172A]",
  },
  {
    id: 2,
    title: "10 ATS Resume Optimization Tips for Senior Developers",
    excerpt: "Learn how to format technical skills, system architecture experience, and project metrics to pass automated resume parsers flawlessly.",
    category: "Career Advice",
    author: "Marcus Chen",
    date: "July 12, 2026",
    readTime: "7 min read",
    color: "from-[#0F172A] to-[#8B5CF6]",
  },
  {
    id: 3,
    title: "Mastering System Design Interviews with Real-Time AI Coaching",
    excerpt: "Discover strategies for practicing mock technical interviews, handling edge cases, and negotiating top-tier compensation packages.",
    category: "Interview Prep",
    author: "Sarah Jenkins",
    date: "July 05, 2026",
    readTime: "6 min read",
    color: "from-[#8B5CF6] via-[#F3E8FF] to-[#0F172A]",
  },
  {
    id: 4,
    title: "The Rise of Remote Tech Roles across Europe and North America",
    excerpt: "An in-depth report on borderless tech hiring trends, compensation benchmark updates, and high-demand developer stack competencies.",
    category: "Market Report",
    author: "David Vance",
    date: "June 28, 2026",
    readTime: "8 min read",
    color: "from-[#0F172A] to-[#1E293B]",
  },
];

export default function BlogPage() {
  const featuredPost = BLOG_POSTS[0];
  const otherPosts = BLOG_POSTS.slice(1);

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-24">
      <BlogHeader />
      <BlogFeaturedPost post={featuredPost} />
      <BlogGrid posts={otherPosts} />
    </div>
  );
}
