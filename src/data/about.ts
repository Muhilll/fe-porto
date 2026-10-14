import { ExperienceItem, EducationItem, SkillCategory } from "@/types/portfolio";

export const aboutNarrative = {
  intro:
    "I'm a full-stack software engineer with 3+ years of software development experience, building web applications, cross-platform mobile apps, and integrated information systems. I focus on translating real-world requirements into well-structured solutions, balancing functionality, maintainability, and user experience throughout the development process.",
  philosophy: [
    {
      title: "Simplicity Over Complexity",
      description: "Build solutions that are easy to understand, maintain, and extend. I prefer clear code, appropriate abstractions, and straightforward implementations over unnecessary complexity.",
    },
    {
      title: "Architecture with Purpose",
      description: "Choose architectural patterns based on project requirements. I value clear separation of responsibilities, organized business logic, and well-defined API boundaries to keep applications easier to develop and maintain.",
    },
    {
      title: "Reliability & User-Centered Design",
      description: "Build applications that handle data consistently, validate inputs, enforce appropriate access controls, and provide intuitive user experiences. I aim to make software reliable for the people who depend on it.",
    },
  ],

  
};

export const experienceData: ExperienceItem[] = [
  {
    id: "exp-1",
    period: "2023 — Present",
    role: "Senior Full-Stack Engineer",
    company: "Apex Digital Solutions",
    location: "Remote",
    description:
      "Leading technical architecture for client web applications and internal tools. Standardized Next.js and TypeScript patterns, improved build pipeline speed by 45%, and orchestrated microservice integrations.",
    skills: ["Next.js", "TypeScript", "Node.js / Hono", "PostgreSQL", "Docker", "Tailwind CSS"],
  },
  {
    id: "exp-2",
    period: "2021 — 2023",
    role: "Full-Stack Web Developer",
    company: "Nusantara Tech Studio",
    location: "Jakarta, Indonesia",
    description:
      "Engineered multi-tenant management portals, payment gateway integrations, and real-time dashboards for SMEs. Collaborated directly with product teams to design relational schemas and REST APIs.",
    skills: ["React", "Express.js", "MySQL", "Redis", "REST APIs", "Tailwind CSS"],
  },
  {
    id: "exp-3",
    period: "2020 — 2021",
    role: "Frontend Developer",
    company: "Inovasi Media Lab",
    location: "Bandung, Indonesia",
    description:
      "Crafted responsive websites, landing pages, and interactive UI components with pixel-perfect design parity. Championed accessibility standards and cross-browser performance.",
    skills: ["JavaScript (ES6+)", "React", "HTML5/CSS3", "Git", "Figma"],
  },
];

export const educationData: EducationItem[] = [
  {
    id: "edu-1",
    period: "2017 — 2021",
    degree: "Bachelor of Computer Science (B.Comp.Sc.)",
    institution: "Universitas Negeri",
    description:
      "Focused on Software Engineering, Database Systems, and Network Architecture. Graduated with honors.",
  },
];

export const skillCategoriesData: SkillCategory[] = [
  {
    category: "Frontend Architecture",
    skills: [
      { name: "React 19 / Next.js 15+", level: "Expert" },
      { name: "TypeScript", level: "Expert" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Framer Motion", level: "Advanced" },
      { name: "State Management (Zustand, React Query)", level: "Advanced" },
      { name: "Web Performance & SEO", level: "Advanced" },
    ],
  },
  {
    category: "Backend & Systems",
    skills: [
      { name: "Node.js & Bun", level: "Expert" },
      { name: "Hono & Express", level: "Advanced" },
      { name: "RESTful & RPC APIs", level: "Expert" },
      { name: "Authentication & RBAC", level: "Expert" },
      { name: "Microservices & Serverless", level: "Proficient" },
      { name: "WebSockets & Event Streams", level: "Proficient" },
    ],
  },
  {
    category: "Database & Storage",
    skills: [
      { name: "PostgreSQL & MySQL", level: "Advanced" },
      { name: "Drizzle ORM & Prisma", level: "Expert" },
      { name: "Redis Caching", level: "Advanced" },
      { name: "Database Indexing & Query Tuning", level: "Proficient" },
    ],
  },
  {
    category: "DevOps & Tooling",
    skills: [
      { name: "Git & GitHub Actions (CI/CD)", level: "Advanced" },
      { name: "Docker & Containerization", level: "Proficient" },
      { name: "Vercel / Cloudflare / VPS", level: "Advanced" },
      { name: "Linux Administration", level: "Proficient" },
    ],
  },
];
