"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { SiteSettings } from "@/types/cms";
import { ObjectListEditor } from "@/components/admin/AdminArrayEditors";
import { AdminButton, AdminCard, AdminField, AdminInput, AdminNotice, AdminPage, AdminTextarea } from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";

export default function AdminSettingsPage() {
  const { showToast } = useAdminToast();
  const records = useQuery(api.siteSettings.list, convexEnabled ? {} : "skip") as
    | CmsRecord<SiteSettings>[]
    | undefined;
  const createSettings = useMutation(api.siteSettings.create);
  const updateSettings = useMutation(api.siteSettings.update);
  const [form, setForm] = useState<SiteSettings>(fallbackContent.siteSettings);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const record = records?.[0];
    setForm(record ? { ...fallbackContent.siteSettings, ...record } : fallbackContent.siteSettings);
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
        companyName: form.companyName.trim(),
        tagline: form.tagline.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        footerText: form.footerText.trim(),
        socialLinks: form.socialLinks
          .map((link) => ({
            platform: link.platform.trim(),
            url: link.url.trim(),
          }))
          .filter((link) => link.platform && link.url),
      };

      if (recordId) {
        await updateSettings({ id: recordId as never, patch: payload });
      } else {
        await createSettings(payload);
      }

      showToast("Site settings saved.", "success");
    } catch {
      showToast("Unable to save site settings.", "error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminPage
      title="Settings"
      description="Edit shared site settings such as footer copy, company info, and social links."
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. The form is showing fallback content only.</AdminNotice>
      ) : null}

      <AdminCard title="Site Settings">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid gap-5 lg:grid-cols-2">
            <AdminField label="Company Name">
              <AdminInput
                value={form.companyName}
                onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
              />
            </AdminField>
            <AdminField label="Tagline">
              <AdminInput
                value={form.tagline}
                onChange={(event) => setForm((current) => ({ ...current, tagline: event.target.value }))}
              />
            </AdminField>
            <AdminField label="Email">
              <AdminInput
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              />
            </AdminField>
            <AdminField label="Phone">
              <AdminInput
                value={form.phone}
                onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
              />
            </AdminField>
            <div className="lg:col-span-2">
              <AdminField label="Address">
                <AdminInput
                  value={form.address}
                  onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
                />
              </AdminField>
            </div>
            <div className="lg:col-span-2">
              <AdminField label="Footer Text">
                <AdminTextarea
                  value={form.footerText}
                  onChange={(event) => setForm((current) => ({ ...current, footerText: event.target.value }))}
                />
              </AdminField>
            </div>
          </div>

          <ObjectListEditor
            label="Social Links"
            items={form.socialLinks}
            onChange={(socialLinks) => setForm((current) => ({ ...current, socialLinks }))}
            emptyItem={{ platform: "", url: "" }}
            fields={[
              { key: "platform", label: "Platform" },
              { key: "url", label: "URL" },
            ]}
          />

          <div className="flex justify-end">
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Settings"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
