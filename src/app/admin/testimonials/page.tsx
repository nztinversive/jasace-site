"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { Testimonial } from "@/types/cms";
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

type TestimonialRecord = CmsRecord<Testimonial>;

function createEmptyTestimonial(): TestimonialRecord {
  return {
    quote: "",
    name: "",
    title: "",
  };
}

export default function AdminTestimonialsPage() {
  const { showToast } = useAdminToast();
  const testimonials = useQuery(
    api.testimonials.list,
    convexEnabled ? {} : "skip"
  ) as TestimonialRecord[] | undefined;
  const createTestimonial = useMutation(api.testimonials.create);
  const updateTestimonial = useMutation(api.testimonials.update);
  const deleteTestimonial = useMutation(api.testimonials.delete);
  const items = useMemo(
    () => (testimonials?.length ? testimonials : fallbackContent.testimonials),
    [testimonials]
  );
  const [selectedKey, setSelectedKey] = useState<string>("new");
  const [draft, setDraft] = useState<TestimonialRecord>(createEmptyTestimonial());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedKey === "new") {
      setDraft(createEmptyTestimonial());
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === selectedKey);
    if (selected) {
      setDraft(selected);
      return;
    }

    setSelectedKey("new");
    setDraft(createEmptyTestimonial());
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
        quote: draft.quote.trim(),
        name: draft.name.trim(),
        title: draft.title.trim(),
      };

      if (draft._id) {
        await updateTestimonial({ id: draft._id as never, patch: payload });
      } else {
        await createTestimonial(payload);
      }

      showToast("Testimonial saved.", "success");
      setSelectedKey("new");
      setDraft(createEmptyTestimonial());
    } catch {
      showToast("Unable to save testimonial.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft._id) {
      setDraft(createEmptyTestimonial());
      return;
    }

    if (!window.confirm(`Delete testimonial from "${draft.name}"?`)) return;
    try {
      await deleteTestimonial({ id: draft._id as never });
      showToast("Testimonial deleted.", "success");
      setSelectedKey("new");
      setDraft(createEmptyTestimonial());
    } catch {
      showToast("Unable to delete testimonial.", "error");
    }
  };

  return (
    <AdminPage
      title="Testimonials"
      description="Manage testimonial cards displayed on the homepage."
      actions={
        <AdminButton type="button" tone="secondary" onClick={() => setSelectedKey("new")}>
          New Testimonial
        </AdminButton>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Saves and deletes are unavailable.</AdminNotice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminCard title="Testimonials">
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
              New testimonial
            </button>
            {items.map((item, index) => {
              const key = getRecordKey(item, index);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedKey(key);
                    setDraft(item);
                  }}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                    selectedKey === key
                      ? "border-terra/40 bg-terra/10 text-stone-50"
                      : "border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <div className="font-semibold">{item.name}</div>
                  <div className="mt-1 line-clamp-2 text-sm text-stone-500">{item.quote}</div>
                </button>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={draft._id ? "Edit Testimonial" : "New Testimonial"}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label="Name">
                <AdminInput value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
              </AdminField>
              <AdminField label="Title">
                <AdminInput value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label="Quote">
                  <AdminTextarea value={draft.quote} onChange={(event) => setDraft((current) => ({ ...current, quote: event.target.value }))} />
                </AdminField>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3">
              <AdminButton type="button" tone="secondary" onClick={handleDelete}>
                {draft._id ? "Delete Testimonial" : "Reset"}
              </AdminButton>
              <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : draft._id ? "Save Testimonial" : "Create Testimonial"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
