"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/*
 * OPTION D — "Bold Mono"
 * High-contrast brutalist energy.
 * Pure black & white with vivid orange punch.
 * Oversized Syne display type, sharp edges, confident & loud.
 */

function useCountUp(target: number, visible: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let s = 0; const step = target / 125;
    const id = setInterval(() => { s += step; if (s >= target) { setCount(target); clearInterval(id); } else setCount(Math.floor(s)); }, 16);
    return () => clearInterval(id);
  }, [visible, target]);
  return count;
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.querySelectorAll(".rv").forEach((c) => c.classList.add("vis")); }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

function DStatItem({ stat, isVisible, index }: { stat: { value: number; suffix: string; label: string }; isVisible: boolean; index: number }) {
  const c = useCountUp(stat.value, isVisible);
  return (
    <div className="text-center" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(20px)", transition: `all .6s ease-out ${index * .15}s` }}>
      <div className="text-4xl lg:text-6xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>{c.toLocaleString()}{stat.suffix}</div>
      <div className="text-xs font-bold text-white/60 tracking-[.2em] mt-2" style={{ fontFamily: "var(--font-syne)" }}>{stat.label}</div>
    </div>
  );
}

export default function OptionD() {
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
    const el = statsRef.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVis(true); }, { threshold: 0.3 });
    obs.observe(el); return () => obs.disconnect();
  }, []);

  const orange = "#FF4D00";

  return (
    <div className="bg-white text-black min-h-screen" style={{ fontFamily: "var(--font-manrope), system-ui, sans-serif" }}>
      <style>{`
        .rv { opacity:0; transform:translateY(24px); transition:opacity .6s cubic-bezier(.22,1,.36,1),transform .6s cubic-bezier(.22,1,.36,1); }
        .rv.vis { opacity:1; transform:translateY(0); }
        .rv-d1{transition-delay:.1s}.rv-d2{transition-delay:.2s}.rv-d3{transition-delay:.3s}.rv-d4{transition-delay:.4s}
        .stripe-bg { background-image: repeating-linear-gradient(90deg, transparent, transparent 119px, #f0f0f0 119px, #f0f0f0 120px); }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-lg border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-syne)" }}>
            JASACE<span style={{ color: orange }}>.</span>
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold uppercase tracking-wider text-black/50">
            {["Projects", "Process", "About", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:text-black transition-colors">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm font-semibold text-black/50 hover:text-black transition-colors hidden md:block">Log in</button>
            <button className="text-sm font-bold px-5 py-2.5 text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: orange }}>SIGN UP</button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden stripe-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-36 lg:pb-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="rv">
                <span className="inline-block text-xs font-extrabold tracking-[.3em] uppercase px-3 py-1.5 border-2 border-black" style={{ fontFamily: "var(--font-syne)" }}>AEC PLATFORM</span>
              </div>
              <h1 className="rv rv-d1 text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-[.85] tracking-tighter" style={{ fontFamily: "var(--font-syne)" }}>
                FIND<br />YOUR<br /><span style={{ color: orange }}>NEXT<br />BUILD</span>
              </h1>
              <p className="rv rv-d2 text-lg text-black/50 leading-relaxed max-w-md">
                Where architects, contractors, and engineers discover projects and connect with opportunities.
              </p>

              {/* Search */}
              <div className="rv rv-d3 border-2 border-black p-1.5">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 px-4 py-3 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
                    <select className="w-full bg-transparent text-sm font-semibold focus:outline-none appearance-none cursor-pointer">
                      <option>ALL ROLES</option><option>ARCHITECT</option><option>CONTRACTOR</option><option>ENGINEER</option>
                    </select>
                  </div>
                  <div className="flex-1 px-4 py-3 border-b-2 sm:border-b-0 sm:border-r-2 border-black">
                    <input type="text" placeholder="LOCATION" className="w-full bg-transparent text-sm font-semibold placeholder:text-black/30 focus:outline-none" />
                  </div>
                  <div className="flex-1 px-4 py-3">
                    <input type="text" placeholder="KEYWORDS" className="w-full bg-transparent text-sm font-semibold placeholder:text-black/30 focus:outline-none" />
                  </div>
                  <button className="px-8 py-3 text-white text-sm font-extrabold hover:opacity-90 transition-opacity flex-shrink-0" style={{ backgroundColor: orange, fontFamily: "var(--font-syne)" }}>GO</button>
                </div>
              </div>

              <div className="rv rv-d4 flex items-center gap-6 text-sm font-semibold text-black/40 uppercase tracking-wider">
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: orange }} />500+ PROJECTS</span>
                <span className="text-black/20">|</span>
                <span>FREE ACCESS</span>
              </div>
            </div>

            {/* Hero Image — bold, edge-to-edge feel */}
            <div className="hidden lg:block relative">
              <div className="aspect-square relative border-2 border-black overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=700&fit=crop" alt="Architecture" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" sizes="500px" priority />
                <div className="absolute inset-0 mix-blend-multiply" style={{ backgroundColor: `${orange}10` }} />
              </div>
              {/* Offset block */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-black" style={{ backgroundColor: orange }} />
              <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-black bg-black" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section ref={catRef} className="py-24 lg:py-32 border-t-2 border-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="rv text-xs font-extrabold tracking-[.3em] uppercase" style={{ color: orange, fontFamily: "var(--font-syne)" }}>DISCIPLINES</span>
            <h2 className="rv rv-d1 text-5xl lg:text-6xl font-extrabold tracking-tighter mt-3" style={{ fontFamily: "var(--font-syne)" }}>BY DISCIPLINE</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0 border-2 border-black">
            {[
              { title: "ARCHITECTURE", count: "180+", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop", desc: "Commercial, residential, and public architecture projects from top firms." },
              { title: "ENGINEERING", count: "210+", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop", desc: "Structural, civil, MEP, and environmental engineering opportunities." },
              { title: "CONTRACTING", count: "150+", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", desc: "General contracting, specialty trades, and construction management." },
            ].map((cat, i) => (
              <div key={cat.title} className={`rv rv-d${i + 1} group ${i < 2 ? "border-r-2 border-black" : ""} overflow-hidden cursor-pointer`}>
                <div className="relative h-52 overflow-hidden">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute top-4 left-4 text-xs font-extrabold px-2 py-1 bg-white" style={{ fontFamily: "var(--font-syne)" }}>{cat.count}</div>
                </div>
                <div className="p-6 border-t-2 border-black">
                  <h3 className="text-lg font-extrabold tracking-tight mb-2" style={{ fontFamily: "var(--font-syne)" }}>{cat.title}</h3>
                  <p className="text-sm text-black/50 leading-relaxed mb-4">{cat.desc}</p>
                  <div className="text-xs font-extrabold uppercase tracking-wider group-hover:tracking-[.3em] transition-all" style={{ color: orange, fontFamily: "var(--font-syne)" }}>
                    EXPLORE &rarr;
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section ref={howRef} className="py-24 lg:py-32 border-t-2 border-black bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-20">
            <span className="rv text-xs font-extrabold tracking-[.3em] uppercase" style={{ color: orange, fontFamily: "var(--font-syne)" }}>PROCESS</span>
            <h2 className="rv rv-d1 text-5xl lg:text-6xl font-extrabold tracking-tighter mt-3" style={{ fontFamily: "var(--font-syne)" }}>HOW IT WORKS</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-0">
            {[
              { n: "01", title: "PROFILE", desc: "Set up your professional profile with skills, certifications, and project history." },
              { n: "02", title: "DISCOVER", desc: "Browse and filter active projects by discipline, location, budget, and timeline." },
              { n: "03", title: "BUILD", desc: "Submit proposals, connect with project owners, and start building." },
            ].map((s, i) => (
              <div key={s.n} className={`rv rv-d${i + 1} p-8 lg:p-10 ${i < 2 ? "border-r border-white/10" : ""}`}>
                <div className="text-7xl lg:text-8xl font-extrabold leading-none mb-6" style={{ fontFamily: "var(--font-syne)", color: `${orange}30` }}>{s.n}</div>
                <h3 className="text-xl font-extrabold tracking-tight mb-3" style={{ fontFamily: "var(--font-syne)" }}>{s.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="py-20 border-t-2 border-b-2 border-black" style={{ backgroundColor: orange }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: "+", label: "PROJECTS" },
              { value: 200, suffix: "+", label: "COMPANIES" },
              { value: 1000, suffix: "+", label: "PROS" },
              { value: 98, suffix: "%", label: "SATISFACTION" },
            ].map((s, i) => (
              <DStatItem key={s.label} stat={s} isVisible={statsVis} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ══ */}
      <section ref={projRef} className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div>
              <span className="rv text-xs font-extrabold tracking-[.3em] uppercase" style={{ color: orange, fontFamily: "var(--font-syne)" }}>OPPORTUNITIES</span>
              <h2 className="rv rv-d1 text-5xl lg:text-6xl font-extrabold tracking-tighter mt-3" style={{ fontFamily: "var(--font-syne)" }}>FEATURED</h2>
            </div>
            <a href="#" className="rv rv-d2 text-sm font-extrabold uppercase tracking-wider hover:opacity-70 transition-opacity" style={{ color: orange, fontFamily: "var(--font-syne)" }}>VIEW ALL &rarr;</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Downtown Mixed-Use Tower", co: "Meridian Dev Group", loc: "Austin, TX", tag: "ARCH", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", time: "2D" },
              { title: "Highway 101 Bridge Rehab", co: "Pacific Infrastructure", loc: "San Jose, CA", tag: "ENG", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop", time: "3D" },
              { title: "Lakefront Residential", co: "Harborview Builders", loc: "Chicago, IL", tag: "GC", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop", time: "1D" },
              { title: "Water Treatment Upgrade", co: "ClearFlow Engineering", loc: "Denver, CO", tag: "ENG", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", time: "4D" },
              { title: "Corporate Campus", co: "Nexus Architecture", loc: "Nashville, TN", tag: "ARCH", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", time: "1D" },
              { title: "Stadium Renovation II", co: "Ironclad Construction", loc: "Phoenix, AZ", tag: "GC", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop", time: "5D" },
            ].map((p, i) => (
              <div key={p.title} className={`rv rv-d${Math.min(i + 1, 4)} group border-2 border-black overflow-hidden hover:border-[${orange}] transition-colors duration-300 cursor-pointer`}>
                <div className="relative h-44 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" sizes="33vw" />
                  <div className="absolute top-3 left-3 text-[10px] font-extrabold px-2 py-1 bg-white border border-black" style={{ fontFamily: "var(--font-syne)" }}>{p.tag}</div>
                  <div className="absolute top-3 right-3 text-[10px] font-bold px-2 py-1 text-white" style={{ backgroundColor: orange, fontFamily: "var(--font-syne)" }}>{p.time}</div>
                </div>
                <div className="p-5 border-t-2 border-black">
                  <h3 className="font-extrabold tracking-tight mb-1" style={{ fontFamily: "var(--font-syne)" }}>{p.title}</h3>
                  <p className="text-sm text-black/50 mb-2">{p.co}</p>
                  <div className="text-xs font-semibold text-black/40">{p.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section ref={testRef} className="py-24 lg:py-32 border-t-2 border-black bg-[#F5F5F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <span className="rv text-xs font-extrabold tracking-[.3em] uppercase" style={{ color: orange, fontFamily: "var(--font-syne)" }}>TESTIMONIALS</span>
            <h2 className="rv rv-d1 text-5xl lg:text-6xl font-extrabold tracking-tighter mt-3" style={{ fontFamily: "var(--font-syne)" }}>REAL TALK</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "Jasace completely changed how I find projects. Within two weeks, I landed a $2M commercial build.", name: "MARCUS CHEN", role: "General Contractor", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
              { q: "The quality of projects is unmatched. No more sifting through junk — every listing is vetted.", name: "SARAH OKONKWO", role: "Principal Architect", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face" },
              { q: "The filtering tools and direct connections to project owners make this a no-brainer.", name: "DAVID REEVES", role: "Structural Engineer", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
            ].map((t, i) => (
              <div key={t.name} className={`rv rv-d${i + 1} border-2 border-black bg-white p-8`}>
                <div className="text-5xl font-extrabold leading-none mb-4" style={{ color: `${orange}30`, fontFamily: "var(--font-syne)" }}>&ldquo;</div>
                <p className="text-sm text-black/60 leading-relaxed mb-6">{t.q}</p>
                <div className="border-t-2 border-black pt-5 flex items-center gap-3">
                  <Image src={t.img} alt={t.name} width={40} height={40} className="grayscale" style={{ borderRadius: 0 }} />
                  <div>
                    <div className="text-sm font-extrabold" style={{ fontFamily: "var(--font-syne)" }}>{t.name}</div>
                    <div className="text-xs text-black/40">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="py-24 lg:py-32 bg-black text-white border-t-2 border-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64" style={{ backgroundColor: orange, opacity: 0.1 }} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="rv text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-6" style={{ fontFamily: "var(--font-syne)" }}>
            READY TO<br /><span style={{ color: orange }}>BUILD?</span>
          </h2>
          <p className="rv rv-d1 text-lg text-white/40 max-w-xl mx-auto mb-10">Join thousands of AEC professionals on Jasace.</p>
          <div className="rv rv-d2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 text-black text-sm font-extrabold hover:opacity-90 transition-opacity w-full sm:w-auto" style={{ backgroundColor: orange, fontFamily: "var(--font-syne)" }}>GET STARTED FREE</button>
            <button className="px-8 py-4 border-2 border-white/20 text-white/60 text-sm font-extrabold hover:border-white/40 hover:text-white transition-all w-full sm:w-auto" style={{ fontFamily: "var(--font-syne)" }}>POST A PROJECT</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="bg-black text-white/40 border-t-2 border-white/10 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-2xl font-extrabold text-white" style={{ fontFamily: "var(--font-syne)" }}>JASACE<span style={{ color: orange }}>.</span></span>
              <p className="text-sm max-w-xs">Connecting AEC professionals with the right projects.</p>
              <div className="flex gap-0 pt-2">
                <input type="email" placeholder="EMAIL" className="flex-1 bg-white/5 border-2 border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none font-semibold" />
                <button className="px-5 py-2.5 text-black text-sm font-extrabold" style={{ backgroundColor: orange, fontFamily: "var(--font-syne)" }}>GO</button>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries({ Platform: ["Find Projects", "Post a Project", "Pricing", "Enterprise"], Company: ["About", "Careers", "Blog", "Press"], Resources: ["Help Center", "API Docs", "Community", "Partners"], Legal: ["Privacy", "Terms", "Cookies", "Licenses"] }).map(([sec, links]) => (
                <div key={sec}>
                  <div className="text-xs font-extrabold tracking-[.15em] uppercase text-white/20 mb-4" style={{ fontFamily: "var(--font-syne)" }}>{sec}</div>
                  <ul className="space-y-2.5">{links.map((l) => <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 text-xs text-white/20 font-bold" style={{ fontFamily: "var(--font-syne)" }}>&copy; 2026 JASACE. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
