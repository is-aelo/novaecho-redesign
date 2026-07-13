# Nova Echo — Design System

Source of truth for every visual decision in this build. If a value isn't defined here, it doesn't go in the code — flag it instead of inventing one.

## Color

### Brand (source values — do not alter)
```
--black:        #000000
--white:        #FFFFFF
--navy:         #1E3A8A
--cyan:         #00D1FF
--sky:          #4FACFE
--magenta:      #E61EAD
--purple:       #7000FF
```

### Derived surface scale
Everything below is mathematically derived from the seven brand values above, for hierarchy on a dark-first UI. Marked derived so it's clear these aren't separately brand-sourced.

```
--surface-950:  #000000   (page background — brand black)
--surface-900:  #0B0B0F   (derived, navy-tinted near-black — large surfaces, avoids stark OLED-black)
--surface-800:  #101A33   (derived — card / panel background)
--surface-700:  #1E3A8A   (brand navy — elevated surfaces, default button fill)
```

### Text
```
--text-primary-on-dark:    #FFFFFF
--text-secondary-on-dark:  rgba(255,255,255,0.64)
--text-primary-on-light:   #000000
--text-secondary-on-light: rgba(0,0,0,0.60)
```

### Accent — use sparingly
```
--accent-cyan: #00D1FF   (primary interactive accent — links, focus rings, active states)
--accent-sky:  #4FACFE   (secondary accent — paired with cyan only in glow/gradient contexts, never solid fills)
```

## Gradient system — this is the fix

The current site's problem isn't the colors, it's that cyan-to-sky is used as a full-saturation, hard-edged gradient *fill* on small elements (buttons especially), paired with heavy drop shadows. That reads as a generic startup template. The fix keeps the same brand colors but changes where and how they appear.

**Rule: gradients are for ambient atmosphere, not for fills on interactive elements.**

```
--gradient-glow:
  radial-gradient(circle, rgba(0,209,255,0.16) 0%, rgba(0,209,255,0) 70%)
  Use: large soft background wash behind hero panel, section dividers.
  Never: behind text, never on buttons, never above 20% opacity.

--gradient-surface:
  linear-gradient(180deg, #0B0B0F 0%, #000000 100%)
  Use: large full-width bands (enterprise section, footer transition).
  Near-monochrome — the shift should be barely perceptible, not a visible band.

--gradient-accent-ring (interactive, hover/focus ONLY):
  linear-gradient(135deg, rgba(0,209,255,0.9), rgba(79,172,254,0.9))
  Use: 1.5px border ring on hover/focus, or a low-opacity (≤15%) overlay.
  Never: as a button's default resting-state fill.

--gradient-button-primary (button fill):
  radial-gradient(ellipse 140% 120% at -10% -10%, #E61EAD 0%, #A614E2 35%, #7000FF 60%, #332094 82%, #1E3A8A 100%)
  Elliptical radial from off-canvas top-left — 5-stop blend, magenta blooms inward through purple intermediates into navy.
  Use: primary CTA default fill only. Hover state uses --gradient-accent-ring border + --shadow-glow instead.
```

## Buttons

```
Primary — default:  linear-gradient 135deg var(--surface-700) to #2a4fa8 (subtle navy depth), white text, 1px transparent border, radius-sm, no shadow
Primary — hover:     border becomes var(--gradient-accent-ring), soft glow (blurred, ≤20% opacity cyan, NOT a hard drop shadow)
Primary — focus:     2px solid var(--accent-cyan) outline, offset 2px

Secondary — default: transparent fill, 1px solid rgba(255,255,255,0.24) border, white text
Secondary — hover:    border brightens to rgba(255,255,255,0.48)
```

No button in this system uses a gradient as its resting-state background. That is the single rule that fixes the "harsh CTA" problem from the audit.

## Typography

Two families only, per spec.

```
--font-display: 'Plus Jakarta Sans'   — hero, section headlines, feature titles. Weights 600 / 700.
--font-body:    'Inter'                — paragraphs, UI, buttons, nav. Weights 400 / 500.
```

Data and stats (comparison table, metric callouts) use `--font-body` with `font-variant-numeric: tabular-nums` — keeps to the two-font system while still aligning numerals cleanly.

### Scale
```
display-xl:  56px / 60px line-height   — hero headline
display-lg:  40px / 44px               — section headlines
display-md:  28px / 34px               — card / feature titles
body-lg:     18px / 28px               — hero subhead, intro copy
body-md:     16px / 24px               — default body
body-sm:     14px / 20px               — supporting text, captions
caption:     12px / 16px               — labels, metadata
```

## Spacing
4px base scale: `4, 8, 12, 16, 24, 32, 48, 64, 96`. Nav height capped at 64px.

## Radius
```
--radius-sm: 4px   (buttons, inputs)
--radius-md: 6px   (cards)
--radius-lg: 10px  (large panels)
```

## Shadow

No shadow above a soft, low-opacity glow. No hard drop shadows anywhere — this is the direct fix for the audited "thick shadow" problem.

```
--shadow-none: none
--shadow-glow: 0 0 24px rgba(0,209,255,0.18)   (hover states only, see Buttons above)
```

## Motion (GSAP)

### Durations
```
--dur-fast:  150ms   micro-interactions, hover, focus
--dur-base:  300ms   standard transitions
--dur-slow:  600ms   section reveals on scroll
--dur-hero:  900ms   hero entrance, once per page load
```

### Easing
```
ease-out-standard:  power2.out      default for nearly everything
ease-inout-smooth:  power1.inOut    scroll-linked animation
ease-emphasis:      back.out(1.2)   CTA emphasis only, use sparingly — not on every element
```

### Patterns
```
scroll-reveal:    opacity 0→1, translateY 24px→0, stagger 80ms per child, trigger at 80% viewport
hero-entrance:     headline words stagger in, --dur-hero, ease-out-standard, runs once on load
cta-hover:         scale 1→1.02, glow opacity 0→1, --dur-fast
call-trace-bars:   waveform bars grow from 0 height on scroll into view, stagger 40ms
```

### Hard rules
- Animate only `transform` and `opacity` for performance. Never animate `box-shadow` blur directly — crossfade a pre-blurred glow element's opacity instead.
- Respect `prefers-reduced-motion`: disable scroll-reveal stagger and hero-entrance, keep only essential state changes (hover feedback can stay, minimal).
