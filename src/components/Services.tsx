"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const services = [
  {
    title: "Architecture",
    subtitle: "Design Excellence",
    description: "From concept through completion, we create spaces that inspire. Our architectural practice spans commercial, residential, and public projects with a focus on contextual design and lasting impact.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    capabilities: ["Master Planning", "Commercial Design", "Residential", "Adaptive Reuse"],
    stat: "60+",
    statLabel: "projects",
  },
  {
    title: "Construction",
    subtitle: "Delivered with Integrity",
    description: "Construction management that keeps your project on time, on budget, and built to the highest standards. We bring decades of field experience to every build.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    capabilities: ["Project Management", "Cost Control", "Quality Assurance", "Scheduling"],
    stat: "98%",
    statLabel: "on-time",
  },
  {
    title: "Engineering",
    subtitle: "Precision & Performance",
    description: "Structural, civil, and MEP engineering solutions that perform beautifully. We bring technical rigor and creative problem-solving to every engineering challenge.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    capabilities: ["Structural", "Civil", "MEP Systems", "Environmental"],
    stat: "40+",
    statLabel: "structures",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const active = services[activeIdx];
  const vis = revealed ? "visible" : "";

  return (
    <section ref={sectionRef} id="services" className="py-28 lg:py-36 bg-stone-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-dark" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/30 to-transparent" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 rounded-full bg-terra/[0.04] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full bg-terra/[0.03] blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-4">
          <span className={`reveal ${vis} inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra`}>
            <span className="w-8 h-px bg-terra" />
            What We Do
          </span>
          <h2 className={`reveal reveal-delay-1 ${vis} font-display text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight text-stone-50`}>
            Three Disciplines,<br />
            <span className="italic font-medium text-terra">One Vision</span>
          </h2>
        </div>

        {/* Service Cards — tab selector + detail panel */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Card selectors */}
          <div className="lg:col-span-4 space-y-4">
            {services.map((svc, i) => (
              <button
                key={svc.title}
                onClick={() => setActiveIdx(i)}
                className={`reveal reveal-delay-${i + 1} ${vis} w-full text-left p-6 border transition-all duration-500 group relative overflow-hidden ${
                  i === activeIdx
                    ? "border-terra/40 bg-terra/[0.06]"
                    : "border-stone-800 bg-stone-900/50 hover:border-stone-700 hover:bg-stone-900/80"
                }`}
              >
                {/* Active indicator line */}
                <div className={`absolute left-0 top-0 bottom-0 w-[3px] bg-terra transition-all duration-500 ${
                  i === activeIdx ? "opacity-100" : "opacity-0"
                }`} />

                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-1">{svc.subtitle}</div>
                    <h3 className="font-display text-2xl lg:text-3xl font-medium text-stone-50 tracking-tight">{svc.title}</h3>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <div className="font-display text-2xl font-light text-terra">{svc.stat}</div>
                    <div className="text-[10px] text-stone-500 tracking-wider uppercase">{svc.statLabel}</div>
                  </div>
                </div>

                {/* Capabilities pills — only on active */}
                <div className={`flex flex-wrap gap-2 mt-4 transition-all duration-500 ${
                  i === activeIdx ? "opacity-100 max-h-20" : "opacity-0 max-h-0 overflow-hidden"
                }`}>
                  {svc.capabilities.map((cap) => (
                    <span key={cap} className="text-[10px] font-medium text-stone-400 border border-stone-700 px-2.5 py-1 tracking-wider uppercase">
                      {cap}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Right: Detail panel with photo */}
          <div className="lg:col-span-8 relative">
            <div className={`reveal reveal-delay-2 ${vis} relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] overflow-hidden group`}>
              {/* Image — changes with active tab */}
              <div key={activeIdx} className="absolute inset-0" style={{ animation: "fadeIn 0.5s ease-out" }}>
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-stone-950/10" />
                <div className="absolute inset-0 bg-gradient-to-r from-stone-950/40 to-transparent" />
              </div>

              {/* Wireframe overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="0" y1="80" x2="100" y2="80" stroke="white" strokeOpacity="0.05" strokeWidth="0.3" />
                <line x1="30" y1="0" x2="30" y2="100" stroke="white" strokeOpacity="0.03" strokeWidth="0.3" />
              </svg>

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-terra/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-terra/30" />

              {/* Content overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 lg:p-12">
                <p key={`desc-${activeIdx}`} className="text-stone-300 leading-relaxed max-w-xl text-sm sm:text-base" style={{ animation: "fadeIn 0.5s ease-out 0.1s both" }}>
                  {active.description}
                </p>
                <a href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-terra hover:text-terra-light transition-colors mt-6 group/link" style={{ animation: "fadeIn 0.5s ease-out 0.2s both" }}>
                  Learn More
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="transform group-hover/link:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/30 to-transparent" />
    </section>
  );
}
