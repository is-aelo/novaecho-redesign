"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function useAtmosphereMotion() {
  const swayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = swayRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: -8 },
        { y: 10, duration: 7, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
      gsap.fromTo(
        el,
        { scaleY: 1 },
        { scaleY: 1.03, duration: 9, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
      gsap.fromTo(
        el,
        { xPercent: 0 },
        { xPercent: -1.5, duration: 11, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
      gsap.fromTo(
        el,
        { opacity: 0.92 },
        { opacity: 1, duration: 6, yoyo: true, repeat: -1, ease: "sine.inOut" }
      );
    });

    return () => ctx.revert();
  }, []);

  return { swayRef };
}
