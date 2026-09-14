"use client";

const CORNERS = [
  "M 16 16 V 28 M 16 16 H 28",
  "M 464 16 V 28 M 464 16 H 452",
  "M 16 264 V 252 M 16 264 H 28",
  "M 464 264 V 252 M 464 264 H 452",
];

type BenchGridProps = {
  dark?: boolean;
};

export default function BenchGrid({ dark }: BenchGridProps) {
  const stroke = dark
    ? "var(--text-secondary-on-dark)"
    : "var(--text-secondary-on-light)";

  return (
    <g aria-hidden="true">
      {[70, 140, 210].map((y) => (
        <line
          key={y}
          x1="16"
          y1={y}
          x2="464"
          y2={y}
          stroke={stroke}
          strokeOpacity="0.06"
        />
      ))}
      {CORNERS.map((d) => (
        <path
          key={d}
          d={d}
          fill="none"
          stroke={stroke}
          strokeOpacity="0.22"
        />
      ))}
    </g>
  );
}