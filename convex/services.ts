import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { serviceFields, servicePatchFields } from "./schema";
import { slugify } from "./utils";

export const list = query({
  handler: async ({ db }) => db.query("services").withIndex("by_order").collect(),
});

export const getById = query({
  args: { id: v.id("services") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const services = await db.query("services").collect();
    return services.find((service) => slugify(service.title) === slug) ?? null;
  },
});

export const create = mutation({
  args: serviceFields,
  handler: async ({ db }, args) => db.insert("services", args),
});

export const update = mutation({
  args: { id: v.id("services"), patch: v.object(servicePatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("services") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

