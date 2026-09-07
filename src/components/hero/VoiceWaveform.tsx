"use client";

import { useEffect, useRef } from "react";
import type { VoicePhase } from "./useVoiceCall";

const W = 1200;
const H = 360;
const MID = H / 2;
const STEP = 6;
const BARS = 84;
const TICKS = 56;

type EngineParams = {
  amp: number;
  speed: number;
  chop: number;
  bars: number;
};

const PHASE_PARAMS: Record<VoicePhase, EngineParams> = {
  idle: { amp: 0.1, speed: 0.35, chop: 0.1, bars: 0.25 },
  listening: { amp: 0.22, speed: 0.8, chop: 0.45, bars: 0.5 },
  processing: { amp: 0.16, speed: 1.4, chop: 0.12, bars: 0.35 },
  speaking: { amp: 0.4, speed: 1.6, chop: 0.35, bars: 0.7 },
  action: { amp: 0.26, speed: 1.0, chop: 0.25, bars: 0.5 },
  complete: { amp: 0.12, speed: 0.5, chop: 0.12, bars: 0.3 },
};

function voice(x: number, t: number, seed: number, chop: number): number {
  const slow = Math.sin(x * 0.006 + t * 1.1 + seed * 2.1) * 0.55;
  const mid = Math.sin(x * 0.017 - t * 1.7 + seed * 1.3) * 0.3;
  const rough =
    Math.sin(x * 0.09 + t * 3.3 + seed) *
    Math.sin(x * 0.023 - t * 1.9) *
    chop *
    2.2;
  return slow + mid + rough;
}

function envelope(x: number): number {
  const dx = (x - W / 2) / (W / 2);
  return Math.exp(-dx * dx * 1.6) * 0.85 + 0.15;
}

type VoiceWaveformProps = {
  phase: VoicePhase;
  reducedMotion: boolean;
  energy?: { amp: number; speed: number };
  compact?: boolean;
};

export default function VoiceWaveform({
  phase,
  reducedMotion,
  energy = { amp: 1, speed: 1 },
  compact = false,
}: VoiceWaveformProps) {
  const backRef = useRef<SVGPathElement>(null);
  const midRef = useRef<SVGPathElement>(null);
  const frontRef = useRef<SVGPathElement>(null);
  const barsRef = useRef<SVGPathElement>(null);
  const ticksRef = useRef<SVGPathElement>(null);
  const targetRef = useRef<EngineParams>(PHASE_PARAMS.idle);

  useEffect(() => {
    const base = PHASE_PARAMS[phase];
    targetRef.current = {
      ...base,
      amp: base.amp * energy.amp,
      speed: base.speed * energy.speed,
    };
  }, [phase, energy]);

  useEffect(() => {
    const back = backRef.current;
    const mid = midRef.current;
    const front = frontRef.current;
    const bars = barsRef.current;
    const ticks = ticksRef.current;
    if (!back || !mid || !front || !bars || !ticks) return;

    const current: EngineParams = { ...PHASE_PARAMS.idle };
    let t = 1.7;

    function setPath(el: SVGPathElement | null, d: string) {
      el?.setAttribute("d", d);
    }

    function draw() {
      const layers = [
        { el: back, seed: 0.7, scale: 1.15 },
        { el: mid, seed: 2.9, scale: 0.8 },
        { el: front, seed: 5.1, scale: 0.5 },
      ];

      for (const { el, seed, scale } of layers) {
        let d = "";
        for (let x = 0; x <= W; x += STEP) {
          const y =
            MID +
            voice(x, t, seed, current.chop) *
              current.amp *
              H *
              scale *
              envelope(x);
          d += `${x === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }
        setPath(el, d);
      }

      let barPath = "";
      const barZone = W * 0.46;
      const barStart = (W - barZone) / 2;
      const barWidth = barZone / BARS;
      for (let i = 0; i < BARS; i++) {
        const x = barStart + i * barWidth + barWidth * 0.2;
        const w = Math.max(1, barWidth * 0.6);
        const h = Math.min(
          H * 0.82,
          Math.abs(voice(x, t, 3.7, current.chop)) *
            current.amp *
            H *
            current.bars *
            2.4 +
            2
        );
        barPath += `M${x.toFixed(1)},${(MID - h / 2).toFixed(1)}h${w.toFixed(1)}v${h.toFixed(1)}h${(-w).toFixed(1)}Z`;
      }
      setPath(bars, barPath);

      let tickPath = "";
      for (let i = 0; i < TICKS; i++) {
        const x = (W / (TICKS - 1)) * i;
        const len =
          5 + Math.abs(voice(x, t, 8.4, current.chop)) * current.amp * 46;
        tickPath += `M${x.toFixed(1)},${(MID - len).toFixed(1)}V${(MID + len).toFixed(1)}`;
      }
      setPath(ticks, tickPath);
    }

    if (reducedMotion) {
      Object.assign(current, PHASE_PARAMS.idle);
      draw();
      return;
    }

    let frame = 0;
    let last = performance.now();

    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = targetRef.current;
      const ease = 1 - Math.exp(-dt * 2.2);
      current.amp += (target.amp - current.amp) * ease;
      current.speed += (target.speed - current.speed) * ease;
      current.chop += (target.chop - current.chop) * ease;
      current.bars += (target.bars - current.bars) * ease;
      t += dt * current.speed * 2.4;
      draw();
      frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className={compact ? "voice-wave-svg voice-wave-compact" : "voice-wave-svg"}
      role="img"
      aria-label="Animated visualization of a live AI voice call"
    >
      <defs>
        <linearGradient id="voice-bar-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-sky)" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="var(--accent-cyan)" stopOpacity="0.9" />
          <stop offset="1" stopColor="var(--accent-sky)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="voice-edge-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.08" stopColor="#000" stopOpacity="1" />
          <stop offset="0.92" stopColor="#000" stopOpacity="1" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <mask id="voice-fade-mask">
          <rect x="0" y="0" width={W} height={H} fill="url(#voice-edge-fade)" />
        </mask>
        <filter
          id="voice-grain"
          x="0"
          y="0"
          width="100%"
          height="100%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="2"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0"
          />
        </filter>
      </defs>

      <g mask="url(#voice-fade-mask)">
        <path
          ref={ticksRef}
          d=""
          fill="none"
          stroke="var(--accent-sky)"
          strokeWidth="1"
          opacity="0.14"
        />
        <path
          ref={backRef}
          d=""
          fill="none"
          stroke="var(--accent-sky)"
          strokeWidth="1.25"
          strokeLinecap="round"
          opacity="0.22"
        />
        <path
          ref={midRef}
          d=""
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.32"
        />
        <path
          ref={barsRef}
          d=""
          fill="url(#voice-bar-fill)"
          opacity="0.55"
        />
        <path
          ref={frontRef}
          d=""
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="1.75"
          strokeLinecap="round"
          opacity="0.6"
        />
        <rect
          x="0"
          y="0"
          width={W}
          height={H}
          filter="url(#voice-grain)"
          opacity="0.07"
        />
      </g>
    </svg>
  );
}
