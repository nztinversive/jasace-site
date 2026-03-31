"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";
import type { Testimonial } from "@/types/cms";

const fallbackTestimonials: Testimonial[] = [
  {
    quote: "Jasace completely changed how we approach our projects. They delivered a $2M commercial build ahead of schedule - and the design exceeded every expectation.",
    name: "M. Chen",
    title: "CEO, Chen Development Group",
  },
  {
    quote: "Every detail is considered, every decision is backed by expertise. Working with Jasace feels less like hiring a company and more like gaining a partner.",
    name: "S. Okonkwo",
    title: "Director of Facilities, Okonkwo + Partners",
  },
  {
    quote: "They found a retrofit solution that saved us millions. That kind of creative problem-solving is rare in this industry.",
    name: "D. Reeves",
    title: "VP of Development, Reeves Properties",
  },
];

function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setRevealed(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActive((current) => (current + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    if (!testimonials[active]) {
      setActive(0);
    }
  }, [active, testimonials]);

  const testimonial = testimonials[active] ?? testimonials[0];
  const vis = revealed ? "visible" : "";

  if (!testimonial) return null;

  return (
    <section ref={sectionRef} className="py-28 lg:py-36 bg-stone-900 relative overflow-hidden">
      <div className="absolute -top-8 right-8 lg:right-24 font-display text-[280px] lg:text-[400px] leading-none text-terra/[0.06] select-none pointer-events-none">
        &ldquo;
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-terra/[0.03] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className={`reveal ${vis} inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra mx-auto`}>
            <span className="w-8 h-px bg-terra" />
            What They Say
            <span className="w-8 h-px bg-terra" />
          </span>
          <h2 className={`reveal reveal-delay-1 ${vis} font-display text-4xl lg:text-5xl font-bold tracking-tight text-stone-50 uppercase`}>
            Built on <span className="text-gradient">Trust</span>
          </h2>
        </div>

        <div className={`reveal reveal-delay-2 ${vis} max-w-3xl mx-auto text-center px-4`}>
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <blockquote
              key={active}
              className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-stone-200 leading-relaxed tracking-tight"
              style={{ animation: "fadeIn 0.6s ease-out" }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-4" key={`author-${active}`} style={{ animation: "fadeIn 0.6s ease-out 0.15s both" }}>
              <div className="w-12 h-12 bg-terra/20 border border-terra/30 flex items-center justify-center text-terra font-display text-sm font-semibold rounded-full">
                {testimonial.name.split(" ").map((part) => part[0]).join("")}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-stone-100">{testimonial.name}</div>
                <div className="text-xs text-stone-500">{testimonial.title}</div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === active ? "w-8 h-2 bg-terra" : "w-2 h-2 bg-stone-700 hover:bg-stone-600"
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConvexTestimonials() {
  const cmsData = useQuery(api.testimonials.list);
  const data = cmsData ?? fallbackTestimonials;

  return <TestimonialsSection testimonials={data} />;
}

export default function Testimonials() {
  if (!convexEnabled) {
    return <TestimonialsSection testimonials={fallbackTestimonials} />;
  }

  return <ConvexTestimonials />;
}
