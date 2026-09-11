"use client";

import { useRef } from "react";
import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import { useBenchCurveReveal } from "./useBenchCurveReveal";

const W = 480;
const H = 112;

const nodes = [
  { d: [110, 34], t: [96, 39], anchor: "end" as const, label: "CRM" },
  { d: [110, 62], t: [96, 67], anchor: "end" as const, label: "SMS" },
  { d: [370, 34], t: [382, 39], anchor: "start" as const, label: "EMAIL" },
  { d: [370, 62], t: [382, 67], anchor: "start" as const, label: "CALENDAR" },
  { d: [240, 80], t: [240, 96], anchor: "middle" as const, label: "OTHER TOOLS" },
];

const spokes: Array<Array<[number, number]>> = [
  [
    [234, 43],
    [116, 34],
  ],
  [
    [234, 53],
    [116, 62],
  ],
  [
    [246, 43],
    [364, 34],
  ],
  [
    [246, 53],
    [364, 62],
  ],
  [
    [240, 59],
    [240, 77],
  ],
];

export default function BenchIntegrationsVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  useBenchCurveReveal(svgRef);

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900 px-4 py-4">
      <div className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <BenchGrid dark />
        <text
          x="40"
          y="28"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-dark)"
          fillOpacity="0.75"
        >
          integrations · api
        </text>
        {spokes.map(([[x1, y1], [x2, y2]]) => (
          <line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.28"
            pathLength="1"
            data-curve
          />
        ))}
        <text
          x="240"
          y="30"
          textAnchor="middle"
          className="font-mono font-medium"
          fontSize="16"
          fill="var(--accent-purple-soft)"
        >
          Nova Echo
        </text>
        <rect
          x="229"
          y="37"
          width="22"
          height="22"
          rx="4"
          fill="var(--accent-purple-soft)"
        />
        {nodes.map((node) => (
          <g key={node.label}>
            <circle
              cx={node.d[0]}
              cy={node.d[1]}
              r="3"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.55"
            />
            <text
              x={node.t[0]}
              y={node.t[1]}
              textAnchor={node.anchor}
              className="font-mono"
              fontSize="10"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.9"
            >
              {node.label}
            </text>
          </g>
        ))}
        <text
          x="460"
          y="110"
          textAnchor="end"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-dark)"
          fillOpacity="0.7"
        >
          5 shown · 3,000+ available
        </text>
      </svg>
      <BenchGrain />
      </div>
    </div>
  );
}