import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { aboutFields, aboutPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("about").collect(),
});

export const get = query({
  handler: async ({ db }) => db.query("about").first(),
});

export const getById = query({
  args: { id: v.id("about") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async () => null,
});

export const create = mutation({
  args: aboutFields,
  handler: async ({ db }, args) => db.insert("about", args),
});

export const update = mutation({
  args: { id: v.id("about"), patch: v.object(aboutPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("about") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };
