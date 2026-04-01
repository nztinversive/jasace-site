"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { fallbackContent, sortServices } from "@/lib/cms";
import { convexEnabled } from "@/lib/convex-config";
import type { ServiceContent } from "@/types/cms";

export default function ServicesPageClient() {
  if (!convexEnabled) {
    return <ServicesPageContent services={sortServices(fallbackContent.services)} />;
  }

  return <ConvexServicesPageClient />;
}

function ConvexServicesPageClient() {
  const cmsServices = useQuery(api.services.list, convexEnabled ? {} : "skip") as ServiceContent[] | undefined;
  const services = sortServices(cmsServices?.length ? cmsServices : fallbackContent.services);
  return <ServicesPageContent services={services} />;
}

function ServicesPageContent({ services }: { services: ServiceContent[] }) {
  return (
    <main>
      <section className="relative h-[50vh] min-h-[400px] flex items-end overflow-hidden">
        <Image
          src={services[0]?.image ?? fallbackContent.services[0].image}
          alt="Architecture detail"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-stone-950/30" />
        <div className="absolute inset-0 grain" />
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

      {services.map((service, index) => (
        <section key={`${service.title}-${index}`} id={service.title.toLowerCase()} className={`py-20 lg:py-28 relative overflow-hidden ${index % 2 === 0 ? "bg-stone-950" : "bg-stone-900"}`}>
          <div className={`absolute ${index % 2 === 0 ? "top-20 right-20" : "bottom-20 left-20"} w-64 h-64 rounded-full bg-terra/[0.03] blur-[80px] pointer-events-none`} />
          <div className="absolute inset-0 bg-grid-dark" />

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-start ${index % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
              <div className="relative" style={{ direction: "ltr" }}>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image src={service.image} alt={service.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 to-transparent" />
                </div>
                <div className="absolute -bottom-3 -right-3 w-16 h-16 border-r-2 border-b-2 border-terra/30 hidden lg:block" />
                <div className="absolute -top-3 -left-3 w-3 h-3 bg-terra/40 hidden lg:block" />
                <div className="flex gap-6 mt-6">
                  {service.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-display text-2xl font-bold text-stone-50">{stat.value}</div>
                      <div className="text-xs text-stone-500 tracking-wider uppercase">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6" style={{ direction: "ltr" }}>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-terra">{service.subtitle}</span>
                <h2 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-stone-50">{service.title}</h2>
                <p className="text-stone-400 leading-relaxed text-lg">{service.description}</p>
                {service.details.map((paragraph, detailIndex) => (
                  <p key={`${service.title}-detail-${detailIndex}`} className="text-stone-500 leading-relaxed">{paragraph}</p>
                ))}
                <div className="pt-4">
                  <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-stone-600 mb-4">Capabilities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {service.capabilities.map((capability) => (
                      <div key={capability} className="flex items-center gap-2 text-sm text-stone-400">
                        <span className="w-1 h-1 bg-terra rounded-full flex-shrink-0" />
                        {capability}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-terra hover:text-terra-light transition-colors group">
                    Discuss {service.title}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="transform group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

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
  );
}
