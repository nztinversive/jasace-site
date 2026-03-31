"use client";

import { useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";
import { AdminButton, AdminCard, AdminNotice, AdminPage } from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";
import { downloadCsv, formatDateTime } from "@/lib/admin/cms";

type Subscriber = {
  _id: string;
  email: string;
  subscribedAt: number;
};

export default function AdminSubscribersPage() {
  const { showToast } = useAdminToast();
  const subscribers = useQuery(
    api.newsletterSubscribers.list,
    convexEnabled ? {} : "skip"
  ) as Subscriber[] | undefined;

  const sortedSubscribers = useMemo(
    () =>
      [...(subscribers ?? [])].sort((a, b) => b.subscribedAt - a.subscribedAt),
    [subscribers]
  );

  const handleExport = () => {
    if (!sortedSubscribers.length) {
      showToast("There are no subscribers to export.", "info");
      return;
    }

    const rows = [
      ["email", "subscribedAt"],
      ...sortedSubscribers.map((item) => [item.email, new Date(item.subscribedAt).toISOString()]),
    ];
    const csv = rows
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    downloadCsv("jasace-newsletter-subscribers.csv", csv);
    showToast("Subscriber CSV exported.", "success");
  };

  return (
    <AdminPage
      title="Subscribers"
      description="Read-only view of newsletter subscribers collected from the footer form."
      actions={
        <AdminButton type="button" onClick={handleExport} disabled={!sortedSubscribers.length}>
          Export CSV
        </AdminButton>
      }
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">Convex is disabled. Subscriber data is unavailable.</AdminNotice>
      ) : null}

      <AdminCard title="Newsletter Subscribers" description="Subscribers are stored in Convex via the footer form.">
        {!sortedSubscribers.length ? (
          <div className="rounded-2xl border border-stone-800 bg-stone-950 px-4 py-6 text-sm text-stone-500">
            No subscribers found yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-stone-800">
            <div className="grid grid-cols-[minmax(0,1fr)_220px] bg-stone-950 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">
              <div>Email</div>
              <div>Subscribed</div>
            </div>
            {sortedSubscribers.map((subscriber) => (
              <div
                key={subscriber._id}
                className="grid grid-cols-[minmax(0,1fr)_220px] border-t border-stone-800 bg-stone-900/60 px-4 py-4 text-sm text-stone-200"
              >
                <div className="truncate">{subscriber.email}</div>
                <div className="text-stone-400">{formatDateTime(subscriber.subscribedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </AdminCard>
    </AdminPage>
  );
}
