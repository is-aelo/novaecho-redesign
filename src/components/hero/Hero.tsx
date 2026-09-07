"use client";

import {
  ArrowRight,
  ChatsCircle,
  ClockCounterClockwise,
  Play,
  SpeakerHigh,
} from "@phosphor-icons/react";
import HeroBackground from "./HeroBackground";
import VoiceWaveform from "./VoiceWaveform";
import CallReadout from "./CallReadout";
import WorkflowPreview from "./WorkflowPreview";
import AgentSelector from "./AgentSelector";
import useHeroEntrance from "./useHeroEntrance";
import useVoiceCall from "./useVoiceCall";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useRoiModal } from "@/contexts/RoiContext";

const values = [
  {
    icon: ChatsCircle,
    label: "Human-like conversations",
  },
  {
    icon: SpeakerHigh,
    label: "Natural-sounding AI voices",
  },
  {
    icon: ClockCounterClockwise,
    label: "24/7 expert support",
  },
];

export default function Hero() {
  const { containerRef } = useHeroEntrance();
  const call = useVoiceCall();
  const scrollTo = useSmoothScroll();
  const { openRoi } = useRoiModal();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative overflow-hidden bg-surface-950 px-4 py-16 lg:px-6 lg:py-24"
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex max-w-3xl flex-col items-start text-left lg:order-1 lg:col-span-12">
            <h1
              data-hero-item
              className="font-display text-display-lg font-medium tracking-tight text-text-primary lg:text-display-xl"
            >
              Human-like AI calls that get things done.
            </h1>

            <p
              data-hero-item
              className="mt-4 max-w-lg font-body text-body-md leading-relaxed text-text-secondary"
            >
              Nova Echo holds natural conversations, remembers every detail,
              and takes action across 5,000+ apps.
            </p>

            <div data-hero-item className="mt-8 flex w-full flex-row items-center gap-4">
              <a
                href="#book-call"
                className="btn-primary whitespace-nowrap"
                onClick={(e) => scrollTo("#book-call", e)}
              >
                Book a Call
              </a>
              <a
                href="#book-call"
                className="btn-secondary whitespace-nowrap"
                onClick={(e) => scrollTo("#book-call", e)}
              >
                <Play size={14} weight="fill" aria-hidden="true" className="mr-2" />
                Watch Demo
              </a>
            </div>

            <ul
              data-hero-item
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
              aria-label="Product highlights"
            >
              {values.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon size={16} weight="duotone" aria-hidden="true" className="shrink-0 text-accent-cyan" />
                  <span className="font-body text-body-sm text-text-secondary">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div data-hero-item className="lg:order-2 lg:col-span-12">
            <div className="rounded-md border border-white/10 bg-white/10 p-6 backdrop-blur-xl lg:p-8">
              <div className="mb-6 flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                <p className="font-mono text-body-sm font-medium uppercase tracking-wider text-text-primary">
                  Your Agents to Success
                </p>
                <p className="font-mono text-caption uppercase tracking-wider text-text-secondary">
                  Simulated preview
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-x-4 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-3">
                <div className="lg:col-span-2 lg:flex lg:flex-col lg:justify-center">
                  <AgentSelector
                    activeId={call.script.id}
                    onSelect={call.selectAgent}
                  />
                </div>

                <div className="border-t border-white/10 pt-6 lg:col-span-3 lg:flex lg:flex-col lg:justify-center lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
                  <VoiceWaveform
                    phase={call.phase}
                    reducedMotion={call.reducedMotion}
                    energy={call.script.energy}
                    compact
                  />
                </div>

                <div className="border-t border-white/10 pt-6 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
                  <CallReadout call={call} />
                </div>

                <div className="border-t border-white/10 pt-6 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-3 lg:pt-0">
                  <WorkflowPreview call={call} />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <p
                key={call.script.id}
                className="max-w-md font-body text-body-sm leading-relaxed text-text-secondary"
              >
                {call.script.description}
              </p>
              <button
                type="button"
                onClick={() => openRoi(call.script.roiName)}
                className="inline-flex shrink-0 items-center gap-2 font-body text-body-sm font-medium text-text-primary transition-colors hover:text-accent-cyan"
              >
                {call.script.roiCta}
                <ArrowRight size={16} weight="bold" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
