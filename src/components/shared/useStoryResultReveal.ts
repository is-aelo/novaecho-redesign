"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function splitValue(value: string) {
  const match = value.trim().match(/^(-?[\d,]+)(\.\d+)?(.*)$/);
  if (!match) return null;
  return {
    target: Number(match[1].replace(/,/g, "") + (match[2] ?? "")),
    suffix: match[3] ?? "",
  };
}

export function useStoryResultReveal(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-story-result]", scope).forEach((block) => {
        const countEl = block.querySelector<HTMLElement>("[data-story-count]");
        if (countEl) {
          const parsed = splitValue(countEl.dataset.value ?? countEl.textContent ?? "");
          const label = block.querySelector<HTMLElement>("[data-story-label]");
          if (label) gsap.set(label, { opacity: 0, y: 6 });
          countEl.textContent = "0";
          if (!parsed) {
            countEl.textContent = countEl.dataset.value ?? "";
            return;
          }
          const proxy = { n: 0 };
          gsap.to(proxy, {
            n: parsed.target,
            duration: 0.9,
            ease: "power2.out",
            onUpdate: () => {
              countEl.textContent =
                Math.round(proxy.n).toLocaleString("en-US") + parsed.suffix;
            },
            onComplete: () => {
              countEl.textContent = countEl.dataset.value ?? "";
              if (label) {
                gsap.fromTo(
                  label,
                  { opacity: 0, y: 6 },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    ease: "power2.out",
                    clearProps: "transform",
                  }
                );
              }
            },
            scrollTrigger: { trigger: block, start: "top 85%", once: true },
          });
        } else {
          gsap.fromTo(
            block,
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform",
              scrollTrigger: { trigger: block, start: "top 85%", once: true },
            }
          );
        }
      });
    }, scope);

    return () => ctx.revert();
  }, [scopeRef]);
}