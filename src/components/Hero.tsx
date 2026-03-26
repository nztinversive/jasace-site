"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (els) setTimeout(() => els.forEach((e) => e.classList.add("visible")), 200);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY;
        imgRef.current.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <div ref={imgRef} className="absolute inset-0 scale-110">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=1200&fit=crop&crop=bottom"
            alt="Modern architectural glass facade"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/60 to-stone-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-stone-950/30" />
        {/* Grain */}
        <div className="absolute inset-0 grain" />
      </div>

      {/* Corner accents */}
      <div className="absolute top-24 left-8 w-24 h-24 border-l border-t border-white/10 hidden lg:block" />
      <div className="absolute bottom-12 right-8 w-24 h-24 border-r border-b border-white/10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-3xl space-y-8">
          <div className="reveal">
            <span className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.25em] uppercase text-terra">
              <span className="w-10 h-px bg-terra" />
              Architecture &middot; Construction &middot; Engineering
            </span>
          </div>

          <h1 className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.92] tracking-tight text-white text-balance">
            We Shape the
            <br />
            <span className="font-semibold italic text-terra">Built Environment</span>
          </h1>

          <p className="reveal reveal-delay-2 text-lg lg:text-xl text-white/60 leading-relaxed max-w-xl">
            A boutique ACE consulting practice delivering design excellence,
            construction expertise, and engineering precision for projects that matter.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-4 pt-2">
            <a href="#work" className="px-8 py-4 bg-terra text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra-light transition-colors duration-300">
              View Our Work
            </a>
            <a href="#contact" className="px-8 py-4 border border-white/25 text-white/80 text-sm font-semibold tracking-wide hover:bg-white/10 hover:border-white/40 transition-all duration-300">
              Get in Touch
            </a>
          </div>

          {/* Micro credibility */}
          <div className="reveal reveal-delay-4 flex items-center gap-6 pt-4 text-xs text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-terra rounded-full" />
              <span className="text-white/60">Las Vegas, NV</span>
            </span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-white/60">100+ projects delivered</span>
            <span className="w-px h-4 bg-white/20" />
            <span className="text-white/60">98% client satisfaction</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 reveal reveal-delay-5">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
