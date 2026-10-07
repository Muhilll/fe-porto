import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogsData } from "@/data/blogs";
import { normalizeBlog } from "@/features/portfolio/adapters";
import type { BlogPostItem } from "@/types/portfolio";
import { HomeCta } from "@/components/portfolio/home/home-cta";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getPost(slug: string): Promise<BlogPostItem | null> {
  try {
    const res = await fetch(`http://localhost:7000/api/blogs/${slug}`, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    });
    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return normalizeBlog(json.data);
      }
    }
  } catch {
    // Fallback if backend is not reachable at build time
  }

  const fallback = blogsData.find((b) => b.slug === slug);
  return fallback || null;
}

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog Post Not Found" };

  return {
    title: `${post.title} — Zail Yan Zali`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-24 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Header */}
        <header className="space-y-6 border-b border-border/60 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
            <span className="px-3 py-1 rounded-full bg-muted text-foreground border border-border/60 font-medium">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-mono bg-muted/60 text-muted-foreground border border-border/40"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Cover image if available */}
          {post.coverImage && (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden border border-border/80 bg-muted mt-6">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                unoptimized
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Content Body */}
        <div className="prose dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed text-base sm:text-lg">
          {post.content.split("\n\n").map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (trimmed.startsWith("### ")) {
              return (
                <h2 key={index} className="text-2xl font-semibold tracking-tight text-foreground pt-6 pb-2">
                  {trimmed.replace("### ", "")}
                </h2>
              );
            }
            if (trimmed.startsWith("#### ")) {
              return (
                <h3 key={index} className="text-xl font-semibold tracking-tight text-foreground pt-4 pb-1">
                  {trimmed.replace("#### ", "")}
                </h3>
              );
            }
            if (trimmed.startsWith("```")) {
              const codeLines = trimmed.replace(/```[a-z]*/g, "").trim();
              return (
                <pre key={index} className="p-4 sm:p-6 rounded-2xl bg-muted/80 border border-border/80 font-mono text-xs sm:text-sm overflow-x-auto my-6 text-foreground">
                  <code>{codeLines}</code>
                </pre>
              );
            }
            if (trimmed.startsWith("* ")) {
              const items = trimmed.split("\n* ").map((item) => item.replace("* ", ""));
              return (
                <ul key={index} className="space-y-2 list-disc list-inside text-muted-foreground">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ul>
              );
            }
            if (trimmed.startsWith("1. ")) {
              const items = trimmed.split(/\n\d+\.\s/).map((item) => item.replace(/^\d+\.\s/, ""));
              return (
                <ol key={index} className="space-y-2 list-decimal list-inside text-muted-foreground">
                  {items.map((it, i) => (
                    <li key={i}>{it}</li>
                  ))}
                </ol>
              );
            }
            if (trimmed.startsWith("> ")) {
              return (
                <blockquote key={index} className="p-4 rounded-xl border-l-4 border-foreground bg-muted/40 italic text-foreground/80">
                  {trimmed.replace(/^>\s*/, "")}
                </blockquote>
              );
            }
            return (
              <p key={index} className="text-muted-foreground leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>
      </div>

      <HomeCta />
    </article>
  );
}
