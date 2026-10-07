export interface NavItem {
  name: string;
  href: string;
  description: string;
}

export const navigationItems: NavItem[] = [
  { name: "Home", href: "/", description: "Overview & Featured Highlights" },
  { name: "About", href: "/about", description: "Background, Experience & Tech Stack" },
  { name: "Services", href: "/services", description: "Engineering & Architecture Offerings" },
  { name: "Projects", href: "/projects", description: "Selected Works & Case Studies" },
  { name: "Contribution", href: "/contribution", description: "Open Source Activity & Git Metrics" },
  { name: "Certificates", href: "/certificates", description: "Credentials & Professional Licenses" },
  { name: "Blog", href: "/blog", description: "Technical Thoughts & Engineering Notes" },
  { name: "Contact", href: "/contact", description: "Get in Touch & Consultations" },
];
