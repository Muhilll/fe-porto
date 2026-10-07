export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  label: string;
}

export interface Profile {
  name: string;
  shortName: string;
  role: string;
  rolesList: string[];
  tagline: string;
  bio: string;
  location: string;
  availability: "available" | "busy" | "open_to_offers";
  availabilityText: string;
  experienceYears: number;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  avatarUrl: string;
  resumeUrl: string;
  email: string;
  github: string;
  linkedin: string;
  whatsapp: string;
  socials: SocialLink[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  description: string;
  skills: string[];
}

export interface EducationItem {
  id: string;
  period: string;
  degree: string;
  institution: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: {
    name: string;
    level: string; // e.g. "Proficient", "Advanced", "Familiar"
    iconName?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  deliverables: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: "Full-Stack" | "Frontend" | "Backend / API" | "System / Tools";
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  featured: boolean;
  year: string;
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  architecturePoints: string[];
}

export interface RepositoryItem {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  url: string;
  updatedAt: string;
}

export interface ContributionData {
  githubUsername: string;
  githubUrl: string;
  totalContributionsLastYear: number;
  currentStreakDays: number;
  longestStreakDays: number;
  totalPullRequests: number;
  totalStarsEarned: number;
  topLanguages: {
    name: string;
    percentage: number;
    color: string;
  }[];
  repositories: RepositoryItem[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  issuerLogo?: string;
  issueDate: string;
  expiryDate?: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  skills: string[];
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

export interface ContactInfo {
  headline: string;
  subheadline: string;
  email: string;
  whatsapp: string;
  phone: string;
  location: string;
  workingHours: string;
  responseRate: string;
  socials: SocialLink[];
}
