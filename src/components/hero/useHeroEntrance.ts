"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useHeroEntrance() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const items =
      containerRef.current?.querySelectorAll("[data-hero-item]");
    if (!items || items.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.1,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
}
