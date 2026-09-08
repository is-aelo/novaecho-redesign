"use client";

import { useEffect, useRef } from "react";

const W = 1600;
const H = 96;
const MID = H * 0.78;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

type Layer = {
  amp: number;
};

const LAYERS: Layer[] = [{ amp: 26 }, { amp: 19 }, { amp: 13 }];

export default function useHeroWave(reducedMotion: boolean) {
  const waveRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = waveRef.current;
    if (!svg) return;

    const paths = Array.from(
      svg.querySelectorAll<SVGPathElement>("[data-fill], [data-wave]")
    );
    if (paths.length === 0) return;

    const STEP = 10;
    const t = {
      travel: 0,
      amp: 0.5,
      seed: Math.random() * 1000,
    };

    function noise1(x: number, seed: number) {
      return Math.sin(x * 0.5 + seed) * 0.5 + Math.sin(x * 1.3 + seed * 1.7) * 0.3;
    }

    function waveY(x: number, layer: Layer, a: number) {
      const phase = x * 0.022 - t.travel;
      const waves =
        Math.sin(phase) * 0.6 +
        Math.sin(phase * 0.53 + 2.1) * 0.35 +
        Math.sin(phase * 0.27 + 4.4) * 0.18;
      const shape = noise1(x * 0.12, t.seed);
      return MID - waves * layer.amp * a * (0.7 + 0.6 * shape);
    }

    function drawPath(el: SVGPathElement, layer: Layer, a: number) {
      let d = "";
      for (let x = 0; x <= W; x += STEP) {
        d += `${x === 0 ? "M" : "L"}${x},${waveY(x, layer, a).toFixed(1)}`;
      }
      el.setAttribute("d", d);
    }

    function draw() {
      const a = clamp(t.amp, 0.2, 1);
      const front = LAYERS[LAYERS.length - 1];
      const ribbon = paths[0];
      if (ribbon) {
        let d = "";
        for (let x = 0; x <= W; x += STEP) {
          d += `${x === 0 ? "M" : "L"}${x},${waveY(x, front, a).toFixed(1)}`;
        }
        d += ` L${W},${H} L0,${H} Z`;
        ribbon.setAttribute("d", d);
      }
      LAYERS.forEach((layer, i) => {
        const el = paths[i + 1];
        if (!el) return;
        drawPath(el, layer, a);
      });
    }

    if (reducedMotion) {
      t.amp = 0.45;
      draw();
      return;
    }

    let frame = 0;
    let last = performance.now();
    let ampTarget = t.amp;

    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t.travel += dt * 2.8;
      ampTarget = 0.5 + Math.sin(now * 0.0006 + t.seed) * 0.3;
      t.amp += (ampTarget - t.amp) * Math.min(1, dt * 1.4);
      draw();
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return { waveRef };
}
