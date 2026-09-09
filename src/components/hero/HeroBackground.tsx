"use client";

export default function HeroBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: "var(--surface-hero)" }}
      aria-hidden="true"
    >
      <div className="hero-glow" />
      <div className="hero-grid-fade mx-auto flex h-full w-full max-w-6xl justify-between px-4 lg:px-6">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index} className="hero-grid-line" />
        ))}
      </div>
    </div>
  );
}
