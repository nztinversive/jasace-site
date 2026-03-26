"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

/* ── Gallery Lightbox ─────────────────────────── */
function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((c) => (c + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((c) => (c - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [images.length, onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-stone-950/95 flex items-center justify-center" onClick={onClose}>
      <button onClick={onClose} className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors z-10">
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
      <div className="relative w-full max-w-5xl aspect-[16/10] mx-8" onClick={(e) => e.stopPropagation()}>
        <Image src={images[current]} alt="" fill className="object-contain" sizes="90vw" />
      </div>
      {images.length > 1 && (
        <>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c - 1 + images.length) % images.length); }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </button>
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors" onClick={(e) => { e.stopPropagation(); setCurrent((c) => (c + 1) % images.length); }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, i) => (
              <button key={i} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-terra" : "bg-white/30"}`} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Reveal Hook ──────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) el.querySelectorAll(".reveal").forEach((c) => c.classList.add("visible"));
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Main Content Component ──────────────────── */
export default function ProjectContent({ project, prevProject, nextProject }: {
  project: Project;
  prevProject: { slug: string; title: string };
  nextProject: { slug: string; title: string };
}) {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useReveal(0.1);
  const galleryRef = useReveal(0.1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const imgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current) imgRef.current.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".reveal");
    if (els) setTimeout(() => els.forEach((e) => e.classList.add("visible")), 200);
  }, []);

  return (
    <div className="bg-stone-50 text-stone-900">
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div ref={imgRef} className="absolute inset-0 scale-110">
          <Image src={project.heroImage} alt={project.title} fill className="object-cover" sizes="100vw" priority />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/30 to-stone-900/10" />
        <div className="absolute inset-0 grain" />

        {/* Breadcrumb */}
        <div className="absolute top-6 left-6 z-20 flex items-center gap-2 text-sm text-white/40">
          <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/#work" className="hover:text-white/70 transition-colors">Work</Link>
          <span>/</span>
          <span className="text-white/70 truncate max-w-[200px]">{project.title}</span>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12 lg:pb-16 relative z-10">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              {project.category} &middot; {project.year}
            </span>
          </div>
          <h1 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight mt-4">
            {project.title}
          </h1>
          <div className="reveal reveal-delay-2 flex flex-wrap items-center gap-6 mt-4 text-sm text-white/50">
            <span>{project.client}</span>
            <span className="w-px h-4 bg-white/20" />
            <span>{project.location}</span>
            <span className="w-px h-4 bg-white/20" />
            <span>{project.scope}</span>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section ref={contentRef} className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7 space-y-12">
              <div className="reveal space-y-4">
                <h2 className="font-display text-3xl font-light tracking-tight">Overview</h2>
                <p className="text-stone-600 leading-relaxed text-lg">{project.description}</p>
              </div>
              <div className="reveal reveal-delay-1 space-y-4">
                <h3 className="font-display text-2xl font-light tracking-tight">The Challenge</h3>
                <p className="text-stone-500 leading-relaxed">{project.challenge}</p>
              </div>
              <div className="reveal reveal-delay-2 space-y-4">
                <h3 className="font-display text-2xl font-light tracking-tight">Our Solution</h3>
                <p className="text-stone-500 leading-relaxed">{project.solution}</p>
              </div>
              <div className="reveal reveal-delay-3 space-y-4">
                <h3 className="font-display text-2xl font-light tracking-tight">The Result</h3>
                <p className="text-stone-500 leading-relaxed">{project.result}</p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="reveal sticky top-24 bg-stone-100 p-8 lg:p-10 space-y-6">
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra">Project Details</h3>
                <div className="space-y-4">
                  {project.specs.map((spec) => (
                    <div key={spec.label} className="flex items-baseline justify-between border-b border-stone-200 pb-3">
                      <span className="text-sm text-stone-500">{spec.label}</span>
                      <span className="text-sm font-semibold text-stone-800">{spec.value}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <a href="/#contact" className="w-full block text-center px-6 py-3.5 bg-stone-900 text-stone-50 text-sm font-semibold hover:bg-terra transition-colors">
                    Discuss a Similar Project
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section ref={galleryRef} className="pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="reveal font-display text-2xl font-light tracking-tight mb-8">
            Project <span className="italic font-medium">Gallery</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {project.gallery.map((img, i) => (
              <div
                key={i}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} relative overflow-hidden cursor-pointer group ${i === 0 ? "col-span-2 row-span-2 aspect-[4/3]" : "aspect-[4/3]"}`}
                onClick={() => setLightbox(i)}
              >
                <Image src={img} alt={`${project.title} gallery ${i + 1}`} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes={i === 0 ? "66vw" : "33vw"} />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 bg-white/90 flex items-center justify-center">
                    <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" /></svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAVIGATION ── */}
      <div className="border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2">
          <Link href={`/work/${prevProject.slug}`} className="py-8 lg:py-12 pr-4 border-r border-stone-200 group">
            <span className="text-xs text-stone-400 tracking-wider uppercase">Previous</span>
            <div className="font-display text-lg lg:text-xl font-medium mt-1 group-hover:text-terra transition-colors">{prevProject.title}</div>
          </Link>
          <Link href={`/work/${nextProject.slug}`} className="py-8 lg:py-12 pl-4 text-right group">
            <span className="text-xs text-stone-400 tracking-wider uppercase">Next</span>
            <div className="font-display text-lg lg:text-xl font-medium mt-1 group-hover:text-terra transition-colors">{nextProject.title}</div>
          </Link>
        </div>
      </div>

      {lightbox !== null && (
        <Lightbox images={project.gallery} index={lightbox} onClose={() => setLightbox(null)} />
      )}
    </div>
  );
}
