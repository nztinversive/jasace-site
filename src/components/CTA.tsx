"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CTA() {
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
    <section ref={sectionRef} id="contact" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left: Image */}
        <div className="relative hidden lg:block">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&h=700&fit=crop&crop=center"
            alt="Architecture detail"
            fill
            className="object-cover"
            sizes="50vw"
          />
          <div className="absolute inset-0 bg-stone-900/30" />
          {/* Corner accent */}
          <div className="absolute bottom-8 left-8 space-y-3">
            <div className="w-16 h-px bg-terra" />
            <p className="font-display text-xl text-white/80 font-medium">
              Every great project<br />starts with a conversation.
            </p>
          </div>
        </div>

        {/* Right: Content */}
        <div className="bg-stone-950 bg-grid-dark relative grain py-20 lg:py-28 px-6 lg:px-16 flex items-center">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-terra/40 via-transparent to-transparent" />
          {/* Subtle glow */}
          <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full bg-terra/[0.04] blur-[60px] pointer-events-none" />

          <div className="w-full max-w-lg space-y-8">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Start a Project
            </span>

            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl font-bold text-stone-50 tracking-tight leading-tight uppercase">
              Let&rsquo;s Build Something
              <br /><span className="text-gradient">Together</span>
            </h2>

            <p className="reveal reveal-delay-2 text-stone-400 leading-relaxed">
              Whether you have a project in mind or just want to explore possibilities,
              we&rsquo;d love to hear from you. Our team is ready to bring your vision to life.
            </p>

            <div className="reveal reveal-delay-3 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Your Name" className="bg-stone-800/50 border border-stone-700 px-4 py-3.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors" />
                <input type="email" placeholder="Email Address" className="bg-stone-800/50 border border-stone-700 px-4 py-3.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors" />
              </div>
              <input type="text" placeholder="Project Type (e.g., Commercial, Residential, Infrastructure)" className="w-full bg-stone-800/50 border border-stone-700 px-4 py-3.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors" />
              <textarea placeholder="Tell us about your project..." rows={4} className="w-full bg-stone-800/50 border border-stone-700 px-4 py-3.5 text-sm text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-terra/50 transition-colors resize-none" />
              <button className="w-full px-8 py-4 bg-terra text-stone-50 text-sm font-semibold tracking-wide hover:bg-terra-light transition-colors duration-300">
                Send Inquiry
              </button>
            </div>

            <div className="reveal reveal-delay-4 flex items-center gap-6 pt-4 text-xs text-stone-500">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                jason@jasace.com
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-terra" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                (702) 403-5346
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
