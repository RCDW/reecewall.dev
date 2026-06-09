// Shared interfaces across apps. Keep dependency-free (like @stitchers/types).
export interface CVRole {
  title: string;
  org: string;
  start: string;
  end: string;
  bullets: string[];
  stack?: string[];
}
export interface CVData {
  name: string;
  tagline: string;
  location: string;
  email: string;
  links: { label: string; href: string }[];
  profile: string;
  roles: CVRole[];
  skills: { group: string; items: string[] }[];
  education: { award: string; place: string; year: string }[];
}
export interface ProjectCard {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "in-dev" | "origin";
  href: string;
  tags: string[];
}
