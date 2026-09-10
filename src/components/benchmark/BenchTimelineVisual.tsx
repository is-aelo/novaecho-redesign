"use client";

import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";

const W = 480;
const H = 112;
const FLOW_Y = 64;
const ROW_Y = [50, 64, 78];

const COLUMNS = [
  {
    headerX: 146,
    dotX: 92,
    labX: 104,
    header: "DAY 1 · 0–24H",
    steps: [
      { label: "Bring number", done: true },
      { label: "Import playbook", done: true },
      { label: "Connect CRM", done: true },
    ],
  },
  {
    headerX: 318,
    dotX: 270,
    labX: 282,
    header: "DAY 2 · 24–48H",
    steps: [
      { label: "Train on calls", done: true },
      { label: "Run test calls", done: true },
      { label: "Human QA pass", done: false },
    ],
  },
];

const RULER = [
  { x: 92, label: "0h" },
  { x: 254, label: "24h" },
  { x: 416, label: "48h" },
];

export default function BenchTimelineVisual() {
  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full"
        aria-hidden="true"
      >
        <BenchGrid />
        <text
          x="40"
          y="28"
          className="font-mono"
          fontSize="8"
          fill="var(--text-secondary-on-light)"
          fillOpacity="0.5"
        >
          implementation · sprint board
        </text>
        {COLUMNS.map((col) => (
          <g key={col.header}>
            <text
              x={col.headerX}
              y="40"
              textAnchor="middle"
              className="font-mono"
              fontSize="10"
              fill="var(--text-secondary-on-light)"
              fillOpacity="0.7"
            >
              {col.header}
            </text>
            <line
              x1={col.dotX}
              y1={ROW_Y[0] + 3}
              x2={col.dotX}
              y2={ROW_Y[ROW_Y.length - 1] - 3}
              stroke="var(--text-secondary-on-light)"
              strokeOpacity="0.3"
            />
            {col.steps.map((step, i) => (
              <g key={step.label}>
                <g transform={`translate(${col.dotX}, ${ROW_Y[i]})`}>
                  {step.done ? (
                    <>
                      <circle
                        cx="0"
                        cy="0"
                        r="3"
                        fill="var(--text-secondary-on-light)"
                        fillOpacity="0.5"
                      />
                      <polyline
                        points="-1.5,0.4 -0.4,1.5 1.8,-1.2"
                        fill="none"
                        stroke="var(--text-secondary-on-light)"
                        strokeOpacity="0.9"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <circle
                      cx="0"
                      cy="0"
                      r="3"
                      fill="none"
                      stroke="var(--text-secondary-on-light)"
                      strokeOpacity="0.6"
                    />
                  )}
                </g>
                <text
                  x={col.labX}
                  y={ROW_Y[i] + 4}
                  className="font-mono"
                  fontSize="10"
                  fill="var(--text-secondary-on-light)"
                  fillOpacity="0.75"
                >
                  {step.label}
                </text>
              </g>
            ))}
          </g>
        ))}

        <line
          x1="200"
          y1={FLOW_Y}
          x2="217"
          y2={FLOW_Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.32"
        />
        <polyline
          points="217,58 224,64 217,70"
          fill="none"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.4"
        />
        <line
          x1="224"
          y1={FLOW_Y}
          x2="267"
          y2={FLOW_Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.32"
        />
        <line
          x1="366"
          y1={FLOW_Y}
          x2="394"
          y2={FLOW_Y}
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.32"
          strokeDasharray="2 3"
        />

        <rect
          x="396"
          y="56"
          width="16"
          height="16"
          rx="3"
          fill="var(--accent-purple)"
        />
        <text
          x="412"
          y="68"
          className="font-mono font-medium"
          fontSize="16"
          fill="var(--accent-purple)"
        >
          GO LIVE
        </text>

        <line
          x1="92"
          y1="98"
          x2="416"
          y2="98"
          stroke="var(--text-secondary-on-light)"
          strokeOpacity="0.2"
        />
        {RULER.map((t) => (
          <line
            key={t.x}
            x1={t.x}
            y1="98"
            x2={t.x}
            y2="103"
            stroke="var(--text-secondary-on-light)"
            strokeOpacity="0.3"
          />
        ))}
        {RULER.map((t) => (
          <text
            key={t.x}
            x={t.x}
            y="110"
            textAnchor="middle"
            className="font-mono"
            fontSize="8"
            fill="var(--text-secondary-on-light)"
            fillOpacity="0.45"
          >
            {t.label}
          </text>
        ))}
      </svg>
      <BenchGrain />
    </div>
  );
}