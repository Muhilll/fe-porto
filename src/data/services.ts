import { ServiceItem } from "@/types/portfolio";

export const servicesData: ServiceItem[] = [
  {
    id: "srv-fullstack",
    number: "01",
    title: "Full-Stack Web Application Development",
    description:
      "End-to-end development of custom web apps tailored to your operational workflows, from responsive frontend interfaces to scalable backend services.",
    icon: "Layout",
    features: [
      "Modern Next.js / React frontend architecture",
      "Robust backend API using Hono, Node.js, or Bun",
      "Role-Based Access Control (RBAC) & secure authentication",
      "Relational database design (PostgreSQL / MySQL) with Drizzle ORM",
      "Optimized production builds with sub-second page loads",
    ],
    deliverables: "Fully deployed production app, Git repository, API documentation, and handover training.",
  },
  {
    id: "srv-backend",
    number: "02",
    title: "High-Performance API & Systems Engineering",
    description:
      "Designing clean, modular RESTful APIs and lightweight microservices engineered for high throughput, low latency, and rock-solid reliability.",
    icon: "Server",
    features: [
      "Ultra-fast API routing with Hono / Bun",
      "Strict data validation with Zod / TypeBox",
      "Redis caching layer for sub-millisecond responses",
      "Webhook & third-party integrations (Payment, WhatsApp, Email)",
      "Automated unit & integration test coverage",
    ],
    deliverables: "Complete OpenAPI/Swagger specifications, migration scripts, and monitoring setups.",
  },
  {
    id: "srv-ui",
    number: "03",
    title: "Modern UI/UX & Interactive Frontends",
    description:
      "Transforming concepts and Figma prototypes into fluid, accessible, and responsive user interfaces with deliberate micro-interactions.",
    icon: "Sparkles",
    features: [
      "Pixel-perfect responsive design across mobile, tablet, and desktop",
      "Subtle micro-animations with Framer Motion and Tailwind",
      "Dark mode & light mode seamless theme integration",
      "WCAG 2.1 accessibility compliance & SEO optimization",
      "Modular design tokens and reusable UI component libraries",
    ],
    deliverables: "Interactive component library, Storybook/live preview, and clean reusable source code.",
  },
  {
    id: "srv-cloud",
    number: "04",
    title: "Performance Optimization & Maintenance",
    description:
      "Auditing existing web platforms to eliminate bottlenecks, reduce server response latency, refactor legacy code, and establish CI/CD automation.",
    icon: "Zap",
    features: [
      "Core Web Vitals auditing and bundle size slimming",
      "Database query profiling and index tuning",
      "Automated CI/CD pipelines with GitHub Actions",
      "Docker containerization and streamlined deployment configs",
      "Security headers, CORS, and vulnerability remediation",
    ],
    deliverables: "Lighthouse performance report (95+ score), optimization log, and automated deployment script.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discovery & Scope",
    description: "Aligning on business goals, user personas, technical requirements, and core success metrics.",
  },
  {
    step: "02",
    title: "System Architecture",
    description: "Designing the database schemas, API contracts, component tree, and visual tokens.",
  },
  {
    step: "03",
    title: "Iterative Engineering",
    description: "Building test-driven modules with transparent weekly progress updates and preview deployments.",
  },
  {
    step: "04",
    title: "Launch & Continuity",
    description: "Running security checks, automated deployments, documentation handover, and post-launch monitoring.",
  },
];
