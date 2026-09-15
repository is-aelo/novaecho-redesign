"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { ArrowRight, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRoiModal } from "@/contexts/RoiContext";
import type { AgentChoice } from "@/components/demo/agents";
import { calcResults } from "./calc";
import ImpactChart from "./ImpactChart";

type FieldKey =
  | "totalCalls"
  | "missedCalls"
  | "holdCalls"
  | "closeRate"
  | "ticketValue"
  | "receptionistCost"
  | "hoursSpent"
  | "hourlyRate";

type SceneId = "receptionist" | "speed-to-lead" | "outbound";

type Scenario = {
  id: SceneId;
  label: string;
  desc: string;
  agentName: string;
  defaults: Record<FieldKey, string>;
};

type FieldMeta =
  | { type: "number"; label: string; prefix?: string; suffix?: string }
  | { type: "slider"; label: string; prefix?: string; suffix?: string; min: number; max: number; step: number };

const SLIDER_STYLE = { "--thumb-bg": "var(--accent-purple)" } as CSSProperties & {
  "--thumb-bg": string;
};

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
const hrs = (n: number) => `${Math.round(n).toLocaleString("en-US")} hrs`;

const SCENARIOS: Scenario[] = [
  {
    id: "receptionist",
    label: "Receptionist",
    desc: "Answer calls, qualify callers, and book appointments.",
    agentName: "Receptionist",
    defaults: {
      totalCalls: "300",
      missedCalls: "25",
      holdCalls: "10",
      closeRate: "28",
      ticketValue: "350",
      receptionistCost: "2400",
      hoursSpent: "45",
      hourlyRate: "70",
    },
  },
  {
    id: "speed-to-lead",
    label: "Speed-to-Lead",
    desc: "Reach new leads quickly and book more opportunities.",
    agentName: "Speed-to-Lead",
    defaults: {
      totalCalls: "400",
      missedCalls: "20",
      holdCalls: "8",
      closeRate: "24",
      ticketValue: "950",
      receptionistCost: "0",
      hoursSpent: "35",
      hourlyRate: "80",
    },
  },
  {
    id: "outbound",
    label: "Mass Outbound",
    desc: "Call large opt-in lead lists and identify hot prospects.",
    agentName: "Mass Outbound",
    defaults: {
      totalCalls: "1200",
      missedCalls: "80",
      holdCalls: "0",
      closeRate: "10",
      ticketValue: "600",
      receptionistCost: "0",
      hoursSpent: "45",
      hourlyRate: "60",
    },
  },
];

const CATEGORIES: { label: string; fields: FieldKey[] }[] = [
  { label: "Your calls", fields: ["totalCalls", "missedCalls", "holdCalls"] },
  { label: "Your revenue", fields: ["ticketValue", "closeRate"] },
  { label: "Your current cost", fields: ["receptionistCost", "hoursSpent", "hourlyRate"] },
];

const META: Record<FieldKey, FieldMeta> = {
  totalCalls: { type: "number", label: "Total calls", suffix: "calls/mo" },
  missedCalls: { type: "number", label: "Missed calls", suffix: "calls/mo" },
  holdCalls: { type: "number", label: "Calls left on hold", suffix: "calls/mo" },
  ticketValue: { type: "number", label: "Average customer value", prefix: "$" },
  closeRate: { type: "slider", label: "Booking / close rate", min: 0, max: 100, step: 1, suffix: "%" },
  receptionistCost: { type: "number", label: "Monthly receptionist cost", prefix: "$", suffix: "/mo" },
  hoursSpent: { type: "number", label: "Hours spent answering calls", suffix: "hrs" },
  hourlyRate: { type: "slider", label: "Value of your time per hour", prefix: "$", min: 0, max: 500, step: 5 },
};

function useChangeFlash(value: string) {
  const [flash, setFlash] = useState(false);
  const prev = useRef(value);

  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return flash;
}

