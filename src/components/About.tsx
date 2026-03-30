"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function About() {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-28 lg:py-36 bg-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark" />
      {/* Animated wireframe accent */}
      <svg className="absolute bottom-12 right-12 w-48 h-48 pointer-events-none hidden lg:block" viewBox="0 0 200 200" fill="none">
        <circle cx="100" cy="100" r="80" stroke="#B8432F" strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="4 6">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="6s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="100" r="50" stroke="#B8432F" strokeOpacity="0.04" strokeWidth="0.5">
          <animate attributeName="r" values="48;52;48" dur="4s" repeatCount="indefinite" />
        </circle>
        <line x1="60" y1="100" x2="140" y2="100" stroke="#B8432F" strokeOpacity="0.04" strokeWidth="0.5" />
        <line x1="100" y1="60" x2="100" y2="140" stroke="#B8432F" strokeOpacity="0.04" strokeWidth="0.5" />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Composition */}
          <div className="relative">
            <div className="reveal aspect-[4/5] relative overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&h=900&fit=crop"
                alt="Architect reviewing blueprints on site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            </div>
            {/* Overlapping stat card — glass */}
            <div className="reveal reveal-delay-2 absolute -bottom-6 -right-6 lg:-right-12 glass p-8 w-48 lg:w-56 shadow-2xl">
              <div className="font-display text-4xl lg:text-5xl font-bold tracking-tight text-stone-50">10<span className="text-terra">+</span></div>
              <div className="text-xs text-stone-400 tracking-wide uppercase mt-1">Years in<br />the Industry</div>
              <div className="w-8 h-px bg-terra mt-4" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Our Philosophy
            </span>

            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold tracking-tight leading-snug text-stone-50">
              Great Buildings Start<br />
              with <span className="text-gradient">Great Listening</span>
            </h2>

            <p className="reveal reveal-delay-2 text-stone-400 leading-relaxed">
              Founded in Las Vegas by Jason Reese, Jasace is a boutique ACE consulting
              practice built on a simple principle: every project deserves full attention,
              every client deserves honest counsel, and every building should enhance the
              lives of the people who use it. With a trusted network of collaborators,
              we deliver the expertise of a larger firm with the care of a dedicated partner.
            </p>

            <div className="reveal reveal-delay-3 grid grid-cols-2 gap-6 pt-4">
              {[
                { label: "Integrated Approach", desc: "Architecture, construction, and engineering under one roof." },
                { label: "Client-First", desc: "Your vision drives every decision we make." },
                { label: "Sustainable Design", desc: "Building responsibly for the next generation." },
                { label: "Local Expertise", desc: "Deep roots in the communities we serve." },
              ].map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="text-sm font-semibold text-stone-200">{item.label}</div>
                  <div className="text-xs text-stone-500 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>

            <div className="reveal reveal-delay-4 pt-4">
              <a href="/about" className="inline-flex items-center gap-2 text-sm font-semibold text-terra hover:text-terra-light transition-colors py-3 group">
                Meet the Founder
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
