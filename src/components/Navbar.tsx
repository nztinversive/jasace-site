"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showLight = isHome && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled || !isHome
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="group">
          <span className={`font-display text-3xl font-semibold tracking-tight transition-colors duration-700 ${showLight ? "text-white" : "text-stone-900"}`}>
            <span className="text-terra">J</span>asace
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-700 relative group ${
                showLight ? "text-white/70 hover:text-white" : "text-stone-600 hover:text-stone-900"
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-terra group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href="/contact" className={`text-sm font-medium px-6 py-2.5 transition-all duration-300 ${
            showLight
              ? "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20"
              : "bg-stone-900 text-stone-50 hover:bg-terra"
          }`}>
            Get in Touch
          </Link>
        </div>

        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${showLight ? "bg-white" : "bg-stone-900"} ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${showLight ? "bg-white" : "bg-stone-900"} ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 pt-4 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 flex flex-col gap-4">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="text-sm font-medium tracking-wide text-stone-700 py-2 border-b border-stone-100" onClick={() => setMenuOpen(false)}>{link.label}</Link>
          ))}
          <Link href="/contact" className="text-sm font-medium py-2.5 bg-stone-900 text-stone-50 hover:bg-terra transition-colors text-center mt-2" onClick={() => setMenuOpen(false)}>Get in Touch</Link>
        </div>
      </div>
    </nav>
  );
}
