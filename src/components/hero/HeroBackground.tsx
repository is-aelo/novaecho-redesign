"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SVG_W = 1440;
const SVG_H = 900;
const POINTS = 64;
const STEP = SVG_W / (POINTS - 1);

function buildPath(
  yBase: number,
  amp: number,
  freq: number,
  phase: number,
  vertStretch: number
): string {
  const pts: string[] = [];
  for (let i = 0; i < POINTS; i++) {
    const x = i * STEP;
    const y =
      yBase +
      amp * Math.sin((i / POINTS) * Math.PI * freq + phase) * vertStretch;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return pts.join(" ");
}

const CYAN = "var(--accent-cyan)";
const SKY = "var(--sky)";
const PURPLE = "var(--purple)";
const MAGENTA = "var(--magenta)";

type PathConfig = {
  yBase: number;
  amp: number;
  freq: number;
  phase: number;
  vertStretch: number;
  stroke: string;
  opacity: number;
  strokeWidth: number;
};

const PATHS: PathConfig[] = [
  {
    yBase: SVG_H * 0.52,
    amp: 60,
    freq: 2.2,
    phase: 0,
    vertStretch: 1,
    stroke: CYAN,
    opacity: 0.35,
    strokeWidth: 1.5,
  },
  {
    yBase: SVG_H * 0.55,
    amp: 75,
    freq: 1.8,
    phase: 1.2,
    vertStretch: 1,
    stroke: SKY,
    opacity: 0.28,
    strokeWidth: 1.5,
  },
  {
    yBase: SVG_H * 0.58,
    amp: 90,
    freq: 2.5,
    phase: 2.4,
    vertStretch: 1,
    stroke: PURPLE,
    opacity: 0.2,
    strokeWidth: 1.5,
  },
  {
    yBase: SVG_H * 0.54,
    amp: 55,
    freq: 3.0,
    phase: 3.8,
    vertStretch: 1,
    stroke: MAGENTA,
    opacity: 0.18,
    strokeWidth: 1.5,
  },
];

export default function HeroBackground() {
  const pathRefs = useRef<SVGPathElement[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const paths = pathRefs.current;
    const ctx = gsap.context(() => {
      paths.forEach((path, i) => {
        if (!path) return;
        const cfg = PATHS[i];

        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        tl.to(path, {
          duration: 8 + i * 2,
          attr: {
            d: buildPath(
              cfg.yBase,
              cfg.amp * 0.6,
              cfg.freq + 0.4,
              cfg.phase + 1.5,
              cfg.vertStretch
            ),
          },
          ease: "sine.inOut",
        });

        tl.to(
          path,
          {
            duration: 7 + i * 1.5,
            attr: {
              d: buildPath(
                cfg.yBase,
                cfg.amp * 1.2,
                cfg.freq - 0.3,
                cfg.phase + 3.0,
                cfg.vertStretch
              ),
            },
            ease: "sine.inOut",
          },
          "-=2"
        );

        tl.to(path, {
          duration: 9 + i * 1,
          attr: {
            d: buildPath(
              cfg.yBase,
              cfg.amp * 0.8,
              cfg.freq + 0.2,
              cfg.phase + 4.5,
              cfg.vertStretch
            ),
          },
          ease: "sine.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "var(--surface-950)" }}
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 w-full h-full"
      >
        {PATHS.map((cfg, i) => (
          <path
            key={i}
            ref={(el) => {
              if (el) pathRefs.current[i] = el;
            }}
            d={buildPath(cfg.yBase, cfg.amp, cfg.freq, cfg.phase, cfg.vertStretch)}
            fill="none"
            stroke={cfg.stroke}
            strokeWidth={cfg.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={cfg.opacity}
          />
        ))}
      </svg>
    </div>
  );
}
