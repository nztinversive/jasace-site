"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, sortServices, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { ServiceContent } from "@/types/cms";
import { ObjectListEditor, StringListEditor } from "@/components/admin/AdminArrayEditors";
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
import { toNumber } from "@/lib/admin/cms";

type EditableService = CmsRecord<ServiceContent> & { orderInput: string };

function createEmptyService(order = 1): EditableService {
  return {
    title: "",
    subtitle: "",
    description: "",
    capabilities: [""],
    image: "",
    order,
    orderInput: String(order),
    details: [""],
    stats: [{ label: "", value: "" }],
    stat: "",
    statLabel: "",
  };
}

export default function AdminServicesPage() {
  const { showToast } = useAdminToast();
  const services = useQuery(api.services.list, convexEnabled ? {} : "skip") as
    | CmsRecord<ServiceContent>[]
    | undefined;
  const createService = useMutation(api.services.create);
  const updateService = useMutation(api.services.update);
  const deleteService = useMutation(api.services.delete);
  const [selectedKey, setSelectedKey] = useState<string>("new");
  const [draft, setDraft] = useState<EditableService>(createEmptyService());
  const [saving, setSaving] = useState(false);

  const items = useMemo(
    () =>
      sortServices(services?.length ? services : fallbackContent.services).map((item) => ({
        ...item,
        orderInput: String(item.order),
      })),
    [services]
  );

  useEffect(() => {
    if (selectedKey === "new") {
      setDraft(createEmptyService(items.length + 1));
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === selectedKey);
    if (selected) {
      setDraft(selected);
      return;
    }

    setSelectedKey("new");
    setDraft(createEmptyService(items.length + 1));
  }, [items, selectedKey]);

  const handleSelect = (key: string) => {
    setSelectedKey(key);
    if (key === "new") {
      setDraft(createEmptyService(items.length + 1));
      return;
    }

    const selected = items.find((item, index) => getRecordKey(item, index) === key);
    if (selected) {
      setDraft(selected);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!convexEnabled) {
      showToast("Convex is not configured. Save is disabled.", "error");
      return;
    }

    setSaving(true);
    try {
      const payload = {
        title: draft.title.trim(),
        subtitle: draft.subtitle.trim(),
        description: draft.description.trim(),
        capabilities: draft.capabilities.map((item) => item.trim()).filter(Boolean),
        image: draft.image.trim(),
        order: toNumber(draft.orderInput),
        details: draft.details.map((item) => item.trim()).filter(Boolean),
        stats: draft.stats
          .map((item) => ({ label: item.label.trim(), value: item.value.trim() }))
          .filter((item) => item.label && item.value),
        stat: draft.stat.trim(),
        statLabel: draft.statLabel.trim(),
      };

      if (draft._id) {
        await updateService({ id: draft._id as never, patch: payload });
      } else {
        await createService(payload);
      }

      showToast("Service saved.", "success");
      setSelectedKey("new");
      setDraft(createEmptyService(items.length + 1));
    } catch {
      showToast("Unable to save service.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!draft._id) {
      setDraft(createEmptyService(items.length + 1));
      return;
    }

    if (!window.confirm(`Delete "${draft.title}"?`)) return;
    try {
      await deleteService({ id: draft._id as never });
      showToast("Service deleted.", "success");
      setSelectedKey("new");
      setDraft(createEmptyService(items.length + 1));
    } catch {
      showToast("Unable to delete service.", "error");
    }
  };

  return (
    <AdminPage
      title="Services"
      description="Create, edit, and delete the services shown throughout the site."
      actions={
        <AdminButton type="button" tone="secondary" onClick={() => handleSelect("new")}>
          New Service
        </AdminButton>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Saves and deletes are unavailable.</AdminNotice>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
        <AdminCard title="Service List" description="Select a service to edit or create a new one.">
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => handleSelect("new")}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                selectedKey === "new"
                  ? "border-terra/40 bg-terra/10 text-stone-50"
                  : "border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700"
              }`}
            >
              New service
            </button>
            {items.map((item, index) => {
              const key = getRecordKey(item, index);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${
                    selectedKey === key
                      ? "border-terra/40 bg-terra/10 text-stone-50"
                      : "border-stone-800 bg-stone-950 text-stone-300 hover:border-stone-700"
                  }`}
                >
                  <div className="font-semibold">{item.title}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">
                    Order {item.order}
                  </div>
                </button>
              );
            })}
          </div>
        </AdminCard>

        <AdminCard title={draft._id ? "Edit Service" : "New Service"}>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid gap-5 lg:grid-cols-2">
              <AdminField label="Title">
                <AdminInput value={draft.title} onChange={(event) => setDraft((current) => ({ ...current, title: event.target.value }))} />
              </AdminField>
              <AdminField label="Subtitle">
                <AdminInput value={draft.subtitle} onChange={(event) => setDraft((current) => ({ ...current, subtitle: event.target.value }))} />
              </AdminField>
              <AdminField label="Featured Stat">
                <AdminInput value={draft.stat} onChange={(event) => setDraft((current) => ({ ...current, stat: event.target.value }))} />
              </AdminField>
              <AdminField label="Featured Stat Label">
                <AdminInput value={draft.statLabel} onChange={(event) => setDraft((current) => ({ ...current, statLabel: event.target.value }))} />
              </AdminField>
              <AdminField label="Order">
                <AdminInput value={draft.orderInput} onChange={(event) => setDraft((current) => ({ ...current, orderInput: event.target.value }))} />
              </AdminField>
              <AdminField label="Image">
                <ImageUpload
                  value={draft.image}
                  onChange={(image) => setDraft((current) => ({ ...current, image }))}
                  previewLabel="Service image"
                />
              </AdminField>
              <div className="lg:col-span-2">
                <AdminField label="Description">
                  <AdminTextarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} />
                </AdminField>
              </div>
            </div>

            <StringListEditor
              label="Capabilities"
              items={draft.capabilities}
              onChange={(capabilities) => setDraft((current) => ({ ...current, capabilities }))}
              placeholder="Capability"
            />

            <StringListEditor
              label="Details"
              items={draft.details}
              onChange={(details) => setDraft((current) => ({ ...current, details }))}
              placeholder="Detail paragraph"
            />

            <ObjectListEditor
              label="Stats"
              items={draft.stats}
              onChange={(stats) => setDraft((current) => ({ ...current, stats }))}
              emptyItem={{ label: "", value: "" }}
              fields={[
                { key: "label", label: "Label" },
                { key: "value", label: "Value" },
              ]}
            />

            <div className="flex flex-wrap justify-between gap-3">
              <AdminButton type="button" tone="secondary" onClick={handleDelete}>
                {draft._id ? "Delete Service" : "Reset"}
              </AdminButton>
              <AdminButton type="submit" disabled={saving}>
                {saving ? "Saving..." : draft._id ? "Save Service" : "Create Service"}
              </AdminButton>
            </div>
          </form>
        </AdminCard>
      </div>
    </AdminPage>
  );
}
