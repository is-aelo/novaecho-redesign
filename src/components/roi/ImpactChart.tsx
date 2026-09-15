"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import BenchGrain from "@/components/benchmark/BenchGrain";
import BenchGrid from "@/components/benchmark/BenchGrid";

const W = 480;
const H = 280;
const X0 = 64;
const X1 = 452;
const AXIS_Y = 238;
const PLOT_TOP = 64;

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);

const monthX = (m: number) => X0 + ((X1 - X0) * (m - 1)) / 11;

const compact = (n: number) =>
  "$" +
  Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

type ImpactChartProps = {
  monthly: number;
  bookings: number;
  active: boolean;
};

export default function ImpactChart({ monthly, bookings, active }: ImpactChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const annual = monthly * 12;
  const span = Math.max(annual, 1);

  const cumulative = (m: number) => {
    const wobble = monthly * 0.045 * Math.sin((m - 1) * 0.85) * (((m - 1) * (12 - m)) / 30);
    return monthly * m + wobble;
  };

  const yOf = (v: number) => AXIS_Y - (Math.min(v / span, 1) * (AXIS_Y - PLOT_TOP));

  const line: Array<[number, number]> = [];
  for (let m = 1; m <= 12; m += 0.1) {
    line.push([monthX(m), yOf(cumulative(m))]);
  }

  const pts = line.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const fillD = `M ${line[0][0].toFixed(1)},${AXIS_Y} L ${pts} L ${line[line.length - 1][0].toFixed(1)},${AXIS_Y} Z`;

  const rows = [0.25, 0.5, 0.75, 1].map((p) => ({ p, v: annual * p, y: yOf(annual * p) }));
  const endY = yOf(annual);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const curves = Array.from(svg.querySelectorAll<SVGGeometryElement>("[data-curve]"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      curves.forEach((el) => {
        el.style.strokeDashoffset = "0";
      });
      return;
    }
    curves.forEach((el) => {
      el.style.strokeDasharray = "1";
      el.style.strokeDashoffset = "1";
    });
    if (!active) return;
    gsap.to(curves, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: "power2.inOut",
      stagger: 0.12,
    });
  }, [active]);

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900 px-4 py-5">
      <div className="relative w-full">
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" aria-hidden="true">
          <BenchGrid dark />
          <text
            x="40"
            y="36"
            className="bench-t2 font-mono"
            fill="var(--text-secondary-on-dark)"
            fillOpacity="0.9"
          >
            recovered revenue · cumulative
          </text>

          <path d={fillD} fill="var(--accent-purple-soft)" fillOpacity="0.1" />

          {rows.map((row) => (
            <line
              key={row.p}
              x1={X0}
              y1={row.y}
              x2={X1}
              y2={row.y}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.06"
            />
          ))}

          <polyline
            points={pts}
            fill="none"
            stroke="var(--accent-purple-soft)"
            strokeOpacity="0.7"
            strokeWidth="1.25"
            strokeLinejoin="round"
            pathLength="1"
            data-curve
          />

          {bookings > 0 && (
            <line
              x1={X0}
              y1={yOf(bookings)}
              x2={X1}
              y2={yOf(bookings)}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.45"
              pathLength="1"
              data-curve
            />
          )}

          {[0, 0.25, 0.5, 0.75, 1].map((p) => (
            <text
              key={p}
              x={X0 - 8}
              y={p === 0 ? AXIS_Y + 4 : yOf(annual * p) + 3}
              textAnchor="end"
              className="bench-t3 font-mono"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.9"
            >
              {compact(annual * p)}
            </text>
          ))}

          <circle cx={X1} cy={endY} r="3.5" fill="var(--accent-purple-soft)" opacity="0.9" />
          <text
            x={X1}
            y={Math.max(endY - 16, 16)}
            textAnchor="end"
            className="bench-t4 font-mono font-medium"
            fill="var(--accent-purple-soft)"
          >
            {compact(annual)} / yr
          </text>

          {bookings > 0 && (
            <text
              x={X0 - 8}
              y={yOf(bookings) - 5}
              textAnchor="end"
              className="bench-t2 font-mono"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.85"
            >
              bookings {compact(bookings)} / mo
            </text>
          )}

          {MONTHS.map((m) => (
            <line
              key={m}
              x1={monthX(m)}
              y1={AXIS_Y}
              x2={monthX(m)}
              y2={AXIS_Y + 6}
              stroke="var(--text-secondary-on-dark)"
              strokeOpacity="0.35"
            />
          ))}
          {MONTHS.map((m) => (
            <text
              key={m}
              x={monthX(m)}
              y="262"
              textAnchor="middle"
              className="bench-t3 font-mono"
              fill="var(--text-secondary-on-dark)"
              fillOpacity="0.9"
            >
              {m}
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
            month
          </text>
        </svg>
        <BenchGrain />
      </div>
    </div>
  );
}