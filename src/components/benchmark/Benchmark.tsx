"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react/ssr";
import gsap from "gsap";

const rows = [
  {
    feature: "Voice Quality",
    nova: "Hyper human-like",
    comp: "Human-like (less natural)",
    human: "Human",
  },
  {
    feature: "Latency (Phone Calls)",
    nova: "Sub-1500ms",
    comp: "2000–3000ms",
    human: "Varies; human reaction time",
  },
  {
    feature: "Voice Customization",
    nova: "Extensive tone & speed control",
    comp: "Basic options only",
    human: "None",
  },
  {
    feature: "Support",
    nova: "24/7 White-Glove + Slack",
    comp: "9–5 email support",
    human: "N/A",
  },
  {
    feature: "Calling Capacity",
    nova: "1500+ calls/minute",
    comp: "10–60 calls/minute",
    human: "1 call/minute",
  },
  {
    feature: "Ease of Use",
    nova: "Simple, intuitive",
    comp: "Often overly complex",
    human: "N/A",
  },
  {
    feature: "Accuracy & Consistency",
    nova: "Highly consistent",
    comp: "Frequent script errors",
    human: "Prone to mistakes",
  },
  {
    feature: "Data & Insights",
    nova: "Full analytics & reporting",
    comp: "Limited dashboards",
    human: "Minimal recall",
  },
  {
    feature: "Integrations",
    nova: "10+ native, 3000+ third-party",
    comp: "Third-party only",
    human: "Limited by learning curve",
  },
  {
    feature: "Pricing Transparency",
    nova: "Fully transparent",
    comp: "Hidden fees common",
    human: "N/A",
  },
  {
    feature: "Speed-to-Lead Time",
    nova: "< 1 minute",
    comp: "< 1 minute",
    human: "5–120 minutes",
  },
  {
    feature: "Implementation Speed",
    nova: "48 hours",
    comp: "2–4 weeks",
    human: "3–6 weeks",
  },
  {
    feature: "Languages Supported",
    nova: "35+",
    comp: "35+",
    human: "1–2",
  },
];

const colHeaders = ["Feature", "Nova Echo AI", "Competitors", "Humans"];

const INITIAL_VISIBLE = 4;

export default function Benchmark() {
  const [showAll, setShowAll] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        gsap.set("[data-bench-toggle]", {
          opacity: 0,
          height: 0,
          overflow: "hidden",
          paddingTop: 0,
          paddingBottom: 0,
          marginTop: 0,
          marginBottom: 0,
        });
      }
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    const toggles = document.querySelectorAll<HTMLElement>("[data-bench-toggle]");
    if (showAll) {
      gsap.to(toggles, {
        opacity: 1,
        height: "auto",
        paddingTop: "",
        paddingBottom: "",
        marginTop: "",
        marginBottom: "",
        duration: 0.4,
        stagger: 0.04,
        ease: "power3.out",
        clearProps: "overflow",
      });
    } else {
      gsap.to(toggles, {
        opacity: 0,
        height: 0,
        overflow: "hidden",
        paddingTop: 0,
        paddingBottom: 0,
        marginTop: 0,
        marginBottom: 0,
        duration: 0.25,
        ease: "power2.in",
      });
    }
  }, [showAll]);

  return (
    <section id="benchmarks" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Precision Benchmark
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Comparing Nova Echo AI against the legacy industry standards.
          </p>
        </div>

        <div className="mt-5 w-full lg:mt-6">
          <table className="hidden w-full border-collapse lg:table">
            <thead>
              <tr>
                {colHeaders.map((header, i) => (
                  <th
                    key={header}
                    className={`px-4 py-4 text-left text-body-sm font-semibold tracking-wider uppercase ${
                      i === 0 || i === 1
                        ? "text-text-primary-light border-b-2"
                        : "text-text-secondary-light/60 border-b border-surface-200"
                    } ${i === 1 ? "benchmark-nova-header" : ""}`}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.feature} className="border-b border-surface-200/80">
                  <td className="px-4 py-4 text-body-sm font-medium text-text-primary-light">
                    {row.feature}
                  </td>
                  <td className="px-4 py-4 text-body-sm font-medium tabular-nums text-accent-purple bg-accent-sky/6">
                    {row.nova}
                  </td>
                  <td className="px-4 py-4 text-body-sm text-text-secondary-light/80">
                    {row.comp}
                  </td>
                  <td className="px-4 py-4 text-body-sm text-text-secondary-light/80">
                    {row.human}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col divide-y divide-surface-200/80 lg:hidden">
            {rows.map((row, i) => (
              <div key={row.feature} {...(i >= INITIAL_VISIBLE ? { "data-bench-toggle": "" } : {})} className="py-4">
                <p className="text-caption font-semibold uppercase tracking-wider text-text-primary-light">
                  {row.feature}
                </p>
                <div className="mt-2 flex flex-col gap-1.5">
                  <div className="flex items-baseline justify-between gap-2 -mx-4 px-4 py-1.5 bg-accent-sky/6">
                    <span className="text-caption font-medium text-text-primary-light shrink-0">
                      Nova Echo AI
                    </span>
                    <span className="text-body-sm font-medium tabular-nums text-accent-purple text-right">
                      {row.nova}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-caption font-medium text-text-secondary-light/60 shrink-0">
                      Competitors
                    </span>
                    <span className="text-body-sm text-text-secondary-light/80 text-right">
                      {row.comp}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-caption font-medium text-text-secondary-light/60 shrink-0">
                      Humans
                    </span>
                    <span className="text-body-sm text-text-secondary-light/80 text-right">
                      {row.human}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {rows.length > INITIAL_VISIBLE && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center justify-center gap-2 py-4 text-caption md:text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-magenta"
              >
                {showAll ? "Show less" : `Show all (${rows.length} comparisons)`}
                <CaretDown
                  size={14}
                  weight="bold"
                  className={`transition-transform ${showAll ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
