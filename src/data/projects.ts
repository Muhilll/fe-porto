import { ProjectItem } from "@/types/portfolio";

export const projectsData: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Apex Logistics Management System",
    slug: "apex-logistics-system",
    category: "Full-Stack",
    shortDescription:
      "Enterprise fleet dispatch and cargo tracking platform featuring role-based access control and live status dashboards.",
    fullDescription:
      "A complete enterprise solution designed for regional logistics carriers to manage shipments, drivers, fleet health, and customer invoicing. Built with a Next.js frontend and high-speed Hono backend handling over 5,000 real-time shipment updates daily.",
    tags: ["Next.js", "TypeScript", "Hono", "MySQL", "Drizzle ORM", "Tailwind CSS"],
    featured: true,
    year: "2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/demo-logistics",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Daily Shipments Tracked", value: "5,000+" },
      { label: "Dispatch Processing Time", value: "-60%" },
      { label: "Uptime SLA", value: "99.95%" },
    ],
    architecturePoints: [
      "Role-Based Access Control (Superadmin, Dispatcher, Driver, Finance)",
      "Automated PDF consignment note & invoice generation",
      "Optimistic UI updates with TanStack Query and React 19",
      "Database connection pooling with Drizzle ORM",
    ],
  },
  {
    id: "proj-2",
    title: "OmniPOS Multi-Outlet Retail System",
    slug: "omnipos-retail-system",
    category: "Full-Stack",
    shortDescription:
      "Cloud-based Point of Sale and inventory syncing system supporting offline cashier transactions and automated replenishment alerts.",
    fullDescription:
      "A retail operations platform built for multi-branch culinary and retail outlets. Provides cashier terminal, inventory threshold warnings, recipe cost tracking, and end-of-day reconciliation reports.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Framer Motion"],
    featured: true,
    year: "2024",
    image: "https://images.unsplash.com/photo-1556742049-0a67e557224d?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/demo-pos",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Store Outlets", value: "14 Stores" },
      { label: "Transaction Latency", value: "<120ms" },
      { label: "Inventory Sync Accuracy", value: "100%" },
    ],
    architecturePoints: [
      "Offline-first caching mechanism for unstable branch network conditions",
      "Redis pub/sub channels for instant multi-cashier sync",
      "Comprehensive daily revenue and margins breakdown",
    ],
  },
  {
    id: "proj-3",
    title: "KriptoPulse Real-Time Analytics Terminal",
    slug: "kriptopulse-analytics-terminal",
    category: "Frontend",
    shortDescription:
      "High-frequency cryptocurrency and market liquidity dashboard with live candlestick charts and order book visuals.",
    fullDescription:
      "A dark-mode financial terminal providing live market depth, candlestick trends, order book visualizer, and customizable alert notifications. Engineered with pure WebSocket connections and zero layout shifts.",
    tags: ["Next.js", "TypeScript", "ApexCharts", "WebSocket", "Tailwind CSS"],
    featured: true,
    year: "2023",
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/demo-crypto",
    githubUrl: "https://github.com",
    metrics: [
      { label: "WebSocket Ticks/Sec", value: "1,200+" },
      { label: "Lighthouse Performance", value: "98/100" },
      { label: "Client Memory Footprint", value: "<45MB" },
    ],
    architecturePoints: [
      "Custom throttled WebSocket stream to prevent React re-render thrashing",
      "Canvas-based rendering for ultra-dense chart histories",
      "Architectural monochrome UI with high legibility",
    ],
  },
  {
    id: "proj-4",
    title: "SentriAuth Distributed RBAC Gateway",
    slug: "sentriauth-rbac-gateway",
    category: "Backend / API",
    shortDescription:
      "Lightweight identity, JWT verification, and dynamic permission evaluation service built on Hono and Bun.",
    fullDescription:
      "An open-source authentication microservice offering JWT rotation, refresh token blacklisting via Redis, role hierarchy matrices, and lightning-fast permission checks.",
    tags: ["Hono", "Bun", "TypeScript", "Redis", "JWT", "Docker"],
    featured: false,
    year: "2023",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/demo-auth",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Request Throughput", value: "18,000 req/s" },
      { label: "Response Time", value: "1.8ms" },
      { label: "Docker Image Size", value: "38MB" },
    ],
    architecturePoints: [
      "Zero dependency core built directly on Bun runtime primitives",
      "Bitmask and hierarchical permission verification algorithms",
      "Plug-and-play middleware for Hono and Express applications",
    ],
  },
  {
    id: "proj-5",
    title: "DevForge CLI Developer Scaffolder",
    slug: "devforge-cli",
    category: "System / Tools",
    shortDescription:
      "Interactive command-line tool for bootstrapping full-stack repositories with pre-configured schemas, linters, and CI pipelines.",
    fullDescription:
      "Command-line utility designed to accelerate engineering setup. Automatically configures Next.js frontend, Hono backend, Drizzle schema, Docker compose, and GitHub workflows with a single command.",
    tags: ["Node.js", "TypeScript", "CLI", "Commander.js", "Inquirer"],
    featured: false,
    year: "2023",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&auto=format&fit=crop&q=80",
    githubUrl: "https://github.com",
    metrics: [
      { label: "NPM Downloads", value: "4,500+" },
      { label: "GitHub Stars", value: "320+" },
    ],
    architecturePoints: [
      "Interactive prompts with automated git repository initialization",
      "Multi-template generator supporting Hono, Express, and Fastify",
    ],
  },
  {
    id: "proj-6",
    title: "MedikaCare Clinic Booking & Telemedicine",
    slug: "medikacare-clinic-portal",
    category: "Full-Stack",
    shortDescription:
      "Healthcare patient portal featuring doctor schedule reservation, digital prescriptions, and automated appointment reminders.",
    fullDescription:
      "A healthcare digital platform created for private medical practices to manage patient queues, electronic medical records (EMR), doctor schedules, and digital payment receipts.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Twilio WhatsApp API"],
    featured: false,
    year: "2022",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
    demoUrl: "https://example.com/demo-medika",
    githubUrl: "https://github.com",
    metrics: [
      { label: "Patients Served", value: "12,000+" },
      { label: "Booking No-Show Drop", value: "-40%" },
    ],
    architecturePoints: [
      "Automated WhatsApp confirmation triggers via webhooks",
      "Strict HIPAA-compliant patient record data sanitization",
    ],
  },
];
