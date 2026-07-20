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
      <Link href={`/blog/${post.id}`} className="group flex flex-col md:flex-row bg-[#FAFAFA] border border-[#E5E7EB] rounded-xl overflow-hidden hover:border-[#CBD5E1] transition-all">
        <div className={`md:w-1/2 h-72 md:h-auto bg-[#FAFAFA] border-r border-[#E5E7EB] relative`}>
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="md:w-1/2 p-8 md:p-14 flex flex-col justify-center">
          <span className="text-[#8B5CF6] font-extrabold text-xs tracking-wider uppercase mb-4 bg-white px-3.5 py-1 rounded-lg w-fit border border-[#E5E7EB]">
            {post.category}
          </span>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#0F172A] mb-4 group-hover:text-[#8B5CF6] transition-colors leading-tight">
            {post.title}
          </h2>
          <p className="text-[#64748B] text-base font-medium mb-8 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-6 text-xs font-bold text-[#64748B] mt-auto">
            <span className="flex items-center gap-2"><User className="h-4 w-4 text-[#8B5CF6]" /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4 text-[#8B5CF6]" /> {post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
