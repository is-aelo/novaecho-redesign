"use client";

import { useEffect, useRef } from "react";

const W = 480;
const H = 80;
const MID = 40;
const STEP = 4;

const GAP_LEFT = 200;
const GAP_RIGHT = 300;
const GAP_RAMP = 14;

type Layer = { amp: number };

const LAYERS: Layer[] = [
  { amp: 26 },
  { amp: 19 },
  { amp: 13 },
  { amp: 8 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

function gapEnvelope(x: number) {
  const head = smoothstep(clamp((x - (GAP_LEFT - GAP_RAMP)) / GAP_RAMP, 0, 1));
  const tail = smoothstep(clamp((x - GAP_RIGHT) / GAP_RAMP, 0, 1));
  return 1 - head * (1 - tail);
}

function noise1(x: number, seed: number) {
  return Math.sin(x * 0.5 + seed) * 0.5 + Math.sin(x * 1.3 + seed * 1.7) * 0.3;
}

function waveY(x: number, layer: Layer, a: number, travel: number, seed: number) {
  const phase = x * 0.022 - travel;
  const waves =
    Math.sin(phase) * 0.6 +
    Math.sin(phase * 0.53 + 2.1) * 0.35 +
    Math.sin(phase * 0.27 + 4.4) * 0.18;
  const shape = noise1(x * 0.12, seed);
  return MID - waves * layer.amp * a * (0.7 + 0.6 * shape) * gapEnvelope(x);
}

function lineD(layer: Layer, a: number, travel: number, seed: number) {
  let d = "";
  for (let x = 0; x <= W; x += STEP) {
    d += `${x === 0 ? "M" : "L"}${x},${waveY(x, layer, a, travel, seed).toFixed(1)}`;
  }
  return d;
}

function ribbonD(a: number, travel: number, seed: number) {
  const front = LAYERS[LAYERS.length - 1];
  return `${lineD(front, a, travel, seed)} L${W},${H} L0,${H} Z`;
}

export default function useLatencyWave() {
  const waveRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = waveRef.current;
    if (!svg) return;

    const ribbon = svg.querySelector<SVGPathElement>("[data-latency-ribbon]");
    const lines = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-latency-line]"),
    );
    if (!ribbon || lines.length === 0) return;

    const t = {
      travel: 0,
      amp: 0.5,
      seed: Math.random() * 1000,
    };

    const draw = () => {
      const a = clamp(t.amp, 0.2, 1);
      ribbon.setAttribute("d", ribbonD(a, t.travel, t.seed));
      LAYERS.forEach((layer, i) => {
        const el = lines[i];
        if (!el) return;
        el.setAttribute("d", lineD(layer, a, t.travel, t.seed));
      });
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      t.amp = 0.45;
      draw();
      return;
    }

    let frame = 0;
    let last = performance.now();
    let ampTarget = t.amp;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t.travel += dt * 2.8;
      ampTarget = 0.5 + Math.sin(now * 0.0006 + t.seed) * 0.3;
      t.amp += (ampTarget - t.amp) * Math.min(1, dt * 1.4);
      draw();
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return { waveRef };
}