import { posts, type BlogPost } from "@/data/blog";
import { projects } from "@/data/projects";
import { aboutContent, categories, heroContent, serviceContent, siteSettings, siteStats, testimonials } from "@/data/site";
import { leadership, type TeamMember } from "@/data/team";
import type { Category, ServiceContent, SiteSettings, SiteStat, Testimonial } from "@/types/cms";
import type { Project } from "@/data/projects";

export type CmsRecord<T> = T & {
  _id?: string;
  _creationTime?: number;
};

export const fallbackContent = {
  hero: heroContent,
  about: aboutContent,
  services: serviceContent as CmsRecord<ServiceContent>[],
  projects: projects as CmsRecord<Project>[],
  team: leadership as CmsRecord<TeamMember>[],
  blog: posts as CmsRecord<BlogPost>[],
  testimonials: testimonials as CmsRecord<Testimonial>[],
  stats: siteStats as CmsRecord<SiteStat>[],
  categories: categories as CmsRecord<Category>[],
  siteSettings: siteSettings as CmsRecord<SiteSettings>,
};

export function sortServices<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function sortStats<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function sortCategories<T extends { order: number }>(items: T[]) {
  return [...items].sort((a, b) => a.order - b.order);
}

export function sortProjects<T extends { featured: boolean }>(items: T[]) {
  return [...items].sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function sortPosts<T extends { date: string }>(items: T[]) {
  return [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function stripSystemFields<T extends Record<string, unknown>>(item: T): T {
  const clone = { ...item };
  delete clone._id;
  delete clone._creationTime;
  return clone;
}

export function getRecordKey(item: { _id?: string } | Record<string, unknown>, index: number) {
  return "_id" in item && typeof item._id === "string" ? item._id : `fallback-${index}`;
}
