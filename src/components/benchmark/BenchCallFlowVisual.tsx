"use client";

import BenchGrain from "./BenchGrain";

const W = 480;
const H = 96;

const incoming: Array<[number, number]> = [
  [36, 30],
  [36, 48],
  [36, 66],
];
const outgoing: Array<[number, number]> = [
  [330, 70],
  [366, 40],
  [402, 56],
  [438, 74],
  [444, 40],
];

export default function BenchCallFlowVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <path
          d="M 44,30 Q 130,26 199,48"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.3"
        />
        <path
          d="M 44,48 L 199,48"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.3"
        />
        <path
          d="M 44,66 Q 130,70 199,48"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.3"
        />
        {incoming.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="3"
            fill="var(--text-secondary-on-light)"
            fillOpacity="0.45"
          />
        ))}
        <rect
          x="201"
          y="39"
          width="18"
          height="18"
          rx="3"
          fill="var(--accent-purple)"
        />
        {outgoing.map(([x, y]) => (
          <path
            key={`${x}-${y}`}
            d={`M 221,48 C 266,48 ${x < 380 ? 286 : 274},${y} ${x},${y}`}
            fill="none"
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.3"
          />
        ))}
        {outgoing.map(([x, y]) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r="2.5"
            fill="var(--accent-purple)"
            fillOpacity="0.55"
          />
        ))}
      </svg>
      <BenchGrain />
    </div>
  );
}