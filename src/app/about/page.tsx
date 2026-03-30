import Image from "next/image";
import Link from "next/link";
import { leadership, awards, milestones } from "@/data/team";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About — Jasace ACE",
  description: "The story behind Jasace. 25+ years of architecture, construction, and engineering consulting.",
};

export default function AboutPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&h=800&fit=crop"
            alt="Architect reviewing blueprints on site"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/40 to-stone-900/20" />
          <div className="absolute inset-0 grain" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Our Story
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mt-4">
              Built on <span className="text-gradient font-bold">PURPOSE</span>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 lg:py-28 bg-stone-900 bg-grid-dark relative overflow-hidden">
          <div className="absolute top-1/3 right-0 w-72 h-72 rounded-full bg-terra/[0.03] blur-[80px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight text-stone-50">
                  Founded in Las Vegas,<br /><span className="text-gradient font-bold">BUILT ON RESULTS</span>
                </h2>
                <p className="text-stone-500 leading-relaxed">
                  Jasace was founded by Jason Reese in Las Vegas, Nevada — built on the belief that the best projects come from people who think across disciplines, not in silos.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  With a background in business development and operations management in the engineering industry, Jason brings a unique perspective to ACE consulting — combining technical understanding with strong project delivery and client relationships. A UNLV graduate with a BBA in International Business Management, he built Jasace into a trusted name across the Southwest.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  Today, Jasace delivers the expertise of a full-service firm with the personal care of a dedicated partner. Every client works directly with Jason — no hand-offs, no layers, no surprises.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-8 relative z-10">Milestones</h3>
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 pb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 bg-terra rounded-full flex-shrink-0 mt-1.5" />
                      {i < milestones.length - 1 && <div className="w-px flex-1 bg-stone-700 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-xs font-semibold text-terra tracking-wider">{m.year}</div>
                      <div className="text-sm text-stone-400 mt-1">{m.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team — 2 person layout */}
        <section className="py-20 lg:py-28 bg-stone-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
                <span className="w-8 h-px bg-terra" />
                Who We Are
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight text-stone-50">
                Meet the <span className="text-gradient font-bold">FOUNDER</span>
              </h2>
              <p className="text-stone-500 leading-relaxed">
                When you work with Jasace, you work directly with Jason. No layers, no hand-offs — just dedicated expertise and a trusted network of specialist collaborators.
              </p>
            </div>
            <div className="grid sm:grid-cols-1 gap-12 max-w-md">
              {leadership.map((person) => (
                <div key={person.name} className="group">
                  <div className="aspect-[4/5] relative overflow-hidden mb-5 bg-stone-900">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-stone-50">{person.name}</h3>
                  <p className="text-xs text-terra font-semibold tracking-wider uppercase mt-1">{person.title}</p>
                  <p className="text-sm text-stone-500 leading-relaxed mt-3">{person.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Awards */}
        <section className="py-20 lg:py-28 bg-stone-900 bg-grid-dark grain relative">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/50 to-transparent" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl mb-12 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
                <span className="w-8 h-px bg-terra" />
                Recognition
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-light text-stone-50 tracking-tight">
                Awards & <span className="text-gradient font-bold">HONORS</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {awards.map((a, i) => (
                <div key={i} className="border border-stone-700/50 p-6 hover:border-terra/30 transition-colors">
                  <div className="text-xs text-terra font-semibold tracking-wider">{a.year}</div>
                  <h3 className="text-stone-50 font-medium mt-2">{a.title}</h3>
                  <p className="text-sm text-stone-500 mt-1">{a.project}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-stone-900 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dark" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-terra/[0.04] blur-[120px] pointer-events-none" />
          <div className="max-w-2xl mx-auto px-6 space-y-6 relative z-10">
            <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight text-stone-50">
              Want to Work <span className="text-gradient font-bold">WITH US?</span>
            </h2>
            <p className="text-stone-400">We take on a limited number of projects each year so we can give each one our full attention.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-terra text-stone-50 text-sm font-semibold hover:bg-terra-light transition-colors w-full sm:w-auto text-center">
                Start a Project
              </Link>
              <Link href="/blog" className="px-8 py-4 border border-stone-700 text-stone-300 text-sm font-semibold hover:border-terra/40 hover:text-stone-50 transition-all w-full sm:w-auto text-center">
                Read Our Insights
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AboutClient />
    </>
  );
}
