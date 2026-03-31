import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { statFields, statPatchFields } from "./schema";
import { slugify } from "./utils";

export const list = query({
  handler: async ({ db }) => db.query("stats").withIndex("by_order").collect(),
});

export const getById = query({
  args: { id: v.id("stats") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const stats = await db.query("stats").collect();
    return stats.find((item) => slugify(item.label) === slug) ?? null;
  },
});

export const create = mutation({
  args: statFields,
  handler: async ({ db }, args) => db.insert("stats", args),
});

export const update = mutation({
  args: { id: v.id("stats"), patch: v.object(statPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("stats") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

