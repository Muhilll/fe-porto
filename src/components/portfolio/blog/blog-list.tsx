"use client";

import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { blogsData } from "@/data/blogs";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";

export function BlogList() {
  return (
    <div className="space-y-6">
      {blogsData.map((blog, idx) => (
        <FadeIn key={blog.id} delay={idx * 0.08}>
          <Link
            href={`/blog/${blog.slug}`}
            className="group block p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 hover:border-foreground/40 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                  <span className="px-2.5 py-0.5 rounded-full bg-muted text-foreground border border-border/60">
                    {blog.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{blog.publishedAt}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{blog.readTime}</span>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-foreground group-hover:underline underline-offset-4 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-muted/60 text-muted-foreground"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border/80 group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
