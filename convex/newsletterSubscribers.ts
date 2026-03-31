import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { newsletterSubscriberFields, newsletterSubscriberPatchFields } from "./schema";

export const list = query({
  handler: async ({ db }) => db.query("newsletterSubscribers").collect(),
});

export const getById = query({
  args: { id: v.id("newsletterSubscribers") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async () => null,
});

export const create = mutation({
  args: newsletterSubscriberFields,
  handler: async ({ db }, args) => db.insert("newsletterSubscribers", args),
});

export const update = mutation({
  args: { id: v.id("newsletterSubscribers"), patch: v.object(newsletterSubscriberPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("newsletterSubscribers") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async ({ db }, { email }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await db
      .query("newsletterSubscribers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      return { ok: true, duplicate: true, id: existing._id };
    }

    const id = await db.insert("newsletterSubscribers", {
      email: normalizedEmail,
      subscribedAt: Date.now(),
    });

    return { ok: true, duplicate: false, id };
  },
});

