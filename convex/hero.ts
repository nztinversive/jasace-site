import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { heroFields, heroPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("hero").collect(),
});

export const get = query({
  handler: async ({ db }) => db.query("hero").first(),
});

export const getById = query({
  args: { id: v.id("hero") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async () => null,
});

export const create = mutation({
  args: heroFields,
  handler: async ({ db }, args) => db.insert("hero", args),
});

export const update = mutation({
  args: { id: v.id("hero"), patch: v.object(heroPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("hero") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };
