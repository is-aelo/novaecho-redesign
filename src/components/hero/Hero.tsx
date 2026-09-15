"use client";

import HeroBackground from "./HeroBackground";
import HeroTrusted from "./HeroTrusted";
import HeroWave from "./HeroWave";
import useHeroEntrance from "./useHeroEntrance";
import useHeroStatus from "./useHeroStatus";
import useVoiceCall from "./useVoiceCall";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const WAVE_BARS = [
  18, 30, 48, 66, 80, 90, 74, 56, 40, 26, 34, 52, 70, 88, 96, 78, 60, 44, 28,
  38, 58, 78, 94, 100, 84, 66, 48, 32, 44, 64, 84, 98, 90, 72, 54, 36, 46, 66,
  82, 70,
];

export default function Hero() {
  const { containerRef } = useHeroEntrance();
  const call = useVoiceCall();
  const { blocks, visibleCount } = useHeroStatus();
  const scrollTo = useSmoothScroll();

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-surface-hero px-4 lg:px-6"
    >
      <HeroBackground />

      <div className="relative z-10 flex w-full flex-1 flex-col justify-center">
        <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6">
          <div
            data-hero-item
            className="flex flex-col gap-2 text-center"
          >
            <h1 className="mt-8 font-display text-display-sm font-semibold tracking-tight text-text-primary md:text-display-md lg:text-display-xl">
              Never sleep on sales again
            </h1>
            <p className="mx-auto max-w-2xl font-body text-body-sm font-light leading-relaxed text-text-secondary">
              AI voice agents that answer calls, qualify leads, and book
              appointments &mdash; around the clock.
            </p>
          </div>

          <div
            data-hero-item
            className="order-3 mx-auto w-full max-w-md lg:max-w-2xl"
          >
            <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900">
              <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-3">
                <span className="window-dot" aria-hidden="true" />
                <span className="window-dot" aria-hidden="true" />
                <span className="window-dot" aria-hidden="true" />
                <span className="console-panel-head">Nova Echo Session</span>
                <span className="hero-status-dot ml-auto" aria-hidden="true" />
              </div>
              <div className="relative flex flex-col gap-2 px-4 py-6">
                <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                  <svg
                    className="hero-window-wave h-full w-full"
                    viewBox="0 0 640 120"
                    preserveAspectRatio="none"
                  >
                    {WAVE_BARS.map((bar, index) => {
                      const height = bar * 0.6;
                      return (
                        <rect
                          key={index}
                          x={8 + index * 16}
                          y={60 - height / 2}
                          width={6}
                          height={height}
                          fill="var(--accent-cyan)"
                        />
                      );
                    })}
                  </svg>
                </div>
                <div className="relative flex flex-col gap-2">
                  {blocks.map((block, index) => {
                    const revealed = index < visibleCount;
                    const isActive = revealed && index === visibleCount - 1;
                    const { kind, content } = block;
                    const check = content.startsWith("✔ ") ? "✔ " : null;
                    const label = check ? content.slice(2) : content;
                    const lineTone =
                      kind === "banner" && index === 0
                        ? "font-semibold text-accent-purple-soft"
                        : kind === "banner"
                          ? "text-accent-purple-soft/80"
                          : "text-accent-purple-soft";
                    return (
                      <div
                        key={`${kind}-${content}`}
                        aria-hidden={!revealed}
                        className={`hero-status-line font-mono text-body-sm ${lineTone} ${
                          !revealed
                            ? "opacity-0"
                            : isActive || kind === "banner"
                              ? "opacity-100"
                              : "opacity-40"
                        }`}
                      >
                        {kind === "step" && (
                          <span
                            className="text-accent-purple-soft/50"
                            aria-hidden="true"
                          >
                            {"~$ "}
                          </span>
                        )}
                        {check && (
                          <span
                            className="text-status-green"
                            aria-hidden="true"
                          >
                            {check}
                          </span>
                        )}
                        {label}
                        {isActive && (
                          <span
                            className="hero-status-cursor"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div
            data-hero-item
            className="order-4 flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="#book-call"
              className="btn-secondary inline-flex items-center whitespace-nowrap"
              onClick={(e) => scrollTo("#book-call", e)}
            >
              Receive a call
            </a>
            <a
              href="#solutions"
              className="btn-hero-primary inline-flex items-center whitespace-nowrap"
              onClick={(e) => scrollTo("#solutions", e)}
            >
              Meet the agents
            </a>
          </div>

          <HeroTrusted />
        </div>
      </div>

      <div
        data-hero-item
        className="hero-wave-band relative z-0 -mx-4 overflow-hidden pb-8 lg:-mx-6 lg:pb-10"
      >
        <HeroWave reducedMotion={call.reducedMotion} />
      </div>
    </section>
  );
}