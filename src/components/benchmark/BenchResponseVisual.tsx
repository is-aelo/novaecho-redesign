"use client";

import { useRef } from "react";
import BenchGrain from "./BenchGrain";
import BenchGrid from "./BenchGrid";
import { useBenchCurveReveal } from "./useBenchCurveReveal";

const W = 480;
const H = 280;
const X0 = 56;
const X1 = 440;
const AXIS_Y = 240;

const toMsX = (ms: number) => X0 + ((X1 - X0) * ms) / 3000;

const NOVA_MEAN = 1385;
const NOVA_SD = 58;
const NOVA_AMP = 58;
const NOVA_P95 = NOVA_MEAN + 1.645 * NOVA_SD;
const COMP_MEAN = 2460;
const COMP_SD = 270;
const COMP_AMP = 44;

const novaY = (ms: number) =>
  AXIS_Y - NOVA_AMP * Math.exp(-0.5 * ((ms - NOVA_MEAN) / NOVA_SD) ** 2);
const compY = (ms: number) =>
  AXIS_Y - COMP_AMP * Math.exp(-0.5 * ((ms - COMP_MEAN) / COMP_SD) ** 2);

function buildPoints() {
  const nova: Array<[number, number]> = [];
  const comp: Array<[number, number]> = [];
  for (let ms = 1180; ms <= 1650; ms += 5) nova.push([toMsX(ms), novaY(ms)]);
  for (let ms = 1750; ms <= 3000; ms += 6) comp.push([toMsX(ms), compY(ms)]);
  return { nova, comp };
}

const pts = (list: Array<[number, number]>) =>
  list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");

const MINOR = [250, 750, 1250, 1750, 2250, 2750];
const MAJOR = [0, 500, 1000, 1500, 2000, 2500, 3000];

export default function BenchResponseVisual() {
  const { nova, comp } = buildPoints();
  const svgRef = useRef<SVGSVGElement>(null);
  const p95x = toMsX(NOVA_P95);
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
            latency · response
          </text>

          <path
            d={`M ${nova[0][0].toFixed(1)},${AXIS_Y} L ${pts(nova)} L ${nova[nova.length - 1][0].toFixed(1)},${AXIS_Y} Z`}
            fill="var(--accent-purple-soft)"
            fillOpacity="0.1"
          />
          <path
            d={`M ${comp[0][0].toFixed(1)},${AXIS_Y} L ${pts(comp)} L ${comp[comp.length - 1][0].toFixed(1)},${AXIS_Y} Z`}
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.08"
          />
          <polyline
            points={pts(comp)}
            fill="none"
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.5"
            strokeWidth="1"
            pathLength="1"
            data-curve
          />
          <polyline
            points={pts(nova)}
            fill="none"
            stroke="var(--accent-purple-soft)"
            strokeOpacity="0.7"
            strokeWidth="1.25"
            strokeLinejoin="round"
            pathLength="1"
            data-curve
          />

          <text
            x="288"
            y="158"
            className="bench-t4 font-mono font-medium"
            fill="var(--accent-purple-soft)"
          >
            P95 1480 ms
          </text>
          <line
            x1={p95x}
            y1={novaY(NOVA_P95) + 2.5}
            x2={p95x}
            y2={AXIS_Y}
            stroke="var(--accent-purple-soft)"
            strokeOpacity="0.5"
          />
          <circle cx={p95x} cy={novaY(NOVA_P95)} r="3.5" fill="var(--accent-purple-soft)" />
          <text
            x={toMsX(COMP_MEAN)}
            y="190"
            textAnchor="middle"
            className="bench-t3 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.95"
          >
            2000–3000 ms
          </text>

          <line
            x1={X0}
            y1={AXIS_Y}
            x2={X1}
            y2={AXIS_Y}
            stroke="var(--text-secondary-on-dark)"
            strokeOpacity="0.5"
          />
          {MINOR.map((ms) => (
            <line
              key={ms}
              x1={toMsX(ms)}
              y1={AXIS_Y}
              x2={toMsX(ms)}
              y2={AXIS_Y + 7}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.35"
            />
          ))}
          {MAJOR.map((ms) => (
            <line
              key={ms}
              x1={toMsX(ms)}
              y1={AXIS_Y}
              x2={toMsX(ms)}
              y2={AXIS_Y + 14}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.55"
            />
          ))}
          {MAJOR.map((ms) => (
            <text
              key={ms}
              x={toMsX(ms)}
              y="262"
              textAnchor="middle"
              className="bench-t3 font-mono"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.9"
            >
              {ms}
            </text>
          ))}
          <text
            x={X1}
            y="276"
            textAnchor="end"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.85"
          >
            latency · ms
          </text>
        </svg>
        <BenchGrain />
      </div>
    </div>
  );
}