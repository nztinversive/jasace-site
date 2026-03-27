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
  "Summit Health",
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
    <section ref={sectionRef} className="py-16 lg:py-20 bg-stone-900/50 border-y border-stone-800/40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="reveal text-xs font-semibold tracking-[0.2em] uppercase text-stone-600 text-center mb-10">
          We&apos;ve Built With
        </p>
        <div className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {clients.map((name, i) => (
            <div
              key={name}
              className={`flex items-center justify-center py-5 lg:py-6 hover:bg-white/[0.02] transition-colors duration-500 cursor-default ${
                i < clients.length - 1 ? "lg:border-r border-stone-800/40" : ""
              }`}
            >
              <span className="font-display text-sm lg:text-base font-semibold text-stone-600 hover:text-stone-300 transition-colors duration-500 tracking-tight text-center px-2 uppercase">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
