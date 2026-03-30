"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Create Your Profile",
    description: "Set up your professional profile with your skills, certifications, and project history in minutes.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Discover Projects",
    description: "Browse and filter hundreds of active projects by discipline, location, budget, and timeline.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Connect & Build",
    description: "Submit proposals, connect with project owners, and start building. It's that simple.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.815a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.81" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
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
    <section ref={sectionRef} id="how-it-works" className="py-24 lg:py-32 bg-stone-100 relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 bg-grid opacity-50" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra mx-auto">
            <span className="w-8 h-px bg-terra" />
            Process
            <span className="w-8 h-px bg-terra" />
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-light tracking-tight">
            How It <span className="text-gradient font-bold">WORKS</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-0">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`reveal reveal-delay-${i + 1} relative p-8 lg:p-12 ${
                i < steps.length - 1 ? "md:border-r border-stone-300/60" : ""
              }`}
            >
              {/* Step number */}
              <div className="font-display text-6xl lg:text-7xl font-light text-stone-200 leading-none mb-6">
                {step.num}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 border border-terra/30 flex items-center justify-center text-terra mb-6">
                {step.icon}
              </div>

              <h3 className="font-display text-xl lg:text-2xl font-medium tracking-tight mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-stone-500 leading-relaxed">
                {step.description}
              </p>

              {/* Connector arrow for desktop */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 border-r border-t border-stone-300/60 rotate-45 bg-stone-100 z-10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
