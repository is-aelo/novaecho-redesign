"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SVG_W = 1400;
const SVG_H = 900;
const BAR_W = 2;
const BAR_GAP = 1;
const BAR_STEP = BAR_W + BAR_GAP;
const VISIBLE_BARS = Math.ceil(SVG_W / BAR_STEP) + 3;
const CENTER_Y = SVG_H * 0.72;

const CYAN = "var(--accent-cyan, #22D3EE)";
const ELECTRIC_BLUE = "var(--accent-electric-blue, #3B82F6)";

const SMOOTH_RADIUS = 3;
const SMOOTH_SIGMA = 1.6;
const SMOOTH_KERNEL = Array.from(
  { length: SMOOTH_RADIUS * 2 + 1 },
  (_, i) => Math.exp(-((i - SMOOTH_RADIUS) ** 2) / (2 * SMOOTH_SIGMA * SMOOTH_SIGMA))
);
const SMOOTH_KERNEL_SUM = SMOOTH_KERNEL.reduce((a, b) => a + b, 0);

const clamp = (v: number, lo: number, hi: number) => (v < lo ? lo : v > hi ? hi : v);

type LayerConfig = {
  opacity: number;
  blurStd: number;
  scrollSpeed: number;
  maxAmp: number;
  minH: number;
  seed: number;
};

const LAYER_CONFIGS: LayerConfig[] = [
  { opacity: 0.9, blurStd: 0.4, scrollSpeed: 30, maxAmp: 46, minH: 2, seed: 11.3 },
  { opacity: 0.5, blurStd: 1.0, scrollSpeed: 22, maxAmp: 62, minH: 1.8, seed: 47.1 },
  { opacity: 0.22, blurStd: 1.8, scrollSpeed: 15, maxAmp: 80, minH: 1.4, seed: 83.7 },
];

class SpeechEngine {
  private speaking = false;
  private syllableTimer = 0;
  private syllableSpacing = 0.18;
  private syllablesLeft = 0;
  private decayTimer = 0;
  private decayDuration = 0.25;
  private amplitude = 0;
  private pauseTimer = 0;
  private pauseDuration = 1.2;
  private speechIntensity = 0.5;
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(elapsed: number, dt: number): number {
    if (this.speaking) {
      if (this.decayTimer > 0) {
        this.decayTimer -= dt;
        const progress = 1 - clamp(this.decayTimer / this.decayDuration, 0, 1);
        const envelope = Math.exp(-3.5 * progress);
        this.amplitude *= 0.94 + 0.05 * Math.sin(elapsed * 4.0 + this.seed);

        if (this.decayTimer <= 0) {
          this.speaking = false;
          this.pauseTimer = 0;
          this.pauseDuration = 0.3 + 0.7 * Math.abs(Math.sin(elapsed * 0.04 + this.seed));
        }

        return clamp(this.amplitude * envelope, 0, 1);
      }

      this.syllableTimer += dt;
      if (this.syllableTimer >= this.syllableSpacing) {
        this.syllableTimer -= this.syllableSpacing;
        this.syllablesLeft--;
        if (this.syllablesLeft <= 0) {
          this.decayTimer = this.decayDuration;
        }
      }

      const pos = clamp(this.syllableTimer / this.syllableSpacing, 0, 1);
      const syllableEnv = Math.exp(-((pos - 0.3) ** 2) / 0.06);
      const emphasis = 0.55 + 0.45 * Math.abs(Math.sin(elapsed * 0.8 + this.seed * 2));
      const micro = 0.9 + 0.1 * Math.sin(elapsed * 13 + this.seed * 3);
      return clamp(this.amplitude * syllableEnv * emphasis * micro, 0, 1);
    }

    this.pauseTimer += dt;
    if (this.pauseTimer >= this.pauseDuration) {
      this.speaking = true;
      this.syllableTimer = 0;
      this.syllableSpacing = 0.14 + 0.16 * Math.abs(Math.sin(elapsed * 0.035 + this.seed));
      this.syllablesLeft = Math.round(3 + 14 * Math.abs(Math.sin(elapsed * 0.02 + this.seed * 1.3)));
      this.decayTimer = 0;
      this.decayDuration = 0.2 + 0.25 * Math.abs(Math.sin(elapsed * 0.03 + this.seed * 0.7));
      this.speechIntensity = 0.25 + 0.55 * Math.abs(Math.sin(elapsed * 0.015 + this.seed * 2.1));
    }

    const target = this.speaking ? this.speechIntensity : 0.012;
    this.amplitude += (target - this.amplitude) * clamp(dt * 7, 0, 0.3);
    return clamp(this.amplitude, 0, 1);
  }
}

function spatialSmooth(src: Float32Array, dst: Float32Array, count: number) {
  for (let i = 0; i < count; i++) {
    let sum = 0;
    for (let k = -SMOOTH_RADIUS; k <= SMOOTH_RADIUS; k++) {
      const idx = clamp(i + k, 0, count - 1);
      sum += src[idx] * SMOOTH_KERNEL[k + SMOOTH_RADIUS];
    }
    dst[i] = sum / SMOOTH_KERNEL_SUM;
  }
}

