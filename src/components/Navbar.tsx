"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1 group">
          <span className="font-display text-3xl font-semibold tracking-tight text-stone-900">
            <span className="text-terra">J</span>asace
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {["Find Projects", "How It Works", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium tracking-wide text-stone-600 hover:text-stone-900 transition-colors relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-terra group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            Log in
          </button>
          <button className="text-sm font-medium px-5 py-2.5 bg-stone-900 text-stone-50 hover:bg-terra transition-colors duration-300">
            Sign Up
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-stone-900 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-6 h-px bg-stone-900 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6 pt-4 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 flex flex-col gap-4">
          {["Find Projects", "How It Works", "About", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
              className="text-sm font-medium tracking-wide text-stone-700 py-2 border-b border-stone-100"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button className="flex-1 text-sm font-medium py-2.5 border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors">Log in</button>
            <button className="flex-1 text-sm font-medium py-2.5 bg-stone-900 text-stone-50 hover:bg-terra transition-colors">Sign Up</button>
          </div>
        </div>
      </div>
    </nav>
  );
}
