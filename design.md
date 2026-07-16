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
--surface-950:  #000000   (page background — brand black, hero only)
--surface-900:  #0B0B0F   (derived, navy-tinted near-black — large surfaces, avoids stark OLED-black)
--surface-800:  #101A33   (derived — card / panel background)
--surface-700:  #1E3A8A   (brand navy — elevated surfaces, default button fill)
--surface-50:   #FAFAFA   (light section background — features, stats, etc.)
--surface-100:  #F5F5F5   (light card / panel background)
--surface-200:  #E5E5E5   (light card border)
```

### Text
```
--text-primary-on-dark:    #FFFFFF
--text-secondary-on-dark:  rgba(255,255,255,0.64)
--text-primary-on-light:   #000000
--text-secondary-on-light: rgba(0,0,0,0.60)
```

Light surfaces (Features, stats, etc.) use `--text-primary-on-light` and `--text-secondary-on-light`. Dark surfaces (Hero, footer) use `--text-primary-on-dark` and `--text-secondary-on-dark`.

### Accent — use sparingly
```
--accent-cyan: #00D1FF   (primary interactive accent — links, focus rings, active states)
--accent-sky:  #4FACFE   (secondary accent — paired with cyan only in glow/gradient contexts, never solid fills)
```

## Gradient system — this is the fix

The current site's problem isn't the colors, it's that cyan-to-sky is used as a full-saturation, hard-edged gradient *fill* on small elements (buttons especially), paired with heavy drop shadows. That reads as a generic startup template. The fix keeps the same brand colors but changes where and how they appear.

**Rule: gradients are for ambient atmosphere and the primary CTA fill. Secondary/tertiary buttons use solid or near-solid fills only.**

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

--gradient-text-highlight:
  var(--gradient-accent-ring)
  Use: a subtle accent treatment on a single hero headline phrase only, not the full headline.
  Keep the effect restrained and avoid loud, full-saturation blends.

--gradient-button-primary (button fill):
  linear-gradient(135deg, #E61EAD 0%, #BA0FFF 40%, #7000FF 65%, #2C259A 88%, #1E3A8A 100%)
  5-stop linear blend at 135deg — magenta through hot purple into navy.
  Use: primary CTA default fill only. Hover state uses --gradient-accent-ring border + --shadow-glow instead.
  Note: #BA0FFF and #2C259A are intermediate values not in the core brand palette — used only within this gradient.
```

## Buttons

```
Primary — default:  linear-gradient 135deg #E61EAD → #BA0FFF → #7000FF → #2C259A → #1E3A8A (--gradient-button-primary), white text, 1px transparent border, radius-sm, no shadow
Primary — hover:     border becomes var(--gradient-accent-ring), soft glow (blurred, ≤20% opacity cyan, NOT a hard drop shadow)
Primary — focus:     2px solid var(--accent-cyan) outline, offset 2px

Secondary — default: transparent fill, 1px solid rgba(255,255,255,0.24) border, white text
Secondary — hover:    border brightens to rgba(255,255,255,0.48)
```

Only the primary CTA uses a gradient as its resting-state background (--gradient-button-primary). All other buttons use solid or near-solid fills. The gradient on the primary CTA is the deliberate focal point — secondary buttons remain restrained to maintain visual hierarchy.

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
display-xs:  18px / 24px               — mobile section headlines that must fit one row
display-sm:  22px / 28px               — mobile section headlines
display-md:  28px / 34px               — card / feature titles
body-lg:     18px / 28px               — hero subhead, intro copy
body-md:     16px / 24px               — default body
body-sm:     14px / 20px               — supporting text, captions
caption:     12px / 16px               — labels, metadata
```

## Responsive breakpoints

Mobile-first. Desktop layout triggers at `lg:` (≥1024px) — not `md:`.

Tablets and large-pocket devices use **mobile styling** even if their viewport exceeds 768px:
- iPad (all models except Mini): 810–1024px → mobile
- iPad Mini: 768px → desktop (first device at the `lg:` boundary)
- Surface Duo: 571px folded → mobile
- Android tablets, Fire tablets, Surface Go: up to 1024px → mobile

Only true laptop/desktop screens (≥1024px) get desktop layout. When in doubt, keep it mobile.

## Spacing
4px base scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 180`. Nav height capped at 64px.

