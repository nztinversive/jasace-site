import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { categoryFields, categoryPatchFields } from "./schema";
import { slugify } from "./utils";

export const list = query({
  handler: async ({ db }) => db.query("categories").withIndex("by_order").collect(),
});

export const getById = query({
  args: { id: v.id("categories") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const categories = await db.query("categories").collect();
    return categories.find((item) => slugify(item.title) === slug) ?? null;
  },
});

export const create = mutation({
  args: categoryFields,
  handler: async ({ db }, args) => db.insert("categories", args),
});

export const update = mutation({
  args: { id: v.id("categories"), patch: v.object(categoryPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("categories") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

