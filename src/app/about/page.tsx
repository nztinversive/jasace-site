import Image from "next/image";
import Link from "next/link";
import { leadership, awards, milestones } from "@/data/team";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About — Jasace AEC",
  description: "Meet the team behind Jasace. 25+ years of architecture, construction, and engineering excellence.",
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
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=800&fit=crop"
            alt="Jasace office"
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
              Built on <span className="italic font-medium">Purpose</span>
            </h1>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 lg:py-28 bg-stone-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-6">
                <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight">
                  Founded in 2001,<br /><span className="italic font-medium">rooted in excellence</span>
                </h2>
                <p className="text-stone-500 leading-relaxed">
                  Jasace began as a three-person architecture studio in Austin, Texas. Our founder, James Acevedo, believed that the best buildings come from teams that think across disciplines — not in silos.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  Over 25 years, that vision grew into a full-service AEC consulting firm with 40+ professionals, two offices, and over 500 completed projects. We added construction management in 2010 and engineering in 2006, but the philosophy never changed: listen deeply, design thoughtfully, build with integrity.
                </p>
                <p className="text-stone-500 leading-relaxed">
                  Today, Jasace serves clients ranging from municipal agencies to Fortune 500 companies. We remain committed to the boutique approach that built our reputation — every client gets our senior team&apos;s attention, every project gets our full commitment.
                </p>
              </div>

              {/* Timeline */}
              <div className="space-y-0">
                <h3 className="text-xs font-semibold tracking-[0.15em] uppercase text-terra mb-8">Milestones</h3>
                {milestones.map((m, i) => (
                  <div key={i} className="flex gap-6 pb-6 relative">
                    <div className="flex flex-col items-center">
                      <div className="w-2.5 h-2.5 bg-terra rounded-full flex-shrink-0 mt-1.5" />
                      {i < milestones.length - 1 && <div className="w-px flex-1 bg-stone-200 mt-1" />}
                    </div>
                    <div className="pb-2">
                      <div className="text-xs font-semibold text-terra tracking-wider">{m.year}</div>
                      <div className="text-sm text-stone-600 mt-1">{m.event}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 lg:py-28 bg-stone-100">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-16 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
                <span className="w-8 h-px bg-terra" />
                Leadership
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-light tracking-tight">
                The People Behind <span className="italic font-medium">the Work</span>
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {leadership.map((person) => (
                <div key={person.name} className="group">
                  <div className="aspect-[4/5] relative overflow-hidden mb-5">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/30 to-transparent" />
                  </div>
                  <h3 className="font-display text-xl font-medium tracking-tight">{person.name}</h3>
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
                Awards & <span className="italic font-medium">Honors</span>
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
        <section className="py-20 lg:py-24 bg-stone-50 text-center">
          <div className="max-w-2xl mx-auto px-6 space-y-6">
            <h2 className="font-display text-3xl lg:text-4xl font-light tracking-tight">
              Want to Work <span className="italic font-medium">With Us?</span>
            </h2>
            <p className="text-stone-500">We&apos;re always looking for talented people and exciting projects.</p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/contact" className="px-8 py-4 bg-stone-900 text-stone-50 text-sm font-semibold hover:bg-terra transition-colors">
                Start a Project
              </Link>
              <Link href="/blog" className="px-8 py-4 border border-stone-300 text-stone-700 text-sm font-semibold hover:border-terra hover:text-terra transition-colors">
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
