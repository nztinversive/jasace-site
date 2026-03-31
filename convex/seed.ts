import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { aboutContent, categories, heroContent, serviceContent, siteSettings, siteStats, testimonials } from "../src/data/site";
import { posts } from "../src/data/blog";
import { projects } from "../src/data/projects";
import { leadership } from "../src/data/team";

const contentTables = [
  "hero",
  "about",
  "services",
  "projects",
  "team",
  "blog",
  "testimonials",
  "stats",
  "categories",
  "siteSettings",
] as const;

export const seedDatabase = mutation({
  args: { reset: v.optional(v.boolean()) },
  handler: async ({ db }, { reset }) => {
    const counts = await Promise.all(
      contentTables.map(async (table) => ({
        table,
        count: (await db.query(table).collect()).length,
      }))
    );

    const hasContent = counts.some((entry) => entry.count > 0);

    if (hasContent && !reset) {
      return {
        seeded: false,
        message: "Content already exists. Run with reset=true to replace it.",
      };
    }

    if (reset) {
      for (const table of contentTables) {
        const docs = await db.query(table).collect();
        for (const doc of docs) {
          await db.delete(doc._id);
        }
      }
    }

    await db.insert("hero", heroContent);
    await db.insert("about", aboutContent);
    await db.insert("siteSettings", siteSettings);

    for (const service of serviceContent) {
      await db.insert("services", service);
    }

    for (const project of projects) {
      await db.insert("projects", project);
    }

    for (const member of leadership) {
      await db.insert("team", member);
    }

    for (const post of posts) {
      await db.insert("blog", post);
    }

    for (const testimonial of testimonials) {
      await db.insert("testimonials", testimonial);
    }

    for (const stat of siteStats) {
      await db.insert("stats", stat);
    }

    for (const category of categories) {
      await db.insert("categories", category);
    }

    return {
      seeded: true,
      message: "Convex CMS content seeded successfully.",
    };
  },
});
