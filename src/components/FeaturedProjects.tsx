"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const projects = [
  {
    title: "Downtown Mixed-Use Tower",
    company: "Meridian Development Group",
    location: "Austin, TX",
    tag: "Architecture",
    posted: "2 days ago",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop",
  },
  {
    title: "Highway 101 Bridge Rehabilitation",
    company: "Pacific Infrastructure Co.",
    location: "San Jose, CA",
    tag: "Engineering",
    posted: "3 days ago",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop",
  },
  {
    title: "Lakefront Residential Complex",
    company: "Harborview Builders",
    location: "Chicago, IL",
    tag: "Contracting",
    posted: "1 day ago",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop",
  },
  {
    title: "Municipal Water Treatment Upgrade",
    company: "ClearFlow Engineering",
    location: "Denver, CO",
    tag: "Engineering",
    posted: "4 days ago",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
  },
  {
    title: "Corporate Campus Expansion",
    company: "Nexus Architecture Studio",
    location: "Nashville, TN",
    tag: "Architecture",
    posted: "1 day ago",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
  },
  {
    title: "Stadium Renovation Phase II",
    company: "Ironclad Construction",
    location: "Phoenix, AZ",
    tag: "Contracting",
    posted: "5 days ago",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop",
  },
];

const tagColors: Record<string, string> = {
  Architecture: "bg-terra/10 text-terra border-terra/20",
  Engineering: "bg-warm-gold/10 text-warm-gold border-warm-gold/20",
  Contracting: "bg-stone-500/10 text-stone-600 border-stone-300",
};

export default function FeaturedProjects() {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="find-projects" className="py-24 lg:py-32 bg-stone-50 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Opportunities
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-light tracking-tight">
              Featured <span className="text-gradient font-bold">PROJECTS</span>
            </h2>
          </div>
          <a href="/services" className="reveal reveal-delay-2 inline-flex items-center gap-2 text-sm font-medium text-terra hover:text-terra-dark transition-colors group">
            View all projects
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} group bg-white border border-stone-200 overflow-hidden transition-all duration-500 hover:border-terra/30 hover:shadow-lg hover:shadow-stone-200/50 cursor-pointer relative`}
            >
              {/* Top accent on hover */}
              <div className="absolute top-0 left-0 w-0 h-px bg-terra transition-all duration-500 group-hover:w-full z-10" />

              {/* Project Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                {/* Tag overlay */}
                <div className="absolute top-4 left-4">
                  <span className={`text-xs font-semibold px-3 py-1 border backdrop-blur-sm ${tagColors[project.tag]}`}>
                    {project.tag}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="text-xs text-white/80 bg-stone-900/40 backdrop-blur-sm px-2 py-1">{project.posted}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-display text-xl font-medium tracking-tight mb-2 group-hover:text-terra transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-stone-500 mb-4">{project.company}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    {project.location}
                  </div>
                  <svg className="w-4 h-4 text-stone-300 group-hover:text-terra transition-colors duration-300 transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
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
