import { profileData } from "@/data/profile";
import { projectsData } from "@/data/projects";
import { experienceData, educationData, skillCategoriesData } from "@/data/about";
import { certificatesData } from "@/data/certificates";
import { servicesData } from "@/data/services";
import { blogsData } from "@/data/blogs";
import type {
  Profile,
  ProjectItem,
  ExperienceItem,
  EducationItem,
  SkillCategory,
  CertificateItem,
  ServiceItem,
  BlogPostItem,
} from "@/types/portfolio";
import type { BackendProfile } from "./profile/types";
import type { BackendProject } from "./project/types";
import type { BackendExperience, BackendEducation, BackendSkillCategory } from "./about/types";
import type { BackendCertificate } from "./certificate/types";
import type { BackendService } from "./service/types";
import type { BackendBlog } from "./blog/types";

/**
 * Normalizes backend or raw project object into standard ProjectItem
 */
export function normalizeProject(raw: Partial<BackendProject> & Record<string, any>): ProjectItem {
  return {
    id: String(raw.id || raw._id || Math.random().toString(36).slice(2, 9)),
    title: raw.title || "Untitled Project",
    slug: raw.slug || (raw.title ? raw.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") : "project"),
    category: (raw.category as any) || "Full-Stack",
    shortDescription: raw.short_description || raw.shortDescription || "",
    fullDescription: raw.full_description || raw.fullDescription || raw.short_description || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    featured: Boolean(raw.featured),
    year: raw.year || String(new Date().getFullYear()),
    image: raw.image_url || raw.image || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
    demoUrl: raw.demo_url || raw.demoUrl || undefined,
    githubUrl: raw.github_url || raw.githubUrl || undefined,
    metrics: Array.isArray(raw.metrics) ? raw.metrics : [],
    architecturePoints: Array.isArray(raw.architecture_points)
      ? raw.architecture_points
      : Array.isArray(raw.architecturePoints)
      ? raw.architecturePoints
      : [],
  };
}

/**
 * Converts a list of backend projects with fallback to static projectsData if empty
 */
export function getNormalizedProjects(apiProjects?: BackendProject[] | null): ProjectItem[] {
  if (!apiProjects || apiProjects.length === 0) {
    return projectsData;
  }
  return apiProjects.map(normalizeProject);
}

/**
 * Normalizes backend profile into standard Profile, falling back to profileData
 */
export function getNormalizedProfile(apiProfile?: BackendProfile | null): Profile {
  if (!apiProfile) {
    return profileData;
  }

  const githubUrl = apiProfile.github || profileData.github;
  const linkedinUrl = apiProfile.linkedin || profileData.linkedin;
  const emailAddr = apiProfile.email || profileData.email;
  const whatsappNum = apiProfile.whatsapp || profileData.whatsapp;

  return {
    name: apiProfile.name || profileData.name,
    shortName: apiProfile.short_name || profileData.shortName,
    role: apiProfile.role || profileData.role,
    rolesList:
      apiProfile.roles_list && apiProfile.roles_list.length > 0
        ? apiProfile.roles_list
        : profileData.rolesList,
    tagline: apiProfile.tagline || profileData.tagline,
    bio: apiProfile.bio || profileData.bio,
    location: apiProfile.location || profileData.location,
    availability: (apiProfile.availability as any) || profileData.availability,
    availabilityText: apiProfile.availability_text || profileData.availabilityText,
    experienceYears: profileData.experienceYears || 4,
    stats:
      apiProfile.stats && apiProfile.stats.length > 0
        ? apiProfile.stats
        : profileData.stats,
    avatarUrl: apiProfile.avatar_url || profileData.avatarUrl,
    resumeUrl: apiProfile.resume_url || profileData.resumeUrl,
    email: emailAddr,
    github: githubUrl,
    linkedin: linkedinUrl,
    whatsapp: whatsappNum,
    socials: [
      {
        platform: "GitHub",
        url: githubUrl,
        icon: "Github",
        label: githubUrl.replace(/^https?:\/\/(www\.)?github\.com\/?/, "github.com/"),
      },
      {
        platform: "LinkedIn",
        url: linkedinUrl,
        icon: "Linkedin",
        label: "linkedin.com/in",
      },
      {
        platform: "Email",
        url: `mailto:${emailAddr}`,
        icon: "Mail",
        label: emailAddr,
      },
      {
        platform: "WhatsApp",
        url: whatsappNum.startsWith("http") ? whatsappNum : `https://wa.me/${whatsappNum.replace(/[^0-9]/g, "")}`,
        icon: "MessageSquare",
        label: whatsappNum,
      },
    ],
  };
}

/**
 * Normalizes backend experiences with fallback to experienceData
 */
export function getNormalizedExperiences(apiList?: BackendExperience[] | null): ExperienceItem[] {
  if (!apiList || apiList.length === 0) {
    return experienceData;
  }

  return apiList.map((item) => ({
    id: String(item.id),
    role: item.role,
    company: item.company,
    period: item.period,
    location: item.location || "",
    companyUrl: item.company_url || undefined,
    description: item.description || "",
    skills: Array.isArray(item.skills) ? item.skills : [],
  }));
}

/**
 * Normalizes backend educations with fallback to educationData
 */
export function getNormalizedEducations(apiList?: BackendEducation[] | null): EducationItem[] {
  if (!apiList || apiList.length === 0) {
    return educationData;
  }

  return apiList.map((item) => ({
    id: String(item.id),
    degree: item.degree,
    institution: item.institution,
    period: item.period,
    description: item.description || "",
  }));
}

/**
 * Normalizes backend skill categories with fallback to skillCategoriesData
 */
export function getNormalizedSkillCategories(apiList?: BackendSkillCategory[] | null): SkillCategory[] {
  if (!apiList || apiList.length === 0) {
    return skillCategoriesData;
  }

  return apiList.map((item) => ({
    category: item.category,
    skills: Array.isArray(item.skills) ? item.skills : [],
  }));
}

/**
 * Normalizes backend certificates with fallback to certificatesData
 */
export function getNormalizedCertificates(apiList?: BackendCertificate[] | null): CertificateItem[] {
  if (!apiList || apiList.length === 0) {
    return certificatesData;
  }

  return apiList.map((item) => ({
    id: String(item.id),
    title: item.title,
    issuer: item.issuer,
    issuerLogo: item.issuer_logo || undefined,
    issueDate: item.issue_date,
    expiryDate: item.expiry_date || undefined,
    credentialId: item.credential_id || "",
    credentialUrl: item.credential_url || "#",
    image: item.image,
    skills: Array.isArray(item.skills) ? item.skills : [],
  }));
}

/**
 * Normalizes backend services with fallback to servicesData
 */
export function getNormalizedServices(apiList?: BackendService[] | null): ServiceItem[] {
  if (!apiList || apiList.length === 0) {
    return servicesData;
  }

  return apiList.map((item) => ({
    id: item.service_code || `srv-${item.id}`,
    number: item.number,
    title: item.title,
    description: item.description || "",
    icon: item.icon || "Layout",
    features: Array.isArray(item.features) ? item.features : [],
    deliverables: item.deliverables || "",
  }));
}

/**
  * Normalizes backend or raw blog post into standard BlogPostItem
  */
export function normalizeBlog(raw: Partial<BackendBlog> & Record<string, any>): BlogPostItem {
  return {
    id: String(raw.id || raw.slug || Math.random().toString(36).slice(2, 9)),
    slug: raw.slug || "post",
    title: raw.title || "Untitled Article",
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    publishedAt: raw.published_at || raw.publishedAt || "Recently",
    readTime: raw.read_time || raw.readTime || "5 min read",
    category: raw.category || "General",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    featured: Boolean(raw.featured),
    coverImage: raw.cover_image || raw.coverImage || undefined,
  };
}

/**
  * Converts a list of backend blogs with fallback to static blogsData if empty
  */
export function getNormalizedBlogs(apiBlogs?: BackendBlog[] | null): BlogPostItem[] {
  if (!apiBlogs || apiBlogs.length === 0) {
    return blogsData;
  }
  return apiBlogs.map(normalizeBlog);
}


