"use client";

import { useRef } from "react";
import useLatencyProof from "./useLatencyProof";

const CALLER_AMPS = [0, 5, 10, 14, 8, 0, 3, 7, 11, 6, 0];
const AI_AMPS = [0, 6, 11, 15, 9, 0, 4, 9, 12, 8, 0];

function buildLatencySegment(start: number, end: number, amps: number[]): string {
  const mid = 40;
  const span = end - start;
  const step = span / (amps.length - 1);
  const pts = amps.map((a, i) => ({ x: start + i * step, yTop: mid - a, yBot: mid + a }));

  let d = `M${pts[0].x} ${mid}`;
  for (let i = 1; i < pts.length; i += 1) {
    const p = pts[i];
    const pp = pts[i - 1];
    const hx = step * 0.5;
    d += ` C ${p.x - hx} ${pp.yTop}, ${p.x - hx} ${p.yTop}, ${p.x} ${p.yTop}`;
  }
  for (let i = pts.length - 1; i >= 1; i -= 1) {
    const p = pts[i];
    const pp = pts[i - 1];
    const hx = step * 0.5;
    d += ` C ${pp.x + hx} ${p.yBot}, ${pp.x + hx} ${pp.yBot}, ${pp.x} ${pp.yBot}`;
  }
  return `${d} Z`;
}

export default function LatencyPanel() {
  const scopeRef = useRef<HTMLDivElement>(null);
  useLatencyProof(scopeRef);

  const callerSeg = buildLatencySegment(0, 200, CALLER_AMPS);
  const aiSeg = buildLatencySegment(300, 480, AI_AMPS);

  return (
    <div
      ref={scopeRef}
      className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900"
    >
      <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-3">
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <p className="console-panel-head">Live call · Nova Echo</p>
        <span className="ml-auto flex items-center gap-2">
          <span className="hero-live-dot" data-active="true" aria-hidden="true" />
          <span className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple-soft">
            Low latency
          </span>
        </span>
      </div>

      <div className="grid grid-cols-1 items-center gap-6 px-4 py-5 md:px-6 md:py-6 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary">
            Low Latency
          </p>
          <p className="mt-2 text-body-sm leading-relaxed text-text-secondary">
            Conversations feel natural because responses arrive without the awkward
            pauses that make voice AI feel artificial.
          </p>
        </div>

        <div className="flex flex-col gap-1 border-t border-hairline-on-dark pt-5 lg:col-span-7 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div className="flex flex-col gap-1" data-latency-row="user">
            <span className="hero-speaker-tag">Caller</span>
            <p className="hero-speaker-text hero-speaker-text-sub">
              &ldquo;Can you book me for Friday?&rdquo;
            </p>
          </div>

          <svg
            viewBox="0 0 480 80"
            preserveAspectRatio="none"
            className="my-3 h-9 w-full"
            data-latency-wave
            aria-hidden="true"
          >
            <line x1="0" x2="480" y1="20" y2="20" className="stroke-white/5" strokeWidth="1" />
            <line x1="0" x2="480" y1="40" y2="40" className="stroke-white/5" strokeWidth="1" />
            <line x1="0" x2="480" y1="60" y2="60" className="stroke-white/5" strokeWidth="1" />
            <path
              d={callerSeg}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.5"
              className="fill-accent-purple-soft/10 stroke-accent-purple-soft/70"
              data-latency-curve="caller"
            />
            <path
              d={aiSeg}
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              strokeWidth="1.5"
              className="fill-accent-purple-soft/10 stroke-accent-purple-soft/70"
              data-latency-curve="ai"
            />
          </svg>

          <div className="flex flex-col gap-1" data-latency-row="ai">
            <span className="hero-speaker-tag hero-speaker-tag-ai">AI</span>
            <p className="hero-speaker-text">
              &ldquo;Absolutely. I have 9:30 a.m. available.&rdquo;
            </p>
          </div>

          <p className="intent-phase-chip mt-3 self-start" data-latency-status>
            Responding
          </p>
        </div>
      </div>
    </div>
  );
}