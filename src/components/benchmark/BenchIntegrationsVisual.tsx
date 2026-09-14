"use client";

import { useRef } from "react";
import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import { useBenchCurveReveal } from "./useBenchCurveReveal";

const W = 480;
const H = 280;

const nodes = [
  { d: [110, 108], t: [96, 112], anchor: "end" as const, label: "CRM" },
  { d: [110, 184], t: [96, 188], anchor: "end" as const, label: "SMS" },
  { d: [370, 108], t: [382, 112], anchor: "start" as const, label: "EMAIL" },
  { d: [370, 184], t: [382, 188], anchor: "start" as const, label: "CALENDAR" },
  { d: [240, 238], t: [240, 262], anchor: "middle" as const, label: "OTHER TOOLS" },
];

const spokes: Array<Array<[number, number]>> = [
  [
    [238, 136],
    [113, 108],
  ],
  [
    [238, 152],
    [113, 184],
  ],
  [
    [242, 136],
    [367, 108],
  ],
  [
    [242, 152],
    [367, 184],
  ],
  [
    [240, 154],
    [240, 234],
  ],
];

export default function BenchIntegrationsVisual() {
  const svgRef = useRef<SVGSVGElement>(null);
  useBenchCurveReveal(svgRef);

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900 px-4 py-5">
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
            y="36"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.9"
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
              strokeOpacity="0.45"
              pathLength="1"
              data-curve
            />
          ))}
          <text
            x="240"
            y="118"
            textAnchor="middle"
            className="bench-t4 font-mono font-medium"
            fill="var(--accent-purple-soft)"
          >
            Nova Echo
          </text>
          <rect
            x="228"
            y="128"
            width="24"
            height="24"
            rx="5"
            fill="var(--accent-purple-soft)"
          />
          {nodes.map((node) => (
            <g key={node.label}>
              <circle
                cx={node.d[0]}
                cy={node.d[1]}
                r="3.5"
                fill="var(--text-secondary-on-dark)"
                fillOpacity="0.7"
              />
              <text
                x={node.t[0]}
                y={node.t[1]}
                textAnchor={node.anchor}
                className="bench-t3 font-mono"
                fill="var(--text-secondary-on-dark)"
                fillOpacity="0.95"
              >
                {node.label}
              </text>
            </g>
          ))}
          <text
            x="440"
            y="272"
            textAnchor="end"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.85"
          >
            5 shown · 3,000+ available
          </text>
        </svg>
        <BenchGrain />
      </div>
    </div>
  );
}