### Section pattern — subtext to content gap
The vertical gap between a section's subtext paragraph and its main content (card grid, logo track, etc.) must be `mt-5` (20px) on mobile and `lg:mt-6` (24px) on desktop. Matches the hero's subtext-to-metrics spacing.

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

## Hero

Full-viewport-height section (100vh min). Content centered vertically and horizontally over the breathing audiowave background. The hero is the only section on the dark background (`--surface-950`); subsequent sections use light surfaces (`--surface-50`, `--surface-100`).

```
Headline:   display-xl (56px / 60px), font-display, font-weight 700, white
Subhead:    body-lg (18px / 28px), font-body, --text-secondary-on-dark
Trust strip: three compact metrics beneath the subhead, centered, using Phosphor Icons via @phosphor-icons/react
CTA row:    primary button + secondary button, gap 16px
Max-width:  720px, text-align center
```

## Iconography

Use Phosphor Icons only for interface and feature icons in this project.

```
Library: @phosphor-icons/react
Style: duotone or regular, consistent weight
Usage: small feature highlights, support metrics, and inline UI icons only
Color: use --accent-cyan for icon emphasis; keep surrounding text in --text-primary-on-dark
```

## Trusted / Logos section

Light background (`--surface-50`), centered content. Displays brand logos in a flex-wrap row, grayscale with low opacity, transitioning to full-color on hover. Logo order is by popularity/impact.

```
Headline:   display-md → display-lg, font-display, --text-primary-on-light
Subtext:    body-sm → body-md, --text-secondary-on-light
Callout:    body-sm, medium weight, --text-primary-on-light at 80% opacity
Logos:      32px height, object-contain, grayscale(100%) opacity-40 → hover: grayscale(0) opacity-80
Gap:        column-gap 40px, row-gap 32px
```

## Agents section

Light background (`--surface-100`), 3-column card grid on desktop. Cards are white (`--surface-50`) with subtle border (`--surface-200`). Each card has a title, body, and a "Calculate ROI" link styled in accent-cyan.

```
Background:    --surface-100
Card fill:     --surface-50
Card border:   --surface-200
Headline:      display-md → display-lg, font-display, --text-primary-on-light
Subtext:       body-sm → body-md, --text-secondary-on-light
Card title:    display-sm, font-display, font-bold, --text-primary-on-light
Card body:     body-sm, --text-secondary-on-light
CTA link:      body-sm, font-medium, --accent-cyan → hover --accent-sky
Grid:          1 col mobile → 3 cols at lg, gap-6
Gap subtext:   mt-5 / lg:mt-6 (per section pattern)
Card padding:  p-8
```

## Hero background — live phone call waveform

Full-bleed layered background behind hero content (z-0). A single continuous waveform of ~466 ultra-thin vertical bars scrolls horizontally right-to-left, simulating a live voice call being recorded in real time. The visual language matches professional audio software (Apple Voice Memos, Adobe Audition, Descript) — not a music visualizer or equalizer.

```
Front layer:   brightest, crisp, closest, opacity 0.92, blur 0.6, fastest scroll (175px/s), max amplitude 52px
Middle layer:  semi-transparent, opacity 0.55, blur 1.6, moderate scroll (120px/s), max amplitude 68px
Back layer:    heavily blurred, faint, opacity 0.25, blur 2.8, slowest scroll (70px/s), max amplitude 88px
```

### Waveform generation — speech-event-driven engine

Bar heights are NOT random and NOT procedural noise. Each layer runs a `SpeechEngine` that models human speech as a state machine with explicit phases:

