import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export const metadata = {
  title: "Services",
  description: "Architecture, construction, and engineering services from a practice that integrates all three disciplines.",
};

const services = [
  {
    id: "architecture",
    title: "Architecture",
    subtitle: "Design Excellence",
    description: "From concept through completion, we create spaces that inspire. Our architectural practice spans commercial, residential, and public projects with a focus on contextual design and lasting impact.",
    details: [
      "We believe great architecture starts with listening. Every project begins with a deep understanding of the client\u2019s needs, the site\u2019s context, and the community\u2019s aspirations.",
      "Our design process integrates engineering and construction expertise from day one \u2014 eliminating the costly surprises that come from designing in isolation.",
    ],
    capabilities: ["Master Planning", "Commercial Design", "Residential Architecture", "Adaptive Reuse", "Interior Design", "Historic Preservation", "Sustainable Design", "Feasibility Studies"],
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1200&h=800&fit=crop",
    stats: [{ label: "Projects", value: "60+" }, { label: "LEED Certified", value: "12+" }],
  },
  {
    id: "construction",
    title: "Construction",
    subtitle: "Delivered with Integrity",
    description: "Construction management that keeps your project on time, on budget, and built to the highest standards. We bring field experience and a collaborative approach to every build.",
    details: [
      "Our construction management doesn\u2019t just track schedules and budgets \u2014 it solves problems before they happen. With deep field experience, we ensure design intent is preserved from groundbreaking to ribbon-cutting.",
      "We use modern project delivery methods and real-time dashboards to give clients full visibility into their project\u2019s progress.",
    ],
    capabilities: ["Construction Management", "Cost Estimation", "Scheduling", "Quality Assurance", "Safety Management", "Prefabrication", "Commissioning", "Owner\u2019s Rep"],
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=800&fit=crop",
    stats: [{ label: "On-time", value: "98%" }, { label: "Safety", value: "Zero LTI" }],
  },
  {
    id: "engineering",
    title: "Engineering",
    subtitle: "Precision & Performance",
    description: "Structural, civil, and MEP engineering solutions that perform beautifully. We bring technical rigor and creative problem-solving to every engineering challenge.",
    details: [
      "Engineering is the backbone of every great building. Our engineers work alongside architects and construction managers, ensuring that structural systems and building services are fully coordinated.",
      "From seismic retrofit to advanced MEP design, we combine analytical rigor with practical construction knowledge \u2014 because the best engineering solution is one that can actually be built.",
    ],
    capabilities: ["Structural Engineering", "Civil Engineering", "MEP Design", "Seismic Retrofit", "Environmental Engineering", "Geotechnical", "Energy Modeling", "Commissioning"],
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&h=800&fit=crop",
    stats: [{ label: "Structures", value: "40+" }, { label: "Specialties", value: "8" }],
  },
];

export default function ServicesPage() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        {/* Hero - dark with wireframe accents */}
        <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=800&fit=crop"
            alt="Architecture detail"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/30" />
          <div className="absolute inset-0 grain" />
          {/* Wireframe accent */}
          <svg className="absolute top-20 right-16 w-32 h-32 hidden lg:block" viewBox="0 0 128 128" fill="none">
            <rect x="4" y="4" width="120" height="120" stroke="#B8432F" strokeOpacity="0.1" strokeWidth="1" strokeDasharray="6 4">
              <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
            </rect>
          </svg>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full pb-12 relative z-10">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              What We Do
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mt-4">
              Three Disciplines, <span className="text-gradient font-bold">ONE VISION</span>
            </h1>
            <p className="text-white/50 mt-4 max-w-lg">Integrated architecture, construction, and engineering under one roof.</p>
          </div>
        </section>

        {/* Service Sections - alternating dark/darker */}
        {services.map((svc, i) => (
          <section key={svc.id} id={svc.id} className={`py-20 lg:py-28 relative overflow-hidden ${i % 2 === 0 ? "bg-stone-950" : "bg-stone-900"}`}>
            {/* Glow orb */}
            <div className={`absolute ${i % 2 === 0 ? "top-20 right-20" : "bottom-20 left-20"} w-64 h-64 rounded-full bg-terra/[0.03] blur-[80px] pointer-events-none`} />
            <div className="absolute inset-0 bg-grid-dark" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
              <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                {/* Image */}
                <div className="relative" style={{ direction: "ltr" }}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
                  </div>
                  <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-terra/30 hidden lg:block" />
                  <div className="absolute -top-3 -left-3 w-3 h-3 bg-terra/40 hidden lg:block" />
                  {/* Stats row */}
                  <div className="flex gap-6 mt-6">
                    {svc.stats.map((s) => (
                      <div key={s.label}>
                        <div className="font-display text-2xl font-bold text-stone-50">{s.value}</div>
                        <div className="text-xs text-stone-500 tracking-wider uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6" style={{ direction: "ltr" }}>
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-terra">{svc.subtitle}</span>
                  <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-stone-50">{svc.title}</h2>
                  <p className="text-stone-400 leading-relaxed text-lg">{svc.description}</p>
                  {svc.details.map((p, j) => (
                    <p key={j} className="text-stone-500 leading-relaxed">{p}</p>
                  ))}
                  <div className="pt-4">
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-600 mb-4">Capabilities</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {svc.capabilities.map((cap) => (
                        <div key={cap} className="flex items-center gap-2 text-sm text-stone-400">
                          <span className="w-1 h-1 bg-terra rounded-full flex-shrink-0" />
                          {cap}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-4">
                    <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-terra hover:text-terra-light transition-colors group">
                      Discuss {/^[aeiou]/i.test(svc.title) ? "an" : "a"} {svc.title} Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20 lg:py-24 bg-stone-950 bg-grid-dark grain relative text-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-terra/[0.04] blur-[120px] pointer-events-none" />
          <div className="max-w-2xl mx-auto px-6 relative z-10 space-y-6">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-stone-50 tracking-tight">
              Ready to Start <span className="text-gradient font-bold">YOUR PROJECT?</span>
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
