// Shared type definitions for data JSON files

export interface Alumnus {
  name: string;
  graduationYear?: string;
  currentPosition?: string;
  webpage?: string;
  category: "faculty" | "staff" | "phd" | "masters" | "undergrad";
}

export interface NewsArticle {
  title: string;
  date: string;
  excerpt: string;
  image?: string;
  href: string;
}

export interface PastResearchProject {
  title: string;
  slug: string;
  description: string;
  image?: string;
  externalLink?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  description: string;
  email: string;
  website?: string;
  linkedin?: string;
}

export const alumniCategories = [
  { key: "faculty" as const, label: "Faculty" },
  { key: "staff" as const, label: "Staff" },
  { key: "phd" as const, label: "PhD" },
  { key: "masters" as const, label: "Masters" },
  { key: "undergrad" as const, label: "Undergraduate" },
];
