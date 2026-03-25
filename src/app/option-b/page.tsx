"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/*
 * OPTION B — "Dark Blueprint"
 * Technical precision meets dark elegance.
 * Deep navy base, cyan blueprint accents, IBM Plex Mono display type.
 * Feels like an architect's workstation at night.
 */

// ─── Counter Hook ─────────────────────────────────
function useCountUp(target: number, visible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = target / 125;
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(id);
  }, [visible, target]);
  return count;
}

// ─── Reveal Hook ──────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.querySelectorAll(".rv").forEach((c) => c.classList.add("vis")); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

// ─── Page ─────────────────────────────────────────
export default function OptionB() {
  const heroRef = useRef<HTMLElement>(null);
  const catRef = useReveal();
  const howRef = useReveal();
  const statsRef = useRef<HTMLElement>(null);
  const projRef = useReveal(0.1);
  const testRef = useReveal();
  const ctaRef = useReveal(0.2);
  const [statsVis, setStatsVis] = useState(false);

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll(".rv");
    if (els) setTimeout(() => els.forEach((e) => e.classList.add("vis")), 100);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-[#0A0F1C] text-[#C8D6E5] min-h-screen" style={{ fontFamily: "var(--font-ibm-sans), system-ui, sans-serif" }}>
      <style>{`
        .rv { opacity:0; transform:translateY(24px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .rv.vis { opacity:1; transform:translateY(0); }
        .rv-d1 { transition-delay:.1s } .rv-d2 { transition-delay:.2s } .rv-d3 { transition-delay:.3s } .rv-d4 { transition-delay:.4s }
        .bp-grid { background-image: linear-gradient(to right,rgba(14,165,233,.06) 1px,transparent 1px), linear-gradient(to bottom,rgba(14,165,233,.06) 1px,transparent 1px); background-size:48px 48px; }
        .glow { box-shadow: 0 0 60px rgba(14,165,233,.08); }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-[#1E293B] bg-[#0A0F1C]/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-xl tracking-tight text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>
            <span className="text-[#0EA5E9]">J</span>asace<span className="text-[#0EA5E9] text-xs ml-1">_</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm text-[#64748B]">
            {["Find Projects", "How It Works", "About", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-[#0EA5E9] transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm text-[#64748B] hover:text-white transition-colors hidden md:block">Log in</button>
            <button className="text-sm px-4 py-2 bg-[#0EA5E9] text-[#0A0F1C] font-medium hover:bg-[#38BDF8] transition-colors">Sign Up</button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center bp-grid overflow-hidden">
        <div className="absolute top-20 right-20 w-72 h-72 bg-[#0EA5E9]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-[#0EA5E9]/3 rounded-full blur-[80px]" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="rv">
                <span className="inline-flex items-center gap-3 text-xs tracking-[.25em] uppercase text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                  <span className="w-8 h-px bg-[#0EA5E9]" /> AEC Platform v2.0
                </span>
              </div>
              <h1 className="rv rv-d1 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light leading-[.92] tracking-tight text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                Find Your<br /><span className="text-[#0EA5E9]">Next Build</span>
              </h1>
              <p className="rv rv-d2 text-lg text-[#64748B] leading-relaxed max-w-xl">
                Where architects, contractors, and engineers discover projects and connect with opportunities across the AEC industry.
              </p>

              {/* Search */}
              <div className="rv rv-d3 border border-[#1E293B] bg-[#0F172A] p-2 glow">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#1E293B]">
                    <span className="text-[#0EA5E9] text-xs" style={{ fontFamily: "var(--font-ibm-mono)" }}>&gt;</span>
                    <select className="w-full bg-transparent text-sm text-[#94A3B8] focus:outline-none appearance-none cursor-pointer">
                      <option>All Roles</option><option>Architect</option><option>Contractor</option><option>Engineer</option>
                    </select>
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#1E293B]">
                    <span className="text-[#0EA5E9] text-xs" style={{ fontFamily: "var(--font-ibm-mono)" }}>&gt;</span>
                    <input type="text" placeholder="Location" className="w-full bg-transparent text-sm text-[#94A3B8] placeholder:text-[#475569] focus:outline-none" />
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3">
                    <span className="text-[#0EA5E9] text-xs" style={{ fontFamily: "var(--font-ibm-mono)" }}>&gt;</span>
                    <input type="text" placeholder="Keywords" className="w-full bg-transparent text-sm text-[#94A3B8] placeholder:text-[#475569] focus:outline-none" />
                  </div>
                  <button className="px-8 py-3 bg-[#0EA5E9] text-[#0A0F1C] text-sm font-semibold hover:bg-[#38BDF8] transition-colors flex-shrink-0">
                    Search
                  </button>
                </div>
              </div>

              <div className="rv rv-d4 flex items-center gap-6 text-sm text-[#475569]" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full animate-pulse" />500+ active</span>
                <span className="text-[#1E293B]">|</span>
                <span>Free to browse</span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative">
                <div className="aspect-[4/5] relative border border-[#1E293B] overflow-hidden glow">
                  <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=750&fit=crop&crop=bottom" alt="Architecture" fill className="object-cover opacity-70" sizes="400px" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/40 to-transparent" />
                  <div className="absolute inset-0 mix-blend-color bg-[#0A1628]/50" />
                  {/* Scan lines effect */}
                  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(14,165,233,.3) 2px, rgba(14,165,233,.3) 3px)", backgroundSize: "100% 4px" }} />
                  <div className="absolute bottom-0 inset-x-0 p-6 space-y-3">
                    <div className="text-xs text-[#0EA5E9] tracking-[.2em] uppercase" style={{ fontFamily: "var(--font-ibm-mono)" }}>Latest Project</div>
                    <div className="text-white text-lg font-medium">Downtown Mixed-Use Tower</div>
                    <div className="text-[#64748B] text-sm">Meridian Development &middot; Austin, TX</div>
                  </div>
                </div>
                {/* Corner brackets */}
                <div className="absolute -top-2 -left-2 w-5 h-5 border-l border-t border-[#0EA5E9]" />
                <div className="absolute -bottom-2 -right-2 w-5 h-5 border-r border-b border-[#0EA5E9]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section ref={catRef} className="py-24 lg:py-32 border-t border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="rv text-xs tracking-[.25em] uppercase text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>// Disciplines</span>
              <h2 className="rv rv-d1 text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>Browse by Discipline</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Architecture", count: "180+", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop", desc: "Commercial, residential, and public architecture projects from top firms nationwide." },
              { title: "Engineering", count: "210+", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop", desc: "Structural, civil, MEP, and environmental engineering opportunities across all sectors." },
              { title: "Contracting", count: "150+", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", desc: "General contracting, specialty trades, and construction management roles on active builds." },
            ].map((cat, i) => (
              <div key={cat.title} className={`rv rv-d${i + 1} group relative border border-[#1E293B] bg-[#0F172A] overflow-hidden hover:border-[#0EA5E9]/40 transition-all duration-500 cursor-pointer`}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover opacity-50 group-hover:opacity-70 transition-all duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
                  <div className="absolute inset-0 mix-blend-color bg-[#0A1628]/40" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-medium text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>{cat.title}</h3>
                    <span className="text-xs text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>{cat.count}</span>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-[#475569] group-hover:text-[#0EA5E9] transition-colors" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                    <span>explore</span><span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section ref={howRef} className="py-24 lg:py-32 border-t border-[#1E293B] bp-grid">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="rv text-xs tracking-[.25em] uppercase text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>// Process</span>
            <h2 className="rv rv-d1 text-4xl lg:text-5xl font-light text-white mt-3" style={{ fontFamily: "var(--font-ibm-mono)" }}>How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Create Profile", desc: "Set up your professional profile with skills, certifications, and project history." },
              { n: "02", title: "Discover Projects", desc: "Browse and filter active projects by discipline, location, budget, and timeline." },
              { n: "03", title: "Connect & Build", desc: "Submit proposals, connect with project owners, and start building." },
            ].map((s, i) => (
              <div key={s.n} className={`rv rv-d${i + 1} relative p-8 border border-[#1E293B] bg-[#0F172A]/50`}>
                <div className="text-5xl font-light text-[#0EA5E9]/15 mb-6" style={{ fontFamily: "var(--font-ibm-mono)" }}>{s.n}</div>
                <h3 className="text-lg text-white font-medium mb-3" style={{ fontFamily: "var(--font-ibm-mono)" }}>{s.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{s.desc}</p>
                <div className="absolute top-0 left-0 w-0 h-px bg-[#0EA5E9] transition-all duration-700 group-hover:w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="py-20 border-t border-b border-[#1E293B] bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: "+", label: "Projects Posted" },
              { value: 200, suffix: "+", label: "Companies" },
              { value: 1000, suffix: "+", label: "Professionals" },
              { value: 98, suffix: "%", label: "Satisfaction" },
            ].map((s, i) => {
              const c = useCountUp(s.value, statsVis);
              return (
                <div key={s.label} className="text-center" style={{ opacity: statsVis ? 1 : 0, transform: statsVis ? "none" : "translateY(20px)", transition: `all .6s ease-out ${i * .15}s` }}>
                  <div className="text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>
                    {c.toLocaleString()}<span className="text-[#0EA5E9]">{s.suffix}</span>
                  </div>
                  <div className="text-xs text-[#475569] tracking-[.15em] uppercase mt-2" style={{ fontFamily: "var(--font-ibm-mono)" }}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ══ */}
      <section ref={projRef} className="py-24 lg:py-32 border-b border-[#1E293B]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="rv text-xs tracking-[.25em] uppercase text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>// Opportunities</span>
              <h2 className="rv rv-d1 text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}>Featured Projects</h2>
            </div>
            <a href="#" className="rv rv-d2 text-sm text-[#0EA5E9] hover:text-[#38BDF8] transition-colors" style={{ fontFamily: "var(--font-ibm-mono)" }}>view all &rarr;</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Downtown Mixed-Use Tower", co: "Meridian Dev Group", loc: "Austin, TX", tag: "ARCH", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", time: "2d ago" },
              { title: "Highway 101 Bridge Rehab", co: "Pacific Infrastructure", loc: "San Jose, CA", tag: "ENG", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop", time: "3d ago" },
              { title: "Lakefront Residential", co: "Harborview Builders", loc: "Chicago, IL", tag: "GC", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop", time: "1d ago" },
              { title: "Water Treatment Upgrade", co: "ClearFlow Engineering", loc: "Denver, CO", tag: "ENG", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", time: "4d ago" },
              { title: "Corporate Campus Expansion", co: "Nexus Architecture", loc: "Nashville, TN", tag: "ARCH", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", time: "1d ago" },
              { title: "Stadium Renovation II", co: "Ironclad Construction", loc: "Phoenix, AZ", tag: "GC", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop", time: "5d ago" },
            ].map((p, i) => (
              <div key={p.title} className={`rv rv-d${Math.min(i + 1, 4)} group border border-[#1E293B] bg-[#0F172A] overflow-hidden hover:border-[#0EA5E9]/30 transition-all duration-500 cursor-pointer`}>
                <div className="relative h-40 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent" />
                  <div className="absolute inset-0 mix-blend-color bg-[#0A1628]/30" />
                  <div className="absolute top-3 left-3 text-[10px] tracking-[.2em] px-2 py-1 border border-[#0EA5E9]/30 text-[#0EA5E9] bg-[#0A0F1C]/60 backdrop-blur-sm" style={{ fontFamily: "var(--font-ibm-mono)" }}>{p.tag}</div>
                  <div className="absolute top-3 right-3 text-[10px] text-[#64748B] bg-[#0A0F1C]/60 backdrop-blur-sm px-2 py-1" style={{ fontFamily: "var(--font-ibm-mono)" }}>{p.time}</div>
                </div>
                <div className="p-5">
                  <h3 className="text-white font-medium mb-1 group-hover:text-[#0EA5E9] transition-colors">{p.title}</h3>
                  <p className="text-sm text-[#64748B] mb-3">{p.co}</p>
                  <div className="text-xs text-[#475569]" style={{ fontFamily: "var(--font-ibm-mono)" }}>&gt; {p.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section ref={testRef} className="py-24 lg:py-32 border-b border-[#1E293B] bp-grid">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="rv text-xs tracking-[.25em] uppercase text-[#0EA5E9]" style={{ fontFamily: "var(--font-ibm-mono)" }}>// Testimonials</span>
            <h2 className="rv rv-d1 text-4xl lg:text-5xl font-light text-white mt-3" style={{ fontFamily: "var(--font-ibm-mono)" }}>Trusted by Pros</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "Jasace completely changed how I find projects. Within two weeks, I landed a $2M commercial build.", name: "Marcus Chen", role: "General Contractor", co: "Chen Construction LLC", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
              { q: "The quality of projects on here is unmatched. No more sifting through junk — every listing is vetted.", name: "Sarah Okonkwo", role: "Principal Architect", co: "Okonkwo + Partners", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face" },
              { q: "As a structural engineer, I was skeptical. But the filtering tools and direct connections make this a no-brainer.", name: "David Reeves", role: "Structural Engineer", co: "Reeves Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
            ].map((t, i) => (
              <div key={t.name} className={`rv rv-d${i + 1} border border-[#1E293B] bg-[#0F172A] p-8`}>
                <div className="text-[#0EA5E9]/30 text-4xl mb-4" style={{ fontFamily: "var(--font-ibm-mono)" }}>&ldquo;</div>
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, j) => <span key={j} className="text-[#0EA5E9] text-xs">&#9733;</span>)}</div>
                <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">{t.q}</p>
                <div className="border-t border-[#1E293B] pt-5 flex items-center gap-3">
                  <Image src={t.img} alt={t.name} width={36} height={36} className="rounded-full" />
                  <div>
                    <div className="text-sm text-white font-medium">{t.name}</div>
                    <div className="text-xs text-[#475569]">{t.role}, {t.co}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="py-24 lg:py-32 bp-grid relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0F1C] via-transparent to-[#0A0F1C]" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="rv text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6" style={{ fontFamily: "var(--font-ibm-mono)" }}>
            Ready to Find Your<br /><span className="text-[#0EA5E9]">Next Project?</span>
          </h2>
          <p className="rv rv-d1 text-lg text-[#64748B] max-w-xl mx-auto mb-10">Join thousands of AEC professionals already using Jasace to discover opportunities.</p>
          <div className="rv rv-d2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-[#0EA5E9] text-[#0A0F1C] text-sm font-semibold hover:bg-[#38BDF8] transition-colors w-full sm:w-auto">Get Started Free</button>
            <button className="px-8 py-4 border border-[#1E293B] text-[#94A3B8] text-sm font-semibold hover:border-[#0EA5E9]/50 hover:text-white transition-all w-full sm:w-auto">Post a Project</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="border-t border-[#1E293B] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-[#1E293B]">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xl text-white" style={{ fontFamily: "var(--font-ibm-mono)" }}><span className="text-[#0EA5E9]">J</span>asace<span className="text-[#0EA5E9]">_</span></span>
              <p className="text-sm text-[#475569] max-w-xs">Connecting architects, contractors, and engineers with the right projects.</p>
              <div className="flex gap-2 pt-2">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-[#0F172A] border border-[#1E293B] px-4 py-2.5 text-sm text-[#94A3B8] placeholder:text-[#334155] focus:outline-none focus:border-[#0EA5E9]/50" />
                <button className="px-5 py-2.5 bg-[#0EA5E9] text-[#0A0F1C] text-sm font-medium">Sub</button>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries({ Platform: ["Find Projects", "Post a Project", "Pricing", "Enterprise"], Company: ["About", "Careers", "Blog", "Press"], Resources: ["Help Center", "API Docs", "Community", "Partners"], Legal: ["Privacy", "Terms", "Cookies", "Licenses"] }).map(([sec, links]) => (
                <div key={sec}>
                  <div className="text-xs tracking-[.15em] uppercase text-[#475569] mb-4" style={{ fontFamily: "var(--font-ibm-mono)" }}>{sec}</div>
                  <ul className="space-y-2.5">{links.map((l) => <li key={l}><a href="#" className="text-sm text-[#64748B] hover:text-[#0EA5E9] transition-colors">{l}</a></li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 text-xs text-[#334155]" style={{ fontFamily: "var(--font-ibm-mono)" }}>&copy; 2026 Jasace. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
