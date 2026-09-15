"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useSectionReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = gsap.utils.toArray<HTMLElement>("[data-section-reveal]");
    if (!groups.length) return;

    const ctx = gsap.context(() => {
      groups.forEach((group) => {
        const items = gsap.utils.toArray<HTMLElement>(
          ":scope > [data-reveal-item]",
          group
        );
        const targets = items.length ? items : [group];

        gsap.fromTo(
          targets,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.08,
            clearProps: "transform",
            scrollTrigger: {
              trigger: group,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}