"use client";

import useHeroWave from "./useHeroWave";

type HeroWaveProps = {
  reducedMotion: boolean;
};

export default function HeroWave({ reducedMotion }: HeroWaveProps) {
  const { waveRef } = useHeroWave(reducedMotion);

  return (
    <svg
      ref={waveRef}
      viewBox="0 0 1600 96"
      preserveAspectRatio="xMidYMid slice"
      className="hero-wave"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-wave-fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.06" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.94" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hero-wave-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--accent-cyan)" stopOpacity="0.35" />
          <stop offset="1" stopColor="var(--accent-hot-purple)" stopOpacity="0.08" />
        </linearGradient>
        <mask id="hero-wave-mask" mask-type="alpha">
          <rect x="0" y="0" width="1600" height="96" fill="url(#hero-wave-fade)" />
        </mask>
      </defs>

      <g mask="url(#hero-wave-mask)">
        <path
          data-fill
          d="M0,75 L1600,75 Z"
          fill="url(#hero-wave-ribbon)"
          opacity="1"
        />
        <path
          data-wave
          d="M0,75 L1600,75"
          fill="none"
          stroke="var(--accent-purple)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.35"
        />
        <path
          data-wave
          d="M0,75 L1600,75"
          fill="none"
          stroke="var(--accent-blue)"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          data-wave
          d="M0,75 L1600,75"
          fill="none"
          stroke="var(--accent-cyan)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.55"
        />
        <path
          data-wave
          d="M0,75 L1600,75"
          fill="none"
          stroke="var(--text-primary-on-dark)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}
