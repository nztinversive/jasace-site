"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";
import { AdminCard, AdminNotice, AdminPage, AdminStat } from "@/components/admin/AdminPrimitives";

const setupSteps = [
  {
    label: "Set up your Hero",
    href: "/admin/hero",
    description: "The first thing visitors see — your headline, background image, and call-to-action buttons.",
    icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
    priority: "Start here",
  },
  {
    label: "Add your Services",
    href: "/admin/services",
    description: "Define your three disciplines — Architecture, Construction, and Engineering. Each gets a title, description, image, and capabilities list.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z",
    priority: "Core content",
  },
  {
    label: "Showcase your Projects",
    href: "/admin/projects",
    description: "Add your best work with photos, descriptions, specs, and client details. These appear in the portfolio grid and as individual case study pages.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    priority: "Core content",
  },
  {
    label: "Tell your Story",
    href: "/admin/about",
    description: "Your company narrative, philosophy, and founding story. This feeds the About section on the homepage and the full About page.",
    icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    priority: "Recommended",
  },
  {
    label: "Add your Team",
    href: "/admin/team",
    description: "Add your profile with photo, title, and bio. When you work with Jasace, you work directly with Jason.",
    icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
    priority: "Recommended",
  },
  {
    label: "Set your Stats",
    href: "/admin/stats",
    description: "The animated numbers bar — years of experience, projects delivered, satisfaction rate, team size.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    priority: "Quick win",
  },
  {
    label: "Add Testimonials",
    href: "/admin/testimonials",
    description: "Client quotes that rotate on the homepage. Use initials instead of photos for a clean, authentic look.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    priority: "When ready",
  },
  {
    label: "Write Blog Posts",
    href: "/admin/blog",
    description: "Publish insights and thought leadership. Each post gets its own page with rich text formatting.",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
    priority: "When ready",
  },
  {
    label: "Configure Settings",
    href: "/admin/settings",
    description: "Footer copy, contact info (email, phone), social media links, and site-wide details.",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    priority: "Quick win",
  },
];

const priorityColors: Record<string, string> = {
  "Start here": "bg-terra/20 text-terra border-terra/30",
  "Core content": "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Recommended": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Quick win": "bg-green-500/10 text-green-400 border-green-500/20",
  "When ready": "bg-stone-700/30 text-stone-400 border-stone-700",
};

function NavIcon({ d }: { d: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
      <path d={d} />
    </svg>
  );
}

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

  return (
    <AdminPage
      title="Dashboard"
      description="Your content management hub. Everything here feeds directly into the public site."
    >
      {!convexEnabled ? (
        <AdminNotice tone="warning">
          Convex is not configured yet. Set <code className="text-terra font-mono">NEXT_PUBLIC_CONVEX_URL</code> in your <code className="text-terra font-mono">.env.local</code> file to enable the CMS. Until then, the public site will use hardcoded fallback content.
        </AdminNotice>
      ) : null}

      {/* Stats overview */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <AdminStat label="Hero" value={String(hero?.length ?? 0)} />
        <AdminStat label="Services" value={String(services?.length ?? 0)} />
        <AdminStat label="Projects" value={String(projects?.length ?? 0)} />
        <AdminStat label="Blog posts" value={String(blog?.length ?? 0)} />
      </div>

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        <AdminStat label="About" value={String(about?.length ?? 0)} />
        <AdminStat label="Team" value={String(team?.length ?? 0)} />
        <AdminStat label="Testimonials" value={String(testimonials?.length ?? 0)} />
        <AdminStat label="Subscribers" value={String(subscribers?.length ?? 0)} />
      </div>

      {/* Getting Started Guide */}
      <AdminCard
        title="Getting Started"
        description="Follow these steps to set up your site content. Start at the top and work your way down."
      >
        <div className="space-y-3">
          {setupSteps.map((step, i) => (
            <Link
              key={step.href}
              href={step.href}
              className="flex items-start gap-4 p-4 border border-stone-800/40 hover:border-terra/30 hover:bg-stone-900/30 transition-all duration-300 group"
            >
              {/* Step number */}
              <div className="w-8 h-8 flex items-center justify-center text-xs font-bold text-stone-600 border border-stone-800/60 flex-shrink-0 group-hover:border-terra/40 group-hover:text-terra transition-colors">
                {i + 1}
              </div>

              {/* Icon */}
              <div className="text-stone-600 group-hover:text-terra transition-colors mt-0.5 flex-shrink-0">
                <NavIcon d={step.icon} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-semibold text-stone-200 group-hover:text-white transition-colors">{step.label}</span>
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 border ${priorityColors[step.priority]}`}>
                    {step.priority}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1 leading-relaxed">{step.description}</p>
              </div>

              {/* Arrow */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="text-stone-700 group-hover:text-terra group-hover:translate-x-1 transition-all flex-shrink-0 mt-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          ))}
        </div>
      </AdminCard>

      {/* How it works */}
      <AdminCard
        title="How Content Flows"
        description="Understanding how your edits appear on the public site."
      >
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="p-4 border border-stone-800/40 space-y-2">
            <div className="text-terra text-xs font-bold uppercase tracking-wider">1. Edit Here</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Make changes in any admin section. Content saves to Convex automatically.
            </p>
          </div>
          <div className="p-4 border border-stone-800/40 space-y-2">
            <div className="text-terra text-xs font-bold uppercase tracking-wider">2. Instant Update</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              The public site reads from Convex in real-time. Changes appear immediately — no rebuild needed.
            </p>
          </div>
          <div className="p-4 border border-stone-800/40 space-y-2">
            <div className="text-terra text-xs font-bold uppercase tracking-wider">3. Fallback Safe</div>
            <p className="text-xs text-stone-500 leading-relaxed">
              If Convex is down or not configured, the site falls back to hardcoded content. Nothing breaks.
            </p>
          </div>
        </div>
      </AdminCard>

      {/* Tips */}
      <AdminCard title="Pro Tips">
        <div className="space-y-3 text-sm text-stone-400">
          <div className="flex items-start gap-3">
            <span className="text-terra font-bold">&#x2022;</span>
            <p><strong className="text-stone-300">Images:</strong> Use high-quality landscape photos (16:9 or 3:2 ratio). Unsplash is fine for placeholders — swap in real project photos when you have them.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-terra font-bold">&#x2022;</span>
            <p><strong className="text-stone-300">Testimonials:</strong> Keep quotes under 2 sentences. Use client initials (M. Chen) instead of full names unless you have permission.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-terra font-bold">&#x2022;</span>
            <p><strong className="text-stone-300">Blog:</strong> Aim for 4-6 paragraphs per post. The rich text editor supports headings, lists, links, and images.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-terra font-bold">&#x2022;</span>
            <p><strong className="text-stone-300">Stats:</strong> Keep numbers honest and round. &ldquo;100+ projects&rdquo; reads better than &ldquo;103 projects.&rdquo;</p>
          </div>
        </div>
      </AdminCard>
    </AdminPage>
  );
}
