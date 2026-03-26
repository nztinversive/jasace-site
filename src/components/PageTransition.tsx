"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/*
 * Route transition: a terracotta wipe that slides across the screen
 * when navigating between pages. Uses a curtain/reveal pattern.
 */

export default function PageTransition() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "enter" | "exit">("idle");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  // First load: show logo reveal
  useEffect(() => {
    if (isFirstLoad) {
      setPhase("enter");
      const t = setTimeout(() => {
        setPhase("exit");
        setTimeout(() => {
          setPhase("idle");
          setIsFirstLoad(false);
        }, 700);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [isFirstLoad]);

  // Route changes after first load: quick wipe
  useEffect(() => {
    if (isFirstLoad) return;

    setPhase("enter");
    const t1 = setTimeout(() => setPhase("exit"), 300);
    const t2 = setTimeout(() => setPhase("idle"), 900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (phase === "idle" && !isFirstLoad) return null;

  return (
    <>
      {/* Main curtain */}
      <div
        className="fixed inset-0 z-[200] pointer-events-none"
        style={{
          backgroundColor: "#1A1816",
          transform:
            phase === "enter"
              ? "translateY(0%)"
              : phase === "exit"
              ? "translateY(-100%)"
              : "translateY(100%)",
          transition:
            phase === "enter"
              ? "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
              : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* Logo only on first load */}
        {isFirstLoad && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-4xl font-semibold text-stone-50 tracking-tight"
              style={{
                opacity: phase === "enter" ? 1 : 0,
                transform: phase === "enter" ? "translateY(0)" : "translateY(-20px)",
                transition: "all 0.4s ease-out 0.15s",
              }}
            >
              <span className="text-terra">J</span>asace
            </span>
          </div>
        )}
      </div>

      {/* Terracotta accent line that leads the curtain */}
      <div
        className="fixed left-0 right-0 h-1 z-[201] pointer-events-none"
        style={{
          backgroundColor: "#B8432F",
          top: phase === "exit" ? 0 : undefined,
          bottom: phase === "enter" ? 0 : undefined,
          transform:
            phase === "enter"
              ? "translateY(0%) scaleX(1)"
              : phase === "exit"
              ? "translateY(0%) scaleX(0)"
              : "scaleX(0)",
          transformOrigin: phase === "exit" ? "right" : "left",
          transition:
            phase === "enter"
              ? "transform 0.5s cubic-bezier(0.65, 0, 0.35, 1)"
              : "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
        }}
      />
    </>
  );
}
