import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { blogFields, blogPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("blog").collect(),
});

export const getById = query({
  args: { id: v.id("blog") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => db.query("blog").withIndex("by_slug", (q) => q.eq("slug", slug)).first(),
});

export const create = mutation({
  args: blogFields,
  handler: async ({ db }, args) => db.insert("blog", args),
});

export const update = mutation({
  args: { id: v.id("blog"), patch: v.object(blogPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("blog") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

