"use client";

import { useRef, useEffect } from "react";
import { X } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRoiModal } from "@/contexts/RoiContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function RoiResultsModal() {
  const { resultsOpen, results, closeResults, reopenRoi } = useRoiModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const scrollTo = useSmoothScroll();

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

    if (resultsOpen && results) {
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
  }, [resultsOpen, results]);

  if (!results) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 hidden"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-lg max-h-full overflow-y-auto bg-surface-950 border border-surface-800 hidden"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-surface-950/90 backdrop-blur-md px-6 py-4 border-b border-surface-800">
          <div>
            <h2 className="font-display text-display-sm font-bold text-text-primary">
              Your ROI Results
            </h2>
            <p className="mt-0.5 text-body-sm text-text-secondary">
              Based on the metrics you entered.
            </p>
          </div>
          <button
            onClick={closeResults}
            className="flex h-8 w-8 items-center justify-center rounded-sm text-text-secondary transition-colors hover:bg-surface-800 hover:text-text-primary"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-6">
          <div className="rounded-sm bg-surface-900 border border-surface-800 p-5 flex flex-col gap-3">
            <ResultRow
              label="Total Monthly Benefit"
              value={`$${results.total.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
              accent
            />
            <ResultRow
              label="Best Nova Plan"
              value={results.plan}
              accent
            />
            <ResultRow
              label="Plan Cost"
              value={`$${results.planPrice}/mo`}
            />
          </div>

          <div className="rounded-sm bg-surface-900 border border-surface-800 p-5 flex flex-col gap-3">
            <ResultRow
              label="Net Monthly ROI"
              value={`$${results.netRoi.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
            />
            <ResultRow
              label="ROI Percentage"
              value={`${results.roiPct.toFixed(0)}%`}
            />
            <ResultRow
              label="Annual Impact"
              value={`$${results.annualImpact.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
              accent
            />
          </div>

          <div className="rounded-sm bg-surface-900/50 border border-surface-800/60 p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary/40">
                Breakdown
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <BreakdownRow
                label="Recovered revenue (missed + hold)"
                value={`$${results.revenueBenefit.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
              />
              <BreakdownRow
                label="Receptionist cost savings"
                value={`$${results.costSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
              />
              <BreakdownRow
                label="Value of your time back"
                value={`$${results.timeValue.toLocaleString("en-US", { maximumFractionDigits: 0 })}`}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => { closeResults(); scrollTo("#book-call"); }}
              className="btn-primary w-full"
            >
              Book Discovery Call
            </button>
            <button onClick={reopenRoi} className="btn-secondary w-full">
              Return To ROI Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-body-sm text-text-secondary/60">{label}</span>
      <span
        className={`font-mono text-body-sm font-semibold ${
          accent ? "text-accent-cyan" : "text-text-primary"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-caption text-text-secondary/40">{label}</span>
      <span className="font-mono text-caption text-text-secondary">{value}</span>
    </div>
  );
}