1. **Pause phase** — near-zero amplitude, breathing. Duration: 0.25–0.85s, varies over time.
2. **Speaking phase** — a phrase of N syllables (3–15). Syllable spacing: 150–300ms. Each syllable is a Gaussian envelope (attack→peak→decay) with emphasis variation and micro-oscillation.
3. **Decay phase** — exponential tail after the last syllable. Duration: 0.18–0.38s.
4. **Return to pause** — cycle repeats with different parameters each time.

Each phrase has randomized: syllable count, spacing, intensity (0.18–0.73), decay duration, and pause duration. The engine carries continuous state across frames — amplitude never resets, never jumps, never visibly loops.

### Spatial coherence — one continuous signal

All bars in a layer are driven by the same `SpeechEngine` instance. Neighboring bar correlation is enforced by:

- **Buffer shift**: each frame, all amplitudes shift left by one position; one new sample is pushed on the right.
- **Double-pass Gaussian spatial smoothing** (radius 5, σ≈1.8): heights are averaged across neighbors with Gaussian weighting, applied twice for strong coherence.
- **Per-bar shaping**: `amplitude^1.3` power curve for natural speech dynamics.
- **Temporal continuity**: the `SpeechEngine` amplitude evolves continuously — no frame-to-frame discontinuities.

The result is a single coherent waveform that behaves like one recorded audio signal, not independent animated bars.

### Speech characteristics

The engine reproduces natural speech patterns:
- Long quiet moments (breathing pauses between phrases)
- Soft onsets (exponential attack at phrase start)
- Syllable clusters with natural emphasis variation
- Gradual exponential decay after each phrase
- Variable phrase lengths (short words to long sentences)
- Rhythm that constantly evolves (no repeating sequences)

Most of the waveform stays relatively calm. Occasional energetic phrases appear before returning to quieter regions.

### Movement

- Entire waveform continuously translates left via GSAP ticker
- New amplitude data generated only at the right edge (buffer shift + push)
- Old data exits naturally on the left
- Scroll speed varies per layer (front fastest, back slowest)

### Visual design

```
Background:    var(--hero-wave-background) #05070A
Bars:          2px wide, 1px gap, rx=1 rounded caps (fully rounded ends)
Gradient:      cyan (#00D1FF) → sky (#4FACFE) via linearGradient (no purple — enterprise-grade minimal)
Opacity:       varies with amplitude per layer (0.03–1.0 range)
Glow:          single SVG feGaussianBlur filter (0.4 stdDeviation) — very subtle, no heavy bloom
Mask:          horizontal linearGradient fade at edges (0%→4% opacity ramp, 96%→100% fade)
```

### Performance

- All waveform data stored in useRef (engines, Float32Array buffers, SVG elements) — never triggers React re-renders
- Bar positions updated via direct SVG attribute mutation (setAttribute)
- Float32Array for buffer operations (cache-friendly, no GC pressure)
- GSAP ticker drives the animation loop at native frame rate
- No React state updates during animation
- Initialization guard prevents double-setup in React Strict Mode
- Cleanup removes all DOM elements and ticker listener on unmount

### Reduced motion

`prefers-reduced-motion: reduce` — GSAP ticker is never registered, waveform remains static at initial state (near-zero amplitude bars).

## Pricing section

Light section on `--surface-50` with a 3-column card grid. The center "Recommended" card uses `--surface-950` (pure black) with a cyan glow border (`shadow-glow`) and extra vertical padding to stand out against the light side cards. Side cards use `--surface-100` (light gray) matching the Features/Agents card style.

