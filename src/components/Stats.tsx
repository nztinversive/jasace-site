"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { convexEnabled } from "@/lib/convex-config";
import type { SiteStat } from "@/types/cms";

const fallbackStats: SiteStat[] = [
  { value: 10, suffix: "+", label: "Years", detail: "in the engineering industry", order: 1 },
  { value: 100, suffix: "+", label: "Projects", detail: "delivered across three disciplines", order: 2 },
  { value: 98, suffix: "%", label: "Satisfaction", detail: "client retention rate", order: 3 },
  { value: 15, suffix: "+", label: "Partners", detail: "trusted network of collaborators", order: 4 },
];

function useCountUp(target: number, shouldStart: boolean) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  const animate = useCallback(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const duration = 1800;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [target]);

  useEffect(() => {
    if (shouldStart) animate();
  }, [shouldStart, animate]);

  return count;
}

function StatItem({
  stat,
  isVisible,
  index,
  isLast,
}: {
  stat: SiteStat;
  isVisible: boolean;
  index: number;
  isLast: boolean;
}) {
  const count = useCountUp(stat.value, isVisible);

  return (
    <div
      className={`text-center relative ${!isLast ? "lg:border-r lg:border-stone-700/40" : ""}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(30px)",
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.12}s`,
      }}
    >
      <div className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-stone-50 tracking-tight leading-none">
        {count.toLocaleString()}
        <span className="text-terra">{stat.suffix}</span>
      </div>
      <div className="text-sm font-semibold text-stone-300 mt-3 tracking-wide">{stat.label}</div>
      <div className="text-xs text-stone-500 mt-1 italic">{stat.detail}</div>
    </div>
  );
}

function StatsSection({ stats }: { stats: SiteStat[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent" />

      <div className="bg-stone-950 bg-grid-dark grain relative py-24 lg:py-32">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 rounded-full bg-terra/[0.04] blur-[80px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-48 h-48 rounded-full bg-terra/[0.03] blur-[60px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase text-terra"
              style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out" }}
            >
              By the Numbers
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 lg:gap-x-0">
            {stats.map((stat, index) => (
              <StatItem key={stat.label} stat={stat} isVisible={isVisible} index={index} isLast={index === stats.length - 1} />
            ))}
          </div>
        </div>
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-terra/40 to-transparent" />
    </section>
  );
}

function ConvexStats() {
  const cmsData = useQuery(api.stats.list);
  const data = cmsData ?? fallbackStats;

  return <StatsSection stats={data} />;
}

export default function Stats() {
  if (!convexEnabled) {
    return <StatsSection stats={fallbackStats} />;
  }

  return <ConvexStats />;
}
