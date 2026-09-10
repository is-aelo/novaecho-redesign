"use client";

const CORNERS = [
  "M 16 12 V 24 M 16 12 H 28",
  "M 464 12 V 24 M 464 12 H 452",
  "M 16 100 V 88 M 16 100 H 28",
  "M 464 100 V 88 M 464 100 H 452",
];

export default function BenchGrid() {
  return (
    <g aria-hidden="true">
      {[28, 56, 84].map((y) => (
        <line
          key={y}
          x1="16"
          y1={y}
          x2="464"
          y2={y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.04"
        />
      ))}
      {CORNERS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.18"
        />
      ))}
    </g>
  );
}