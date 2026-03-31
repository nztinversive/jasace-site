"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { HeroContent } from "@/types/cms";
import { AdminButton, AdminCard, AdminField, AdminInput, AdminNotice, AdminPage } from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";
import { toOptionalString } from "@/lib/admin/cms";

export default function AdminHeroPage() {
  const { showToast } = useAdminToast();
  const records = useQuery(api.hero.list, convexEnabled ? {} : "skip") as
    | CmsRecord<HeroContent>[]
    | undefined;
  const createHero = useMutation(api.hero.create);
  const updateHero = useMutation(api.hero.update);
  const [form, setForm] = useState<HeroContent>(fallbackContent.hero);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const record = records?.[0];
    setForm(record ? { ...fallbackContent.hero, ...record } : fallbackContent.hero);
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
        headline: form.headline.trim(),
        subheadline: form.subheadline.trim(),
        ctaText: form.ctaText.trim(),
        ctaLink: form.ctaLink.trim(),
        backgroundImage: form.backgroundImage.trim(),
        eyebrow: toOptionalString(form.eyebrow ?? ""),
        secondaryCtaText: toOptionalString(form.secondaryCtaText ?? ""),
        secondaryCtaLink: toOptionalString(form.secondaryCtaLink ?? ""),
      };

      if (recordId) {
        await updateHero({ id: recordId as never, patch: payload });
      } else {
        await createHero(payload);
      }

      showToast("Hero content saved.", "success");
    } catch {
      showToast("Unable to save hero content.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      title="Hero"
      description="Manage the homepage hero. This is treated as a single record."
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. The form is showing fallback content only.</AdminNotice>
      ) : null}

      <AdminCard title="Hero Content">
        <form className="grid gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
          <AdminField label="Eyebrow">
            <AdminInput
              value={form.eyebrow ?? ""}
              onChange={(event) => setForm((current) => ({ ...current, eyebrow: event.target.value }))}
            />
          </AdminField>
          <AdminField label="Headline">
            <AdminInput
              value={form.headline}
              onChange={(event) => setForm((current) => ({ ...current, headline: event.target.value }))}
            />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Subheadline">
              <AdminInput
                value={form.subheadline}
                onChange={(event) => setForm((current) => ({ ...current, subheadline: event.target.value }))}
              />
            </AdminField>
          </div>
          <AdminField label="Primary CTA Text">
            <AdminInput
              value={form.ctaText}
              onChange={(event) => setForm((current) => ({ ...current, ctaText: event.target.value }))}
            />
          </AdminField>
          <AdminField label="Primary CTA Link">
            <AdminInput
              value={form.ctaLink}
              onChange={(event) => setForm((current) => ({ ...current, ctaLink: event.target.value }))}
            />
          </AdminField>
          <AdminField label="Secondary CTA Text">
            <AdminInput
              value={form.secondaryCtaText ?? ""}
              onChange={(event) =>
                setForm((current) => ({ ...current, secondaryCtaText: event.target.value }))
              }
            />
          </AdminField>
          <AdminField label="Secondary CTA Link">
            <AdminInput
              value={form.secondaryCtaLink ?? ""}
              onChange={(event) =>
                setForm((current) => ({ ...current, secondaryCtaLink: event.target.value }))
              }
            />
          </AdminField>
          <div className="lg:col-span-2">
            <AdminField label="Background Image URL">
              <AdminInput
                value={form.backgroundImage}
                onChange={(event) =>
                  setForm((current) => ({ ...current, backgroundImage: event.target.value }))
                }
              />
            </AdminField>
          </div>
          <div className="lg:col-span-2 flex justify-end">
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Hero"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
