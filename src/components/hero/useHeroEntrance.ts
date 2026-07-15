"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useHeroEntrance() {
  const containerRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const headline = headlineRef.current;
    const h1 = headline?.querySelector("h1");
    const subhead = subheadRef.current;
    const cta = ctaRef.current;
    if (!h1) return;

    const words = h1.textContent?.split(" ") ?? [];
    h1.innerHTML = words
      .map((word) => `<span class="hero-word inline-block">${word}</span>`)
      .join(" ");

    const wordElements = h1.querySelectorAll(".hero-word");

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.from(wordElements, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        stagger: 0.08,
      });

      if (subhead) {
        tl.from(subhead, { opacity: 0, y: 16, duration: 0.6 }, "-=0.3");
      }

      if (cta) {
        tl.from(cta, { opacity: 0, y: 16, duration: 0.6 }, "-=0.2");
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef, headlineRef, subheadRef, ctaRef };
}
