"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/*
 * Redesigned testimonials — editorial, not corporate.
 * One large featured quote + two supporting quotes.
 * No star ratings. Let the words speak.
 */

const testimonials = [
  {
    quote: "Jasace completely changed how we approach our projects. Their integrated team delivered a $2M commercial build ahead of schedule — and the design exceeded every expectation.",
    name: "Marcus Chen",
    title: "CEO, Chen Development Group",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "Every detail is considered, every decision is backed by expertise. Working with Jasace feels less like hiring a firm and more like gaining a partner.",
    name: "Sarah Okonkwo",
    title: "Director of Facilities, Okonkwo + Partners",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&crop=face",
  },
  {
    quote: "Their engineering team found a retrofit solution that saved us $15 million. That kind of creative problem-solving is rare in this industry.",
    name: "David Reeves",
    title: "VP of Development, Reeves Properties",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

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

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => setActive((a) => (a + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-warm-cream relative overflow-hidden">
      {/* Giant decorative quote mark */}
      <div className="absolute -top-8 right-8 lg:right-24 font-display text-[280px] lg:text-[400px] leading-none text-terra/[0.04] select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra mx-auto">
            <span className="w-8 h-px bg-terra" />
            What They Say
            <span className="w-8 h-px bg-terra" />
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-light tracking-tight">
            Built on <span className="italic font-medium">Trust</span>
          </h2>
        </div>

        {/* Featured Rotating Quote */}
        <div className="reveal reveal-delay-2 max-w-4xl mx-auto text-center">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <blockquote
              key={active}
              className="font-display text-2xl sm:text-3xl lg:text-4xl font-light text-stone-800 leading-snug tracking-tight italic animate-fade-in"
              style={{ animation: "fadeIn 0.6s ease-out" }}
            >
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4" key={`author-${active}`} style={{ animation: "fadeIn 0.6s ease-out 0.15s both" }}>
              <Image
                src={t.avatar}
                alt={t.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div className="text-left">
                <div className="text-sm font-semibold text-stone-900">{t.name}</div>
                <div className="text-xs text-stone-500">{t.title}</div>
              </div>
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center justify-center gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`transition-all duration-500 rounded-full ${
                  i === active
                    ? "w-8 h-2 bg-terra"
                    : "w-2 h-2 bg-stone-300 hover:bg-stone-400"
                }`}
                aria-label={`View testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
