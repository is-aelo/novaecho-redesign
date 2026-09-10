"use client";

import { useRef, useState, type ComponentType } from "react";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import {
  benchmarkModules,
  type BenchmarkModule,
} from "./benchmarkData";
import BenchMatrix from "./BenchMatrix";
import BenchVoiceVisual from "./BenchVoiceVisual";
import BenchResponseVisual from "./BenchResponseVisual";
import BenchCallFlowVisual from "./BenchCallFlowVisual";
import BenchIntegrationsVisual from "./BenchIntegrationsVisual";
import BenchTimelineVisual from "./BenchTimelineVisual";
import { useBenchReveal } from "./useBenchReveal";

const visuals: Record<BenchmarkModule["visual"], ComponentType> = {
  voice: BenchVoiceVisual,
  response: BenchResponseVisual,
  calls: BenchCallFlowVisual,
  integrations: BenchIntegrationsVisual,
  timeline: BenchTimelineVisual,
};

export default function Benchmark() {
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  useBenchReveal(sectionRef);

  return (
    <section
      id="benchmarks"
      ref={sectionRef}
      className="w-full scroll-mt-16 bg-surface-50 py-16"
    >
      <div
        className="mx-auto flex max-w-6xl flex-col"
        data-parallax
        data-parallax-y="12"
      >
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
            Precision Benchmark
          </p>
          <h2 className="mt-3 font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            See how Nova Echo stacks up.
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Compare the capabilities that matter most — from conversation quality
            and response time to scale, integrations, and implementation.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:mt-12 lg:grid-cols-2">
          {benchmarkModules.map((module) => (
            <BenchModule key={module.index} module={module} />
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center pb-6 text-center lg:mt-12 lg:pt-4">
          <h3 className="font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
            Want the full comparison?
          </h3>
          <p className="mt-2 max-w-md text-body-sm leading-relaxed text-text-secondary-light">
            Explore every benchmark across voice, scale, operations,
            integrations, pricing, and more.
          </p>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="bench-matrix"
            className="mt-6 inline-flex items-center gap-2 rounded-btn border border-surface-700/30 px-6 py-3 font-body text-body-sm font-medium text-text-primary-light transition-colors hover:border-surface-700/60 hover:text-accent-purple"
          >
            View Full Benchmark
            <ArrowRight
              size={16}
              weight="bold"
              className={`transition-transform ${
                open ? "rotate-90" : ""
              }`}
            />
          </button>
        </div>

        <BenchMatrix open={open} />
      </div>
    </section>
  );
}

function BenchModule({ module }: { module: BenchmarkModule }) {
  const Visual = visuals[module.visual];
  const isRightColumn = module.index === "02" || module.index === "04";
  const spansFull = module.index === "05";

  return (
    <article
      data-bench-module
      className={`border-t border-surface-200 p-6 pb-8 lg:px-8 lg:py-8 ${
        isRightColumn ? "lg:border-l" : ""
      } ${spansFull ? "lg:col-span-2" : ""}`}
    >
      <p
        data-bench-reveal
        data-order="0"
        className="flex items-center gap-3 font-mono text-caption font-medium tracking-wider text-text-secondary-light"
      >
        <span className="text-accent-purple">{module.index}</span>
        <span aria-hidden="true" className="h-px w-5 bg-surface-700/25" />
        <span>{module.name.toUpperCase()}</span>
      </p>
      <h3
        data-bench-reveal
        data-order="1"
        className="mt-4 font-display text-display-sm font-semibold tracking-tight tabular-nums text-text-primary-light lg:text-display-md"
      >
        {module.metric}
      </h3>
      <div
        data-bench-reveal
        data-order="2"
        className="relative mt-6 w-full overflow-hidden"
      >
        <Visual />
      </div>
      <p
        data-bench-reveal
        data-order="3"
        className="mt-4 max-w-md text-body-sm leading-relaxed text-text-secondary-light"
      >
        {module.support}
      </p>
    </article>
  );
}