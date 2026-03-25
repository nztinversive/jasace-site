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
    <section ref={sectionRef} className="py-14 lg:py-16 bg-stone-100/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="reveal text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 text-center mb-8">
          We&apos;ve Built With
        </p>
        <div className="reveal reveal-delay-1 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 lg:gap-x-16">
          {clients.map((name) => (
            <span
              key={name}
              className="font-display text-base lg:text-lg font-medium text-stone-300 hover:text-stone-600 transition-colors duration-500 cursor-default tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
