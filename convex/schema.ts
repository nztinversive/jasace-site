import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const socialLinkValidator = v.object({
  platform: v.string(),
  url: v.string(),
});

export const heroFields = {
  headline: v.string(),
  subheadline: v.string(),
  ctaText: v.string(),
  ctaLink: v.string(),
  backgroundImage: v.string(),
  eyebrow: v.optional(v.string()),
  secondaryCtaText: v.optional(v.string()),
  secondaryCtaLink: v.optional(v.string()),
};

export const heroPatchFields = {
  headline: v.optional(v.string()),
  subheadline: v.optional(v.string()),
  ctaText: v.optional(v.string()),
  ctaLink: v.optional(v.string()),
  backgroundImage: v.optional(v.string()),
  eyebrow: v.optional(v.string()),
  secondaryCtaText: v.optional(v.string()),
  secondaryCtaLink: v.optional(v.string()),
};

const aboutStatValidator = v.object({
  label: v.string(),
  value: v.string(),
});

const awardValidator = v.object({
  year: v.string(),
  title: v.string(),
  project: v.string(),
});

const milestoneValidator = v.object({
  year: v.string(),
  event: v.string(),
});

export const aboutFields = {
  heading: v.string(),
  subheading: v.string(),
  paragraphs: v.array(v.string()),
  image: v.string(),
  stats: v.array(aboutStatValidator),
  awards: v.array(awardValidator),
  milestones: v.array(milestoneValidator),
};

export const aboutPatchFields = {
  heading: v.optional(v.string()),
  subheading: v.optional(v.string()),
  paragraphs: v.optional(v.array(v.string())),
  image: v.optional(v.string()),
  stats: v.optional(v.array(aboutStatValidator)),
  awards: v.optional(v.array(awardValidator)),
  milestones: v.optional(v.array(milestoneValidator)),
};

const serviceFeatureStatValidator = v.object({
  label: v.string(),
  value: v.string(),
});

export const serviceFields = {
  title: v.string(),
  subtitle: v.string(),
  description: v.string(),
  capabilities: v.array(v.string()),
  image: v.string(),
  order: v.number(),
  details: v.array(v.string()),
  stats: v.array(serviceFeatureStatValidator),
  stat: v.string(),
  statLabel: v.string(),
};

export const servicePatchFields = {
  title: v.optional(v.string()),
  subtitle: v.optional(v.string()),
  description: v.optional(v.string()),
  capabilities: v.optional(v.array(v.string())),
  image: v.optional(v.string()),
  order: v.optional(v.number()),
  details: v.optional(v.array(v.string())),
  stats: v.optional(v.array(serviceFeatureStatValidator)),
  stat: v.optional(v.string()),
  statLabel: v.optional(v.string()),
};

const projectSpecValidator = v.object({
  label: v.string(),
  value: v.string(),
});

export const projectFields = {
  slug: v.string(),
  title: v.string(),
  client: v.string(),
  location: v.string(),
  category: v.string(),
  year: v.string(),
  heroImage: v.string(),
  featured: v.boolean(),
  scope: v.string(),
  description: v.string(),
  challenge: v.string(),
  solution: v.string(),
  result: v.string(),
  specs: v.array(projectSpecValidator),
  gallery: v.array(v.string()),
};

export const projectPatchFields = {
  slug: v.optional(v.string()),
  title: v.optional(v.string()),
  client: v.optional(v.string()),
  location: v.optional(v.string()),
  category: v.optional(v.string()),
  year: v.optional(v.string()),
  heroImage: v.optional(v.string()),
  featured: v.optional(v.boolean()),
  scope: v.optional(v.string()),
  description: v.optional(v.string()),
  challenge: v.optional(v.string()),
  solution: v.optional(v.string()),
  result: v.optional(v.string()),
  specs: v.optional(v.array(projectSpecValidator)),
  gallery: v.optional(v.array(v.string())),
};

export const teamFields = {
  name: v.string(),
  title: v.string(),
  bio: v.string(),
  image: v.string(),
  linkedin: v.optional(v.string()),
};

export const teamPatchFields = {
  name: v.optional(v.string()),
  title: v.optional(v.string()),
  bio: v.optional(v.string()),
  image: v.optional(v.string()),
  linkedin: v.optional(v.string()),
};

export const blogFields = {
  slug: v.string(),
  title: v.string(),
  excerpt: v.string(),
  date: v.string(),
  category: v.string(),
  readTime: v.string(),
  image: v.string(),
  author: v.string(),
  content: v.string(),
};

export const blogPatchFields = {
  slug: v.optional(v.string()),
  title: v.optional(v.string()),
  excerpt: v.optional(v.string()),
  date: v.optional(v.string()),
  category: v.optional(v.string()),
  readTime: v.optional(v.string()),
  image: v.optional(v.string()),
  author: v.optional(v.string()),
  content: v.optional(v.string()),
};

export const testimonialFields = {
  quote: v.string(),
  name: v.string(),
  title: v.string(),
};

export const testimonialPatchFields = {
  quote: v.optional(v.string()),
  name: v.optional(v.string()),
  title: v.optional(v.string()),
};

export const statFields = {
  value: v.number(),
  suffix: v.string(),
  label: v.string(),
  detail: v.string(),
  order: v.number(),
};

export const statPatchFields = {
  value: v.optional(v.number()),
  suffix: v.optional(v.string()),
  label: v.optional(v.string()),
  detail: v.optional(v.string()),
  order: v.optional(v.number()),
};

export const categoryFields = {
  title: v.string(),
  count: v.string(),
  image: v.string(),
  description: v.string(),
  order: v.number(),
};

export const categoryPatchFields = {
  title: v.optional(v.string()),
  count: v.optional(v.string()),
  image: v.optional(v.string()),
  description: v.optional(v.string()),
  order: v.optional(v.number()),
};

export const siteSettingsFields = {
  companyName: v.string(),
  tagline: v.string(),
  email: v.string(),
  phone: v.string(),
  address: v.string(),
  socialLinks: v.array(socialLinkValidator),
  footerText: v.string(),
};

export const siteSettingsPatchFields = {
  companyName: v.optional(v.string()),
  tagline: v.optional(v.string()),
  email: v.optional(v.string()),
  phone: v.optional(v.string()),
  address: v.optional(v.string()),
  socialLinks: v.optional(v.array(socialLinkValidator)),
  footerText: v.optional(v.string()),
};

export const newsletterSubscriberFields = {
  email: v.string(),
  subscribedAt: v.number(),
};

export const newsletterSubscriberPatchFields = {
  email: v.optional(v.string()),
  subscribedAt: v.optional(v.number()),
};

export default defineSchema({
  hero: defineTable(heroFields),
  about: defineTable(aboutFields),
  services: defineTable(serviceFields).index("by_order", ["order"]),
  projects: defineTable(projectFields).index("by_slug", ["slug"]),
  team: defineTable(teamFields),
  blog: defineTable(blogFields).index("by_slug", ["slug"]),
  testimonials: defineTable(testimonialFields),
  stats: defineTable(statFields).index("by_order", ["order"]),
  categories: defineTable(categoryFields).index("by_order", ["order"]),
  siteSettings: defineTable(siteSettingsFields),
  newsletterSubscribers: defineTable(newsletterSubscriberFields).index("by_email", ["email"]),
});
