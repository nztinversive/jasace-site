"use client";

import { useEffect, useRef, useCallback, MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { projects } from "@/data/projects";
import { convexEnabled } from "@/lib/convex-config";
import { sortProjects } from "@/lib/cms";

function useTilt(ref: React.RefObject<HTMLElement | null>) {
  const handleMove = useCallback(
    (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      element.style.transform = `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
    },
    [ref]
  );

  const handleLeave = useCallback(() => {
    const element = ref.current;
    if (element) {
      element.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
    }
  }, [ref]);

  return { handleMove, handleLeave };
}

function FeaturedCard({ project, delay }: { project: (typeof projects)[0]; delay: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { handleMove, handleLeave } = useTilt(cardRef as React.RefObject<HTMLElement>);

  return (
    <Link
      ref={cardRef}
      href={`/work/${project.slug}`}
      className={`reveal reveal-delay-${delay} group relative overflow-hidden cursor-pointer block`}
      style={{ transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)" }}
      onMouseMove={handleMove as unknown as React.MouseEventHandler}
      onMouseLeave={handleLeave}
    >
      <div className="aspect-[3/2] relative overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-75"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-terra transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out" />
      </div>

      <div className="absolute bottom-0 inset-x-0 p-6 lg:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs text-white/40 font-medium tracking-wider uppercase mb-2 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              {project.category} &middot; {project.year}
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-medium text-white tracking-tight transform group-hover:-translate-y-0 translate-y-1 transition-transform duration-500">
              {project.title}
            </h3>
            <p className="text-sm text-white/50 mt-1 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
              {project.client} &middot; {project.location}
            </p>
          </div>

          <div className="w-12 h-12 border border-white/20 group-hover:border-terra group-hover:bg-terra flex items-center justify-center text-white transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 flex-shrink-0">
            <svg className="w-5 h-5 transform group-hover:rotate-0 -rotate-45 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function SmallCard({
  project,
  delay,
  spanClass,
  aspectClass,
  isLarge,
}: {
  project: (typeof projects)[0];
  delay: number;
  spanClass: string;
  aspectClass: string;
  isLarge: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={`reveal reveal-delay-${delay} group cursor-pointer block relative overflow-hidden ${spanClass}`}
    >
      <div className={`relative overflow-hidden ${isLarge ? "h-full" : ""} ${aspectClass}`}>
        <Image
          src={project.heroImage}
          alt={project.title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.6]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/60 to-transparent h-full transform translate-y-[60%] group-hover:translate-y-0 transition-transform duration-700 ease-out" />

        <div className="absolute bottom-0 inset-x-0 p-5">
          <div className="text-[10px] text-white/40 font-medium tracking-wider uppercase mb-1 transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75">
            {project.category} &middot; {project.year}
          </div>
          <h3 className="font-display text-lg font-medium text-white tracking-tight transition-transform duration-500 group-hover:-translate-y-0">
            {project.title}
          </h3>
          <p className="text-xs text-white/40 mt-1 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {project.location}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs font-medium text-terra transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
            <span>View Project</span>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

function PortfolioSection({ items }: { items: typeof projects }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
          }
        });
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const sortedProjects = sortProjects(items);
  const featured = sortedProjects.filter((project) => project.featured);
  const rest = sortedProjects.filter((project) => !project.featured);

  return (
    <section ref={sectionRef} id="work" className="py-28 lg:py-36 bg-stone-950 relative overflow-hidden">
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-terra/[0.03] blur-[100px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-56 h-56 rounded-full bg-terra/[0.02] blur-[80px] pointer-events-none" />
      <div className="absolute inset-0 bg-grid-dark" />
      <svg className="absolute top-16 right-16 w-40 h-40 pointer-events-none hidden lg:block" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="140" height="140" stroke="#B8432F" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="6 4">
          <animate attributeName="stroke-dashoffset" values="0;-20" dur="4s" repeatCount="indefinite" />
        </rect>
        <circle cx="80" cy="80" r="40" stroke="white" strokeOpacity="0.03" strokeWidth="0.5">
          <animate attributeName="r" values="38;42;38" dur="5s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div className="space-y-4">
            <span className="reveal inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-terra">
              <span className="w-8 h-px bg-terra" />
              Selected Work
            </span>
            <h2 className="reveal reveal-delay-1 font-display text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-stone-50 uppercase">
              Projects That <span className="text-gradient">Define Us</span>
            </h2>
          </div>
          <p className="reveal reveal-delay-2 text-stone-500 text-sm max-w-xs leading-relaxed">
            A selection of recent work across architecture, construction, and engineering.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {featured.map((project, index) => (
            <FeaturedCard key={project.slug} project={project} delay={index + 1} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-6" style={{ gridAutoRows: "minmax(0, 1fr)" }}>
          {rest.map((project, index) => {
            const spanClass = index === 0 ? "lg:row-span-2" : index === 1 ? "lg:col-span-2" : "";
            const aspectClass = index === 0
              ? "aspect-[3/4] lg:aspect-auto lg:h-full"
              : index === 1
                ? "aspect-[2/1] lg:aspect-auto lg:h-full"
                : "aspect-[4/3]";

            return (
              <SmallCard
                key={project.slug}
                project={project}
                delay={Math.min(index + 1, 4)}
                spanClass={spanClass}
                aspectClass={aspectClass}
                isLarge={index < 2}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ConvexPortfolio() {
  const cmsData = useQuery(api.projects.list);
  const data = cmsData ?? projects;

  return <PortfolioSection items={data} />;
}

export default function Portfolio() {
  if (!convexEnabled) {
    return <PortfolioSection items={projects} />;
  }

  return <ConvexPortfolio />;
}
