"use client";

import BenchGrain from "./BenchGrain";

const W = 480;
const H = 96;

type Node = { x: number; y: number; label: string; anchor: "start" | "end" };

const nodes: Node[] = [
  { x: 114, y: 34, label: "CRM", anchor: "start" },
  { x: 114, y: 70, label: "SMS", anchor: "start" },
  { x: 366, y: 34, label: "EMAIL", anchor: "end" },
  { x: 366, y: 52, label: "CALENDAR", anchor: "end" },
  { x: 342, y: 78, label: "OTHER TOOLS", anchor: "end" },
];

const spokes: Array<[string, number, number]> = [
  ["M 229,44 C 160,44 150,34 116,34", 114, 34],
  ["M 229,52 C 160,52 152,70 116,70", 114, 70],
  ["M 251,44 C 320,44 322,34 362,34", 366, 34],
  ["M 251,52 C 322,52 324,52 362,52", 366, 52],
  ["M 251,60 C 306,60 318,76 340,78", 342, 78],
];

export default function BenchIntegrationsVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        {spokes.map(([d]) => (
          <path
            key={d}
            d={d}
            fill="none"
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.28"
          />
        ))}
        {nodes.map((node) => (
          <circle
            key={node.label}
            cx={node.x}
            cy={node.y}
            r="3"
            fill="var(--text-secondary-on-light)"
            fillOpacity="0.55"
          />
        ))}
        <text
          x="240"
          y="28"
          textAnchor="middle"
          className="font-mono"
          fontSize="11"
          fill="var(--accent-purple)"
        >
          Nova Echo
        </text>
        <rect
          x="229"
          y="37"
          width="22"
          height="22"
          rx="4"
          fill="var(--accent-purple)"
        />
        {nodes.map((node) => (
          <text
            key={node.label}
            x={node.anchor === "start" ? node.x + 12 : node.x - 14}
            y={node.anchor === "start" ? node.y + 5 : node.y + 5}
            textAnchor={node.anchor}
            className="font-mono"
            fontSize="12"
            fill="var(--text-secondary-on-light)"
          >
            {node.label}
          </text>
        ))}
      </svg>
      <BenchGrain />
    </div>
  );
}