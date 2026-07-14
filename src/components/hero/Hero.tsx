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
    label: "24/7 Instant Support",
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
      className="relative h-screen flex items-start justify-center overflow-hidden pt-20 md:pt-24"
    >
      <HeroBackground />

      <div className="relative z-10 max-w-180 text-center px-6">
        <h1
          ref={headlineRef}
          className="font-display text-display-xl font-bold text-text-primary tracking-tight whitespace-nowrap"
        >
          A Call Center In Your <span className="hero-text-highlight">Pocket.</span>
        </h1>

        <p
          ref={subheadRef}
          className="mt-4 text-body-md text-text-secondary max-w-135 mx-auto leading-relaxed"
        >
          Nova Echo handles inbound and outbound voice calls with hyper-human-level
          understanding at any scale, so your team can focus on what matters most.
        </p>

        <ul className="mt-8 mx-auto grid max-w-180 gap-3 md:grid-cols-3">
          {metrics.map(({ icon: Icon, label }) => (
            <li key={label} className="hero-metric-card flex items-center justify-center gap-3 px-4 py-3 text-center">
              <span className="hero-metric-icon flex-shrink-0">
                <Icon size={18} weight="duotone" aria-hidden="true" />
              </span>
              <span className="text-body-sm text-text-primary">{label}</span>
            </li>
          ))}
        </ul>

        <div ref={ctaRef} className="mt-10 flex items-center justify-center gap-4">
          <a href="#book-call" className="btn-primary">
            Receive AI Call Now
          </a>
          <a href="#platform" className="btn-secondary">
            See Plans
          </a>
        </div>
      </div>
    </section>
  );
}
