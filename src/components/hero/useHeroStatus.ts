"use client";

import { useEffect, useState } from "react";

export type HeroLogBlock = {
  kind: "banner" | "step";
  content: string;
};

const BANNER_LINES = [
  "NOVA ECHO AI",
  "✔ human-like conversations",
  "✔ 30 languages",
  "✔ 80% lower cost",
];

const STEP_LINES = [
  "training the model on your playbook",
  "currently qualifying a lead",
  "transcribing the call in real time",
  "call completed — lead converted",
];

const BLOCKS: HeroLogBlock[] = [
  ...BANNER_LINES.map((content): HeroLogBlock => ({ kind: "banner", content })),
  ...STEP_LINES.map((content): HeroLogBlock => ({ kind: "step", content })),
];

const BANNER_MS = 200;
const STEP_MS = 2200;
const HOLD_MS = 4000;

export default function useHeroStatus() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = query.matches;
    setReducedMotion(on);
    if (on) setVisibleCount(BLOCKS.length);

    const handleChange = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
      if (event.matches) setVisibleCount(BLOCKS.length);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setTimeout(
      () => {
        if (visibleCount < BLOCKS.length) {
          setVisibleCount((current) => Math.min(BLOCKS.length, current + 1));
        } else {
          setVisibleCount(1);
        }
      },
      visibleCount >= BLOCKS.length
        ? HOLD_MS
        : BLOCKS[visibleCount].kind === "banner"
          ? BANNER_MS
          : STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [visibleCount, reducedMotion]);

  return { blocks: BLOCKS, visibleCount };
}