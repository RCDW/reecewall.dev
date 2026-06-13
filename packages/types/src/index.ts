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
  // Note on earlier career, shown after the dated roles (designed CV + web only).
  earlier?: string;
  skills: { group: string; items: string[] }[];
  education: { award: string; place: string; year: string }[];
  // Designed CV + web only; the ATS .docx omits these.
  strengths?: string[];
  metrics?: { value: string; label: string }[];
}
export interface ProjectCard {
  slug: string;
  title: string;
  blurb: string;
  status: "live" | "in-dev" | "origin";
  href: string;
  tags: string[];
}
