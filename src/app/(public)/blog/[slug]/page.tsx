import type { Metadata } from "next";
import { BlogDetailView } from "@/components/portfolio/blog/blog-detail-view";
import { HomeCta } from "@/components/portfolio/home/home-cta";
import { blogsData } from "@/data/blogs";
import { normalizeBlog } from "@/features/portfolio/adapters";
import type { BlogPostItem } from "@/types/portfolio";

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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Blog Post Not Found — Muhammad Ilham" };

  return {
    title: `${post.title} — Muhammad Ilham`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} — Muhammad Ilham`,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  return (
    <article className="flex flex-col">
      <BlogDetailView slugOrId={slug} />
      <HomeCta />
    </article>
  );
}
