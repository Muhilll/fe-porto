"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Calendar, Search, Star, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { useBlogs } from "@/features/portfolio/blog/hooks/use-blog";
import { getNormalizedBlogs } from "@/features/portfolio/adapters";

export function BlogList() {
  const { data: apiBlogs, isLoading } = useBlogs();
  const blogs = getNormalizedBlogs(apiBlogs);

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    blogs.forEach((b) => {
      if (b.category) set.add(b.category);
    });
    return ["All", ...Array.from(set)];
  }, [blogs]);

  // Filtered blogs
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCategory =
        activeCategory === "All" || blog.category.toLowerCase() === activeCategory.toLowerCase();

      const matchSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Category Pills & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-foreground text-background font-semibold shadow-sm"
                  : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground border border-border/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & tags..."
            className="w-full pl-9 pr-3.5 py-1.5 rounded-full border border-border/80 bg-background text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
      </div>

      {/* Blogs Feed */}
      {filteredBlogs.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-border/80 space-y-2">
          <p className="text-sm font-semibold text-foreground">No matching articles found</p>
          <p className="text-xs text-muted-foreground">
            Try adjusting your search query or switching to another category.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredBlogs.map((blog, idx) => (
            <FadeIn key={blog.id} delay={idx * 0.06}>
              <Link
                href={`/blog/${blog.slug}`}
                className="group block p-6 sm:p-8 rounded-3xl border border-border/80 bg-background/90 hover:border-foreground/40 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="space-y-3 max-w-3xl flex-1">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-foreground border border-border/60 font-medium">
                        {blog.category}
                      </span>
                      {blog.featured && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-500">
                          <Star className="w-3 h-3 fill-amber-500" />
                          <span>Featured</span>
                        </span>
                      )}
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
                    {blog.tags && blog.tags.length > 0 && (
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
                    )}
                  </div>

                  {/* Arrow Indicator */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full border border-border/80 group-hover:bg-foreground group-hover:text-background transition-colors shrink-0">
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
