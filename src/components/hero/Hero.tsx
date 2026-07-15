"use client";

import {
  ClockCounterClockwise,
  CurrencyDollarSimple,
  Translate,
} from "@phosphor-icons/react";
import HeroBackground from "./HeroBackground";
import useHeroEntrance from "./useHeroEntrance";

const metrics = [
  {
    icon: ClockCounterClockwise,
    label: "24/7 Support",
  },
  {
    icon: Translate,
    label: "30+ Languages",
  },
  {
    icon: CurrencyDollarSimple,
    label: "80% Lower Cost",
  },
];

export default function Hero() {
  const { containerRef, headlineRef, subheadRef, ctaRef } = useHeroEntrance();

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 sm:py-20"
    >
      <HeroBackground />

      <div className="relative z-10 flex w-full max-w-180 flex-col items-center px-2 text-center sm:px-6">
        <div ref={headlineRef} className="w-full max-w-3xl text-left sm:text-center">
          <h1 className="font-display text-display-lg sm:whitespace-nowrap sm:text-display-xl font-bold text-text-primary tracking-tight">
            A Call Center In Your <span className="hero-text-highlight">Pocket.</span>
          </h1>

          <p
            ref={subheadRef}
            className="mt-3 max-w-2xl text-left text-body-sm text-text-secondary leading-relaxed sm:mx-auto sm:mt-4 sm:text-center sm:text-body-md"
          >
            Hyper-human voice AI that handles every call, so your team can keep scaling.
          </p>
        </div>

        <ul className="mt-5 flex max-w-[760px] flex-nowrap items-center justify-start gap-1 sm:justify-center sm:mt-6 sm:gap-2 lg:gap-3">
          {metrics.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="hero-metric-card flex min-w-0 flex-1 items-center justify-start gap-2 px-1 py-3 text-left sm:justify-center sm:text-center sm:px-3"
            >
              <span className="hero-metric-icon flex-shrink-0">
                <Icon size={16} weight="duotone" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap text-[10px] leading-none text-text-primary sm:text-body-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row sm:gap-4">
          <a href="#book-call" className="btn-primary w-full sm:w-auto">
            Receive AI Call Now
          </a>
          <a href="#platform" className="btn-secondary w-full sm:w-auto">
            See Plans
          </a>
        </div>
      </div>
    </section>
  );
}
