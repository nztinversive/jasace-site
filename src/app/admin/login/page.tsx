"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { setStoredAdminSession } from "@/lib/admin/session";
import { AdminButton, AdminCard, AdminField, AdminInput } from "@/components/admin/AdminPrimitives";
import { useAdminToast } from "@/components/admin/AdminToastProvider";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showToast } = useAdminToast();
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const result = (await response.json()) as { ok: boolean; token?: string; error?: string };

      if (!response.ok || !result.ok || !result.token) {
        showToast(result.error ?? "Login failed.", "error");
        return;
      }

      setStoredAdminSession(result.token);
      showToast("Admin session started.", "success");
      router.replace("/admin");
    } catch {
      showToast("Unable to reach the login endpoint.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,rgba(184,67,47,0.18),transparent_24%),linear-gradient(180deg,#12110f_0%,#0f0e0d_100%)] px-4 py-10">
      <AdminCard
        title="Admin Login"
        description="Enter the admin password to unlock the client-side CMS."
        className="w-full max-w-md"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <AdminField label="Password">
            <AdminInput
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter admin password"
              autoFocus
            />
          </AdminField>
          <AdminButton type="submit" disabled={submitting || password.trim().length === 0} className="w-full">
            {submitting ? "Signing In..." : "Sign In"}
          </AdminButton>
        </form>
      </AdminCard>
    </div>
  );
}
