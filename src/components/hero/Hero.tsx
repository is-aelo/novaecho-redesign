"use client";

import { ArrowDown } from "@phosphor-icons/react/ssr";
import Trusted from "@/components/trusted/Trusted";
import HeroBackground from "./HeroBackground";
import HeroWave from "./HeroWave";
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
            className="font-display text-display-md font-semibold tracking-tight text-text-primary lg:text-display-xl"
          >
            Your Next Sales Rep Doesn&rsquo;t Sleep.
          </h1>

          <p
            data-hero-item
            className="mt-4 w-full max-w-none font-body font-light text-body-md leading-relaxed text-text-primary"
          >
            Nova Echo gives your business human-like AI agents that handle calls,
            qualify leads, book appointments, and take action across your workflow
            &mdash; 24/7.
          </p>
        </div>

        <div
          data-hero-item
          className="order-3 mt-8 grid w-full grid-cols-2 gap-4 lg:order-2 lg:flex lg:w-auto lg:items-center"
        >
          <a
            href="#book-call"
            className="btn-secondary inline-flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={(e) => scrollTo("#book-call", e)}
          >
            Request a Demo
          </a>
          <a
            href="#solutions"
            className="btn-primary nudge-vertical inline-flex items-center justify-center gap-2 whitespace-nowrap"
            onClick={(e) => scrollTo("#solutions", e)}
          >
            Meet the Agents
            <ArrowDown weight="bold" aria-hidden="true" />
          </a>
        </div>
      </div>

        <div
          data-hero-item
          className="relative z-0 mt-12 -mx-4 overflow-hidden lg:-mx-6 lg:mt-16"
        >
          <HeroWave reducedMotion={call.reducedMotion} />
        </div>

        <div
          data-hero-item
          className="relative z-10 mt-8 w-full -mx-4 px-4 lg:-mx-6 lg:px-6 lg:mt-10"
        >
          <Trusted />
        </div>
    </section>
  );
}
