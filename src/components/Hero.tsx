"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

/*
 * Hero with animated architectural wireframe overlay.
 * Adds technical edge while keeping editorial sophistication.
 */

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (els) setTimeout(() => els.forEach((e) => e.classList.add("visible")), 200);
  }, []);

  // Parallax on scroll — desktop only (mobile gets janky + pushes content)
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    const onScroll = () => {
      if (imgRef.current) {
        const y = window.scrollY;
        imgRef.current.style.transform = `translateY(${y * 0.2}px) scale(1.1)`;
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
        {/* Darker, more dramatic overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/70 to-stone-900/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/40" />
        {/* Grain */}
        <div className="absolute inset-0 grain" />
      </div>

      {/* ═══ ANIMATED WIREFRAME OVERLAY ═══ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="wireGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#B8432F" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#B8432F" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Animated grid lines — architectural feel */}
          <line x1="20%" y1="0" x2="20%" y2="100%" stroke="white" strokeOpacity="0.03" strokeWidth="1">
            <animate attributeName="x1" values="20%;22%;20%" dur="8s" repeatCount="indefinite" />
            <animate attributeName="x2" values="20%;18%;20%" dur="8s" repeatCount="indefinite" />
          </line>
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          <line x1="80%" y1="0" x2="80%" y2="100%" stroke="white" strokeOpacity="0.03" strokeWidth="1">
            <animate attributeName="x1" values="80%;78%;80%" dur="10s" repeatCount="indefinite" />
            <animate attributeName="x2" values="80%;82%;80%" dur="10s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="white" strokeOpacity="0.03" strokeWidth="1" />
          <line x1="0" y1="70%" x2="100%" y2="70%" stroke="white" strokeOpacity="0.03" strokeWidth="1" />

          {/* Animated blueprint rectangle — right side */}
          <rect x="60%" y="15%" width="30%" height="45%" fill="none" stroke="url(#wireGrad)" strokeWidth="1" strokeDasharray="8 4">
            <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite" />
          </rect>

          {/* Floating crosshair — engineering precision */}
          <g opacity="0.12">
            <circle cx="75%" cy="37%" r="20" fill="none" stroke="#B8432F" strokeWidth="0.5">
              <animate attributeName="r" values="18;22;18" dur="4s" repeatCount="indefinite" />
            </circle>
            <line x1="73%" y1="37%" x2="77%" y2="37%" stroke="#B8432F" strokeWidth="0.5" />
            <line x1="75%" y1="35%" x2="75%" y2="39%" stroke="#B8432F" strokeWidth="0.5" />
          </g>

          {/* Diagonal construction line */}
          <line x1="65%" y1="100%" x2="100%" y2="20%" stroke="white" strokeOpacity="0.02" strokeWidth="1" strokeDasharray="12 8">
            <animate attributeName="stroke-dashoffset" values="0;-40" dur="5s" repeatCount="indefinite" />
          </line>

          {/* Small floating triangle — architectural accent */}
          <polygon points="0,0 30,0 15,26" fill="none" stroke="#B8432F" strokeWidth="0.5" opacity="0.1" transform="translate(85%, 70%)">
            <animateTransform attributeName="transform" type="rotate" values="0 15 13;360 15 13" dur="20s" repeatCount="indefinite" additive="sum" />
          </polygon>
        </svg>

        {/* Glowing terracotta accent orb — top right */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full hidden lg:block"
          style={{
            background: "radial-gradient(circle, rgba(184,67,47,0.08) 0%, transparent 70%)",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
      </div>

      {/* Corner accents — larger, bolder */}
      <div className="absolute top-24 left-8 w-32 h-32 border-l border-t border-white/[0.07] hidden lg:block" />
      <div className="absolute bottom-16 right-8 w-32 h-32 border-r border-b border-terra/20 hidden lg:block" />
      {/* Extra corner detail */}
      <div className="absolute top-24 left-8 w-3 h-3 bg-terra/30 hidden lg:block" />
      <div className="absolute bottom-16 right-8 w-3 h-3 bg-terra/30 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10">
        <div className="max-w-2xl space-y-6">
          <div className="reveal">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Architecture &middot; Construction &middot; Engineering
            </span>
          </div>

          <h1 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight text-white uppercase">
            Building
            <br />
            <span className="text-gradient">Beyond Limits</span>
          </h1>

          <p className="reveal reveal-delay-2 text-base lg:text-lg text-white/50 leading-relaxed max-w-lg">
            Architecture, construction, and engineering consulting —
            delivering precision and results for projects that matter.
          </p>

          <div className="reveal reveal-delay-3 flex flex-wrap items-center gap-3 pt-1">
            <a href="#work" className="group px-6 py-3 bg-terra text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra-light transition-colors duration-300 relative overflow-hidden">
              <span className="relative z-10">View Our Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <a href="#contact" className="px-6 py-3 border border-white/20 text-white/60 text-sm font-semibold tracking-wide hover:bg-white/5 hover:border-white/30 hover:text-white transition-all duration-300">
              Get in Touch
            </a>
          </div>

          {/* Compact credibility */}
          <div className="reveal reveal-delay-4 flex items-center gap-4 pt-2 text-[11px] text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="w-1 h-1 bg-terra rounded-full" />
              Las Vegas, NV
            </span>
            <span className="text-white/10">&middot;</span>
            <span>100+ projects</span>
            <span className="text-white/10">&middot;</span>
            <span>98% satisfaction</span>
          </div>
        </div>
      </div>

      {/* Minimal scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 reveal reveal-delay-5">
        <div className="w-px h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
