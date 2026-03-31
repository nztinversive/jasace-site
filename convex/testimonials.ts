import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { testimonialFields, testimonialPatchFields } from "./schema";
import { slugify } from "./utils";

export const list = query({
  handler: async ({ db }) => db.query("testimonials").collect(),
});

export const getById = query({
  args: { id: v.id("testimonials") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const testimonials = await db.query("testimonials").collect();
    return testimonials.find((item) => slugify(item.name) === slug) ?? null;
  },
});

export const create = mutation({
  args: testimonialFields,
  handler: async ({ db }, args) => db.insert("testimonials", args),
});

export const update = mutation({
  args: { id: v.id("testimonials"), patch: v.object(testimonialPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

