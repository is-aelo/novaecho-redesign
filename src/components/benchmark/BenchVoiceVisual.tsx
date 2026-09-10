"use client";

import BenchGrain from "./BenchGrain";

const W = 480;
const H = 96;
const BASE_Y = 62;
const FLOOR_Y = 92;
const AMP = 16;
const FREQ = 0.0357;

function sample(offset: number) {
  const pts: Array<[number, number]> = [];
  for (let x = 20; x <= 460; x += 14) {
    const edge = Math.min(1, (x - 20) / 70) * Math.min(1, (460 - x) / 70);
    const swell = 0.7 + 0.3 * Math.sin(x * 0.008);
    const y = BASE_Y - AMP * edge * swell * Math.sin((x - 20) * FREQ + offset);
    pts.push([x, y]);
  }
  return pts;
}

const line = (pts: Array<[number, number]>) =>
  pts.map(([x, y]) => `${x},${y.toFixed(1)}`).join(" ");

const area = (pts: Array<[number, number]>) =>
  `M 20,${BASE_Y} L ${line(pts)} L 460,${FLOOR_Y} L 20,${FLOOR_Y} Z`;

export default function BenchVoiceVisual() {
  const main = sample(0);
  const echo = sample(1.15);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <line
          x1="20"
          y1={BASE_Y}
          x2="460"
          y2={BASE_Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.18"
        />
        <path d={area(echo)} fill="var(--accent-purple)" fillOpacity="0.03" />
        <polyline
          points={line(echo)}
          fill="none"
          stroke="var(--accent-purple)"
          strokeOpacity="0.18"
          strokeWidth="1.25"
        />
        <path d={area(main)} fill="var(--accent-purple)" fillOpacity="0.05" />
        <polyline
          points={line(main)}
          fill="none"
          stroke="var(--accent-purple)"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
      <BenchGrain />
    </div>
  );
}