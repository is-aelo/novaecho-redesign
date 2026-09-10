"use client";

import BenchGrain from "./BenchGrain";

const W = 480;
const H = 96;
const Y = 58;

const stages = [
  { x: 112, label: "Build", accent: false },
  { x: 240, label: "Test", accent: false },
  { x: 368, label: "Launch", accent: true },
];

export default function BenchTimelineVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <line
          x1="96"
          y1={Y}
          x2="384"
          y2={Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.28"
        />
        <polyline
          points="176,52 182,58 176,64"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.4"
        />
        <polyline
          points="304,52 310,58 304,64"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.4"
        />
        {stages.map((stage) => (
          <g key={stage.label}>
            <circle
              cx={stage.x}
              cy={Y}
              r="4"
              fill={
                stage.accent
                  ? "var(--accent-purple)"
                  : "var(--text-secondary-on-light)"
              }
              fillOpacity={stage.accent ? "1" : "0.5"}
            />
            <text
              x={stage.x}
              y="80"
              textAnchor="middle"
              className="font-mono"
              fontSize="12"
              fill={
                stage.accent
                  ? "var(--accent-purple)"
                  : "var(--text-secondary-on-light)"
              }
            >
              {stage.label.toUpperCase()}
            </text>
          </g>
        ))}
      </svg>
      <BenchGrain />
    </div>
  );
}