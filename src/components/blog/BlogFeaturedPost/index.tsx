"use client";

import Link from "next/link";
import { User, Calendar } from "lucide-react";

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  color: string;
}

export function BlogFeaturedPost({ post }: { post: BlogPost }) {
  if (!post) return null;

  return (
    <div className="mb-16">
      <Link href={`/blog/${post.id}`} className="group flex flex-col md:flex-row bg-[#F4F7FE] border border-[#E2E8F0] rounded-[28px] overflow-hidden shadow-xs hover:shadow-lg hover:border-[#CBD5E1] transition-all">
        <div className={`md:w-1/2 h-64 md:h-auto bg-gradient-to-br ${post.color} relative`}>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-[#2563EB] font-extrabold text-xs tracking-wider uppercase mb-3 bg-white px-3 py-1 rounded-full w-fit border border-[#E2E8F0]">
            {post.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#1E293B] mb-4 group-hover:text-[#2563EB] transition-colors">
            {post.title}
          </h2>
          <p className="text-[#64748B] text-base font-medium mb-6 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-[#64748B] mt-auto">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4 text-[#2563EB]" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
