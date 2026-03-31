import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { teamFields, teamPatchFields } from "./schema";
import { slugify } from "./utils";

export const list = query({
  handler: async ({ db }) => db.query("team").collect(),
});

export const getById = query({
  args: { id: v.id("team") },
  handler: async ({ db }, { id }) => db.get(id),
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const team = await db.query("team").collect();
    return team.find((member) => slugify(member.name) === slug) ?? null;
  },
});

export const create = mutation({
  args: teamFields,
  handler: async ({ db }, args) => db.insert("team", args),
});

export const update = mutation({
  args: { id: v.id("team"), patch: v.object(teamPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, patch);
    return db.get(id);
  },
});

const remove = mutation({
  args: { id: v.id("team") },
  handler: async ({ db }, { id }) => {
    await db.delete(id);
    return id;
  },
});

export { remove as delete };

