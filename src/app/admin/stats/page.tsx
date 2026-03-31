"use client";

import { FormEvent, useEffect, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fallbackContent, getRecordKey, sortStats, type CmsRecord } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { SiteStat } from "@/types/cms";
import { AdminButton, AdminCard, AdminField, AdminInput, AdminNotice, AdminPage } from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";
import { toNumber } from "@/lib/admin/cms";

type EditableStat = CmsRecord<SiteStat> & { valueInput: string; orderInput: string };

const emptyStat = (): EditableStat => ({
  value: 0,
  valueInput: "0",
  suffix: "",
  label: "",
  detail: "",
  order: 1,
  orderInput: "1",
});

export default function AdminStatsPage() {
  const { showToast } = useAdminToast();
  const stats = useQuery(api.stats.list, convexEnabled ? {} : "skip") as CmsRecord<SiteStat>[] | undefined;
  const createStat = useMutation(api.stats.create);
  const updateStat = useMutation(api.stats.update);
  const deleteStat = useMutation(api.stats.delete);
  const [items, setItems] = useState<EditableStat[]>(
    sortStats(fallbackContent.stats).map((item) => ({
      ...item,
      valueInput: String(item.value),
      orderInput: String(item.order),
    }))
  );
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const source = stats?.length
      ? stats
      : fallbackContent.stats;

    setItems(
      sortStats(source).map((item) => ({
        ...item,
        valueInput: String(item.value),
        orderInput: String(item.order),
      }))
    );
  }, [stats]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!convexEnabled) {
      showToast("Convex is not configured. Save is disabled.", "error");
      return;
    }

    setSaving(true);
    try {
      for (const item of items) {
        const payload = {
          value: toNumber(item.valueInput),
          suffix: item.suffix.trim(),
          label: item.label.trim(),
          detail: item.detail.trim(),
          order: toNumber(item.orderInput),
        };

        if (item._id) {
          await updateStat({ id: item._id as never, patch: payload });
        } else {
          await createStat(payload);
        }
      }

      showToast("Stats saved.", "success");
    } catch {
      showToast("Unable to save stats.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      setItems((current) => current.filter((item) => item._id));
      return;
    }

    if (!window.confirm("Delete this stat?")) return;
    try {
      await deleteStat({ id: id as never });
      showToast("Stat deleted.", "success");
    } catch {
      showToast("Unable to delete stat.", "error");
    }
  };

  return (
    <AdminPage title="Stats" description="Edit the metrics shown on the homepage stats section.">
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. The form is showing fallback content only.</AdminNotice>
      ) : null}

      <AdminCard title="Homepage Stats">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {items.map((item, index) => (
            <div key={getRecordKey(item, index)} className="rounded-2xl border border-stone-800 bg-stone-950/60 p-4">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <AdminField label="Label">
                  <AdminInput
                    value={item.label}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, label: event.target.value } : entry
                        )
                      )
                    }
                  />
                </AdminField>
                <AdminField label="Value">
                  <AdminInput
                    value={item.valueInput}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, valueInput: event.target.value } : entry
                        )
                      )
                    }
                  />
                </AdminField>
                <AdminField label="Suffix">
                  <AdminInput
                    value={item.suffix}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, suffix: event.target.value } : entry
                        )
                      )
                    }
                  />
                </AdminField>
                <AdminField label="Order">
                  <AdminInput
                    value={item.orderInput}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, orderInput: event.target.value } : entry
                        )
                      )
                    }
                  />
                </AdminField>
                <div className="flex items-end justify-end">
                  <AdminButton type="button" tone="secondary" onClick={() => handleDelete(item._id)}>
                    Delete
                  </AdminButton>
                </div>
              </div>
              <div className="mt-4">
                <AdminField label="Detail">
                  <AdminInput
                    value={item.detail}
                    onChange={(event) =>
                      setItems((current) =>
                        current.map((entry, entryIndex) =>
                          entryIndex === index ? { ...entry, detail: event.target.value } : entry
                        )
                      )
                    }
                  />
                </AdminField>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap justify-between gap-3">
            <AdminButton type="button" tone="secondary" onClick={() => setItems((current) => [...current, emptyStat()])}>
              Add Stat
            </AdminButton>
            <AdminButton type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Stats"}
            </AdminButton>
          </div>
        </form>
      </AdminCard>
    </AdminPage>
  );
}
