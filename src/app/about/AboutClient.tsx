"use client";

import { useEffect } from "react";

export default function AboutClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll("section").forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
