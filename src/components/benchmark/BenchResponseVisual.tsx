"use client";

import BenchGrain from "./BenchGrain";

const W = 480;
const H = 96;
const X0 = 52;
const X1 = 428;
const BASE_Y = 66;
const novaX = 238;

export default function BenchResponseVisual() {
  const toX = (ms: number) => X0 + ((X1 - X0) * ms) / 3000;
  const x1500 = toX(1500);
  const compStart = toX(2000);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <rect
          x={compStart}
          y="58"
          width={X1 - compStart}
          height="12"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.05"
        />
        <text
          x={(compStart + X1) / 2}
          y="50"
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.55"
        >
          Competitors 2000–3000ms
        </text>
        <line
          x1={X0}
          y1={BASE_Y}
          x2={X1}
          y2={BASE_Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.28"
        />
        <line
          x1={novaX}
          y1={BASE_Y - 10}
          x2={novaX}
          y2={BASE_Y}
          stroke="var(--accent-purple)"
          strokeOpacity="0.35"
        />
        <circle
          cx={novaX}
          cy={BASE_Y}
          r="4"
          fill="var(--accent-purple)"
        />
        <text
          x={novaX}
          y="36"
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          fill="var(--accent-purple)"
        >
          Nova Echo ≤1500ms
        </text>
        {[X0, x1500, X1].map((x) => (
          <line
            key={x}
            x1={x}
            y1={BASE_Y - 6}
            x2={x}
            y2={BASE_Y + 6}
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.4"
          />
        ))}
        <text
          x={X0}
          y="86"
          textAnchor="start"
          className="font-mono"
          fontSize="12"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.8"
        >
          0ms
        </text>
        <text
          x={x1500}
          y="86"
          textAnchor="middle"
          className="font-mono"
          fontSize="12"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.8"
        >
          1500ms
        </text>
        <text
          x={X1}
          y="86"
          textAnchor="end"
          className="font-mono"
          fontSize="12"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.8"
        >
          3000ms
        </text>
      </svg>
      <BenchGrain />
    </div>
  );
}