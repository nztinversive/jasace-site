"use client";

import { useState } from "react";

const links = [
  { label: "Find Projects", href: "#projects" },
  { label: "Post a Project", href: "#cta" },
  { label: "About", href: "#how" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy-900/80 backdrop-blur-md border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-tight">
          <span className="text-accent">J</span>asace
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button className="text-sm text-gray-300 hover:text-white transition-colors">
            Log in
          </button>
          <button className="text-sm bg-accent hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors">
            Sign Up
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-navy-900/95 backdrop-blur-md px-4 pb-4 pt-2 space-y-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-gray-300 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="text-sm text-gray-300 hover:text-white">Log in</button>
            <button className="text-sm bg-accent hover:bg-blue-600 px-4 py-2 rounded-lg font-medium transition-colors">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
