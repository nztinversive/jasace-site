"use client";

import Link from "next/link";

export function PreviewLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center gap-2 text-xs font-semibold text-stone-400 border border-stone-700/60 px-3 py-2 hover:border-terra/40 hover:text-terra transition-all group"
    >
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
      <span>Preview: {label}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </Link>
  );
}
