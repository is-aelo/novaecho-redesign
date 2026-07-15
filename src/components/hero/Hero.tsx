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
      className="relative flex items-center justify-center overflow-hidden px-4 py-16 lg:px-6 lg:py-24"
    >
      <HeroBackground />

      <div className="relative z-10 flex w-full max-w-180 flex-col items-center px-2 text-center lg:px-6">
        <div ref={headlineRef} className="w-full max-w-3xl text-left lg:text-center">
          <h1 className="font-display text-display-lg lg:whitespace-nowrap lg:text-display-xl font-bold text-text-primary tracking-tight">
            A Call Center In Your <span className="hero-text-highlight">Pocket.</span>
          </h1>

          <p
            ref={subheadRef}
            className="mt-3 max-w-2xl text-left text-body-sm text-text-secondary leading-relaxed lg:mx-auto lg:mt-4 lg:text-center lg:text-body-md"
          >
            Hyper-human voice AI that handles every call, so your team can keep scaling.
          </p>
        </div>

        <ul className="mt-5 flex max-w-190 flex-nowrap items-center justify-start gap-1 self-start lg:self-center lg:justify-center lg:mt-6 lg:gap-2 lg:gap-3">
          {metrics.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="hero-metric-card flex min-w-0 items-center justify-start gap-2 px-1 py-3 text-left lg:justify-center lg:text-center lg:px-3"
            >
              <span className="hero-metric-icon shrink-0">
                <Icon size={16} weight="duotone" aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap text-[10px] leading-none text-text-primary lg:text-body-sm">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="mt-7 flex w-full flex-row items-center justify-center gap-3 lg:mt-9 lg:gap-4">
          <a href="#book-call" className="btn-primary flex-1 whitespace-nowrap lg:flex-none">
            Receive AI Call Now
          </a>
          <a href="#platform" className="btn-secondary flex-1 whitespace-nowrap lg:flex-none">
            See Plans
          </a>
        </div>
      </div>
    </section>
  );
}
