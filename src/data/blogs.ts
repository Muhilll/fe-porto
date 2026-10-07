import { BlogPostItem } from "@/types/portfolio";

export const blogsData: BlogPostItem[] = [
  {
    id: "blog-1",
    slug: "architecting-lightweight-fullstack-systems-with-nextjs-and-hono",
    title: "Architecting High-Throughput Web Applications with Next.js & Hono on Bun",
    excerpt:
      "A deep dive into decoupling presentation from edge API runtimes, achieving sub-20ms cold starts, and sharing types end-to-end.",
    publishedAt: "March 15, 2024",
    readTime: "6 min read",
    category: "Architecture",
    tags: ["Next.js", "Hono", "Bun", "TypeScript", "Microservices"],
    featured: true,
    content: `
### Why Pair Next.js with Hono?

Next.js is unmatched for server-side rendering, streaming interfaces, and client routing. However, when building dense API ecosystems with complex role-based permissions, decoupling your API into a specialized edge runtime like **Hono** running on **Bun** provides huge benefits:

1. **Deterministic Latency**: Hono's RegExpRouter offers near-instant route matching with zero overhead.
2. **True End-to-End Type Safety**: By exporting Hono RPC types, frontend clients consume backend schemas without generating bulky OpenAPI clients.
3. **Portability**: The same Hono backend can run on Node, Bun, Cloudflare Workers, or Docker without rewriting a single handler.

### Key Architectural Decisions

When designing our monorepo architecture, we established three non-negotiables:

* **Zod at the perimeter:** Every HTTP request payload is strictly validated before touching any database queries.
* **Drizzle ORM for lightweight SQL:** Avoid heavy runtime ORM bloat and generate pure, predictable SQL queries.
* **Atomic Component Design:** Separate presentation layers from asynchronous data-fetching hooks using TanStack Query.

\`\`\`typescript
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const app = new Hono();

const userSchema = z.object({
  email: z.string().email(),
  role: z.enum(['ADMIN', 'USER']),
});

app.post('/api/users', zValidator('json', userSchema), async (c) => {
  const data = c.req.valid('json');
  // Process with database
  return c.json({ success: true, user: data });
});
\`\`\`

### Conclusion

By isolating responsibilities—leaving UI interactivity to Next.js and high-frequency data pipelines to Hono—you retain maximum agility, clear audit boundaries, and superior performance.
    `,
  },
  {
    id: "blog-2",
    slug: "why-we-chose-drizzle-orm-over-prisma-for-production",
    title: "Why We Swapped Prisma for Drizzle ORM in Production Workloads",
    excerpt:
      "Comparing cold start latencies, binary size overhead, SQL predictability, and developer ergonomic trade-offs between Prisma and Drizzle.",
    publishedAt: "January 28, 2024",
    readTime: "8 min read",
    category: "Database",
    tags: ["Drizzle ORM", "SQL", "Database", "Node.js"],
    featured: true,
    content: `
### The Engine Behind Modern ORMs

For years, Prisma set the industry standard for TypeScript developer experience. Its schema-first approach and auto-generated query client made onboarding rapid.

However, as workloads grew, three friction points emerged:

1. **Rust Query Engine Binary Overhead**: In serverless and containerized edge targets, shipping a 40MB Rust binary impacts cold-start performance.
2. **Complex Query Black-Boxing**: Prisma's abstraction occasionally produces unexpected sub-queries or N+1 queries under nested relations.
3. **Drizzle's 'If you know SQL, you know Drizzle' Philosophy**: Drizzle feels like native TypeScript SQL without magic wrappers.

\`\`\`typescript
// Clean, transparent SQL with Drizzle ORM
export const users = mysqlTable('users', {
  id: int().primaryKey().autoincrement(),
  email: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
  createdAt: datetime().default(sql\`CURRENT_TIMESTAMP\`),
});
\`\`\`

### Benchmark Findings

In our real-world load testing on a MySQL instance running 10,000 queries per minute, Drizzle yielded:
* **35% lower memory usage** across worker processes.
* **Cold start reduction from 420ms to 45ms** on serverless runtimes.
* **Zero translation overhead** between ORM queries and raw database logs.
    `,
  },
  {
    id: "blog-3",
    slug: "mastering-framer-motion-choreography",
    title: "Mastering Micro-Interactions: Clean Motion Choreography with Framer Motion",
    excerpt:
      "How to build high-end UI animations that elevate user delight without degrading performance or causing jarring layout shifts.",
    publishedAt: "November 12, 2023",
    readTime: "5 min read",
    category: "Frontend",
    tags: ["Framer Motion", "Animations", "React", "UX"],
    featured: false,
    content: `
### Motion as Information, Not Decoration

Animation in web design must serve a functional purpose. When used with discipline, motion explains:
* **Spatial continuity:** Where an element originated and where it settled.
* **Hierarchy of feedback:** Acknowledging user intent before async server operations resolve.
* **Visual pacing:** Preventing visual overwhelm by staggering dense data cards.

### Core Rules for Production Animations

1. **Stick to Transform and Opacity:** Animating \`height\`, \`width\`, or \`top\` triggers browser layout reflow. Always use \`x\`, \`y\`, \`scale\`, and \`opacity\`.
2. **Spring Physics over Linear Durations:** Springs feel natural and organic because they simulate real-world inertia.
3. **Respect \`prefers-reduced-motion\`:** Always guard motion with accessibility hooks for users who experience vestibular discomfort.
    `,
  },
  {
    id: "blog-4",
    slug: "designing-scalable-rbac-hierarchies",
    title: "Designing Flexible Role-Based Access Control (RBAC) in Relational Databases",
    excerpt:
      "A pragmatic model for managing menus, permissions, and hierarchical roles with MySQL and relational joins.",
    publishedAt: "September 04, 2023",
    readTime: "7 min read",
    category: "Security",
    tags: ["RBAC", "Security", "Backend", "Auth"],
    featured: false,
    content: `
### The Challenge of Permission Bloat

Most applications start with a simple boolean \`isAdmin\`. As business requirements mature, organizations need granular distinctions: who can read reports, who can create invoices, and who can access specific navigation menus.

### The 4-Table Normalized Model

A robust RBAC architecture relies on four core entities:
1. **Roles:** e.g., \`ADMIN\`, \`MANAGER\`, \`DISPATCHER\`, \`USER\`.
2. **Users:** Associated with a primary \`role_id\`.
3. **Menus / Resources:** Hierarchical menu tree with parent-child relationships and unique resource paths.
4. **Role Permissions:** Granular matrix flags (\`can_read\`, \`can_create\`, \`can_update\`, \`can_delete\`, \`can_report\`).

This structure guarantees that altering permissions for an entire department requires only updating the matrix, without modifying any user records.
    `,
  },
];
