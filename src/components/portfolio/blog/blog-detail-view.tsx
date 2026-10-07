"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  Check,
  Star,
  FileText,
  User,
  ExternalLink,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/portfolio/shared/icons";
import { FadeIn } from "@/components/portfolio/shared/motion-wrapper";
import { useBlog, useBlogs } from "@/features/portfolio/blog/hooks/use-blog";
import { useProfile } from "@/features/portfolio/profile/hooks/use-profile";
import {
  getNormalizedBlogs,
  normalizeBlog,
  getNormalizedProfile,
} from "@/features/portfolio/adapters";
import { blogsData } from "@/data/blogs";
import type { BlogPostItem } from "@/types/portfolio";

interface BlogDetailViewProps {
  slugOrId: string;
}

export function BlogDetailView({ slugOrId }: BlogDetailViewProps) {
  const [copied, setCopied] = useState(false);

  // Fetch blog from API
  const { data: apiBlog, isLoading: isBlogLoading } = useBlog(slugOrId);
  const { data: apiBlogsList } = useBlogs();
  const { data: apiProfile } = useProfile();

  const allBlogs = getNormalizedBlogs(apiBlogsList);
  const profile = getNormalizedProfile(apiProfile);

  // Determine current blog (API first, then fallback to static blogsData)
  const post: BlogPostItem | undefined = apiBlog
    ? normalizeBlog(apiBlog)
    : allBlogs.find((b) => b.slug === slugOrId || b.id === slugOrId) ||
      blogsData.find((b) => b.slug === slugOrId || b.id === slugOrId);

  // Related articles (exclude current post)
  const relatedBlogs = allBlogs
    .filter((b) => b.id !== post?.id && b.slug !== post?.slug)
    .slice(0, 2);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    if (typeof window !== "undefined" && post) {
      const url = window.location.href;
      const text = encodeURIComponent(`${post.title} - ${url}`);
      window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
    }
  };

  // Check if content is HTML
  const isHtmlContent = post?.content && /<[a-z][\s\S]*>/i.test(post.content);

  // Render markdown/plain text fallback
  const renderFallbackContent = (content: string) => {
    return content.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold tracking-tight text-foreground pt-6 pb-2 border-b border-border/40"
          >
            {trimmed.replace("### ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("#### ")) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold tracking-tight text-foreground pt-4 pb-1"
          >
            {trimmed.replace("#### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("```")) {
        const codeLines = trimmed.replace(/```[a-z]*/g, "").trim();
        return (
          <pre
            key={index}
            className="p-4 sm:p-6 rounded-2xl bg-muted/80 border border-border/80 font-mono text-xs sm:text-sm overflow-x-auto my-6 text-foreground"
          >
            <code>{codeLines}</code>
          </pre>
        );
      }
      if (trimmed.startsWith("* ")) {
        const items = trimmed
          .split("\n* ")
          .map((item) => item.replace("* ", ""));
        return (
          <ul
            key={index}
            className="space-y-2 list-disc list-inside text-muted-foreground my-4"
          >
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ul>
        );
      }
      if (trimmed.startsWith("1. ")) {
        const items = trimmed
          .split(/\n\d+\.\s/)
          .map((item) => item.replace(/^\d+\.\s/, ""));
        return (
          <ol
            key={index}
            className="space-y-2 list-decimal list-inside text-muted-foreground my-4"
          >
            {items.map((it, i) => (
              <li key={i}>{it}</li>
            ))}
          </ol>
        );
      }
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={index}
            className="p-4 rounded-xl border-l-4 border-foreground bg-muted/40 italic text-foreground/80 my-4"
          >
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      }
      return (
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {trimmed}
        </p>
      );
    });
  };

  if (isBlogLoading && !post) {
    return (
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8 max-w-4xl mx-auto">
          <div className="h-6 w-36 bg-muted rounded-full" />
          <div className="h-12 w-3/4 bg-muted rounded-2xl" />
          <div className="h-4 w-1/2 bg-muted rounded-lg" />
          <div className="aspect-[21/9] w-full bg-muted rounded-3xl" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
            <div className="h-4 w-4/6 bg-muted rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="py-24 max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-muted/60 border border-border flex items-center justify-center mx-auto text-muted-foreground">
          <FileText className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">
            Artikel Tidak Ditemukan
          </h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Artikel dengan tautan &ldquo;{slugOrId}&rdquo; tidak dapat ditemukan atau
            telah dipindahkan.
          </p>
        </div>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold bg-foreground text-background hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Indeks Artikel</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb & Back Link */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Kembali ke semua artikel</span>
          </Link>

          {/* Breadcrumbs */}
          <nav
            aria-label="breadcrumb"
            className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-foreground transition-colors">
              Blog
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[240px]">
              {post.title}
            </span>
          </nav>
        </div>

        {/* Hero Header Area */}
        <FadeIn>
          <header className="space-y-6 max-w-4xl">
            {/* Meta Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-semibold bg-foreground text-background">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-muted/80 text-muted-foreground border border-border/60">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.publishedAt}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-muted/80 text-muted-foreground border border-border/60">
                <Clock className="w-3.5 h-3.5" />
                <span>{post.readTime}</span>
              </span>
              {post.featured && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Featured Post</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.2]">
              {post.title}
            </h1>

            {/* Excerpt Lead */}
            {post.excerpt && (
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            )}

            {/* Tags & Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border border-border/80 bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shadow-xs ml-auto"
                title="Bagikan Tautan Artikel"
              >
                {copied ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Share2 className="w-3.5 h-3.5" />
                )}
                <span>{copied ? "Tautan Disalin!" : "Bagikan Artikel"}</span>
              </button>
            </div>
          </header>
        </FadeIn>

        {/* Featured Cover Media */}
        {post.coverImage && (
          <FadeIn delay={0.1}>
            <div className="relative aspect-[21/9] sm:aspect-[2.2/1] w-full rounded-3xl overflow-hidden border border-border/80 bg-muted shadow-lg">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                priority
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </FadeIn>
        )}

        {/* Main Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-2">
          {/* Main Article Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-10">
            <div className="p-6 sm:p-10 rounded-3xl border border-border/80 bg-background/90 shadow-sm space-y-8">
              {/* Rich Content Renderer */}
              {isHtmlContent ? (
                <div
                  className="prose prose-base sm:prose-lg dark:prose-invert max-w-none 
                    prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
                    prose-h1:text-3xl prose-h2:text-2xl prose-h2:border-b prose-h2:border-border/60 prose-h2:pb-3 prose-h2:mt-10
                    prose-h3:text-xl prose-h3:mt-8
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-a:text-foreground prose-a:underline hover:prose-a:opacity-80 prose-a:font-medium
                    prose-blockquote:border-l-4 prose-blockquote:border-foreground prose-blockquote:bg-muted/40 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-foreground/90
                    prose-code:font-mono prose-code:text-foreground prose-code:bg-muted/80 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-xs sm:prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                    prose-pre:bg-muted/90 prose-pre:border prose-pre:border-border/80 prose-pre:p-5 sm:prose-pre:p-6 prose-pre:rounded-2xl prose-pre:overflow-x-auto
                    prose-img:rounded-2xl prose-img:border prose-img:border-border/80 prose-img:shadow-md prose-img:mx-auto prose-img:my-8
                    prose-hr:border-border/60 prose-hr:my-8
                    prose-ul:list-disc prose-ul:list-inside prose-ul:text-muted-foreground
                    prose-ol:list-decimal prose-ol:list-inside prose-ol:text-muted-foreground
                    leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {renderFallbackContent(post.content || post.excerpt || "")}
                </div>
              )}

              {/* Bottom Share & Footer Bar */}
              <div className="pt-8 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs font-mono text-muted-foreground">
                  Dipublikasikan pada {post.publishedAt} · Kategori: {post.category}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Tersalin" : "Bagikan"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="p-1.5 rounded-full border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-colors cursor-pointer"
                    title="Bagikan ke WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar / Author & Meta Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Author Profile Card */}
            <div className="p-6 rounded-3xl border border-border/80 bg-background/90 space-y-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <User className="w-4 h-4 text-foreground" />
                <span>Tentang Penulis</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-border/80 shrink-0 bg-muted">
                  <Image
                    src={profile.avatarUrl}
                    alt={profile.name}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-foreground">
                    {profile.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-mono">
                    {profile.role}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>

              <div className="pt-2 flex items-center gap-2 border-t border-border/60">
                {profile.github && (
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-colors"
                    title="GitHub Profile"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-foreground transition-colors"
                    title="LinkedIn Profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                )}
                {profile.email && (
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/80 bg-muted/40 hover:bg-muted text-xs font-mono text-foreground transition-colors ml-auto"
                  >
                    <span>Hubungi</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>

            {/* Quick Metadata Card */}
            <div className="p-6 rounded-3xl border border-border/80 bg-background/90 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-foreground" />
                <span>Rincian Publikasi</span>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Kategori</span>
                  <span className="font-semibold text-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Waktu Baca</span>
                  <span className="font-semibold text-foreground">
                    {post.readTime}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-border/60">
                  <span className="text-muted-foreground">Format Konten</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold border border-emerald-500/20">
                    {isHtmlContent ? "Rich WYSIWYG" : "Markdown / Text"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="text-foreground">Publikasi Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <div className="pt-12 border-t border-border/60 space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                  Artikel Terkait Lainnya
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Eksplorasi tulisan dan catatan arsitektur sistem lainnya
                </p>
              </div>

              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-foreground hover:underline"
              >
                <span>Lihat Semua Artikel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((b) => (
                <Link
                  key={b.id}
                  href={`/blog/${b.slug}`}
                  className="group block p-6 rounded-3xl border border-border/80 bg-background/90 hover:border-foreground/40 transition-all duration-300 shadow-sm hover:shadow-md space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span className="px-2.5 py-0.5 rounded-full bg-muted text-foreground border border-border/60">
                      {b.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{b.readTime}</span>
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground group-hover:underline underline-offset-4 line-clamp-2">
                    {b.title}
                  </h4>

                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {b.excerpt}
                  </p>

                  <div className="pt-2 flex items-center gap-1 text-xs font-mono font-medium text-foreground">
                    <span>Baca Artikel</span>
                    <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
