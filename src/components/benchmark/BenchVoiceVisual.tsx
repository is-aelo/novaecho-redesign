"use client";

import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";

const W = 480;
const H = 112;
const X0 = 20;
const X1 = 460;
const BASE_Y = 66;
const AMP = 24;

type Burst = {
  c: number;
  a: number;
  w: number;
  attack: number;
  release: number;
};

const BURSTS: Burst[] = [
  { c: 46, a: 0.92, w: 21, attack: 0.85, release: 1.4 },
  { c: 96, a: 0.56, w: 25, attack: 1.0, release: 1.15 },
  { c: 148, a: 0.84, w: 19, attack: 0.8, release: 1.55 },
  { c: 216, a: 0.52, w: 27, attack: 1.15, release: 1.1 },
  { c: 264, a: 0.96, w: 23, attack: 0.75, release: 1.5 },
  { c: 334, a: 0.86, w: 22, attack: 0.9, release: 1.35 },
  { c: 394, a: 0.48, w: 24, attack: 1.05, release: 1.3 },
];

function sample(x: number) {
  let env = 0;
  for (const b of BURSTS) {
    const d = (x - b.c) / b.w;
    const s = d < 0 ? b.attack : b.release;
    env += b.a * Math.exp(-((d / s) * (d / s)));
  }
  const edge = Math.min(1, (x - X0) / 60) * Math.min(1, (X1 - x) / 60);
  const carrier =
    0.52 * Math.sin((x - X0) * 0.058 + 0.8) +
    0.34 * Math.sin((x - X0) * 0.127 + 2.1) +
    0.14 * Math.sin((x - X0) * 0.029 + 4.2);
  return {
    y: BASE_Y - AMP * edge * env * carrier,
    rms: BASE_Y - AMP * 0.5 * edge * env,
  };
}

function build() {
  const wave: Array<[number, number]> = [];
  const rms: Array<[number, number]> = [];
  for (let x = X0; x <= X1; x += 2) {
    const p = sample(x);
    wave.push([x, p.y]);
    rms.push([x, p.rms]);
  }
  return { wave, rms };
}

const line = (pts: Array<[number, number]>) =>
  pts.map(([x, y]) => `${x},${y.toFixed(1)}`).join(" ");

const area = (pts: Array<[number, number]>) =>
  `M ${X0},${BASE_Y} L ${line(pts)} L ${X1},${BASE_Y} Z`;

const TIME_TICKS = [20, 80, 140, 200, 260, 320, 380, 440];
const AMP_TICKS = [44, 66, 88];

export default function BenchVoiceVisual() {
  const { wave, rms } = build();

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <BenchGrid />
        <text
          x="40"
          y="28"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.5"
        >
          voice · natural prosody
        </text>
        {AMP_TICKS.map((y) => (
          <line
            key={y}
            x1={X0}
            y1={y}
            x2={X0 + 8}
            y2={y}
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.15"
          />
        ))}
        <path
          d={area(wave)}
          fill="var(--accent-purple)"
          fillOpacity="0.04"
        />
        <polyline
          points={line(rms)}
          fill="none"
          stroke="var(--accent-purple)"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
        <polyline
          points={line(wave)}
          fill="none"
          stroke="var(--accent-purple)"
          strokeOpacity="0.5"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <line
          x1={X0}
          y1="100"
          x2={X1}
          y2="100"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.2"
        />
        {TIME_TICKS.map((x) => (
          <line
            key={x}
            x1={x}
            y1="100"
            x2={x}
            y2="104"
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.3"
          />
        ))}
        {TIME_TICKS.map((x, i) => (
          <text
            key={x}
            x={x}
            y="108"
            className="font-mono"
            fontSize="8"
            fill="var(--text-secondary-on-light)"
            fillOpacity="0.45"
          >
            {i}s
          </text>
        ))}
      </svg>
      <BenchGrain />
    </div>
  );
}