"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";
import { AdminCard, AdminNotice, AdminPage, AdminStat } from "@/components/admin/AdminPrimitives";

export default function AdminDashboardPage() {
  const hero = useQuery(api.hero.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const about = useQuery(api.about.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const services = useQuery(api.services.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const projects = useQuery(api.projects.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const team = useQuery(api.team.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const blog = useQuery(api.blog.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const testimonials = useQuery(api.testimonials.list, convexEnabled ? {} : "skip") as unknown[] | undefined;
  const subscribers = useQuery(
    api.newsletterSubscribers.list,
    convexEnabled ? {} : "skip"
  ) as unknown[] | undefined;

  const quickLinks = [
    { href: "/admin/hero", label: "Edit hero", detail: "Single record homepage hero." },
    { href: "/admin/about", label: "Edit about", detail: "Single record company narrative." },
    { href: "/admin/services", label: "Manage services", detail: "Create, order, and edit service cards." },
    { href: "/admin/projects", label: "Manage projects", detail: "Update featured work and project detail data." },
    { href: "/admin/team", label: "Manage team", detail: "Edit founder and team profile cards." },
    { href: "/admin/blog", label: "Manage blog", detail: "Publish and revise blog posts." },
    { href: "/admin/testimonials", label: "Manage testimonials", detail: "Control rotating proof points." },
    { href: "/admin/stats", label: "Manage stats", detail: "Edit the homepage metrics bar." },
    { href: "/admin/settings", label: "Site settings", detail: "Footer copy, contact info, and socials." },
    { href: "/admin/subscribers", label: "Subscribers", detail: "Review and export newsletter signups." },
  ];

  return (
    <AdminPage
      title="Dashboard"
      description="Overview of the Convex content collections backing the public site."
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">
          `NEXT_PUBLIC_CONVEX_URL` is not configured. Public components will fall back to hardcoded content and admin saves will not work until Convex is enabled.
        </AdminNotice>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStat label="Hero records" value={String(hero?.length ?? 0)} />
        <AdminStat label="About records" value={String(about?.length ?? 0)} />
        <AdminStat label="Services" value={String(services?.length ?? 0)} />
        <AdminStat label="Projects" value={String(projects?.length ?? 0)} />
        <AdminStat label="Team" value={String(team?.length ?? 0)} />
        <AdminStat label="Blog posts" value={String(blog?.length ?? 0)} />
        <AdminStat label="Testimonials" value={String(testimonials?.length ?? 0)} />
        <AdminStat label="Subscribers" value={String(subscribers?.length ?? 0)} />
      </div>

      <AdminCard title="Quick Links" description="Jump directly into the content areas that feed the public site.">
        <div className="grid gap-4 lg:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-2xl border border-stone-800 bg-stone-950/80 px-5 py-4 transition-colors hover:border-terra/40 hover:bg-stone-900"
            >
              <div className="text-sm font-semibold text-stone-50">{link.label}</div>
              <div className="mt-1 text-sm text-stone-500">{link.detail}</div>
            </Link>
          ))}
        </div>
      </AdminCard>
    </AdminPage>
  );
}
