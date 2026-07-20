"use client";

import Link from "next/link";
import { User, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { BlogPost } from "../BlogFeaturedPost";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      {/* 4 Column Grid on Extra Large Screens */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col bg-[#FAFAFA] border border-[#E5E7EB] rounded-[28px] overflow-hidden hover:border-[#CBD5E1] transition-all">
            <div className={`h-52 w-full bg-[#FAFAFA] border-b border-[#E5E7EB] relative`}>
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>
            
            <div className="p-7 flex flex-col flex-1">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#8B5CF6] font-extrabold text-xs tracking-wider uppercase">
                  {post.category}
                </span>
                <span className="text-xs font-semibold text-[#64748B]">{post.readTime}</span>
              </div>
              
              <h3 className="text-xl font-extrabold text-[#0F172A] mb-3 line-clamp-2 group-hover:text-[#8B5CF6] transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="text-[#64748B] text-xs sm:text-sm font-medium mb-6 line-clamp-3 leading-relaxed flex-1">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between pt-4 border-t border-[#E5E7EB] mt-auto">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#64748B]">
                  <User className="h-3.5 w-3.5 text-[#8B5CF6]" />
                  <span className="truncate max-w-[110px]">{post.author}</span>
                </div>
                <span className="text-xs font-black text-[#8B5CF6] flex items-center gap-1">
                  Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-20 text-center">
        <Button variant="outline" size="lg" className="rounded-full px-8 font-extrabold border-[#8B5CF6]/40 text-[#8B5CF6] hover:bg-[#F3E8FF]">
          Load More Articles
        </Button>
      </div>
    </>
  );
}
