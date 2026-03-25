"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;
    const timeout = setTimeout(() => {
      els.forEach((el) => el.classList.add("visible"));
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden bg-grid">
      {/* Decorative corner lines */}
      <div className="absolute top-24 left-8 w-32 h-32 border-l border-t border-stone-300/60 hidden lg:block" />
      <div className="absolute bottom-12 right-8 w-32 h-32 border-r border-b border-stone-300/60 hidden lg:block" />

      {/* Subtle terracotta accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
                <span className="w-8 h-px bg-terra" />
                AEC Platform
              </span>
            </div>

            <h1 className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] tracking-tight text-balance">
              Find Your
              <br />
              <span className="font-semibold italic text-terra">Next Build</span>
            </h1>

            <p className="reveal reveal-delay-2 text-lg lg:text-xl text-stone-500 leading-relaxed max-w-xl">
              Where architects, contractors, and engineers discover projects and connect with opportunities across the AEC industry.
            </p>

            {/* Search Bar */}
            <div className="reveal reveal-delay-3 bg-white border border-stone-200 shadow-sm shadow-stone-200/50 p-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-stone-100">
                  <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
                  </svg>
                  <select className="w-full bg-transparent text-sm text-stone-600 focus:outline-none cursor-pointer appearance-none">
                    <option>All Roles</option>
                    <option>Architect</option>
                    <option>Contractor</option>
                    <option>Engineer</option>
                  </select>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-stone-100">
                  <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <input type="text" placeholder="Location" className="w-full bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none" />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3">
                  <svg className="w-4 h-4 text-stone-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                  <input type="text" placeholder="Keywords" className="w-full bg-transparent text-sm text-stone-700 placeholder:text-stone-400 focus:outline-none" />
                </div>
                <button className="px-8 py-3 bg-stone-900 text-stone-50 text-sm font-medium hover:bg-terra transition-colors duration-300 flex-shrink-0">
                  Search
                </button>
              </div>
            </div>

            <div className="reveal reveal-delay-4 flex items-center gap-6 text-sm text-stone-500">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-terra rounded-full" />
                500+ active projects
              </span>
              <span className="w-px h-4 bg-stone-300" />
              <span>Free to browse</span>
            </div>
          </div>

          {/* Right: Photo composition */}
          <div className="hidden lg:flex lg:col-span-5 justify-end">
            <div className="relative w-full max-w-md">
              <div className="aspect-[3/4] relative">
                {/* Main photo */}
                <div className="absolute inset-4 overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop&crop=bottom"
                    alt="Modern glass skyscraper architecture"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 0vw, 400px"
                    priority
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                </div>
                {/* Offset frame */}
                <div className="absolute inset-0 border border-terra/40" style={{ transform: "translate(16px, 16px)" }} />
                {/* Overlay content */}
                <div className="absolute inset-4 flex flex-col justify-end p-8 text-stone-50 z-10">
                  <div className="space-y-4">
                    <div className="w-12 h-px bg-warm-gold" />
                    <p className="font-display text-2xl font-light italic leading-snug">
                      Building the future,<br />one project at a time.
                    </p>
                    <div className="flex items-center gap-3 pt-4">
                      <div className="flex -space-x-2">
                        <Image
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
                          alt="Professional"
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-stone-900 object-cover"
                        />
                        <Image
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face"
                          alt="Professional"
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-stone-900 object-cover"
                        />
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                          alt="Professional"
                          width={32}
                          height={32}
                          className="rounded-full border-2 border-stone-900 object-cover"
                        />
                      </div>
                      <span className="text-xs text-stone-300">1,200+ pros joined</span>
                    </div>
                  </div>
                </div>
                {/* Corner accents */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-terra" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-terra" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-stone-200" />
    </section>
  );
}