function AnimatedNumber({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const proxy = useRef({ n: value });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      proxy.current.n = value;
      el.textContent = format(value);
      return;
    }

    gsap.to(proxy.current, {
      n: value,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
      onUpdate: () => {
        el.textContent = format(proxy.current.n);
      },
    });
  }, [value, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

function NumberField({
  field,
  value,
  onChange,
}: {
  field: FieldKey;
  value: string;
  onChange: (v: string) => void;
}) {
  const flash = useChangeFlash(value);
  const meta = META[field];

  return (
    <label className="flex flex-col gap-1.5">
      <span
        className={`font-mono text-caption font-medium uppercase tracking-wider transition-colors duration-300 ${
          flash ? "text-accent-purple" : "text-text-secondary-light/60"
        }`}
      >
        {meta.label}
      </span>
      <div className="flex h-10 items-center rounded-sm border border-surface-200 bg-white px-3 transition-colors focus-within:border-accent-purple">
        {meta.prefix ? (
          <span className="shrink-0 whitespace-nowrap font-mono text-body-sm text-text-secondary-light/50">
            {meta.prefix}
          </span>
        ) : null}
        <input
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value.replace(/\D/g, ""))}
          className="min-w-0 w-full bg-transparent px-1 font-body text-body-sm text-text-primary-light outline-none"
        />
        {meta.suffix ? (
          <span className="shrink-0 whitespace-nowrap font-mono text-caption text-text-secondary-light/50">
            {meta.suffix}
          </span>
        ) : null}
      </div>
    </label>
  );
}

