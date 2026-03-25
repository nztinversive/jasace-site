import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Services — Jasace AEC",
  description: "Architecture, construction, and engineering services from a firm that integrates all three disciplines.",
};

const services = [
  {
    id: "architecture",
    title: "Architecture",
    subtitle: "Design Excellence",
    description: "From concept through completion, we create spaces that inspire. Our architectural practice spans commercial, residential, and public projects with a focus on contextual design and lasting impact.",
    details: [
      "We believe great architecture starts with listening. Every project begins with a deep understanding of the client's needs, the site's context, and the community's aspirations.",
      "Our design process integrates engineering and construction expertise from day one — eliminating the costly surprises that come from designing in isolation. The result is architecture that is not only beautiful but buildable, sustainable, and enduring.",
    ],
    capabilities: ["Master Planning", "Commercial Design", "Residential Architecture", "Adaptive Reuse", "Interior Design", "Historic Preservation", "Sustainable Design", "Feasibility Studies"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop",
    stats: [{ label: "Projects", value: "180+" }, { label: "Awards", value: "12" }, { label: "LEED Certified", value: "45+" }],
  },
  {
    id: "construction",
    title: "Construction",
    subtitle: "Delivered with Integrity",
    description: "Construction management that keeps your project on time, on budget, and built to the highest standards. We bring decades of field experience to every build.",
    details: [
      "Our construction team doesn't just manage schedules and budgets — they solve problems before they happen. With deep field experience and a collaborative approach, we ensure that the design intent is preserved from groundbreaking to ribbon-cutting.",
      "We leverage 4D construction sequencing, prefabrication strategies, and real-time project dashboards to give our clients full visibility into their project's progress.",
    ],
    capabilities: ["General Contracting", "Construction Management", "Cost Estimation", "Scheduling", "Quality Assurance", "Safety Management", "Prefabrication", "Commissioning"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    stats: [{ label: "Projects", value: "150+" }, { label: "On-time Rate", value: "96%" }, { label: "Safety Record", value: "Zero LTI" }],
  },
  {
    id: "engineering",
    title: "Engineering",
    subtitle: "Precision & Performance",
    description: "Structural, civil, and MEP engineering solutions that perform beautifully. We bring technical rigor and creative problem-solving to every engineering challenge.",
    details: [
      "Engineering is the backbone of every great building and infrastructure project. Our engineers work side-by-side with architects and construction managers, ensuring that structural systems, building services, and site work are coordinated seamlessly.",
      "From seismic retrofit to cutting-edge MEP design, we combine analytical rigor with practical construction knowledge — because the best engineering solution is one that can actually be built.",
    ],
    capabilities: ["Structural Engineering", "Civil Engineering", "MEP Design", "Seismic Retrofit", "Environmental Engineering", "Geotechnical", "Energy Modeling", "Commissioning"],
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&h=800&fit=crop",
    stats: [{ label: "Projects", value: "210+" }, { label: "PE Licensed", value: "14" }, { label: "Specialties", value: "8" }],
  },
];

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop"
            alt="Architecture detail"
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
              What We Do
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mt-4">
              Three Disciplines, <span className="italic font-medium">One Vision</span>
            </h1>
            <p className="text-white/50 mt-4 max-w-lg">Integrated architecture, construction, and engineering under one roof.</p>
          </div>
        </section>

        {/* Service Sections */}
        {services.map((svc, i) => (
          <section key={svc.id} id={svc.id} className={`py-20 lg:py-28 ${i % 2 === 0 ? "bg-stone-50" : "bg-stone-100"}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image */}
                <div className="relative" style={{ direction: "ltr" }}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-terra hidden lg:block" />
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-stone-900 flex items-center justify-center text-stone-50 font-display text-lg font-semibold">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  {/* Stats row */}
                  <div className="flex gap-6 mt-6">
                    {svc.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-2xl font-light text-stone-900">{s.value}</div>
                        <div className="text-xs text-stone-500 tracking-wider uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6" style={{ direction: "ltr" }}>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-terra">{svc.subtitle}</span>
                  <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight">{svc.title}</h2>
                  <p className="text-stone-600 leading-relaxed text-lg">{svc.description}</p>
                  {svc.details.map((p, j) => (
                    <p key={j} className="text-stone-500 leading-relaxed">{p}</p>
                  ))}
                  <div className="pt-4">
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-400 mb-4">Capabilities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {svc.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-sm text-stone-600">
                          <span className="w-1 h-1 bg-terra rounded-full flex-shrink-0" />
                          {cap}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 hover:text-terra transition-colors group">
                      Discuss a {svc.title} Project
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-stone-900 bg-grid-dark grain relative text-center">
          <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
            <h2 className="font-display text-3xl lg:text-4xl font-light text-stone-50 tracking-tight">
              Ready to Start <span className="italic font-medium text-terra">Your Project?</span>
            </h2>
            <p className="text-stone-400">Tell us about your vision and we&apos;ll show you how our integrated approach delivers better results.</p>
            <Link href="/contact" className="inline-block px-8 py-4 bg-terra text-stone-50 text-sm font-semibold hover:bg-terra-light transition-colors">
              Get in Touch
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
