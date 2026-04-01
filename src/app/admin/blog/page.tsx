"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, sortPosts, type CmsRecord } from "@/lib/cms";
import { normalizeBlogContent } from "@/lib/blog-content";
import { convexEnabled } from "@/lib/convex-config";
import type { CmsBlogPost } from "@/types/cms";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminNotice,
  AdminPage,
  AdminTextarea,
} from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";

type BlogRecord = CmsRecord<CmsBlogPost>;

function normalizePost(record: BlogRecord): BlogRecord {
  return {
    ...record,
    content: normalizeBlogContent(record.content),
  };
}

function createEmptyPost(): BlogRecord {
  return {
    slug: "",
    title: "",
    excerpt: "",
    date: "",
    category: "",
    readTime: "",
    image: "",
    author: "",
    content: "",
  };
}

export default function AdminBlogPage() {
  const { showToast } = useAdminToast();
  const posts = useQuery(api.blog.list, convexEnabled ? {} : "skip") as BlogRecord[] | undefined;
  const createPost = useMutation(api.blog.create);
  const updatePost = useMutation(api.blog.update);
  const deletePost = useMutation(api.blog.delete);
  const items = useMemo(
    () => sortPosts((posts?.length ? posts : fallbackContent.blog).map(normalizePost)),
    [posts]
  );
  const [selectedKey, setSelectedKey] = useState<string>("new");
  const [draft, setDraft] = useState<BlogRecord>(createEmptyPost());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedKey === "new") {
      setDraft(createEmptyPost());
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === selectedKey);
    if (selected) {
      setDraft(normalizePost(selected));
      return;
    }

    setSelectedKey("new");
    setDraft(createEmptyPost());
  }, [items, selectedKey]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!convexEnabled) {
      showToast("Convex is not configured. Save is disabled.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        slug: draft.slug.trim(),
        title: draft.title.trim(),
        excerpt: draft.excerpt.trim(),
        date: draft.date.trim(),
        category: draft.category.trim(),
        readTime: draft.readTime.trim(),
        image: draft.image.trim(),
        author: draft.author.trim(),
        content: draft.content.trim(),
      };

      if (draft._id) {
        await updatePost({ id: draft._id as never, patch: payload });
      } else {
        await createPost(payload);
      }

      showToast("Blog post saved.", "success");
      setSelectedKey("new");
      setDraft(createEmptyPost());
    } catch {
      showToast("Unable to save blog post.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft._id) {
      setDraft(createEmptyPost());
      return;
    }

    if (!window.confirm(`Delete "${draft.title}"?`)) return;
    try {
      await deletePost({ id: draft._id as never });
      showToast("Blog post deleted.", "success");
      setSelectedKey("new");
      setDraft(createEmptyPost());
    } catch {
      showToast("Unable to delete blog post.", "error");
    }
  };

  return (
    <AdminPage
      title="Blog"
      description="Manage blog posts used in the insights index and post detail pages."
      actions={
        <AdminButton type="button" tone="secondary" onClick={() => setSelectedKey("new")}>
          New Post
        </AdminButton>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Saves and deletes are unavailable.</AdminNotice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminCard title="Posts">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setSelectedKey("new")}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                selectedKey === "new"
                  ? "border-terra/40 bg-terra/10 text-stone-50"
                  : "border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700"
              }`}
            >
              New post
            </button>
            {items.map((item, index) => {
              const key = getRecordKey(item, index);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedKey(key);
                    setDraft(normalizePost(item));
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                    selectedKey === key
                      ? "border-terra/40 bg-terra/10 text-stone-50"
                      : "border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-sm text-stone-500">{item.date}</div>
                </button>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={draft._id ? "Edit Post" : "New Post"}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label="Slug">
                <AdminInput value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))} />
              </AdminField>
              <AdminField label="Title">
                <AdminInput value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
              </AdminField>
              <AdminField label="Date">
                <AdminInput value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} />
              </AdminField>
              <AdminField label="Category">
                <AdminInput value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} />
              </AdminField>
              <AdminField label="Read Time">
                <AdminInput value={draft.readTime} onChange={(event) => setDraft((current) => ({ ...current, readTime: event.target.value }))} />
              </AdminField>
              <AdminField label="Author">
                <AdminInput value={draft.author} onChange={(event) => setDraft((current) => ({ ...current, author: event.target.value }))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label="Image">
                  <ImageUpload
                    value={draft.image}
                    onChange={(image) => setDraft((current) => ({ ...current, image }))}
                    previewLabel="Blog post image"
                  />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Excerpt">
                  <AdminTextarea value={draft.excerpt} onChange={(event) => setDraft((current) => ({ ...current, excerpt: event.target.value }))} />
                </AdminField>
              </div>
            </div>

            <AdminField label="Content" hint="Use headings, lists, quotes, and links to structure the article.">
              <RichTextEditor value={draft.content} onChange={(content) => setDraft((current) => ({ ...current, content }))} />
            </AdminField>

            <div className="flex flex-wrap justify-between gap-3">
              <AdminButton type="button" tone="secondary" onClick={handleDelete}>
                {draft._id ? "Delete Post" : "Reset"}
              </AdminButton>
              <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : draft._id ? "Save Post" : "Create Post"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