function SliderField({
  field,
  value,
  onChange,
}: {
  field: FieldKey;
  value: string;
  onChange: (v: string) => void;
}) {
  const flash = useChangeFlash(value);
  const meta = META[field];
  if (meta.type !== "slider") return null;

  const current = parseFloat(value || "0");
  const pct = Math.max(0, Math.min(100, ((current - meta.min) / (meta.max - meta.min)) * 100));

  return (
    <label className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={`font-mono text-caption font-medium uppercase tracking-wider transition-colors duration-300 ${
            flash ? "text-accent-purple" : "text-text-secondary-light/60"
          }`}
        >
          {meta.label}
        </span>
        <span className="whitespace-nowrap font-mono text-body-sm font-semibold tabular-nums text-accent-purple">
          {meta.prefix ?? ""}
          {current}
          {meta.suffix ?? ""}
        </span>
      </div>
      <div className="relative h-5 w-full">
        <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-surface-200" />
        <div
          className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-accent-purple"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={meta.min}
          max={meta.max}
          step={meta.step}
          value={current}
          onChange={(e) => onChange(e.target.value)}
          style={SLIDER_STYLE}
          className="relative h-5 w-full appearance-none bg-transparent outline-none
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--thumb-bg)]
            [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:transition-all
            [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110
            [&::-webkit-slider-thumb]:focus-visible:shadow-[0_0_0_2px_var(--surface-100),0_0_0_4px_var(--accent-purple)]
            [&::-webkit-slider-thumb]:active:scale-90
            [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--thumb-bg)]
            [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-glow [&::-moz-range-thumb]:transition-all
            [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:hover:scale-110
            [&::-moz-range-thumb]:focus-visible:shadow-[0_0_0_2px_var(--surface-100),0_0_0_4px_var(--accent-purple)]
            [&::-moz-range-thumb]:active:scale-90"
        />
      </div>
    </label>
  );
}

function ScenarioSelect({ active, onSelect }: { active: SceneId; onSelect: (s: Scenario) => void }) {
  return (
    <div>
      <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/60">
        What are you trying to improve?
      </p>
      <div className="mt-3 flex flex-col gap-2">
        {SCENARIOS.map((s) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onSelect(s)}
              className={`flex w-full items-center justify-between gap-3 rounded-sm border px-3.5 py-2 text-left transition-colors ${
                isActive
                  ? "border-accent-purple bg-white"
                  : "border-surface-200 bg-white hover:border-surface-700/40"
              }`}
            >
              <span className="flex flex-col">
                <span className="font-display text-body-sm font-semibold text-text-primary-light">
                  {s.label}
                </span>
                <span className="mt-0.5 font-mono text-caption leading-relaxed text-text-secondary-light/70">
                  {s.desc}
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`h-2 w-2 shrink-0 rounded-full ${
                  isActive ? "bg-accent-purple" : "bg-surface-200"
                }`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function RoiModal() {
  const { open, agentType, closeRoi, openResults, setTransitioning, setTransitionNote, setBuilderAgent } =
    useRoiModal();
  const seededScenario = SCENARIOS.find((s) => s.agentName === agentType) ?? SCENARIOS[0];
  const [scenario, setScenario] = useState<SceneId>(seededScenario.id);
  const [values, setValues] = useState<Record<FieldKey, string>>(seededScenario.defaults);

  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (panelRef.current && overlayRef.current) {
        gsap.set(panelRef.current, { opacity: 0, y: 20, scale: 0.97, display: "none" });
        gsap.set(overlayRef.current, { opacity: 0, display: "none" });
      }
    }
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (open) {
      gsap.set(overlay, { display: "flex" });
      gsap.set(panel, { display: "block" });
      gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out", delay: 0.05 }
      );
    } else {
      gsap.to(panel, {
        opacity: 0,
        y: 16,
        scale: 0.97,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => gsap.set(panel, { display: "none" }),
      });
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [open]);

  const calc = useMemo(() => {
    const parsed: Record<string, number> = {};
    for (const key of Object.keys(META) as FieldKey[]) {
      parsed[key] = parseFloat(values[key]) || 0;
    }
    return calcResults(parsed);
  }, [values]);

  const missed = parseInt(values.missedCalls || "0", 10);
  const hold = parseInt(values.holdCalls || "0", 10);
  const hours = parseInt(values.hoursSpent || "0", 10);

  function update(key: FieldKey, v: string) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function calculate() {
    closeRoi();
    setTransitionNote("");
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      openResults(calc);
    }, 400);
  }

  const explanation = `Your ${missed.toLocaleString("en-US")} missed calls and ${hold.toLocaleString(
    "en-US"
  )} calls left on hold each month represent about ${money(calc.revenueBenefit)}/month in lost or
  delayed bookings — before counting the ${hours.toLocaleString("en-US")} hours of staff time spent
  on the phone.`;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 hidden"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl max-h-full overflow-y-auto rounded-lg border border-surface-200 bg-surface-100 hidden modal-scrollbar"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-surface-200 bg-surface-100/90 px-6 py-5 backdrop-blur-md lg:px-8 lg:py-6">
          <div>
            <p className="font-mono text-caption font-semibold uppercase tracking-wider text-accent-purple">
              ROI estimator
            </p>
            <h2 className="mt-1 font-display text-display-sm font-semibold tracking-tight text-text-primary-light lg:text-display-md">
              What are missed calls costing you?
            </h2>
            <p className="mt-1 text-body-sm leading-relaxed text-text-secondary-light">
              Estimate the revenue, time, and opportunities your business could recover with Nova
              Echo.
            </p>
          </div>
          <button
            type="button"
            onClick={closeRoi}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-btn text-text-secondary-light transition-colors hover:bg-surface-200 hover:text-text-primary-light"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col p-6 lg:p-8">
          <ScenarioSelect
            active={scenario}
            onSelect={(s) => {
              setScenario(s.id);
              setBuilderAgent(s.id as AgentChoice);
            }}
          />

          <div className="mt-5 flex flex-col">
            {CATEGORIES.map((category, i) => (
              <div
                key={category.label}
                className={`flex flex-col ${i > 0 ? "mt-5 border-t border-surface-200 pt-5" : ""}`}
              >
                <p className="font-mono text-caption font-semibold uppercase tracking-wider text-surface-700">
                  {category.label}
                </p>
                <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.fields.map((field) =>
                    META[field].type === "slider" ? (
                      <SliderField
                        key={field}
                        field={field}
                        value={values[field]}
                        onChange={(v) => update(field, v)}
                      />
                    ) : (
                      <NumberField
                        key={field}
                        field={field}
                        value={values[field]}
                        onChange={(v) => update(field, v)}
                      />
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex flex-col rounded-md border border-surface-800 bg-surface-950 p-6 md:p-7">
              <p className="font-mono text-caption font-semibold uppercase tracking-wider text-accent-purple-soft">
                Your potential impact
              </p>

              <div className="mt-5" aria-live="polite">
                <AnimatedNumber
                  value={calc.total}
                  format={money}
                  className="font-display text-display-lg font-bold tabular-nums tracking-tight text-text-primary"
                />
                <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary/70">
                  Estimated monthly opportunity
                </p>
              </div>

              <div className="mx-auto mt-6 w-full max-w-md">
                <ImpactChart monthly={calc.total} bookings={calc.revenueBenefit} active={open} />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-4 border-t border-surface-800 pt-5 sm:grid-cols-2">
                <div>
                  <AnimatedNumber
                    value={calc.total * 12}
                    format={money}
                    className="font-display text-display-sm font-semibold tabular-nums tracking-tight text-accent-purple-soft"
                  />
                  <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary/70">
                    Estimated annual opportunity
                  </p>
                </div>
                <div>
                  <AnimatedNumber
                    value={hours}
                    format={hrs}
                    className="font-display text-display-sm font-semibold tabular-nums tracking-tight text-text-primary"
                  />
                  <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary/70">
                    Staff time recovered / month
                  </p>
                </div>
              </div>

              <p className="mt-6 text-body-sm leading-relaxed text-text-secondary/90">{explanation}</p>

              <button
                type="button"
                onClick={calculate}
                className="btn-primary nudge-horizontal mt-6 flex w-full items-center justify-center gap-2"
              >
                See your full ROI
                <ArrowRight size={16} weight="bold" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}