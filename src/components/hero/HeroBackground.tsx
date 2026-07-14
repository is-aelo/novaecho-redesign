"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SVG_W = 1600;
const SVG_H = 900;
const BAR_COUNT = 260;
const BAR_SPACING = 2;
const CENTER_Y = SVG_H * 0.72;

type Cfg = {
  id: string;
  opacity: number;
  speed: number;
  maxAmp: number;
  minH: number;
  blur: number;
  phase: number;
};

type St = {
  amp: number;
  t: number;
  speaking: boolean;
  sTimer: number;
  sDur: number;
  pTimer: number;
  pDur: number;
  intensity: number;
};

const LAYERS: Cfg[] = [
  { id: "f", opacity: 0.92, speed: 0.38, maxAmp: 58, minH: 2.8, blur: 0.6, phase: 0 },
  { id: "m", opacity: 0.58, speed: 0.26, maxAmp: 72, minH: 2.2, blur: 1.6, phase: 1.7 },
  { id: "b", opacity: 0.28, speed: 0.16, maxAmp: 96, minH: 1.6, blur: 2.8, phase: 3.4 },
];

function clamp(v: number, lo: number, hi: number) {
  return v < lo ? lo : v > hi ? hi : v;
}

function makeState(c: Cfg): St {
  return {
    amp: 0.06 + c.phase * 0.01,
    t: 0,
    speaking: false,
    sTimer: 0,
    sDur: 0.35,
    pTimer: 0,
    pDur: 0.4,
    intensity: 0.25,
  };
}

function nextAmp(c: Cfg, s: St, elapsed: number, dt: number): number {
  const p = c.phase;
  const breath = 0.022 + 0.014 * Math.sin(elapsed * 0.36 + p * 0.9);
  const drift = 0.007 * Math.cos(elapsed * 0.11 + p * 1.5);
  let target = breath + drift;

  if (s.speaking) {
    const prog = clamp(s.sTimer / Math.max(0.001, s.sDur), 0, 1);
    const attack = Math.exp(-(((prog - 0.12) / 0.055) ** 2)) * 0.82;
    const sustain = Math.exp(-(((prog - 0.44) / 0.16) ** 2)) * 0.58;
    const tail = Math.exp(-(((prog - 0.8) / 0.15) ** 2)) * 0.21;
    const syll =
      Math.sin(prog * 14 + p * 1.8) * 0.13 +
      Math.cos(prog * 7.5 + p * 0.9) * 0.08 +
      Math.sin(prog * 22 + p * 2.4) * 0.05;
    target += (attack + sustain + tail + syll) * s.intensity;
    s.sTimer += dt / Math.max(0.14, s.sDur);
    if (s.sTimer >= s.sDur) {
      s.speaking = false;
      s.pTimer = 0;
      s.pDur = 0.2 + 0.2 * Math.abs(Math.sin(elapsed * 0.055 + p * 0.8)) + 0.12;
      s.sDur = 0.18 + 0.15 * Math.abs(Math.sin(elapsed * 0.04 + p * 1.2)) + 0.18;
      s.intensity = 0.15 + 0.22 * Math.abs(Math.sin(elapsed * 0.03 + p * 2.6 + 0.7));
    }
  } else {
    target += 0.007 * Math.sin(elapsed * 0.26 + p * 1.8);
    s.pTimer += dt;
    if (s.pTimer >= s.pDur) {
      s.speaking = true;
      s.sTimer = 0;
      s.sDur = 0.22 + 0.16 * Math.abs(Math.sin(elapsed * 0.04 + p * 1.1)) + 0.2;
      s.pDur = 0.28 + 0.18 * Math.abs(Math.sin(elapsed * 0.03 + p * 1.7)) + 0.16;
      s.intensity = 0.13 + 0.24 * Math.abs(Math.sin(elapsed * 0.025 + p * 2.8 + 0.5));
    }
  }

  const corr = s.amp * 0.68;
  const smooth = corr + (target - corr) * 0.16;
  s.amp = clamp(smooth, 0.012, 1);
  return s.amp;
}

