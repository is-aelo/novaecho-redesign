"use client";

import { useId, useRef } from "react";
import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import { useBenchCurveReveal } from "./useBenchCurveReveal";

const W = 480;
const H = 280;

const incoming: Array<[number, number]> = [
  [46, 64],
  [46, 108],
  [46, 152],
  [46, 196],
];
const outgoing: Array<[number, number]> = [
  [322, 176],
  [354, 194],
  [386, 212],
  [418, 230],
  [450, 248],
];

const HUB = [221, 167];

export default function BenchCallFlowVisual() {
  const arrowId = useId();
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
          <defs>
            <marker
              id={arrowId}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path
                d="M0,0 L7,3.5 L0,7 Z"
                fill="var(--accent-purple-soft)"
                fillOpacity="0.7"
              />
            </marker>
          </defs>
          <BenchGrid dark />
          <text
            x="40"
            y="36"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.9"
          >
            inbound
          </text>
          {incoming.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x - 14}
              cy={y}
              r="2"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.45"
            />
          ))}
          {incoming.map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M ${x + 8},${y} C 110,${y} 178,${y} ${HUB[0] - 4},${HUB[1]}`}
              fill="none"
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.45"
              pathLength="1"
              data-curve
            />
          ))}
          {incoming.map(([x, y]) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r="3.5"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.65"
            />
          ))}
          <rect
            x="210"
            y="156"
            width="22"
            height="22"
            rx="5"
            fill="var(--accent-purple-soft)"
          />
          <text
            x="256"
            y="142"
            className="bench-t4 font-mono font-medium"
            fill="var(--accent-purple-soft)"
          >
            ≈1.5k / min
          </text>
          {outgoing.map(([x, y]) => (
            <path
              key={`${x}-${y}`}
              d={`M ${HUB[0] + 9},${HUB[1]} C 268,${HUB[1]} 296,${y} ${x - 8},${y}`}
              fill="none"
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.45"
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
              r="3"
              fill="var(--accent-purple-soft)"
              fillOpacity="0.75"
            />
          ))}
          <text
            x="440"
            y="272"
            textAnchor="end"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.9"
          >
            distributed
          </text>
        </svg>
        <BenchGrain />
      </div>
    </div>
  );
}