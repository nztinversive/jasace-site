"use client";

import { useState, useEffect, useCallback } from "react";
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Check if a link is active
  const isActive = useCallback(
    (href: string) => {
      if (href === "/#work") return pathname === "/" && typeof window !== "undefined" && window.location.hash === "#work";
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const showLight = isHome && !scrolled && !menuOpen;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled || !isHome || menuOpen
            ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="group relative z-[60]">
            <span className={`font-display text-3xl font-semibold tracking-tight transition-colors duration-700 ${showLight ? "text-white" : "text-stone-900"}`}>
              <span className="text-terra">J</span>asace
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-500 relative group ${
                  isActive(link.href)
                    ? showLight ? "text-white" : "text-stone-900"
                    : showLight ? "text-white/60 hover:text-white" : "text-stone-500 hover:text-stone-900"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-terra transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`} />
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

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-[60] w-10 h-10 flex flex-col justify-center items-center"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1.5px] bg-stone-900 transition-all duration-500 ease-out ${menuOpen ? "rotate-45 translate-y-[4px]" : ""}`} />
            <span className={`block w-6 h-[1.5px] bg-stone-900 transition-all duration-500 ease-out mt-[5px] ${menuOpen ? "-rotate-45 -translate-y-[2.5px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* ═══ FULL-SCREEN MOBILE OVERLAY ═══ */}
      <div
        className={`fixed inset-0 z-[55] md:hidden transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-stone-50" />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-center px-8">
          <nav className="space-y-2">
            {links.map((link, i) => (
              <div
                key={link.label}
                style={{
                  transform: menuOpen ? "translateY(0)" : "translateY(30px)",
                  opacity: menuOpen ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${menuOpen ? i * 0.08 + 0.15 : 0}s`,
                }}
              >
                <Link
                  href={link.href}
                  className={`block font-display text-4xl sm:text-5xl font-light tracking-tight py-3 transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-terra"
                      : "text-stone-800 hover:text-terra"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Bottom section */}
          <div
            className="mt-12 pt-8 border-t border-stone-200"
            style={{
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              opacity: menuOpen ? 1 : 0,
              transition: `all 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${menuOpen ? 0.6 : 0}s`,
            }}
          >
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-terra text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra-light transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Start a Project
            </Link>
            <div className="mt-6 flex items-center gap-4 text-xs text-stone-400">
              <span>hello@jasace.com</span>
              <span className="w-px h-3 bg-stone-300" />
              <span>(512) 555-0180</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
