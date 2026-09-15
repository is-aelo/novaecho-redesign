"use client";

import { useRef, useEffect } from "react";
import { X, TrendUp, Trophy } from "@phosphor-icons/react";
import gsap from "gsap";
import { useRoiModal } from "@/contexts/RoiContext";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import ImpactChart from "./ImpactChart";

const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function RoiResultsModal() {
  const { resultsOpen, results, closeResults, openRoi, agentType, setTransitioning, resetForm } = useRoiModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const scrollTo = useSmoothScroll();

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

    if (resultsOpen && results) {
      gsap.set(overlay, { display: "flex" });
      gsap.set(panel, { display: "block" });
      gsap.to(overlay, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { opacity: 0, y: 24, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power3.out" }
      );

      if (!reduced()) {
        const stagger = Array.from(panel.querySelectorAll("[data-stagger]"));
        const bars = Array.from(panel.querySelectorAll<HTMLElement>("[data-bar]"));
        gsap.set(stagger, { opacity: 0, y: 16 });
        gsap.set(bars, { transformOrigin: "left center", scaleX: 0 });
        gsap.to(stagger, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.08,
          delay: 0.15,
        });
        gsap.to(bars, {
          scaleX: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
        });
      }
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

  const total = results.total;
  const parts = [
    { label: "Recovered bookings", value: results.revenueBenefit, swatch: "bg-accent-purple" },
    { label: "Cost savings", value: results.costSavings, swatch: "bg-accent-purple-soft" },
    {
      label: `Returned staff time · ${results.staffHours.toLocaleString("en-US")} hrs`,
      value: results.timeValue,
      swatch: "bg-surface-700",
    },
  ];
  const pct = (v: number) => (total > 0 ? (v / total) * 100 : 0);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-8 hidden"
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-5xl max-h-full overflow-y-auto bg-surface-100 border border-surface-200 rounded-lg hidden modal-scrollbar"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between bg-surface-100/90 backdrop-blur-md px-6 py-4 border-b border-surface-200 lg:px-8">
          <div>
            <p className="font-mono text-caption font-semibold uppercase tracking-wider text-accent-purple">
              Nova Echo · ROI report
            </p>
            <h2 className="mt-1 font-display text-display-sm font-semibold text-text-primary-light">
              Your ROI Results
            </h2>
            <p className="mt-0.5 text-body-sm text-text-secondary-light">
              Modeled from the metrics you entered.
            </p>
          </div>
          <button
            onClick={closeResults}
            className="flex h-8 w-8 items-center justify-center rounded-btn text-text-secondary-light transition-colors hover:bg-surface-200 hover:text-text-primary-light"
            aria-label="Close"
          >
            <X size={18} weight="bold" />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6 lg:p-8">
          <div
            data-stagger
            className="flex flex-col gap-4 rounded-md border border-surface-200 bg-white p-5 md:flex-row md:items-center md:justify-between md:p-6"
          >
            <div>
              <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Net monthly ROI
              </p>
              <p className="mt-1 flex items-center gap-2 font-display text-display-sm font-bold tabular-nums tracking-tight text-accent-purple sm:text-display-md lg:text-display-lg">
                <TrendUp size={22} weight="bold" className="text-accent-purple" />
                {money(results.netRoi)}
              </p>
              <p className="mt-1 font-mono text-caption text-text-secondary-light">
                after {results.plan} · {money(results.planPrice)}/mo
              </p>
            </div>
            <div className="flex flex-col gap-3 border-t border-surface-200 pt-4 md:border-l md:border-t-0 md:pl-8 md:pt-0">
              <div>
                <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                  Gross monthly benefit
                </p>
                <p className="mt-0.5 font-display text-body-lg font-semibold tabular-nums text-text-primary-light sm:text-display-sm">
                  {money(total)}
                </p>
              </div>
              <div>
                <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                  Return on plan
                </p>
                <p className="mt-0.5 font-display text-body-lg font-semibold tabular-nums text-text-primary-light sm:text-display-sm">
                  {results.roiPct.toFixed(0)}% · {money(results.planPrice)}/mo
                </p>
              </div>
            </div>
          </div>

          <div data-stagger className="grid gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <ImpactChart monthly={total} bookings={results.revenueBenefit} active={resultsOpen} />
            </div>
            <div className="rounded-md border border-surface-200 bg-white p-5 lg:col-span-2">
              <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Monthly benefit composition
              </p>
              <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-surface-200">
                {parts.map((part) => (
                  <div
                    key={part.label}
                    data-bar
                    className={`h-full ${part.swatch}`}
                    style={{ width: `${pct(part.value)}%` }}
                  />
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-3">
                {parts.map((part) => (
                  <div key={part.label} className="flex items-center gap-2.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${part.swatch}`} />
                    <span className="flex-1 text-caption text-text-secondary-light">{part.label}</span>
                    <span className="font-mono text-caption font-medium tabular-nums text-text-primary-light">
                      {money(part.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div data-stagger className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-md border border-surface-200 bg-white p-5 md:p-6">
              <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Estimated net annual impact
              </p>
              <p className="mt-1 font-display text-display-sm font-bold tabular-nums tracking-tight text-accent-purple sm:text-display-md">
                {money(results.annualImpact)}
              </p>
              <p className="mt-1 font-mono text-caption text-text-secondary-light">
                12 months, with {results.plan} included
              </p>
            </div>
            <div className="rounded-md border border-accent-purple/30 bg-accent-purple/5 p-5 md:p-6">
              <p className="font-mono text-caption font-semibold uppercase tracking-wider text-accent-purple">
                Recommended plan
              </p>
              <p className="mt-1 flex items-center gap-2 font-display text-display-sm font-semibold text-text-primary-light sm:text-display-md">
                <Trophy size={20} weight="fill" className="text-accent-purple shrink-0" />
                {results.plan}
              </p>
              <p className="mt-1 font-mono text-caption text-text-secondary-light">
                {money(results.planPrice)}/mo · fits your {money(total)}/mo benefit level
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <button
              data-stagger
              onClick={() => { closeResults(); scrollTo("#book-call"); }}
              className="btn-primary w-full"
            >
              Book Discovery Call
            </button>
            <button
              data-stagger
              onClick={() => {
                closeResults();
                resetForm();
                setTransitioning(true);
                setTimeout(() => {
                  setTransitioning(false);
                  openRoi(agentType);
                }, 400);
              }}
              className="text-body-sm font-medium text-text-secondary-light underline underline-offset-2 decoration-surface-200 transition-colors hover:text-accent-magenta hover:decoration-accent-magenta"
            >
              Start Fresh
            </button>
          </div>

          <p
            data-stagger
            className="text-center font-mono text-caption leading-relaxed text-text-secondary-light/60"
          >
            Concept estimate — not the full accuracy of the official Nova Echo AI ROI calculator.
          </p>
        </div>
      </div>
    </div>
  );
}