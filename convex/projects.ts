import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { projectFields, projectPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("projects").collect(),
});

export const getById = query({
  args: { id: v.id("projects") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => db.query("projects").withIndex("by_slug", (q) => q.eq("slug", slug)).first(),
});

export const create = mutation({
  args: projectFields,
  handler: async ({ db }, args) => db.insert("projects", args),
});

export const update = mutation({
  args: { id: v.id("projects"), patch: v.object(projectPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("projects") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

