"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 25, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
  { value: 40, suffix: "+", label: "Team Members" },
];

function useCountUp(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [isVisible, target, duration]);
  return count;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-24 bg-stone-900 bg-grid-dark relative overflow-hidden grain">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} isVisible={isVisible} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terra/50 to-transparent" />
    </section>
  );
}

function StatItem({ stat, isVisible, index }: { stat: (typeof stats)[0]; isVisible: boolean; index: number }) {
  const count = useCountUp(stat.value, isVisible);

  return (
    <div
      className="text-center lg:text-left space-y-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(20px)",
        transition: `all 0.6s ease-out ${index * 0.15}s`,
      }}
    >
      <div className="font-display text-4xl lg:text-5xl xl:text-6xl font-light text-stone-50 tracking-tight">
        {count.toLocaleString()}
        <span className="text-terra">{stat.suffix}</span>
      </div>
      <div className="text-xs text-stone-400 tracking-wide uppercase font-medium">{stat.label}</div>
    </div>
  );
}
