"use client";

import HeroBackground from "./HeroBackground";
import HeroWave from "./HeroWave";
import CallReadout from "./CallReadout";
import CallIntent from "./CallIntent";
import WorkflowPreview from "./WorkflowPreview";
import AgentSelector from "./AgentSelector";
import RoiPreview from "./RoiPreview";
import useHeroEntrance from "./useHeroEntrance";
import useVoiceCall from "./useVoiceCall";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

export default function Hero() {
  const { containerRef } = useHeroEntrance();
  const call = useVoiceCall();
  const scrollTo = useSmoothScroll();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative overflow-hidden bg-surface-950 px-4 py-16 lg:px-6 lg:py-24"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col">
        <div className="relative z-10 order-1 flex max-w-3xl flex-col items-start text-left">
          <h1
            data-hero-item
            className="font-display text-display-md font-medium tracking-tight text-text-primary lg:text-display-xl"
          >
            Human-like AI calls that get things done.
          </h1>

          <p
            data-hero-item
            className="mt-4 max-w-lg font-body text-body-md leading-relaxed text-text-secondary lg:max-w-none lg:whitespace-nowrap"
          >
            Nova Echo holds natural conversations, remembers every detail,
            and takes action across 5,000+ apps.
          </p>
        </div>

        <div
          data-hero-item
          className="relative z-0 order-2 mt-8 lg:order-3 lg:mt-12"
        >
            <div className="overflow-hidden rounded-window border hero-window-neon bg-surface-glass hero-window-blur">
              <div className="flex flex-col items-start gap-2 border-b border-hairline-on-dark px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-6">
                <div className="flex items-center gap-2">
                  <span className="window-dot" aria-hidden="true" />
                  <span className="window-dot" aria-hidden="true" />
                  <span className="window-dot" aria-hidden="true" />
                  <p className="font-mono text-body-sm font-medium uppercase tracking-wider text-text-primary">
                    Nova Echo Console
                  </p>
                </div>
                <p className="flex items-center gap-2 font-mono text-caption uppercase tracking-wider text-text-secondary">
                  <span className="hero-live-dot" data-active="true" aria-hidden="true" />
                  Simulated call
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                <div className="px-4 pt-3 pb-4 lg:col-span-3 lg:border-r hero-divider-neon lg:px-6 lg:pt-4 lg:pb-6">
                  <p className="console-panel-head mb-2 lg:mb-3">Agents</p>
                  <AgentSelector
                    activeId={call.script.id}
                    onSelect={call.selectAgent}
                  />
                  <p
                    key={call.script.id}
                    className="mt-4 border-t border-hairline-on-dark pt-4 font-body text-caption leading-relaxed text-text-secondary"
                  >
                    {call.script.description}
                  </p>
                </div>

                <div className="border-t border-hairline-on-dark px-4 pt-3 pb-2 lg:col-span-6 lg:border-t-0 lg:px-6 lg:pt-4 lg:pb-6">
                  <div className="mb-2 flex flex-col items-start gap-2 lg:mb-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                    <p className="console-panel-head">Live call</p>
                    <p
                      className="font-mono text-caption tabular-nums text-text-secondary"
                      aria-live="polite"
                    >
                      {call.script.agentLabel} · {call.elapsed}
                    </p>
                  </div>

                  <CallReadout call={call} />

                  <div className="mt-4 border-t border-hairline-on-dark pt-4">
                    <CallIntent call={call} />
                  </div>
                </div>

                <div className="border-t border-hairline-on-dark px-4 pt-2 pb-4 lg:col-span-3 lg:border-l lg:border-t-0 lg:border-hairline-on-dark lg:px-6 lg:pt-4 lg:pb-6">
                  <p className="console-panel-head mb-2 lg:mb-3">Live workflow</p>
                  <WorkflowPreview call={call} />
                  <RoiPreview call={call} />
                </div>
              </div>
            </div>

            <span className="hero-corner-tl" aria-hidden="true" />
            <span className="hero-corner-tr" aria-hidden="true" />
            <span className="hero-corner-bl" aria-hidden="true" />
            <span className="hero-corner-br" aria-hidden="true" />
          </div>

          <div
            data-hero-item
            className="order-3 mt-8 grid w-full grid-cols-2 gap-4 lg:order-2 lg:flex lg:w-auto lg:items-center"
          >
            <a
              href="#book-call"
              className="btn-primary whitespace-nowrap"
              onClick={(e) => scrollTo("#book-call", e)}
            >
              Book a Call
            </a>
            <a
              href="#results"
              className="btn-secondary whitespace-nowrap"
              onClick={(e) => scrollTo("#results", e)}
            >
              Clients Wins
            </a>
          </div>
        </div>

        <div
          data-hero-item
          className="relative z-0 mt-12 -mx-4 overflow-hidden lg:-mx-6 lg:mt-16"
        >
          <HeroWave reducedMotion={call.reducedMotion} />
        </div>
    </section>
  );
}
