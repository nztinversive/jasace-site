import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { siteSettingsFields, siteSettingsPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("siteSettings").collect(),
});

export const getById = query({
  args: { id: v.id("siteSettings") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async () => null,
});

export const create = mutation({
  args: siteSettingsFields,
  handler: async ({ db }, args) => db.insert("siteSettings", args),
});

export const update = mutation({
  args: { id: v.id("siteSettings"), patch: v.object(siteSettingsPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("siteSettings") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

