"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = ["Services", "Work", "About", "Contact"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-stone-50/90 backdrop-blur-md border-b border-stone-200/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="group">
          <span className={`font-display text-3xl font-semibold tracking-tight transition-colors duration-700 ${scrolled ? "text-stone-900" : "text-white"}`}>
            <span className="text-terra">J</span>asace
          </span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className={`text-sm font-medium tracking-wide transition-colors duration-700 relative group ${
                scrolled ? "text-stone-600 hover:text-stone-900" : "text-white/70 hover:text-white"
              }`}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-terra group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <button className={`text-sm font-medium px-6 py-2.5 transition-all duration-300 ${
            scrolled
              ? "bg-stone-900 text-stone-50 hover:bg-terra"
              : "bg-white/10 text-white border border-white/20 backdrop-blur-sm hover:bg-white/20"
          }`}>
            Get in Touch
          </button>
        </div>

        <button
          className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-stone-900" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-[3px]" : ""}`} />
          <span className={`block w-6 h-px transition-all duration-300 ${scrolled ? "bg-stone-900" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-[3px]" : ""}`} />
        </button>
      </div>

      <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-6 pt-4 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 flex flex-col gap-4">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium tracking-wide text-stone-700 py-2 border-b border-stone-100" onClick={() => setMenuOpen(false)}>{link}</a>
          ))}
          <button className="text-sm font-medium py-2.5 bg-stone-900 text-stone-50 hover:bg-terra transition-colors mt-2">Get in Touch</button>
        </div>
      </div>
    </nav>
  );
}
