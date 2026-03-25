"use client";

import { useEffect, useRef } from "react";

const clients = [
  "Meridian Development",
  "Pacific Infrastructure",
  "Harborview Builders",
  "ClearFlow Engineering",
  "Nexus Architecture",
  "Ironclad Construction",
  "Grayson Capital",
  "Summit Health Systems",
];

export default function Clients() {
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="reveal text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 text-center mb-10">
          Trusted by Leading Organizations
        </p>
        <div className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 items-center">
          {clients.map((name) => (
            <div key={name} className="flex items-center justify-center group">
              <span className="font-display text-sm lg:text-base font-semibold text-stone-300 group-hover:text-stone-500 transition-colors duration-500 text-center leading-tight tracking-tight whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