```
Background:       --surface-50
Side card fill:   --surface-100
Side card border: --surface-200
Center card fill: --surface-950 + shadow-glow
Center border:    --accent-cyan/40
Center padding:   py-10 px-8 (lg: py-12) — taller than side cards (p-8)
Headline:         display-md → display-lg, font-display, --text-primary-light
Subtext:          body-sm → body-md, --text-secondary-light
Tier label:       caption, uppercase, tracking-widest, --accent-cyan
Plan name:        body-md, font-display, semibold, --text-primary-light (side) / --text-primary (center)
Price:            display-lg, font-display, bold, --text-primary-light (side) / --text-primary (center)
Feature icon:     CheckCircle, --accent-cyan, weight=fill
Feature text:     body-sm, --text-secondary-light (side) / --text-secondary (center)
Side CTA:         1px border surface-700/30, text-primary-light, hover border surface-700/60
Center CTA:       btn-primary class (same as hero CTA), --gradient-button-primary, white text, hover shadow-glow
Grid:             1 col mobile → 3 cols at lg, gap-6 → gap-8
Gap subtext:      mt-5 / lg:mt-6 (per section pattern)
Card padding:     p-8 (side), py-10 px-8 lg:py-12 (center)
```

## Benchmark section

Light comparison table on `--surface-50` background. 4-column matrix comparing Nova Echo AI vs Competitors vs Humans across 13 metrics. The "Nova Echo AI" column header has a pink-to-purple gradient bottom border; values under it use `--accent-cyan` for visual emphasis.

```
Background:       --surface-50
Header labels:    body-sm, semibold, uppercase, tracking-wider
  Nova Echo AI:   text-primary-light, gradient bottom border (--gradient-button-primary)
  Others:         text-secondary-light at 60% opacity, solid border using surface-200
Feature column:   text-body-sm, medium weight, --text-secondary-light
Nova Echo values: text-body-sm, medium weight, --accent-purple
Other values:     text-body-sm, --text-secondary-light at 60% opacity
Row divider:      thin line, --surface-200 at 80% opacity
Scroll:           horizontal scroll on mobile (min-w-[640px])
```

## Partners section

Light section on `--surface-50` with a 3-column card grid. Cards match the Features card style (`--surface-100` fill, `--surface-200` border). Three partner program types with icons.

```
Background:       --surface-50
Card fill:        --surface-100
Card border:      --surface-200
Card min-height:  min-h-45
Headline:         display-md → display-lg, font-display, --text-primary-light
Subtext:          body-sm → body-md, --text-secondary-light
Icon:             --accent-cyan, duotone, 24px
Card title:       font-bold, body-md, --text-primary-light
Card body:        body-sm, --text-secondary-light
Grid:             1 col mobile → 3 cols at lg, gap-6 → gap-8
Gap subtext:      mt-5 / lg:mt-6 (per section pattern)
Card padding:     p-8
Icons:            Buildings, Handshake, ShareNetwork (Phosphor duotone)
```

## Stories section

Light section on `--surface-50` with a 3-column testimonial card grid. Each card features a large faded quote icon, a blockquote, and an author credit with a thin top border.

```
Background:       --surface-50
Card fill:        --surface-100
Card border:      --surface-200
Quote icon:       Quotes, 28px, weight=fill, --accent-cyan at 20% opacity
Quote text:       body-sm, --text-secondary-light, wrapped in curly quotes
Author name:      font-bold, body-sm, --text-primary-light
Author role:      caption, --text-secondary-light at 60% opacity
Divider:          border-t, --surface-200
Grid:             1 col mobile → 3 cols at lg, gap-6 → gap-8
Gap subtext:      mt-5 / lg:mt-6 (per section pattern)
Card padding:     p-8
```

## Demo / Book-a-Call section

Light section (`--surface-50`) with a two-column responsive layout. Placed last on the page. Left column has the headline and subtext; right column has a form card on a light surface with thin, sharp borders.

```
Background:       --surface-50
Layout:           flex-col → lg:flex-row, gap-12 → lg:gap-16
Headline:         display-md → display-lg, font-display, bold, --text-primary-light
Subtext:          body-sm → body-md, max-w-lg, --text-secondary-light
Gap subtext:      mt-4

Form card:
  Fill:           --surface-100
  Border:         1px solid --surface-200
  Padding:        p-6 → lg:p-8
  Width:          full → lg:max-w-lg

Form label:       caption, uppercase, tracking-wider, --text-secondary-light at 60% opacity
Input border:     1px solid --surface-200, focus-within transitions to --accent-cyan
Input fill:       transparent
Input text:       body-sm, font-mono, --text-primary-light
Input placeholder:--text-secondary-light at 30% opacity
Input padding:    px-3 py-2.5

Voice dropdown:
  Trigger:        same border/typography as inputs, chevron icon rotates on open
  Panel:          absolute, top-full, mt-1, --surface-100, 1px --surface-200 border
  Item:           px-3 py-2.5, hover --surface-200, selected item shows Check icon in --accent-cyan
  Outside click:  closes via mousedown listener

Submit CTA:       btn-primary class, full width on mobile (w-full)
```

