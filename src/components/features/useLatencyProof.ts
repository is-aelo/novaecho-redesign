"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLatencyProof(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const scope = scopeRef.current;
    if (!scope) return;

    const user = scope.querySelector<HTMLElement>("[data-latency-row='user']");
    const ai = scope.querySelector<HTMLElement>("[data-latency-row='ai']");
    const wave = scope.querySelector<SVGSVGElement>("[data-latency-wave]");
    const callerCurve = scope.querySelector<SVGPathElement>("[data-latency-curve='caller']");
    const aiCurve = scope.querySelector<SVGPathElement>("[data-latency-curve='ai']");
    const status = scope.querySelector<HTMLElement>("[data-latency-status]");
    if (!user || !ai || !status || !callerCurve || !aiCurve || !wave) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      status.textContent = "Booked";
      return;
    }

    [callerCurve, aiCurve].forEach((curve) => {
      curve.style.strokeDasharray = "1";
      curve.style.strokeDashoffset = "1";
    });
    gsap.set([user, ai, status], { autoAlpha: 0, y: 8 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: scope,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    tl.to(user, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" })
      .to(callerCurve, { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" }, "-=0.15")
      .to(status, { autoAlpha: 1, y: 0, duration: 0.3 }, "-=0.25")
      .to(aiCurve, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" }, "+=0.4")
      .to(ai, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
      .to(status, { autoAlpha: 0, duration: 0.2 }, "+=0.35")
      .add(() => {
        status.textContent = "Booked";
      })
      .to(status, { autoAlpha: 1, duration: 0.25, ease: "power2.out" })
      .to(wave, { opacity: 0.82, duration: 1.8, ease: "sine.inOut", yoyo: true, repeat: -1 }, "+=0.4");

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [scopeRef]);
}