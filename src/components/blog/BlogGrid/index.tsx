"use client";

import Link from "next/link";
import { User, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button";
import { BlogPost } from "../BlogFeaturedPost";

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className={`h-48 w-full bg-gradient-to-br ${post.color} relative`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>
            
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

      <div className="mt-16 text-center">
        <Button variant="outline" size="lg" className="rounded-full px-8">
          Load More Articles
        </Button>
      </div>
    </>
  );
}
