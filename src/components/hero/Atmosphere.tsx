"use client";

export default function Atmosphere() {
  return (
    <svg
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYMid slice"
      className="atmo-svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="atmo-fill" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--navy)" stopOpacity="0.85" />
          <stop offset="0.13" stopColor="var(--accent-purple)" stopOpacity="0.3" />
          <stop offset="0.27" stopColor="var(--accent-hot-purple)" stopOpacity="0.16" />
          <stop offset="0.4" stopColor="var(--purple)" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="var(--navy)" stopOpacity="0" />
          <stop offset="0.6" stopColor="var(--purple)" stopOpacity="0.05" />
          <stop offset="0.73" stopColor="var(--accent-hot-purple)" stopOpacity="0.16" />
          <stop offset="0.87" stopColor="var(--accent-purple)" stopOpacity="0.3" />
          <stop offset="1" stopColor="var(--navy)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="atmo-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.2" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.65" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="atmo-mask" mask-type="alpha">
          <rect x="0" y="0" width="1600" height="700" fill="url(#atmo-fade)" />
        </mask>
        <filter
          id="atmo-form"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.035"
            numOctaves="3"
            seed="7"
            result="warp"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="warp"
            scale="160"
            xChannelSelector="R"
            yChannelSelector="G"
            result="shaped"
          />
          <feGaussianBlur in="shaped" stdDeviation="48" result="soft" />
        </filter>
      </defs>

      <g mask="url(#atmo-mask)" opacity="0.5">
        <path
          d="M-80,0 L-80,230 C120,270 220,320 360,340 C520,364 640,400 800,450 C960,500 1080,440 1240,400 C1400,360 1520,320 1680,270 L1680,0 Z"
          fill="url(#atmo-fill)"
          filter="url(#atmo-form)"
        />
      </g>
    </svg>
  );
}
