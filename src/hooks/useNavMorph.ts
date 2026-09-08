"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

const DESKTOP_BREAKPOINT = 1024;
const PILL_MAX_WIDTH = 1152;
const MOBILE_GAP = 16;
const DESKTOP_GAP = 24;

function pillGeometry() {
  const vw = window.innerWidth;
  const gap = vw >= DESKTOP_BREAKPOINT ? DESKTOP_GAP : MOBILE_GAP;
  const width = Math.min(PILL_MAX_WIDTH, vw - gap * 2);
  return { maxWidth: width, margin: (vw - width) / 2 };
}

function applyMorph(bar: HTMLElement, isAtTop: boolean, reduced: boolean) {
  const target = isAtTop
    ? { maxWidth: window.innerWidth, margin: 0 }
    : pillGeometry();
  const vars: gsap.TweenVars = {
    maxWidth: target.maxWidth,
    marginLeft: target.margin,
    marginRight: target.margin,
    overwrite: "auto",
  };
  if (reduced) {
    gsap.set(bar, vars);
  } else {
    gsap.to(bar, {
      ...vars,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }
}

export function useNavMorph(
  barRef: RefObject<HTMLDivElement | null>,
  isAtTop: boolean
) {
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const el = bar;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    applyMorph(el, isAtTop, reduced);

    if (isAtTop) return;
    let raf = 0;
    function onResize() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => applyMorph(el, false, reduced));
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [barRef, isAtTop]);
}