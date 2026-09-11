"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useBenchCurveReveal(svgRef: RefObject<SVGSVGElement | null>) {
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const curves = Array.from(
      svg.querySelectorAll<SVGGeometryElement>("[data-curve]")
    );
    if (!curves.length) return;

    curves.forEach((el) => {
      el.style.strokeDasharray = "1";
      el.style.strokeDashoffset = "1";
    });

    const section = svg.closest("section");
    const trigger = section ?? svg;

    const ctx = gsap.context(() => {
      gsap.to(curves, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.1,
        scrollTrigger: {
          trigger,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, svg);

    return () => ctx.revert();
  }, [svgRef]);
}