"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, sortProjects, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { CmsProject } from "@/types/cms";
import { ImageListEditor, ObjectListEditor } from "@/components/admin/AdminArrayEditors";
import { ImageUpload } from "@/components/admin/ImageUpload";
import {
  AdminButton,
  AdminCard,
  AdminCheckbox,
  AdminField,
  AdminInput,
  AdminNotice,
  AdminPage,
  AdminTextarea,
} from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";
import { PreviewLink } from "@/components/admin/PreviewLink";

type ProjectRecord = CmsRecord<CmsProject>;

function createEmptyProject(): ProjectRecord {
  return {
    slug: "",
    title: "",
    client: "",
    location: "",
    category: "",
    year: "",
    heroImage: "",
    featured: false,
    scope: "",
    description: "",
    challenge: "",
    solution: "",
    result: "",
    specs: [{ label: "", value: "" }],
    gallery: [""],
  };
}

export default function AdminProjectsPage() {
  const { showToast } = useAdminToast();
  const projects = useQuery(api.projects.list, convexEnabled ? {} : "skip") as ProjectRecord[] | undefined;
  const createProject = useMutation(api.projects.create);
  const updateProject = useMutation(api.projects.update);
  const deleteProject = useMutation(api.projects.delete);
  const items = useMemo(
    () => sortProjects(projects?.length ? projects : fallbackContent.projects),
    [projects]
  );
  const [selectedKey, setSelectedKey] = useState<string>("new");
  const [draft, setDraft] = useState<ProjectRecord>(createEmptyProject());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedKey === "new") {
      setDraft(createEmptyProject());
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === selectedKey);
    if (selected) {
      setDraft(selected);
      return;
    }

    setSelectedKey("new");
    setDraft(createEmptyProject());
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
        client: draft.client.trim(),
        location: draft.location.trim(),
        category: draft.category.trim(),
        year: draft.year.trim(),
        heroImage: draft.heroImage.trim(),
        featured: draft.featured,
        scope: draft.scope.trim(),
        description: draft.description.trim(),
        challenge: draft.challenge.trim(),
        solution: draft.solution.trim(),
        result: draft.result.trim(),
        specs: draft.specs
          .map((item) => ({ label: item.label.trim(), value: item.value.trim() }))
          .filter((item) => item.label && item.value),
        gallery: draft.gallery.map((item) => item.trim()).filter(Boolean),
      };

      if (draft._id) {
        await updateProject({ id: draft._id as never, patch: payload });
      } else {
        await createProject(payload);
      }

      showToast("Project saved.", "success");
      setSelectedKey("new");
      setDraft(createEmptyProject());
    } catch {
      showToast("Unable to save project.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft._id) {
      setDraft(createEmptyProject());
      return;
    }

    if (!window.confirm(`Delete "${draft.title}"?`)) return;
    try {
      await deleteProject({ id: draft._id as never });
      showToast("Project deleted.", "success");
      setSelectedKey("new");
      setDraft(createEmptyProject());
    } catch {
      showToast("Unable to delete project.", "error");
    }
  };

  return (
    <AdminPage
      title="Projects"
      description="Manage the full project records used in portfolio cards and project detail pages."
      actions={
        <>
          <PreviewLink href="/#work" label="Portfolio" />
          <AdminButton type="button" tone="secondary" onClick={() => setSelectedKey("new")}>
            New Project
          </AdminButton>
        </>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Saves and deletes are unavailable.</AdminNotice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminCard title="Projects">
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
              New project
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
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.title}</span>
                    {item.featured ? (
                      <span className="rounded-full bg-terra/15 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-terra">
                        Featured
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-1 text-sm text-stone-500">{item.category} • {item.year}</div>
                </button>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={draft._id ? "Edit Project" : "New Project"}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label="Slug">
                <AdminInput value={draft.slug} onChange={(event) => setDraft((current) => ({ ...current, slug: event.target.value }))} />
              </AdminField>
              <AdminField label="Title">
                <AdminInput value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
              </AdminField>
              <AdminField label="Client">
                <AdminInput value={draft.client} onChange={(event) => setDraft((current) => ({ ...current, client: event.target.value }))} />
              </AdminField>
              <AdminField label="Location">
                <AdminInput value={draft.location} onChange={(event) => setDraft((current) => ({ ...current, location: event.target.value }))} />
              </AdminField>
              <AdminField label="Category">
                <AdminInput value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} />
              </AdminField>
              <AdminField label="Year">
                <AdminInput value={draft.year} onChange={(event) => setDraft((current) => ({ ...current, year: event.target.value }))} />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label="Hero Image">
                  <ImageUpload
                    value={draft.heroImage}
                    onChange={(heroImage) => setDraft((current) => ({ ...current, heroImage }))}
                    previewLabel="Project hero image"
                  />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminCheckbox
                  label="Mark as featured"
                  checked={draft.featured}
                  onChange={(featured) => setDraft((current) => ({ ...current, featured }))}
                />
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Scope">
                  <AdminInput value={draft.scope} onChange={(event) => setDraft((current) => ({ ...current, scope: event.target.value }))} />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Description">
                  <AdminTextarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Challenge">
                  <AdminTextarea value={draft.challenge} onChange={(event) => setDraft((current) => ({ ...current, challenge: event.target.value }))} />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Solution">
                  <AdminTextarea value={draft.solution} onChange={(event) => setDraft((current) => ({ ...current, solution: event.target.value }))} />
                </AdminField>
              </div>
              <div className="lg:col-span-2">
                <AdminField label="Result">
                  <AdminTextarea value={draft.result} onChange={(event) => setDraft((current) => ({ ...current, result: event.target.value }))} />
                </AdminField>
              </div>
            </div>

            <ObjectListEditor
              label="Specs"
              items={draft.specs}
              onChange={(specs) => setDraft((current) => ({ ...current, specs }))}
              emptyItem={{ label: "", value: "" }}
              fields={[
                { key: "label", label: "Label" },
                { key: "value", label: "Value" },
              ]}
            />

            <ImageListEditor
              label="Gallery Images"
              items={draft.gallery}
              onChange={(gallery) => setDraft((current) => ({ ...current, gallery }))}
              addLabel="Add Gallery Image"
              hint="Upload images to Convex or paste external URLs."
            />

            <div className="flex flex-wrap justify-between gap-3">
              <AdminButton type="button" tone="secondary" onClick={handleDelete}>
                {draft._id ? "Delete Project" : "Reset"}
              </AdminButton>
              <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : draft._id ? "Save Project" : "Create Project"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
