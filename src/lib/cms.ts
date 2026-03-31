import { useQuery } from "convex/react";
import type { FunctionReference } from "convex/server";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";
import { aboutContent, categories, heroContent, serviceContent, siteSettings, siteStats, testimonials } from "@/data/site";
import { leadership } from "@/data/team";
import { convexEnabled } from "@/lib/convex-config";

export type CmsRecord<T> = T & {
  _id?: string;
  _creationTime?: number;
};

export const fallbackContent = {
  hero: heroContent,
  about: aboutContent,
  services: serviceContent,
  projects,
  team: leadership,
  blog: posts,
  testimonials,
  stats: siteStats,
  categories,
  siteSettings,
};

export function useCmsQuery<Query extends FunctionReference<"query">, Result>(
  query: Query,
  args: Query["_args"] | {},
  fallback: Result
) {
  const data = useQuery(query, convexEnabled ? args : "skip") as Result | undefined;
  return data ?? fallback;
}

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

export function getRecordKey(item: { _id?: string }, index: number) {
  return item._id ?? `fallback-${index}`;
}

