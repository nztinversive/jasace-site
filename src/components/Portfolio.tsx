"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Downtown Mixed-Use Tower",
    client: "Meridian Development Group",
    location: "Austin, TX",
    category: "Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    title: "Highway 101 Bridge Rehabilitation",
    client: "Pacific Infrastructure Co.",
    location: "San Jose, CA",
    category: "Engineering",
    year: "2023",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
    featured: true,
  },
  {
    title: "Lakefront Residential Complex",
    client: "Harborview Builders",
    location: "Chicago, IL",
    category: "Construction",
    year: "2024",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    title: "Municipal Water Treatment",
    client: "ClearFlow Engineering",
    location: "Denver, CO",
    category: "Engineering",
    year: "2023",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    title: "Corporate Campus Expansion",
    client: "Nexus Architecture Studio",
    location: "Nashville, TN",
    category: "Architecture",
    year: "2024",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    featured: false,
  },
  {
    title: "Stadium Renovation Phase II",
    client: "Ironclad Construction",
    location: "Phoenix, AZ",
    category: "Construction",
    year: "2023",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=800&h=600&fit=crop",
    featured: false,
  },
];

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
            A selection of recent work across architecture, engineering, and construction.
          </p>
        </div>

        {/* Featured: 2-up large */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, i) => (
            <div
              key={project.title}
              className={`reveal reveal-delay-${i + 1} group relative overflow-hidden cursor-pointer`}
            >
              <div className="aspect-[3/2] relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-terra/0 group-hover:bg-terra/10 transition-colors duration-500" />
              </div>

              {/* Content overlay */}
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
            </div>
          ))}
        </div>

        {/* Rest: 4-up smaller grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rest.map((project, i) => (
            <div
              key={project.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} group cursor-pointer`}
            >
              <div className="aspect-[4/3] relative overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                <div className="absolute inset-0 bg-terra/0 group-hover:bg-terra/10 transition-colors duration-500" />
              </div>
              <div className="text-xs text-terra font-medium tracking-wider uppercase">{project.category} &middot; {project.year}</div>
              <h3 className="font-display text-lg font-medium tracking-tight mt-1 group-hover:text-terra transition-colors">{project.title}</h3>
              <p className="text-xs text-stone-500 mt-1">{project.location}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
