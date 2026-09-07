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
          <stop offset="0.3" stopColor="var(--navy)" stopOpacity="0.65" />
          <stop offset="0.48" stopColor="var(--accent-cyan)" stopOpacity="0.38" />
          <stop offset="0.6" stopColor="var(--accent-sky)" stopOpacity="0.32" />
          <stop offset="0.74" stopColor="var(--purple)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--navy)" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="atmo-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="1" />
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
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            seed="11"
            result="grain"
          />
          <feColorMatrix
            in="grain"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.8 0.8 0.8 0 -0.9"
            result="speck"
          />
          <feComposite in="speck" in2="soft" operator="in" result="grainIn" />
          <feBlend in="soft" in2="grainIn" mode="multiply" result="textured" />
        </filter>
      </defs>

      <g mask="url(#atmo-mask)" opacity="0.5">
        <path
          d="M-80,700 L-80,470 C120,430 220,380 360,360 C520,336 640,300 800,250 C960,200 1080,260 1240,300 C1400,340 1520,380 1680,430 L1680,700 Z"
          fill="url(#atmo-fill)"
          filter="url(#atmo-form)"
        />
      </g>
    </svg>
  );
}
