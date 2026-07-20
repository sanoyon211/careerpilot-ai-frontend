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
      <Link href={`/blog/${post.id}`} className="group flex flex-col md:flex-row bg-card border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all">
        <div className={`md:w-1/2 h-64 md:h-auto bg-gradient-to-br ${post.color} relative`}>
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
        </div>
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-3">
            {post.category}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          <p className="text-muted-foreground text-lg mb-6 line-clamp-3">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground mt-auto">
            <span className="flex items-center gap-1.5"><User className="h-4 w-4" /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {post.date}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
