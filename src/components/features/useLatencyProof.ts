"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLatencyProof(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const ai = scope.querySelector<HTMLElement>("[data-latency-row='ai']");
    const user = scope.querySelector<HTMLElement>("[data-latency-row='user']");
    const ai2 = scope.querySelector<HTMLElement>("[data-latency-row='ai-2']");
    const user2 = scope.querySelector<HTMLElement>("[data-latency-row='user-2']");
    const status = scope.querySelector<HTMLElement>("[data-latency-status]");
    if (!ai || !user || !status) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      status.textContent = "Confirming";
      return;
    }

    const rows = [ai, user, ...(ai2 ? [ai2] : []), ...(user2 ? [user2] : [])] as HTMLElement[];
    gsap.set(rows.concat(status), { autoAlpha: 0, y: 8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(ai, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(status, { autoAlpha: 1, y: 0, duration: 0.3 }, "+=0.15")
      .to(user, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.4")
      .to(ai2 ?? [], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.3")
      .to(user2 ?? [], { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "+=0.3")
      .to(status, { autoAlpha: 0, duration: 0.2 }, "+=0.35")
      .add(() => {
        status.textContent = "Confirming";
      })
      .to(status, { autoAlpha: 1, duration: 0.25, ease: "power2.out" });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scopeRef]);
}