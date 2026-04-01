"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { CmsTeamMember } from "@/types/cms";
import { ImageUpload } from "@/components/admin/ImageUpload";
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
import { PreviewLink } from "@/components/admin/PreviewLink";
import { toOptionalString } from "@/lib/admin/cms";

type TeamRecord = CmsRecord<CmsTeamMember>;

function createEmptyMember(): TeamRecord {
  return {
    name: "",
    title: "",
    bio: "",
    image: "",
    linkedin: "",
  };
}

export default function AdminTeamPage() {
  const { showToast } = useAdminToast();
  const team = useQuery(api.team.list, convexEnabled ? {} : "skip") as TeamRecord[] | undefined;
  const createMember = useMutation(api.team.create);
  const updateMember = useMutation(api.team.update);
  const deleteMember = useMutation(api.team.delete);
  const items = useMemo(() => (team?.length ? team : fallbackContent.team), [team]);
  const [selectedKey, setSelectedKey] = useState<string>("new");
  const [draft, setDraft] = useState<TeamRecord>(createEmptyMember());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedKey === "new") {
      setDraft(createEmptyMember());
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === selectedKey);
    if (selected) {
      setDraft(selected);
      return;
    }

    setSelectedKey("new");
    setDraft(createEmptyMember());
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
        name: draft.name.trim(),
        title: draft.title.trim(),
        bio: draft.bio.trim(),
        image: draft.image.trim(),
        linkedin: toOptionalString(draft.linkedin ?? ""),
      };

      if (draft._id) {
        await updateMember({ id: draft._id as never, patch: payload });
      } else {
        await createMember(payload);
      }

      showToast("Team member saved.", "success");
      setSelectedKey("new");
      setDraft(createEmptyMember());
    } catch {
      showToast("Unable to save team member.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft._id) {
      setDraft(createEmptyMember());
      return;
    }

    if (!window.confirm(`Delete "${draft.name}"?`)) return;
    try {
      await deleteMember({ id: draft._id as never });
      showToast("Team member deleted.", "success");
      setSelectedKey("new");
      setDraft(createEmptyMember());
    } catch {
      showToast("Unable to delete team member.", "error");
    }
  };

  return (
    <AdminPage
      title="Team"
      description="Manage the team members displayed on the site."
      actions={
        <>
          <PreviewLink href="/about" label="Team Section" />
          <AdminButton type="button" tone="secondary" onClick={() => setSelectedKey("new")}>
            New Member
          </AdminButton>
        </>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Saves and deletes are unavailable.</AdminNotice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminCard title="Team Members">
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
              New member
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
                  <div className="mt-1 text-sm text-stone-500">{item.title}</div>
                </button>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={draft._id ? "Edit Member" : "New Member"}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label="Name">
                <AdminInput value={draft.name} onChange={(event) => setDraft((current) => ({ ...current, name: event.target.value }))} />
              </AdminField>
              <AdminField label="Title">
                <AdminInput value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
              </AdminField>
              <AdminField label="Image">
                <ImageUpload
                  value={draft.image}
                  onChange={(image) => setDraft((current) => ({ ...current, image }))}
                  previewLabel="Team member image"
                />
              </AdminField>
              <AdminField label="LinkedIn URL">
                <AdminInput value={draft.linkedin ?? ""} onChange={(event) => setDraft((current) => ({ ...current, linkedin: event.target.value }))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label="Bio">
                  <AdminTextarea value={draft.bio} onChange={(event) => setDraft((current) => ({ ...current, bio: event.target.value }))} />
                </AdminField>
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-3">
              <AdminButton type="button" tone="secondary" onClick={handleDelete}>
                {draft._id ? "Delete Member" : "Reset"}
              </AdminButton>
              <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : draft._id ? "Save Member" : "Create Member"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
