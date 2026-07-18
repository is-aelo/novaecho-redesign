"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRoiModal, RoiCalculation } from "@/contexts/RoiContext";

const plans = [
  { name: "Nova Light", price: 99 },
  { name: "Nova Super", price: 333 },
  { name: "Nova Hyper", price: 1299 },
];

interface FieldDef {
  key: string;
  label: string;
  placeholder: string;
  type: "number" | "slider";
  min?: number;
  max?: number;
  step?: number;
  defaultVal?: number;
  unit?: string;
}

const fields: FieldDef[] = [
  { key: "totalCalls", label: "Total estimated calls per month", placeholder: "e.g., 200", type: "number" },
  { key: "missedCalls", label: "Missed calls per month", placeholder: "e.g., 50", type: "number" },
  { key: "holdCalls", label: "Calls added to wait on hold queue per month", placeholder: "e.g., 20", type: "number" },
  { key: "closeRate", label: "Booking/Close rate", placeholder: "e.g., 25", type: "slider", min: 0, max: 100, step: 1, defaultVal: 25, unit: "%" },
  { key: "ticketValue", label: "Average Ticket Value ($)", placeholder: "e.g., 500", type: "number" },
  { key: "receptionistCost", label: "Monthly receptionist cost ($)", placeholder: "e.g., 3000", type: "number" },
  { key: "hoursSpent", label: "Monthly hours you spend answering calls", placeholder: "e.g., 40", type: "slider", min: 0, max: 200, step: 1, defaultVal: 40 },
  { key: "hourlyRate", label: "How much your time is worth per hour ($)", placeholder: "e.g., 100", type: "slider", min: 0, max: 500, step: 5, defaultVal: 100, unit: "$" },
];

function lerpColor(_pct: number): string {
  return "rgb(30, 58, 138)";
}

function calcResults(values: Record<string, number>): RoiCalculation {
  const recoveredMissed = values.missedCalls * (values.closeRate / 100) * values.ticketValue;
  const recoveredHold = values.holdCalls * (values.closeRate / 100) * values.ticketValue;
  const revenueBenefit = recoveredMissed + recoveredHold;
  const costSavings = values.receptionistCost;
  const timeValue = values.hoursSpent * values.hourlyRate;
  const total = revenueBenefit + costSavings + timeValue;

  let plan = plans[2];
  if (total < 500) plan = plans[0];
  else if (total < 2000) plan = plans[1];

  const netRoi = total - plan.price;
  const roiPct = plan.price > 0 ? (netRoi / plan.price) * 100 : 0;
  const annualImpact = netRoi * 12;

  return {
    total,
    plan: plan.name,
    planPrice: plan.price,
    netRoi,
    roiPct,
    annualImpact,
    revenueBenefit,
    costSavings,
    timeValue,
  };
}

