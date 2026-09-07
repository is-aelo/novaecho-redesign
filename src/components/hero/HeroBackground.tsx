"use client";

import Atmosphere from "./Atmosphere";
import useAtmosphereMotion from "./useAtmosphereMotion";

const LINES = 4;

export default function HeroBackground() {
  const { swayRef } = useAtmosphereMotion();

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "var(--surface-950)" }}
      aria-hidden="true"
    >
      <div className="atmo-wrap">
        <div ref={swayRef} className="atmo-breathe">
          <Atmosphere />
        </div>
      </div>
      <div className="hero-grid-fade mx-auto flex h-full w-full max-w-6xl justify-between px-4 lg:px-6">
        {Array.from({ length: LINES }, (_, index) => (
          <span key={index} className="hero-grid-line" />
        ))}
      </div>
    </div>
  );
}
