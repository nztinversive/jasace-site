"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { clearStoredAdminSession, getStoredAdminSession } from "@/lib/admin/session";
import { AdminToastProvider } from "@/components/admin/AdminToastProvider";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/hero", label: "Hero" },
  { href: "/admin/about", label: "About" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/stats", label: "Stats" },
  { href: "/admin/settings", label: "Settings" },
  { href: "/admin/subscribers", label: "Subscribers" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const token = getStoredAdminSession();
    const isAuthed = Boolean(token);
    setAuthenticated(isAuthed);
    setSessionChecked(true);

    if (!isAuthed && !isLoginPage) {
      router.replace("/admin/login");
      return;
    }

    if (isAuthed && isLoginPage) {
      router.replace("/admin");
    }
  }, [isLoginPage, pathname, router]);

  const activeLabel = useMemo(
    () => navItems.find((item) => pathname === item.href)?.label ?? "Admin",
    [pathname]
  );

  const handleLogout = () => {
    clearStoredAdminSession();
    setAuthenticated(false);
    router.replace("/admin/login");
  };

  if (!sessionChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950 text-sm text-stone-400">
        Checking admin session...
      </div>
    );
  }

  return (
    <AdminToastProvider>
      {isLoginPage || !authenticated ? (
        children
      ) : (
        <div className="min-h-screen bg-stone-950 text-stone-100">
          <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="border-b border-stone-800 bg-stone-950 px-6 py-6 lg:border-b-0 lg:border-r">
              <div className="sticky top-0 space-y-8">
                <div className="space-y-3">
                  <Link href="/admin" className="inline-flex items-center gap-2 font-display text-2xl font-semibold tracking-tight text-stone-50">
                    <span className="text-terra">J</span>asace CMS
                  </Link>
                  <p className="text-sm text-stone-500">Manage the Convex-backed content model for the public site.</p>
                </div>

                <nav className="grid gap-2">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                          active
                            ? "bg-terra text-stone-50"
                            : "bg-stone-900/60 text-stone-300 hover:bg-stone-900 hover:text-stone-50"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full rounded-2xl border border-stone-700 px-4 py-3 text-left text-sm font-semibold text-stone-300 transition-colors hover:border-stone-600 hover:text-stone-50"
                >
                  Sign Out
                </button>
              </div>
            </aside>

            <main className="bg-[radial-gradient(circle_at_top,rgba(184,67,47,0.12),transparent_28%),linear-gradient(180deg,#12110f_0%,#0f0e0d_100%)] px-4 py-6 sm:px-6 lg:px-10">
              <div className="mb-6 flex items-center justify-between rounded-3xl border border-stone-800 bg-stone-900/60 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">Current Section</p>
                  <p className="mt-1 text-lg font-semibold text-stone-100">{activeLabel}</p>
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="rounded-2xl border border-stone-700 px-4 py-3 text-sm font-semibold text-stone-200 transition-colors hover:border-stone-600 hover:bg-stone-950"
                >
                  Open Site
                </Link>
              </div>
              {children}
            </main>
          </div>
        </div>
      )}
    </AdminToastProvider>
  );
}
