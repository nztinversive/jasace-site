"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const categories = [
  {
    title: "Architecture",
    count: "180+",
    description: "Commercial, residential, and public architecture projects from top firms nationwide.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="4" y="14" width="24" height="14" />
        <polygon points="16,4 4,14 28,14" />
        <line x1="10" y1="20" x2="10" y2="28" />
        <line x1="16" y1="20" x2="16" y2="28" />
        <line x1="22" y1="20" x2="22" y2="28" />
      </svg>
    ),
  },
  {
    title: "Engineering",
    count: "210+",
    description: "Structural, civil, MEP, and environmental engineering opportunities across all sectors.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <circle cx="16" cy="16" r="10" />
        <line x1="16" y1="6" x2="16" y2="26" />
        <line x1="6" y1="16" x2="26" y2="16" />
        <circle cx="16" cy="16" r="4" />
      </svg>
    ),
  },
  {
    title: "Contracting",
    count: "150+",
    description: "General contracting, specialty trades, and construction management roles on active builds.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <rect x="6" y="16" width="20" height="12" />
        <rect x="12" y="8" width="8" height="8" />
        <line x1="6" y1="22" x2="26" y2="22" />
        <line x1="14" y1="16" x2="14" y2="28" />
        <line x1="18" y1="16" x2="18" y2="28" />
      </svg>
    ),
  },
];

export default function Categories() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) =>
              el.classList.add("visible")
            );
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 lg:py-32 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Disciplines
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-light tracking-tight">
              Browse by <span className="text-gradient font-bold">DISCIPLINE</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-stone-500 text-sm max-w-xs leading-relaxed">
            Explore opportunities tailored to your expertise across the ACE industry.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className={`reveal reveal-delay-${i + 1} group relative bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:border-terra/40 hover:shadow-lg hover:shadow-terra/5 cursor-pointer`}
            >
              {/* Top accent line on hover */}
              <div className="absolute top-0 left-0 w-0 h-px bg-terra transition-all duration-500 group-hover:w-full z-10" />

              {/* Photo */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                {/* Icon badge */}
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center text-stone-700">
                  {cat.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="space-y-4">
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display text-2xl font-medium tracking-tight">{cat.title}</h3>
                    <span className="text-xs font-semibold text-terra tracking-wider">{cat.count} projects</span>
                  </div>
                  <p className="text-sm text-stone-500 leading-relaxed">{cat.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-stone-400 group-hover:text-terra transition-colors duration-300">
                  <span>Explore</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