export default function HeroBackground() {
  const layerGroupsRef = useRef<SVGGElement[]>([]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const groups = layerGroupsRef.current;

    const engines: SpeechEngine[] = [];
    const rawBuffers: Float32Array[] = [];
    const smoothBuffers: Float32Array[] = [];
    const scrollAcc: number[] = [];
    const barElements: SVGRectElement[][] = [];

    LAYER_CONFIGS.forEach((cfg, layerIdx) => {
      const group = groups[layerIdx];
      if (!group) return;

      engines[layerIdx] = new SpeechEngine(cfg.seed);
      rawBuffers[layerIdx] = new Float32Array(VISIBLE_BARS).fill(0.02);
      smoothBuffers[layerIdx] = new Float32Array(VISIBLE_BARS).fill(0.02);
      scrollAcc[layerIdx] = 0;

      const bars: SVGRectElement[] = [];
      for (let i = 0; i < VISIBLE_BARS; i++) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", String(BAR_W));
        rect.setAttribute("rx", String(BAR_W / 2));
        rect.setAttribute("fill", "url(#waveGrad)");
        rect.setAttribute("shape-rendering", "geometricPrecision");
        group.appendChild(rect);
        bars.push(rect);
      }
      barElements[layerIdx] = bars;
    });

    const render = () => {
      LAYER_CONFIGS.forEach((cfg, layerIdx) => {
        const bars = barElements[layerIdx];
        const smooth = smoothBuffers[layerIdx];
        const off = scrollAcc[layerIdx];
        if (!bars || !smooth) return;

        for (let i = 0; i < VISIBLE_BARS; i++) {
          const val = smooth[i];
          const shaped = val * val * (3 - 2 * val);
          const h = Math.max(cfg.minH, shaped * cfg.maxAmp);
          const x = i * BAR_STEP - off;
          const y = CENTER_Y - h / 2;
          const barOpacity = clamp(0.05 + shaped * cfg.opacity * 0.95, 0.03, 1);
          const bar = bars[i];
          bar.setAttribute("x", x.toFixed(2));
          bar.setAttribute("y", y.toFixed(2));
          bar.setAttribute("height", h.toFixed(2));
          bar.setAttribute("opacity", barOpacity.toFixed(3));
        }
      });
    };

    let prevTime = -1;

    const tick = (time: number) => {
      const elapsed = time * 0.001;
      if (prevTime < 0) {
        prevTime = elapsed;
        render();
        return;
      }
      const dt = clamp(elapsed - prevTime, 0.001, 0.1);
      prevTime = elapsed;

      LAYER_CONFIGS.forEach((cfg, layerIdx) => {
        const engine = engines[layerIdx];
        const raw = rawBuffers[layerIdx];
        const smooth = smoothBuffers[layerIdx];
        if (!engine || !raw || !smooth) return;

        scrollAcc[layerIdx] += cfg.scrollSpeed * dt;
        let shifted = false;

        while (scrollAcc[layerIdx] >= BAR_STEP) {
          scrollAcc[layerIdx] -= BAR_STEP;
          raw.copyWithin(0, 1);
          raw[VISIBLE_BARS - 1] = engine.next(elapsed, BAR_STEP / cfg.scrollSpeed);
          shifted = true;
        }

        if (shifted) {
          spatialSmooth(raw, smooth, VISIBLE_BARS);
        }
      });

      render();
    };

    tick(0);
    if (!reduced) gsap.ticker.add(tick);

    return () => {
      gsap.ticker.remove(tick);
      LAYER_CONFIGS.forEach((_, i) => {
        groups[i]?.replaceChildren();
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
        className="absolute inset-x-0 bottom-0 w-full"
        style={{ height: "min(50vh, 600px)" }}
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={CYAN} />
            <stop offset="100%" stopColor={ELECTRIC_BLUE} />
          </linearGradient>

          <linearGradient id="fadeMask" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor="white" stopOpacity="1" />
            <stop offset="95%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>

          <mask id="edgeFade">
            <rect x="0" y="0" width={SVG_W} height={SVG_H} fill="url(#fadeMask)" />
          </mask>

          <filter id="glowFront" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation={LAYER_CONFIGS[0].blurStd} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowMid" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation={LAYER_CONFIGS[1].blurStd} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="glowBack" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={LAYER_CONFIGS[2].blurStd} result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g mask="url(#edgeFade)">
          {LAYER_CONFIGS.map((cfg, i) => (
            <g
              key={i}
              ref={(el) => {
                if (el) layerGroupsRef.current[i] = el;
              }}
              opacity={cfg.opacity}
              filter={i === 0 ? "url(#glowFront)" : i === 1 ? "url(#glowMid)" : "url(#glowBack)"}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}