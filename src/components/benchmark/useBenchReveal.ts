"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useBenchReveal(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bench-module]", scope).forEach((module) => {
        const elements = gsap
          .utils.toArray<HTMLElement>("[data-bench-reveal]", module)
          .sort((a, b) =>
            (a.dataset.order ?? "0").localeCompare(b.dataset.order ?? "0", undefined, {
              numeric: true,
            })
          );
        if (!elements.length) return;

        gsap.fromTo(
          elements,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.08,
            clearProps: "transform",
            scrollTrigger: {
              trigger: module,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}