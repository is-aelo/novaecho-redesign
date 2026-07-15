"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function useTrustedMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return { trackRef };
}
