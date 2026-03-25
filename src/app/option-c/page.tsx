"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/*
 * OPTION C — "Earth & Glass"
 * Organic warmth meets modern clarity.
 * Soft greens, natural textures, forest tones.
 * Feels sustainable, forward-thinking, grounded.
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

function StatItemC({ value, suffix, label, visible, delay }: { value: number; suffix: string; label: string; visible: boolean; delay: number }) {
  const c = useCountUp(value, visible);
  return (
    <div className="text-center" style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: `all .6s ease-out ${delay}s` }}>
      <div className="text-4xl lg:text-5xl font-light text-white" style={{ fontFamily: "var(--font-fraunces)" }}>{c.toLocaleString()}<span className="text-[#8BC49E]">{suffix}</span></div>
      <div className="text-sm text-[#8BC49E] mt-1">{label}</div>
    </div>
  );
}

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.querySelectorAll(".rv").forEach((c) => c.classList.add("vis")); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

export default function OptionC() {
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

  const green = "#2D5A3D";
  const greenLight = "#4A8B5C";
  const cream = "#FAFDF6";
  const warmBg = "#F3F0E7";
  const brownText = "#3D3529";

  return (
    <div className="min-h-screen" style={{ fontFamily: "var(--font-outfit), system-ui, sans-serif", backgroundColor: cream, color: brownText }}>
      <style>{`
        .rv { opacity:0; transform:translateY(24px); transition:opacity .7s cubic-bezier(.22,1,.36,1),transform .7s cubic-bezier(.22,1,.36,1); }
        .rv.vis { opacity:1; transform:translateY(0); }
        .rv-d1{transition-delay:.1s}.rv-d2{transition-delay:.2s}.rv-d3{transition-delay:.3s}.rv-d4{transition-delay:.4s}
        .organic-bg { background-image: radial-gradient(circle at 20% 80%, rgba(45,90,61,.04) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(45,90,61,.03) 0%, transparent 50%); }
      `}</style>

      {/* ══ NAVBAR ══ */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-[#FAFDF6]/80 backdrop-blur-lg border-b border-[#E5E0D5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <span className="text-2xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)", color: brownText }}>
            <span style={{ color: green }}>J</span>asace
          </span>
          <div className="hidden md:flex items-center gap-9 text-sm" style={{ color: "#8B8579" }}>
            {["Find Projects", "How It Works", "About", "Contact"].map((l) => (
              <a key={l} href="#" className="hover:opacity-70 transition-opacity relative group">
                {l}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full" style={{ backgroundColor: green }} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="text-sm hidden md:block" style={{ color: "#8B8579" }}>Log in</button>
            <button className="text-sm px-5 py-2 text-white rounded-full hover:opacity-90 transition-opacity" style={{ backgroundColor: green }}>Sign Up</button>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden organic-bg">
        {/* Organic shapes */}
        <div className="absolute top-40 -right-20 w-96 h-96 rounded-full opacity-[.04]" style={{ backgroundColor: green }} />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full opacity-[.03]" style={{ backgroundColor: green }} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="rv">
                <span className="inline-flex items-center gap-2 text-xs font-medium tracking-[.2em] uppercase" style={{ color: green }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M12 3L3 10l9 7 9-7-9-7z"/><path d="M3 10v7l9 7 9-7v-7"/></svg>
                  AEC Platform
                </span>
              </div>
              <h1 className="rv rv-d1 text-5xl sm:text-6xl lg:text-7xl leading-[.95] tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>
                Find Your<br /><span className="italic" style={{ color: green }}>Next Build</span>
              </h1>
              <p className="rv rv-d2 text-lg leading-relaxed max-w-lg" style={{ color: "#8B8579" }}>
                Where architects, contractors, and engineers discover projects and connect with opportunities across the AEC industry.
              </p>

              {/* Search */}
              <div className="rv rv-d3 bg-white rounded-2xl border border-[#E5E0D5] shadow-sm p-2">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#E5E0D5]">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: greenLight }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" /></svg>
                    <select className="w-full bg-transparent text-sm focus:outline-none appearance-none cursor-pointer" style={{ color: "#8B8579" }}>
                      <option>All Roles</option><option>Architect</option><option>Contractor</option><option>Engineer</option>
                    </select>
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3 border-b sm:border-b-0 sm:border-r border-[#E5E0D5]">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: greenLight }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    <input type="text" placeholder="Location" className="w-full bg-transparent text-sm placeholder:text-[#C4BFB5] focus:outline-none" style={{ color: brownText }} />
                  </div>
                  <div className="flex-1 flex items-center gap-3 px-4 py-3">
                    <svg className="w-4 h-4 flex-shrink-0" style={{ color: greenLight }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
                    <input type="text" placeholder="Keywords" className="w-full bg-transparent text-sm placeholder:text-[#C4BFB5] focus:outline-none" style={{ color: brownText }} />
                  </div>
                  <button className="px-7 py-3 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity flex-shrink-0" style={{ backgroundColor: green }}>Search</button>
                </div>
              </div>

              <div className="rv rv-d4 flex items-center gap-5 text-sm" style={{ color: "#8B8579" }}>
                <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full" style={{ backgroundColor: green }} />500+ active projects</span>
                <span>·</span>
                <span>Free to browse</span>
              </div>
            </div>

            {/* Hero Images — stacked organic composition */}
            <div className="hidden lg:block relative h-[560px]">
              <div className="absolute top-0 right-0 w-72 h-80 rounded-3xl overflow-hidden shadow-xl">
                <Image src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&h=600&fit=crop" alt="Architecture" fill className="object-cover" sizes="300px" priority />
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-72 rounded-3xl overflow-hidden shadow-xl border-4 border-[#FAFDF6]">
                <Image src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=500&fit=crop" alt="Construction" fill className="object-cover" sizes="260px" />
              </div>
              {/* Floating badge */}
              <div className="absolute bottom-24 right-8 bg-white rounded-2xl shadow-lg border border-[#E5E0D5] p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: green }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                </div>
                <div>
                  <div className="text-sm font-semibold">1,200+</div>
                  <div className="text-xs" style={{ color: "#8B8579" }}>Pros joined</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CATEGORIES ══ */}
      <section ref={catRef} className="py-24 lg:py-32" style={{ backgroundColor: warmBg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="rv text-xs font-medium tracking-[.2em] uppercase" style={{ color: green }}>Disciplines</span>
            <h2 className="rv rv-d1 text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>Browse by <span className="italic" style={{ color: green }}>Discipline</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Architecture", count: "180+", img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&h=400&fit=crop", desc: "Commercial, residential, and public architecture projects from top firms." },
              { title: "Engineering", count: "210+", img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop", desc: "Structural, civil, MEP, and environmental engineering opportunities." },
              { title: "Contracting", count: "150+", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", desc: "General contracting, specialty trades, and construction management." },
            ].map((cat, i) => (
              <div key={cat.title} className={`rv rv-d${i + 1} group bg-white rounded-2xl overflow-hidden border border-[#E5E0D5] hover:shadow-lg transition-all duration-500 cursor-pointer`}>
                <div className="relative h-48 overflow-hidden">
                  <Image src={cat.img} alt={cat.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-xs font-medium px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full">{cat.count} projects</span>
                </div>
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold" style={{ fontFamily: "var(--font-fraunces)" }}>{cat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#8B8579" }}>{cat.desc}</p>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all" style={{ color: green }}>
                    <span>Explore</span><span>&rarr;</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section ref={howRef} className="py-24 lg:py-32 organic-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 space-y-3">
            <span className="rv text-xs font-medium tracking-[.2em] uppercase" style={{ color: green }}>Process</span>
            <h2 className="rv rv-d1 text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>How It <span className="italic" style={{ color: green }}>Works</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: "01", title: "Create Your Profile", desc: "Set up your professional profile with skills, certifications, and project history.", icon: "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" },
              { n: "02", title: "Discover Projects", desc: "Browse and filter active projects by discipline, location, budget, and timeline.", icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" },
              { n: "03", title: "Connect & Build", desc: "Submit proposals, connect with project owners, and start building.", icon: "M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.815a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.25 8.81" },
            ].map((s, i) => (
              <div key={s.n} className={`rv rv-d${i + 1} text-center p-8`}>
                <div className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: `${green}15` }}>
                  <svg className="w-7 h-7" style={{ color: green }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                </div>
                <div className="text-xs font-semibold tracking-[.15em] uppercase mb-3" style={{ color: green }}>Step {s.n}</div>
                <h3 className="text-xl font-semibold mb-3" style={{ fontFamily: "var(--font-fraunces)" }}>{s.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#8B8579" }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section ref={statsRef} className="py-20" style={{ backgroundColor: green }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: 500, suffix: "+", label: "Projects" },
              { value: 200, suffix: "+", label: "Companies" },
              { value: 1000, suffix: "+", label: "Professionals" },
              { value: 98, suffix: "%", label: "Satisfaction" },
            ].map((s, i) => (
              <StatItemC key={s.label} value={s.value} suffix={s.suffix} label={s.label} visible={statsVis} delay={i * 0.15} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PROJECTS ══ */}
      <section ref={projRef} className="py-24 lg:py-32 organic-bg">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div className="space-y-3">
              <span className="rv text-xs font-medium tracking-[.2em] uppercase" style={{ color: green }}>Opportunities</span>
              <h2 className="rv rv-d1 text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>Featured <span className="italic" style={{ color: green }}>Projects</span></h2>
            </div>
            <a href="#" className="rv rv-d2 text-sm font-medium hover:opacity-70 transition-opacity" style={{ color: green }}>View all &rarr;</a>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Downtown Mixed-Use Tower", co: "Meridian Dev Group", loc: "Austin, TX", tag: "Architecture", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop", time: "2d ago" },
              { title: "Highway 101 Bridge Rehab", co: "Pacific Infrastructure", loc: "San Jose, CA", tag: "Engineering", img: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop", time: "3d ago" },
              { title: "Lakefront Residential", co: "Harborview Builders", loc: "Chicago, IL", tag: "Contracting", img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=400&fit=crop", time: "1d ago" },
              { title: "Water Treatment Upgrade", co: "ClearFlow Engineering", loc: "Denver, CO", tag: "Engineering", img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop", time: "4d ago" },
              { title: "Corporate Campus Expansion", co: "Nexus Architecture", loc: "Nashville, TN", tag: "Architecture", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop", time: "1d ago" },
              { title: "Stadium Renovation II", co: "Ironclad Construction", loc: "Phoenix, AZ", tag: "Contracting", img: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=600&h=400&fit=crop", time: "5d ago" },
            ].map((p, i) => (
              <div key={p.title} className={`rv rv-d${Math.min(i + 1, 4)} group bg-white rounded-2xl overflow-hidden border border-[#E5E0D5] hover:shadow-lg transition-all duration-500 cursor-pointer`}>
                <div className="relative h-40 overflow-hidden">
                  <Image src={p.img} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="33vw" />
                  <span className="absolute top-3 left-3 text-xs font-medium px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full" style={{ color: green }}>{p.tag}</span>
                  <span className="absolute top-3 right-3 text-xs px-2 py-1 bg-black/30 backdrop-blur-sm rounded-full text-white">{p.time}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-1 group-hover:opacity-70 transition-opacity" style={{ fontFamily: "var(--font-fraunces)" }}>{p.title}</h3>
                  <p className="text-sm mb-3" style={{ color: "#8B8579" }}>{p.co}</p>
                  <div className="text-xs flex items-center gap-1.5" style={{ color: "#8B8579" }}>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                    {p.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section ref={testRef} className="py-24 lg:py-32" style={{ backgroundColor: warmBg }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <span className="rv text-xs font-medium tracking-[.2em] uppercase" style={{ color: green }}>Testimonials</span>
            <h2 className="rv rv-d1 text-4xl lg:text-5xl tracking-tight" style={{ fontFamily: "var(--font-fraunces)" }}>Trusted by <span className="italic" style={{ color: green }}>Professionals</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { q: "Jasace completely changed how I find projects. Within two weeks, I landed a $2M commercial build.", name: "Marcus Chen", role: "General Contractor, Chen Construction", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face" },
              { q: "The quality of projects on here is unmatched. No more sifting through junk — every listing is vetted.", name: "Sarah Okonkwo", role: "Principal Architect, Okonkwo + Partners", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&h=80&fit=crop&crop=face" },
              { q: "The filtering tools and direct connections to project owners make this a no-brainer for engineers.", name: "David Reeves", role: "Structural Engineer, Reeves Engineering", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" },
            ].map((t, i) => (
              <div key={t.name} className={`rv rv-d${i + 1} bg-white rounded-2xl border border-[#E5E0D5] p-8`}>
                <div className="flex gap-1 mb-4">{Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: "#D4A843" }} className="text-sm">&#9733;</span>)}</div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#8B8579" }}>&ldquo;{t.q}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-[#E5E0D5] pt-5">
                  <Image src={t.img} alt={t.name} width={40} height={40} className="rounded-full" />
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs" style={{ color: "#8B8579" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section ref={ctaRef} className="py-24 lg:py-32 relative overflow-hidden" style={{ backgroundColor: green }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/3" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="rv text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6" style={{ fontFamily: "var(--font-fraunces)" }}>
            Ready to Find Your<br /><span className="italic text-[#8BC49E]">Next Project?</span>
          </h2>
          <p className="rv rv-d1 text-lg text-[#8BC49E] max-w-xl mx-auto mb-10">Join thousands of AEC professionals already using Jasace.</p>
          <div className="rv rv-d2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-sm font-semibold rounded-full hover:opacity-90 transition-opacity w-full sm:w-auto" style={{ color: green }}>Get Started Free</button>
            <button className="px-8 py-4 border border-white/30 text-white text-sm font-semibold rounded-full hover:bg-white/10 transition-colors w-full sm:w-auto">Post a Project</button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="pt-16 pb-8" style={{ backgroundColor: "#2A2520", color: "#8B8579" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 pb-12 border-b border-[#3D3529]">
            <div className="lg:col-span-4 space-y-4">
              <span className="text-2xl text-white" style={{ fontFamily: "var(--font-fraunces)" }}><span style={{ color: "#4A8B5C" }}>J</span>asace</span>
              <p className="text-sm max-w-xs">Connecting AEC professionals with the right projects. Built for the industry.</p>
              <div className="flex gap-2 pt-2">
                <input type="email" placeholder="your@email.com" className="flex-1 bg-[#3D3529] border border-[#4D4539] rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-[#6B6559] focus:outline-none" />
                <button className="px-5 py-2.5 text-white text-sm font-medium rounded-lg" style={{ backgroundColor: green }}>Subscribe</button>
              </div>
            </div>
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
              {Object.entries({ Platform: ["Find Projects", "Post a Project", "Pricing", "Enterprise"], Company: ["About", "Careers", "Blog", "Press"], Resources: ["Help Center", "API Docs", "Community", "Partners"], Legal: ["Privacy", "Terms", "Cookies", "Licenses"] }).map(([sec, links]) => (
                <div key={sec}>
                  <div className="text-xs tracking-[.15em] uppercase text-[#6B6559] mb-4">{sec}</div>
                  <ul className="space-y-2.5">{links.map((l) => <li key={l}><a href="#" className="text-sm hover:text-white transition-colors">{l}</a></li>)}</ul>
                </div>
              ))}
            </div>
          </div>
          <div className="pt-6 text-xs text-[#4D4539]">&copy; 2026 Jasace. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
