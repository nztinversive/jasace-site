"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const testimonials = [
  {
    quote: "Jasace completely changed how I find projects. Within two weeks of signing up, I landed a $2M commercial build.",
    name: "Marcus Chen",
    title: "General Contractor",
    company: "Chen Construction LLC",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "The quality of projects on here is unmatched. No more sifting through junk — every listing is vetted and relevant to my practice.",
    name: "Sarah Okonkwo",
    title: "Principal Architect",
    company: "Okonkwo + Partners",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face",
  },
  {
    quote: "As a structural engineer, I was skeptical. But the filtering tools and direct connections to project owners make this a no-brainer.",
    name: "David Reeves",
    title: "Structural Engineer, PE",
    company: "Reeves Engineering Group",
    stars: 4,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-warm-gold" : "text-stone-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
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
    <section ref={sectionRef} className="py-24 lg:py-32 bg-warm-cream relative overflow-hidden">
      {/* Decorative quote */}
      <div className="absolute top-12 right-12 font-display text-[200px] leading-none text-terra/5 select-none hidden lg:block">
        &ldquo;
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra mx-auto">
            <span className="w-8 h-px bg-terra" />
            Testimonials
            <span className="w-8 h-px bg-terra" />
          </span>
          <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-light tracking-tight">
            Trusted by <span className="italic font-medium">Professionals</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`reveal reveal-delay-${i + 1} bg-white border border-stone-200 p-8 lg:p-10 relative group hover:border-terra/20 transition-all duration-500`}
            >
              {/* Quote mark */}
              <div className="font-display text-5xl text-terra/20 leading-none mb-4">&ldquo;</div>

              <StarRating count={t.stars} />

              <blockquote className="text-sm text-stone-600 leading-relaxed mt-4 mb-8">
                {t.quote}
              </blockquote>

              <div className="border-t border-stone-100 pt-6">
                <div className="flex items-center gap-4">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-semibold text-stone-900">{t.name}</div>
                    <div className="text-xs text-stone-500">{t.title}, {t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
