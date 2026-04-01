import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { blogFields, blogPatchFields } from "./schema";
import { normalizeBlogContent } from "../src/lib/blog-content";

function normalizeBlogPost<T extends { content: string | string[] }>(post: T) {
  return {
    ...post,
    content: normalizeBlogContent(post.content),
  };
}

export const list = query({
  handler: async ({ db }) => (await db.query("blog").collect()).map(normalizeBlogPost),
});

export const getById = query({
  args: { id: v.id("blog") },
  handler: async ({ db }, { id }) => {
    const post = await db.get(id);
    return post ? normalizeBlogPost(post) : null;
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async ({ db }, { slug }) => {
    const post = await db.query("blog").withIndex("by_slug", (q) => q.eq("slug", slug)).first();
    return post ? normalizeBlogPost(post) : null;
  },
});

export const create = mutation({
  args: blogFields,
  handler: async ({ db }, args) =>
    db.insert("blog", { ...args, content: normalizeBlogContent(args.content) }),
});

export const update = mutation({
  args: { id: v.id("blog"), patch: v.object(blogPatchFields) },
  handler: async ({ db }, { id, patch }) => {
    await db.patch(id, {
      ...patch,
      ...(patch.content === undefined ? {} : { content: normalizeBlogContent(patch.content) }),
    });
    const post = await db.get(id);
    return post ? normalizeBlogPost(post) : null;
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
