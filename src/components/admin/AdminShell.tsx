"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useMemo, useState } from "react";
import { clearStoredAdminSession, getStoredAdminSession } from "@/lib/admin/session";
import { AdminToastProvider } from "@/components/admin/AdminToastProvider";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1" },
  { href: "/admin/hero", label: "Hero", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { href: "/admin/about", label: "About", icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { href: "/admin/services", label: "Services", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
  { href: "/admin/projects", label: "Projects", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { href: "/admin/team", label: "Team", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { href: "/admin/blog", label: "Blog", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { href: "/admin/testimonials", label: "Testimonials", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { href: "/admin/stats", label: "Stats", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { href: "/admin/settings", label: "Settings", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d={d} />
    </svg>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    let cancelled = false;

    const verifySession = async () => {
      setSessionChecked(false);

      const token = getStoredAdminSession();
      if (!token) {
        if (cancelled) return;
        setAuthenticated(false);
        setSessionChecked(true);

        if (!isLoginPage) {
          router.replace("/admin/login");
        }
        return;
      }

      try {
        const response = await fetch("/api/admin/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const result = (await response.json()) as { ok: boolean };
        const isAuthed = response.ok && result.ok;

        if (!isAuthed) {
          clearStoredAdminSession();
        }

        if (cancelled) return;

        setAuthenticated(isAuthed);
        setSessionChecked(true);

        if (!isAuthed && !isLoginPage) {
          router.replace("/admin/login");
          return;
        }

        if (isAuthed && isLoginPage) {
          router.replace("/admin");
        }
      } catch {
        clearStoredAdminSession();

        if (cancelled) return;

        setAuthenticated(false);
        setSessionChecked(true);

        if (!isLoginPage) {
          router.replace("/admin/login");
        }
      }
    };

    void verifySession();

    return () => {
      cancelled = true;
    };
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

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  if (!sessionChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950">
        <div className="flex items-center gap-3 text-sm text-stone-400">
          <div className="w-4 h-4 border-2 border-terra/40 border-t-terra rounded-full animate-spin" />
          Checking session...
        </div>
      </div>
    );
  }

  return (
    <AdminToastProvider>
      {isLoginPage || !authenticated ? (
        children
      ) : (
        <div className="min-h-screen bg-stone-950 text-stone-100">
          {/* Mobile header */}
          <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between px-4 py-3 bg-stone-950/90 backdrop-blur-md border-b border-stone-800">
            <Link href="/admin" className="font-display text-xl font-bold tracking-tight text-stone-50">
              <span className="text-terra">J</span>asace <span className="text-stone-500 font-normal text-sm">CMS</span>
            </Link>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${sidebarOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${sidebarOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
            </button>
          </div>

          {/* Mobile overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          <div className="mx-auto grid min-h-screen max-w-[1600px] lg:grid-cols-[260px_minmax(0,1fr)]">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-stone-950 border-r border-stone-800/60 transform transition-transform duration-300 lg:relative lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
              <div className="sticky top-0 h-screen overflow-y-auto px-4 py-6 flex flex-col">
                {/* Logo */}
                <Link href="/admin" className="hidden lg:flex items-center gap-2 font-display text-xl font-bold tracking-tight text-stone-50 px-3 mb-1">
                  <span className="text-terra">J</span>asace <span className="text-stone-600 font-normal text-xs ml-1 uppercase tracking-widest">CMS</span>
                </Link>

                <div className="hidden lg:block h-px bg-gradient-to-r from-terra/30 via-stone-800 to-transparent my-5" />

                {/* Nav */}
                <nav className="flex-1 space-y-1 mt-4 lg:mt-0">
                  {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                          active
                            ? "bg-terra/10 text-terra border-l-2 border-terra -ml-px"
                            : "text-stone-400 hover:text-stone-100 hover:bg-stone-900/60"
                        }`}
                      >
                        <NavIcon d={item.icon} />
                        {item.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Bottom actions */}
                <div className="mt-auto pt-4 space-y-2 border-t border-stone-800/60">
                  <Link
                    href="/"
                    target="_blank"
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    View Live Site
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-stone-500 hover:text-red-400 transition-colors w-full"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"><path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            </aside>

            {/* Main content */}
            <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,rgba(184,67,47,0.06),transparent_50%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
              {/* Breadcrumb bar */}
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Link href="/admin" className="text-stone-500 hover:text-stone-300 transition-colors">Admin</Link>
                  {activeLabel !== "Dashboard" && (
                    <>
                      <span className="text-stone-700">/</span>
                      <span className="text-stone-200 font-medium">{activeLabel}</span>
                    </>
                  )}
                </div>
                <Link
                  href="/"
                  target="_blank"
                  className="hidden lg:flex items-center gap-2 text-xs text-stone-500 hover:text-stone-300 transition-colors border border-stone-800 px-3 py-1.5 hover:border-stone-700"
                >
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Live Site
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