export default function RoiModal() {
  const { open, agentType, closeRoi, openResults, setTransitioning, formResetKey } = useRoiModal();
  const [values, setValues] = useState<Record<string, string>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const init: Record<string, string> = {};
      for (const f of fields) {
        if (f.type === "slider" && f.defaultVal !== undefined) init[f.key] = String(f.defaultVal);
      }
      setValues(init);
      gsap.set(panelRef.current, { opacity: 0, y: 20, scale: 0.97, display: "none" });
      gsap.set(overlayRef.current, { opacity: 0, display: "none" });
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
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
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

  useEffect(() => {
    if (formResetKey === 0) return;
    const init: Record<string, string> = {};
    for (const f of fields) {
      if (f.type === "slider" && f.defaultVal !== undefined) init[f.key] = String(f.defaultVal);
    }
    setValues(init);
  }, [formResetKey]);

  function update(key: string, val: string) {
    setValues((prev) => ({ ...prev, [key]: val }));
  }

  function calculate() {
    const parsed: Record<string, number> = {};
    for (const field of fields) {
      const v = parseFloat(values[field.key] || "0");
      parsed[field.key] = isNaN(v) ? 0 : v;
    }
    const result = calcResults(parsed);
    closeRoi();
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      openResults(result);
    }, 400);
  }

  const allFilled = fields.every((f) => {
    const v = parseFloat(values[f.key] || "0");
    return !isNaN(v) && v > 0;
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 hidden"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-surface-100 border border-surface-200 rounded-lg hidden modal-scrollbar"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-surface-100/90 backdrop-blur-md px-6 py-4 border-b border-surface-200 lg:px-8">
          <div>
            <h2 className="font-display text-display-sm font-bold text-text-primary-light">
              {agentType} ROI Calculator
            </h2>
            <p className="mt-0.5 text-body-sm text-text-secondary-light">
              See exactly how much your business saves and earns by switching to Nova Echo AI.
            </p>
          </div>
          <button
            onClick={closeRoi}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary-light transition-colors hover:bg-surface-200 hover:text-text-primary-light"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-6 lg:p-8 mx-auto max-w-2xl flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <h3 className="text-caption font-semibold uppercase tracking-wider text-surface-700">
              Input Metrics
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            {fields.map((field) => {
              if (field.type === "number") {
                return (
                  <label key={field.key} className="flex flex-col gap-1">
                    <span className="text-caption font-medium text-text-secondary-light">
                      {field.label}
                    </span>
                    <div className="border border-surface-200 focus-within:border-accent-cyan rounded-sm transition-[border-color]">
                      <input
                        type="number"
                        value={values[field.key] ?? ""}
                        onChange={(e) => update(field.key, e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent text-body-sm text-text-primary-light placeholder:text-text-secondary-light/30 outline-none px-3 py-2.5"
                      />
                    </div>
                  </label>
                );
              }
              const current = parseFloat(values[field.key] ?? String(field.defaultVal ?? 0));
              const pct = field.min !== undefined && field.max !== undefined
                ? ((current - field.min) / (field.max - field.min)) * 100 : 0;
              const fillColor = lerpColor(pct);
              const prefix = field.unit === "$" ? "$" : "";
              const suffix = field.unit === "%" ? "%" : "";
              return (
                <label key={field.key} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-caption font-medium text-text-secondary-light">
                      {field.label}
                    </span>
                    <span className="font-mono text-body-sm font-semibold text-surface-700 tabular-nums">
                      {prefix}{current}{suffix}
                    </span>
                  </div>
                  <div className="relative h-5 w-full">
                    <div
                      className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 rounded-full pointer-events-none"
                      style={{
                        background: `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${pct}%, var(--surface-200) ${pct}%, var(--surface-200) 100%)`,
                      }}
                    />
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={current}
                      onChange={(e) => update(field.key, e.target.value)}
                      style={{ '--thumb-bg': fillColor } as React.CSSProperties}
                      className="relative w-full h-5 appearance-none cursor-pointer bg-transparent outline-none
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--thumb-bg)] [&::-webkit-slider-thumb]:shadow-glow [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150 [&::-webkit-slider-thumb]:hover:scale-110 [&::-webkit-slider-thumb]:focus-visible:shadow-[0_0_0_2px_var(--surface-100),0_0_0_4px_var(--accent-cyan)] [&::-webkit-slider-thumb]:active:scale-90
                        [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[var(--thumb-bg)] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:shadow-glow [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:duration-150 [&::-moz-range-thumb]:hover:scale-110 [&::-moz-range-thumb]:focus-visible:shadow-[0_0_0_2px_var(--surface-100),0_0_0_4px_var(--accent-cyan)] [&::-moz-range-thumb]:active:scale-90"
                    />
                  </div>
                </label>
              );
            })}
          </div>

          <button
            onClick={calculate}
            disabled={!allFilled}
            className={`btn-primary mt-1 w-full ${!allFilled ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            Calculate ROI
          </button>
        </div>
      </div>
    </div>
  );
}
