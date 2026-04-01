import type { BlogPost } from "@/data/blog";
import type { Project } from "@/data/projects";
import type { TeamMember } from "@/data/team";

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  eyebrow?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface AboutStat {
  label: string;
  value: string;
}

export interface Award {
  year: string;
  title: string;
  project: string;
}

export interface Milestone {
  year: string;
  event: string;
}

export interface AboutContent {
  heading: string;
  subheading: string;
  paragraphs: string[];
  image: string;
  stats: AboutStat[];
  awards: Award[];
  milestones: Milestone[];
}

export interface ServiceFeatureStat {
  label: string;
  value: string;
}

export interface ServiceContent {
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
  image: string;
  order: number;
  details: string[];
  stats: ServiceFeatureStat[];
  stat: string;
  statLabel: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  title: string;
}

export interface SiteStat {
  value: number;
  suffix: string;
  label: string;
  detail: string;
  order: number;
}

export interface Category {
  title: string;
  count: string;
  image: string;
  description: string;
  order: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  socialLinks: SocialLink[];
  footerText: string;
}

export type CmsProject = Project;
export type CmsTeamMember = TeamMember;
export type CmsBlogPost = BlogPost;
