"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const services = [
  {
    title: "Architecture",
    subtitle: "Design Excellence",
    description: "From concept through completion, we create spaces that inspire. Our architectural practice spans commercial, residential, and public projects with a focus on contextual design and lasting impact.",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
    capabilities: ["Master Planning", "Commercial Design", "Residential", "Adaptive Reuse"],
  },
  {
    title: "Construction",
    subtitle: "Delivered with Integrity",
    description: "Construction management that keeps your project on time, on budget, and built to the highest standards. We bring decades of field experience to every build.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    capabilities: ["Project Management", "Cost Control", "Quality Assurance", "Scheduling"],
  },
  {
    title: "Engineering",
    subtitle: "Precision & Performance",
    description: "Structural, civil, and MEP engineering solutions that perform beautifully. We bring technical rigor and creative problem-solving to every engineering challenge.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    capabilities: ["Structural", "Civil", "MEP Systems", "Environmental"],
  },
];

export default function Services() {
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
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-28 lg:py-36 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-20 space-y-4">
          <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
            <span className="w-8 h-px bg-terra" />
            What We Do
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight">
            Three Disciplines,<br />
            <span className="italic font-medium">One Vision</span>
          </h2>
          <p className="reveal reveal-delay-2 text-stone-500 leading-relaxed max-w-lg">
            We bring architecture, construction, and engineering under one roof — delivering
            integrated solutions with clarity and precision.
          </p>
        </div>

        {/* Service Cards */}
        <div className="space-y-16 lg:space-y-24">
          {services.map((svc, i) => (
            <div
              key={svc.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 3)} grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                i % 2 === 1 ? "lg:direction-rtl" : ""
              }`}
              style={i % 2 === 1 ? { direction: "rtl" } : undefined}
            >
              {/* Image */}
              <div className="relative group" style={{ direction: "ltr" }}>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={svc.image}
                    alt={svc.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
                </div>
                {/* Corner accent */}
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-terra hidden lg:block" />
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-stone-900 flex items-center justify-center text-stone-50 font-display text-lg font-semibold">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-6" style={{ direction: "ltr" }}>
                <div>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-terra">{svc.subtitle}</span>
                  <h3 className="font-display text-3xl lg:text-4xl font-medium tracking-tight mt-2">{svc.title}</h3>
                </div>
                <p className="text-stone-500 leading-relaxed">{svc.description}</p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {svc.capabilities.map((cap) => (
                    <div key={cap} className="flex items-center gap-2 text-sm text-stone-600">
                      <span className="w-1 h-1 bg-terra rounded-full flex-shrink-0" />
                      {cap}
                    </div>
                  ))}
                </div>
                <div className="pt-4">
                  <a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-terra transition-colors group">
                    Learn More
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
