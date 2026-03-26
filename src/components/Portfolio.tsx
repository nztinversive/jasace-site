"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section ref={sectionRef} id="work" className="py-28 lg:py-36 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Selected Work
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight">
              Projects That <span className="italic font-medium">Define Us</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-stone-500 text-sm max-w-xs leading-relaxed">
            A selection of recent work across architecture, construction, and engineering.
          </p>
        </div>

        {/* Featured: 2-up large */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden cursor-pointer block`}
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                <div className="absolute inset-0 bg-terra/0 group-hover:bg-terra/10 transition-colors duration-500" />
              </div>
              <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <div className="text-xs text-white/50 font-medium tracking-wider uppercase mb-2">{project.category} &middot; {project.year}</div>
                    <h3 className="font-display text-2xl lg:text-3xl font-medium text-white tracking-tight">{project.title}</h3>
                    <p className="text-sm text-white/60 mt-1">{project.client} &middot; {project.location}</p>
                  </div>
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex-shrink-0">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest: asymmetric grid — 1 tall + 1 wide + 2 standard */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
          {rest.map((project, i) => {
            // First card spans 2 rows (tall), second spans 2 cols (wide)
            const spanClass = i === 0
              ? "lg:row-span-2"
              : i === 1
              ? "lg:col-span-2"
              : "";
            const aspectClass = i === 0
              ? "aspect-[3/4] lg:aspect-auto lg:h-full"
              : i === 1
              ? "aspect-[2/1] lg:aspect-auto lg:h-full"
              : "aspect-[4/3]";

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} group cursor-pointer block relative overflow-hidden ${spanClass}`}
              >
                <div className={`relative overflow-hidden ${i < 2 ? "h-full" : ""} ${aspectClass}`}>
                  <Image
                    src={project.heroImage}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
                  <div className="absolute inset-0 bg-terra/0 group-hover:bg-terra/10 transition-colors duration-500" />
                  <div className="absolute bottom-0 inset-x-0 p-5">
                    <div className="text-[10px] text-white/50 font-medium tracking-wider uppercase mb-1">{project.category} &middot; {project.year}</div>
                    <h3 className="font-display text-lg font-medium text-white tracking-tight group-hover:text-terra-100 transition-colors">{project.title}</h3>
                    <p className="text-xs text-white/50 mt-0.5">{project.location}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