export default function HeroBackground() {
  const groupsRef = useRef<SVGGElement[]>([]);
  const rectsRef = useRef<SVGRectElement[][]>([]);
  const bufsRef = useRef<number[][]>([]);
  const stsRef = useRef<St[]>([]);
  const accRef = useRef<number[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const groups = groupsRef.current;
    const rects = rectsRef.current;
    const bufs = bufsRef.current;
    const sts = stsRef.current;
    const acc = accRef.current;

    LAYERS.forEach((c, i) => {
      const g = groups[i];
      if (!g) return;

      const bars: SVGRectElement[] = [];
      for (let b = 0; b < BAR_COUNT; b++) {
        const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        r.setAttribute("width", "1");
        r.setAttribute("rx", "0.5");
        r.setAttribute("fill", "url(#waveGrad)");
        r.setAttribute("shape-rendering", "geometricPrecision");
        g.appendChild(r);
        bars.push(r);
      }
      rects[i] = bars;

      const buf: number[] = [];
      for (let s = 0; s < BAR_COUNT; s++) {
        buf.push(0.03 + 0.015 * Math.sin(s / 26 + c.phase));
      }
      bufs[i] = buf;
      sts[i] = makeState(c);
      acc[i] = 0;
    });

    let prev = 0;

    const tick = (time: number) => {
      const el = time * 0.001;
      const dt = clamp(el - prev, 0.0008, 0.25);
      prev = el;

      LAYERS.forEach((c, i) => {
        const bars = rects[i];
        const buf = bufs[i];
        const st = sts[i];
        if (!bars || !buf || !st) return;

        let a = acc[i] + c.speed * dt * 0.55;
        const steps = Math.floor(a);
        a -= steps;
        acc[i] = a;

        for (let s = 0; s < steps; s++) {
          buf.shift();
          buf.push(nextAmp(c, st, el, dt));
        }

        const off = a * BAR_SPACING;
        for (let b = 0; b < BAR_COUNT; b++) {
          const r = bars[b];
          const sv = buf[b];
          const shaped = sv ** 1.35;
          const h = Math.max(c.minH, shaped * c.maxAmp);
          const x = b * BAR_SPACING - off;
          const y = CENTER_Y - h / 2;
          const op = clamp(0.05 + shaped * c.opacity * 0.95, 0.03, 0.96);
          const fo = clamp(0.12 + shaped * c.opacity * 0.9, 0.06, 1);
          r.setAttribute("x", x.toFixed(2));
          r.setAttribute("y", y.toFixed(2));
          r.setAttribute("height", h.toFixed(2));
          r.setAttribute("opacity", op.toFixed(3));
          r.setAttribute("fill-opacity", fo.toFixed(3));
        }
      });
    };

    tick(0);
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      LAYERS.forEach((_, i) => {
        const g = groups[i];
        if (g) g.replaceChildren();
      });
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="hero-background absolute inset-0" />
      <div className="hero-radial-overlay absolute inset-0" />

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-x-0 bottom-0 h-[50vh] w-full"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="50%" stopColor="var(--accent-sky)" />
            <stop offset="100%" stopColor="var(--purple)" />
          </linearGradient>

          <linearGradient id="waveMask" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="6%" stopColor="white" stopOpacity="1" />
            <stop offset="94%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="waveFade">
            <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#waveMask)" />
          </mask>

          <filter id="glowF" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="0.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowM" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowB" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="2.8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g mask="url(#waveFade)">
          {LAYERS.map((c, i) => (
            <g
              key={c.id}
              ref={(el) => {
                if (el) groupsRef.current[i] = el;
              }}
              opacity={c.opacity}
              filter={i === 0 ? "url(#glowF)" : i === 1 ? "url(#glowM)" : "url(#glowB)"}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
