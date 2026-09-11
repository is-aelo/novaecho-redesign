"use client";

import { useId, useRef } from "react";
import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import { useBenchCurveReveal } from "./useBenchCurveReveal";

const W = 480;
const H = 112;

const incoming: Array<[number, number]> = [
  [46, 32],
  [46, 48],
  [46, 64],
  [46, 80],
];
const outgoing: Array<[number, number]> = [
  [322, 68],
  [354, 40],
  [386, 56],
  [418, 72],
  [450, 48],
];

export default function BenchCallFlowVisual() {
  const arrowId = useId();
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
        <defs>
          <marker
            id={arrowId}
            markerWidth="6"
            markerHeight="6"
            refX="5"
            refY="3"
            orient="auto"
          >
            <path
              d="M0,0 L6,3 L0,6 Z"
              fill="var(--accent-purple-soft)"
              fillOpacity="0.5"
            />
          </marker>
        </defs>
        <BenchGrid dark />
        <text
          x="40"
          y="24"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-dark)"
          fillOpacity="0.75"
        >
          inbound
        </text>
        {incoming.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x - 14}
            cy={y}
            r="1.5"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.3"
          />
        ))}
        {incoming.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M ${x + 8},${y} C 110,${y} 178,${y} 207,48`}
            fill="none"
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.3"
            pathLength="1"
            data-curve
          />
        ))}
        {incoming.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.5"
          />
        ))}
        <rect
          x="205"
          y="40"
          width="16"
          height="16"
          rx="3"
          fill="var(--accent-purple-soft)"
        />
        <text
          x="236"
          y="34"
          className="font-mono font-medium"
          fontSize="16"
          fill="var(--accent-purple-soft)"
        >
          ≈1.5k / min
        </text>
        {outgoing.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M 221,48 C 268,48 296,${y} ${x - 7},${y}`}
            fill="none"
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.3"
            markerEnd={`url(#${arrowId})`}
            pathLength="1"
            data-curve
          />
        ))}
        {outgoing.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.5"
            fill="var(--accent-purple-soft)"
            fillOpacity="0.6"
          />
        ))}
        <text
          x="386"
          y="96"
          textAnchor="middle"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-dark)"
          fillOpacity="0.75"
        >
          distributed
        </text>
      </svg>
      <BenchGrain />
      </div>
    </div>
  );
}