## Footer

Dark section (`--surface-950`) matching the hero background. Two-column layout with logo + badges on the left and contact details on the right.

```
Background:       --surface-950
Layout:           flex-col → lg:flex-row, gap-10 → lg:gap-24
Padding:          py-12 → lg:py-16

Logo row:         novaecho-logo.png (28px) + font-display 15px semibold "Nova Echo AI"
Badges:           28px height, object-contain
  Top Lead Gen:   imgi_16_Nova Echo Top Sales Software Tekpon Award.png
  HIPAA:          imgi_18_HIPAA Complaint Banner (1).png

Contact heading:  body-md, font-display, semibold, --text-primary
Contact items:    body-sm, --text-secondary, hover --accent-cyan links
Address:          <address> not-italic, line breaks via <br>
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

## ROI Calculator Modal

Full-screen modal overlay triggered by "Calculate ROI" buttons in the Agents section. Dark theme matching the hero, with an 8-field input form on the left and calculated results on the right.

```
Background:       --surface-950
Overlay:          bg-black/60 backdrop-blur-sm
Panel:            max-w-4xl, border --surface-800, padding p-6 → lg:p-8
Title:            display-md, font-display, bold, --text-primary — dynamically shows agent name
Subtext:          body-sm, --text-secondary

Input section:
  Label:          caption, medium, --text-secondary at 60% opacity
  Input border:   1px --surface-800, focus-within --accent-cyan, rounded-sm
  Input fill:     transparent
  Input text:     body-sm, font-mono, --text-primary
  Input placeholders: "e.g., 200", etc.
  Fields:         totalCalls, missedCalls, holdCalls, closeRate, ticketValue,
                  receptionistCost, hoursSpent, hourlyRate
  Calculate CTA:  btn-primary, full width, disabled (opacity-40) until all fields filled

Results section:
  Empty state:    dashed border --surface-800, centered prompt text
  Result rows:    border-b --surface-800/60, font-mono values, accent-cyan for key figures
  Breakdown:      caption-size, --text-secondary at 40% opacity labels

Plan recommendation:
  Total < $500      → Nova Light ($99/mo)
  Total $500–$1999  → Nova Super ($333/mo)
  Total ≥ $2000     → Nova Hyper ($1,299/mo)

Calculation:
  recoveredMissedRevenue  = missedCalls × (closeRate/100) × ticketValue
  recoveredHoldRevenue    = holdCalls × (closeRate/100) × ticketValue
  revenueBenefit          = recoveredMissed + recoveredHold
  costSavings             = receptionistCost
  timeValue               = hoursSpent × hourlyRate
  totalMonthlyBenefit     = revenueBenefit + costSavings + timeValue
  netMonthlyROI           = totalMonthlyBenefit − planCost
  roiPercentage           = (netMonthlyROI / planCost) × 100
  annualImpact            = netMonthlyROI × 12

Modal entrance:  GSAP scale 0.97→1, y 24→0, opacity 0→1, power3.out, 0.4s
Overlay:         GSAP opacity 0→1, power2.out, 0.3s
```

## Motion (GSAP)

### Hard rules
- Animate only `transform` and `opacity` for performance. Never animate `box-shadow` blur directly — crossfade a pre-blurred glow element's opacity instead.
- Respect `prefers-reduced-motion`: disable scroll-reveal stagger and hero-entrance, keep only essential state changes (hover feedback can stay, minimal).
