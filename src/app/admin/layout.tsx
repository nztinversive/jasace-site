"use client";

import { ReactNode } from "react";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import AdminShell from "@/components/admin/AdminShell";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClientProvider allowPlaceholderClient>
      <AdminShell>{children}</AdminShell>
    </ConvexClientProvider>
  );
}
