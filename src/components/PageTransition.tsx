"use client";

import { useEffect, useState } from "react";

export default function PageTransition() {
  const [phase, setPhase] = useState<"loading" | "revealing" | "done">("loading");

  useEffect(() => {
    // Brief pause, then reveal
    const t1 = setTimeout(() => setPhase("revealing"), 300);
    const t2 = setTimeout(() => setPhase("done"), 1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center pointer-events-none"
      style={{
        backgroundColor: "#1A1816",
        opacity: phase === "revealing" ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <div className="flex items-center gap-1">
        <span
          className="font-display text-4xl font-semibold text-stone-50 tracking-tight"
          style={{
            opacity: phase === "loading" ? 1 : 0,
            transform: phase === "loading" ? "translateY(0)" : "translateY(-10px)",
            transition: "all 0.4s ease-out",
          }}
        >
          <span className="text-terra">J</span>asace
        </span>
      </div>
    </div>
  );
}
