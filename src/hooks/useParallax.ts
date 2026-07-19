"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useParallax() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const els = gsap.utils.toArray<HTMLElement>("[data-parallax]");
    if (!els.length) return;

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const y = parseFloat(el.getAttribute("data-parallax-y") || "20");
        const start = el.getAttribute("data-parallax-start") || "top bottom";
        const end = el.getAttribute("data-parallax-end") || "bottom top";

        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: -y,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub: 1,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
