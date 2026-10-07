export interface BackendBlog {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  published_at?: string | null;
  read_time?: string | null;
  category?: string | null;
  tags?: string[];
  featured?: boolean;
  is_published?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateBlogPayload {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  published_at?: string;
  read_time?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  is_published?: boolean;
}

export type UpdateBlogPayload = Partial<CreateBlogPayload>;
