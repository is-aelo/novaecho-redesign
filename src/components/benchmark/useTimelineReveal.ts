"use client";

import { useEffect, useState } from "react";

export const TOTAL_STEPS = 6;
const STEP_MS = 1800;

const motionQuery = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function useTimelineReveal() {
  const [reducedMotion, setReducedMotion] = useState(motionQuery);
  const [visibleSteps, setVisibleSteps] = useState(() =>
    reducedMotion ? TOTAL_STEPS : 0
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) setVisibleSteps(TOTAL_STEPS);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    if (visibleSteps >= TOTAL_STEPS) return;
    const timer = window.setTimeout(
      () => setVisibleSteps((c) => Math.min(TOTAL_STEPS, c + 1)),
      STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [visibleSteps, reducedMotion]);

  return { visibleSteps, reducedMotion };
}