"use client";

import { useState, useRef, useEffect } from "react";
import { X, Calculator } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRoiModal, RoiCalculation } from "@/contexts/RoiContext";

const plans = [
  { name: "Nova Light", price: 99 },
  { name: "Nova Super", price: 333 },
  { name: "Nova Hyper", price: 1299 },
];

const fields = [
  { key: "totalCalls", label: "Total estimated calls per month", placeholder: "e.g., 200" },
  { key: "missedCalls", label: "Missed calls per month", placeholder: "e.g., 50" },
  { key: "holdCalls", label: "Calls added to wait on hold queue per month", placeholder: "e.g., 20" },
  { key: "closeRate", label: "Booking/Close rate (%)", placeholder: "e.g., 25" },
  { key: "ticketValue", label: "Average Ticket Value ($)", placeholder: "e.g., 500" },
  { key: "receptionistCost", label: "Monthly receptionist cost ($)", placeholder: "e.g., 3000" },
  { key: "hoursSpent", label: "Monthly hours you spend answering calls", placeholder: "e.g., 40" },
  { key: "hourlyRate", label: "How much your time is worth per hour ($)", placeholder: "e.g., 100" },
];

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
  const { open, agentType, closeRoi, openResults } = useRoiModal();
  const [values, setValues] = useState<Record<string, string>>({});
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      gsap.set(panelRef.current, { opacity: 0, y: 20, scale: 0.97, display: "none" });
      gsap.set(overlayRef.current, { opacity: 0, display: "none" });
    }
  }, []);

  useEffect(() => {
    const panel = panelRef.current;
    const overlay = overlayRef.current;
    if (!panel || !overlay) return;

    if (open) {
      setValues({});
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
    openResults(result);
  }

  const allFilled = fields.every((f) => {
    const v = parseFloat(values[f.key] || "0");
    return !isNaN(v) && v > 0;
  });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-surface-950 border border-surface-800"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-surface-950/90 backdrop-blur-md px-6 py-4 border-b border-surface-800 lg:px-8">
          <div>
            <h2 className="font-display text-display-sm font-bold text-text-primary">
              {agentType} ROI Calculator
            </h2>
            <p className="mt-0.5 text-body-sm text-text-secondary">
              See exactly how much your business saves and earns by switching to Nova Echo AI.
            </p>
          </div>
          <button
            onClick={closeRoi}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-surface-800 hover:text-text-primary"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-6 lg:p-8 mx-auto max-w-lg flex flex-col gap-5">
          <div className="flex items-center gap-2">
            <Calculator size={16} weight="duotone" className="text-accent-cyan" />
            <h3 className="text-caption font-semibold uppercase tracking-wider text-text-secondary/60">
              Input Metrics
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {fields.map((field) => (
              <label key={field.key} className="flex flex-col gap-1">
                <span className="text-caption font-medium text-text-secondary/60">
                  {field.label}
                </span>
                <div className="border border-surface-800 focus-within:border-accent-cyan rounded-sm transition-[border-color]">
                  <input
                    type="number"
                    value={values[field.key] ?? ""}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full bg-transparent text-body-sm font-mono text-text-primary placeholder:text-text-secondary/30 outline-none px-3 py-2.5"
                  />
                </div>
              </label>
            ))}
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
