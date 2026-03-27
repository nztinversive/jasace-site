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
    <section ref={sectionRef} className="py-16 lg:py-20 bg-stone-100/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <p className="reveal text-xs font-semibold tracking-[0.2em] uppercase text-stone-400 text-center mb-10">
          We&apos;ve Built With
        </p>
        <div className="reveal reveal-delay-1 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8">
          {clients.map((name, i) => (
            <div
              key={name}
              className={`flex items-center justify-center py-5 lg:py-6 border-stone-200/80 hover:bg-stone-200/30 transition-colors duration-500 cursor-default ${
                i < clients.length - (clients.length % 4 || 4) ? "border-b lg:border-b-0" : ""
              } ${i % 4 !== 3 ? "border-r sm:border-r" : "border-r-0 sm:border-r-0"} ${
                i < clients.length - 1 ? "lg:border-r" : "lg:border-r-0"
              }`}
              style={{ borderColor: "rgba(214, 211, 205, 0.6)" }}
            >
              <span className="font-display text-sm lg:text-base font-medium text-stone-500 hover:text-stone-800 transition-colors duration-500 tracking-tight text-center px-2">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
