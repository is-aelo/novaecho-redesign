"use client";

import { useCallback } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

export function useSmoothScroll(offset = 64) {
  const scrollTo = useCallback(
    (href: string, e?: React.MouseEvent<HTMLAnchorElement>) => {
      e?.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - offset);
        return;
      }

      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      gsap.to(window, {
        scrollTo: { y },
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [offset]
  );

  return scrollTo;
}
