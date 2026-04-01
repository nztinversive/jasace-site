"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { AboutContent } from "@/types/cms";
import { ObjectListEditor, StringListEditor } from "@/components/admin/AdminArrayEditors";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  AdminButton,
  AdminCard,
  AdminField,
  AdminInput,
  AdminNotice,
  AdminPage,
} from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";

export default function AdminAboutPage() {
  const { showToast } = useAdminToast();
  const records = useQuery(api.about.list, convexEnabled ? {} : "skip") as
    | CmsRecord<AboutContent>[]
    | undefined;
  const createAbout = useMutation(api.about.create);
  const updateAbout = useMutation(api.about.update);
  const [form, setForm] = useState<AboutContent>(fallbackContent.about);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const record = records?.[0];
    setForm(record ? { ...fallbackContent.about, ...record } : fallbackContent.about);
    setRecordId(record?._id ?? null);
  }, [records]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!convexEnabled) {
      showToast("Convex is not configured. Save is disabled.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        heading: form.heading.trim(),
        subheading: form.subheading.trim(),
        paragraphs: form.paragraphs.map((item) => item.trim()).filter(Boolean),
        image: form.image.trim(),
        stats: form.stats.map((item) => ({
          label: item.label.trim(),
          value: item.value.trim(),
        })).filter((item) => item.label && item.value),
        awards: form.awards.map((item) => ({
          year: item.year.trim(),
          title: item.title.trim(),
          project: item.project.trim(),
        })).filter((item) => item.year && item.title && item.project),
        milestones: form.milestones.map((item) => ({
          year: item.year.trim(),
          event: item.event.trim(),
        })).filter((item) => item.year && item.event),
      };

      if (recordId) {
        await updateAbout({ id: recordId as never, patch: payload });
      } else {
        await createAbout(payload);
      }

      showToast("About content saved.", "success");
    } catch {
      showToast("Unable to save about content.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      title="About"
      description="Edit the main about record, including copy, image, highlights, awards, and milestones."
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. The form is showing fallback content only.</AdminNotice>
      ) : null}

      <AdminCard title="About Record">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Subheading">
              <AdminInput
                value={form.subheading}
                onChange={(event) => setForm((current) => ({ ...current, subheading: event.target.value }))}
              />
            </AdminField>
            <AdminField label="Heading">
              <AdminInput
                value={form.heading}
                onChange={(event) => setForm((current) => ({ ...current, heading: event.target.value }))}
              />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Image">
                <ImageUpload
                  value={form.image}
                  onChange={(image) => setForm((current) => ({ ...current, image }))}
                  previewLabel="About image"
                />
              </AdminField>
            </div>
          </div>

          <StringListEditor
            label="Paragraphs"
            items={form.paragraphs}
            onChange={(paragraphs) => setForm((current) => ({ ...current, paragraphs }))}
            placeholder="Paragraph text"
          />

          <ObjectListEditor
            label="Highlights"
            items={form.stats}
            onChange={(stats) => setForm((current) => ({ ...current, stats }))}
            emptyItem={{ label: "", value: "" }}
            fields={[
              { key: "label", label: "Label" },
              { key: "value", label: "Value" },
            ]}
          />

          <ObjectListEditor
            label="Awards"
            items={form.awards}
            onChange={(awards) => setForm((current) => ({ ...current, awards }))}
            emptyItem={{ year: "", title: "", project: "" }}
            fields={[
              { key: "year", label: "Year" },
              { key: "title", label: "Title" },
              { key: "project", label: "Project" },
            ]}
          />

          <ObjectListEditor
            label="Milestones"
            items={form.milestones}
            onChange={(milestones) => setForm((current) => ({ ...current, milestones }))}
            emptyItem={{ year: "", event: "" }}
            fields={[
              { key: "year", label: "Year" },
              { key: "event", label: "Event" },
            ]}
          />

          <div className="flex justify-end">
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save About"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
