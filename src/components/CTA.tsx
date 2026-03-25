"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 lg:py-32 bg-stone-900 bg-grid-dark relative overflow-hidden grain">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent" />
      <div className="absolute top-16 left-16 w-24 h-24 border border-terra/10 hidden lg:block" />
      <div className="absolute bottom-16 right-16 w-24 h-24 border border-terra/10 hidden lg:block" />

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra mb-6">
          <span className="w-8 h-px bg-terra" />
          Get Started
          <span className="w-8 h-px bg-terra" />
        </span>

        <h2 className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl lg:text-6xl font-light text-stone-50 tracking-tight mb-6 text-balance">
          Ready to Find Your <br className="hidden sm:block" />
          <span className="italic font-medium text-terra">Next Project?</span>
        </h2>

        <p className="reveal reveal-delay-2 text-stone-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Join thousands of AEC professionals already using Jasace to discover opportunities and grow their business.
        </p>

        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-terra text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra-light transition-colors duration-300 w-full sm:w-auto">
            Get Started Free
          </button>
          <button className="px-8 py-4 border border-stone-600 text-stone-300 text-sm font-semibold tracking-wide hover:border-stone-400 hover:text-stone-50 transition-all duration-300 w-full sm:w-auto">
            Post a Project
          </button>
        </div>
      </div>
    </section>
  );
}
