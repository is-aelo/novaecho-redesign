"use client";

import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import useTimelineReveal, { TOTAL_STEPS } from "./useTimelineReveal";

const W = 480;
const H = 112;
const HEADER_Y = 24;
const FLOW_Y = 62;
const ROW_Y = [46, 62, 78];
const RULER_Y = 88;
const RULER_LABEL_Y = 97;

const COLUMNS = [
  {
    dotX: 120,
    labX: 132,
    anchor: "start" as const,
    header: "DAY 1 · 0–24H",
    steps: [
      { label: "Bring number", done: true },
      { label: "Import playbook", done: true },
      { label: "Connect CRM", done: true },
    ],
  },
  {
    dotX: 360,
    labX: 348,
    anchor: "end" as const,
    header: "DAY 2 · 24–48H",
    steps: [
      { label: "Train on calls", done: true },
      { label: "Run test calls", done: true },
      { label: "Human QA pass", done: true },
    ],
  },
];

const RULER = [
  { x: 100, label: "0h" },
  { x: 240, label: "24h" },
  { x: 380, label: "48h" },
];

export default function BenchTimelineVisual() {
  const { visibleSteps, reducedMotion } = useTimelineReveal();

  let globalStep = 0;
  const sending = !reducedMotion && visibleSteps >= TOTAL_STEPS;

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900">
      <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-2.5">
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <p className="console-panel-head">Implementation Sprint</p>
      </div>

      <div className="flex items-center justify-center px-4 py-6">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full"
          aria-hidden="true"
        >
          <BenchGrid dark />
          {COLUMNS.map((col) => (
            <g key={col.header}>
              <text
                x={col.labX}
                y={HEADER_Y}
                textAnchor={col.anchor}
                className="font-mono"
                fontSize="7"
                fill="var(--text-secondary-on-dark)"
                fillOpacity="0.9"
              >
                {col.header}
              </text>
              <line
                x1={col.dotX}
                y1={ROW_Y[0] + 3}
                x2={col.dotX}
                y2={ROW_Y[ROW_Y.length - 1] - 3}
                stroke="var(--text-secondary-on-dark)"
                strokeOpacity="0.3"
              />
              {col.steps.map((step, i) => {
                const stepIndex = globalStep;
                globalStep++;
                const revealed = stepIndex < visibleSteps;
                const isActive = revealed && stepIndex === visibleSteps - 1;
                const isComplete = step.done && revealed;
                return (
                  <g
                    key={step.label}
                    opacity={revealed ? (isActive ? 1 : 0.5) : 0}
                  >
                    <g transform={`translate(${col.dotX}, ${ROW_Y[i]})`}>
                      {step.done ? (
                        <>
                          <circle
                            cx="0"
                            cy="0"
                            r="3"
                            fill={
                              isComplete
                                ? "var(--status-green)"
                                : "var(--text-secondary-on-dark)"
                            }
                            fillOpacity={isComplete ? "0.85" : "0.5"}
                          />
                          <polyline
                            points="-1.5,0.4 -0.4,1.5 1.8,-1.2"
                            fill="none"
                            stroke={
                              isComplete
                                ? "var(--surface-900)"
                                : "var(--text-secondary-on-dark)"
                            }
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
                          stroke="var(--accent-purple-soft)"
                          strokeOpacity="0.6"
                        />
                      )}
                    </g>
                    <text
                      x={col.labX}
                      y={ROW_Y[i] + 4}
                      textAnchor={col.anchor}
                      className="font-mono"
                      fontSize="7"
                      fill={
                        isActive
                          ? "var(--accent-purple-soft)"
                          : isComplete
                            ? "var(--status-green)"
                            : "var(--text-secondary-on-dark)"
                      }
                      fillOpacity={isActive ? "1" : isComplete ? "0.8" : "0.5"}
                    >
                      {isActive && (
                        <tspan
                          fill="var(--accent-purple-soft)"
                          fillOpacity="0.5"
                        >
                          {"~$ "}
                        </tspan>
                      )}
                      {step.label}
                    </text>
                  </g>
                );
              })}
            </g>
          ))}

          <line
            x1="212"
            y1={FLOW_Y}
            x2="232"
            y2={FLOW_Y}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.32"
          />
          <polyline
            points="232,56 240,62 232,68"
            fill="none"
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.4"
          />
          <line
            x1="240"
            y1={FLOW_Y}
            x2="268"
            y2={FLOW_Y}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.32"
          />
          <line
            x1="368"
            y1={FLOW_Y}
            x2="384"
            y2={FLOW_Y}
            className="bench-send-line"
            data-send={sending}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.32"
            strokeDasharray="2 3"
          />

          <g className="bench-go-live" data-live={sending}>
            <rect
              x="388"
              y="54"
              width="16"
              height="16"
              rx="3"
              fill="var(--accent-purple-soft)"
            />
            <text
              x="412"
              y="66"
              className="font-mono font-medium"
              fontSize="9"
              fill="var(--accent-purple-soft)"
            >
              GO LIVE
            </text>
          </g>

          <line
            x1="100"
            y1={RULER_Y}
            x2="380"
            y2={RULER_Y}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.2"
          />
          {RULER.map((t) => (
            <line
              key={t.x}
              x1={t.x}
              y1={RULER_Y}
              x2={t.x}
              y2={RULER_Y + 5}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.3"
            />
          ))}
          {RULER.map((t) => (
            <text
              key={t.x}
              x={t.x}
              y={RULER_LABEL_Y}
              textAnchor="middle"
              className="font-mono"
              fontSize="7"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.7"
            >
              {t.label}
            </text>
          ))}
        </svg>
        <BenchGrain />
      </div>
    </div>
  );
}