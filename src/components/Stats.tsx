"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 500, suffix: "+", label: "Projects Posted" },
  { value: 200, suffix: "+", label: "Companies" },
  { value: 1000, suffix: "+", label: "Professionals" },
  { value: 98, suffix: "%", label: "Satisfaction" },
];

function useCountUp(target: number, trigger: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [trigger, target]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const count = useCountUp(value, visible);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl sm:text-5xl font-bold text-white">
        {count.toLocaleString()}
        <span className="text-accent">{suffix}</span>
      </div>
      <div className="mt-1 text-sm text-gray-400">{label}</div>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-4 bg-navy-900 border-y border-white/5">
      <div className="mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s) => (
          <StatItem key={s.label} {...s} />
        ))}
      </div>
    </section>
  );
}
