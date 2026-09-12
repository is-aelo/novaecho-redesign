# Nova Echo — Design System

Source of truth for every visual decision in this build. If a value isn't defined here, it doesn't go in the code — flag it instead of inventing one.

## Color

### Brand (source values — do not alter)
```
--black:        #000000
--white:        #FFFFFF
--navy:         #1E3A8A
--cyan:         #00D1FF   (raw palette — reintroduced ONLY as --accent-cyan for the
                           hero bottom wave's three-tone crest; retired everywhere else)
--sky:          #4FACFE   (raw palette — reintroduced ONLY as --accent-blue for the
                           hero bottom wave's four-tone crest; retired everywhere else)
--magenta:      #E61EAD   (light-surface hover accent)
--purple:       #7000FF
--hot-purple:   #BA0FFF
```

### Derived surface scale
Everything below is mathematically derived from the seven brand values above, for hierarchy on a dark-first UI. Marked derived so it's clear these aren't separately brand-sourced.

```
--surface-950:  #000000   (page background — brand black, footer)
--surface-hero: #0A0A0A   (derived — near-black hero background, the hero's base
                           surface. Slightly lifted off pure black so the offset
                           cyan glow has room to read. Hero only.)
--surface-900:  #0B0B0F   (derived, navy-tinted near-black — large surfaces, avoids stark OLED-black)
--surface-800:  #101A33   (derived — card / panel background)
--surface-700:  #1E3A8A   (brand navy — elevated surfaces, default button fill,
                           hero solid CTA fill)
--surface-50:   #FAFAFA   (light section background — features, stats, etc.)
--surface-100:  #F5F5F5   (light card / panel background)
--surface-200:  #E5E5E5   (light card border)

Status:
--status-green: #34D399   (hero LED only — the pulsing "live session" dot in
                           the hero window chrome. Once the terminal text moved
                           to --accent-purple-soft, green survives only as the
                           LED.)

Dark console window fill (derived — maps to the near-monochrome gradient below,
no translucent glass):
--hairline-on-dark:    rgba(255,255,255,0.14) (structural hairline under light-mode section
                                               tokens; used for glass window borders/separators)
--hairline-neon:       RETIRED — removed from globals.css. No borders, dividers, or corner
                       brackets use a neon-purple hairline anymore; every terminal window
                       (hero + AgentWindow) is flat border-hairline-on-dark, matching the
                       hero's terminal frame.
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
--accent-purple: #7000FF       (primary interactive accent — links, focus rings, active states)
--accent-hot-purple: #BA0FFF   (secondary accent — light stop of the purple ramp,
--accent-purple-soft: #C9A1FF  (dark-surface accent — the single accent for every
                                black/console surface: hero terminal, AgentWindow,
                                ROI rail, and all five benchmark window readouts
                                (curves, GO LIVE, P95 tag, ≈1.5k/min, Nova Echo,
                                spokes). The light lavender-violet reads brightest
                                on near-black. Never on light surfaces — those use
                                --accent-purple. Only --status-green shares dark
                                surfaces, and only for done/completed states.)
                                paired with purple only in glow/gradient contexts, never solid fills)
--accent-cyan: #00D1FF         (scoped accent — the hero glow's cyan stop + the hero
                                bottom wave's cyan crest layer + ribbon top stop.
                                The one blue note on the page — hero background only.
                                Never used on buttons, text, borders, or light surfaces.)
--accent-blue: #4FACFE         (scoped accent — the hero glow's light stop + the hero
                                bottom wave's blue layer (derived from brand sky).
                                Same scope as --accent-cyan: hero background only.)
--accent-magenta: #E61EAD      (light-surface hover/active accent — nav, footer, stories)
```

## Gradient system — this is the fix

The current site's problem isn't the colors, it's that saturated gradients compete across buttons, headings, borders, and backgrounds. That reads as a generic startup template. The fix keeps the same brand colors but changes where and how they appear.

**Rule: color communicates hierarchy, not decoration. L1 Solid is the default UI. Gradients are reserved for the primary CTA and hero/ambient treatments.**

```
Level 1 --- Solid (default UI) + primary button gradient:
  Cards, navigation, surfaces, pricing structures: solid fills.
  Primary CTA default: black → navy corner-tip gradient (see --gradient-btn).
  Secondary CTA default: solid translucent fill (no gradient).

Level 2 --- Subtle gradient (emphasis only):
  Selected cards, hero background lighting, important feature panels.
  --gradient-glow and --gradient-surface only. Never above 20% opacity.

Level 3 --- Hero gradient / glow (reserved):
  Major visual moments only. Hero is the strongest use of color on the page.
  Everything below calms down. Cyan/blue hero glow behind the headline, low-opacity
  waveform band, and one soft glow inside the console window.
```

```
--gradient-glow:
  radial-gradient(circle, rgba(112,0,255,0.16) 0%, rgba(112,0,255,0) 70%)
  Use: large soft background wash behind hero panel, section dividers.
  Never: behind text, never on buttons, never above 20% opacity.

--gradient-surface:
  linear-gradient(180deg, #0B0B0F 0%, #000000 100%)
  Use: large full-width bands (enterprise section, footer transition).
  Near-monochrome — the shift should be barely perceptible, not a visible band.

--hero-glow:
  radial-gradient(60% 65% at 24% 14%, rgba(0,209,255,0.15) 0%, rgba(79,172,254,0.07) 42%, rgba(0,209,255,0) 60%)
  Use: hero background ONLY (desktop ≥ lg). A soft cyan→blue radial wash behind the
  headline, offset slightly left (at ~24% horizontal, ~14% vertical of the hero),
  dissolving to transparent at ~60% of its own width so it never reads as a centered
  "wealth app" glow. Flat, no motion. Never on buttons, text, borders, or light surfaces.

--hero-glow-mobile:
  radial-gradient(85% 50% at 20% 10%, rgba(0,209,255,0.12) 0%, rgba(79,172,254,0.06) 42%, rgba(0,209,255,0) 62%)
  Use: hero background ONLY (< lg — mobile and tablet). Wider and shorter than the
  desktop glow, positioned up toward the stacked headline block, slightly lower
  opacity. Keeps the glow a faint wash on a narrow, tall viewport instead of a
  centered smear. Same scope rules as --hero-glow.

--gradient-window: RETIRED — removed from globals.css. The AgentWindow no longer
  uses a navy corner-glow fill; it reuses the hero terminal frame: flat
  bg-surface-900, 1px border-hairline-on-dark, radius-window, no shadow, no blur.

--gradient-accent-ring:
  linear-gradient(135deg, rgba(112,0,255,0.9), rgba(186,15,255,0.9))
  Use: 1.5px border ring as the primary button's default resting border (border-box,
  padding-box transparent inside), plus on secondaries' hover/focus; or a low-opacity
  (≤15%) overlay.
  Never: as a button's default fill.

--gradient-btn:
  radial-gradient(120% 90% at 0% 0%,   rgba(30,58,138,0.28) 0%, rgba(30,58,138,0.06) 25%, rgba(30,58,138,0) 50%),
  radial-gradient(120% 90% at 100% 0%,  rgba(16,26,51,0.24) 0%, rgba(16,26,51,0.05) 30%, rgba(16,26,51,0) 55%),
  radial-gradient(120% 90% at 100% 100%,rgba(30,58,138,0.32) 0%, rgba(30,58,138,0.06) 30%, rgba(30,58,138,0) 55%),
  radial-gradient(120% 90% at 0% 100%,  rgba(16,26,51,0.20) 0%, rgba(16,26,51,0.04) 30%, rgba(16,26,51,0) 55%)
  Use: primary CTA hover fill (.btn-primary:hover). Same approach as the
  retired --gradient-window: four corner radial glows layered over a pure black
  base, each one confined to its corner (brand navy top-left & bottom-right,
  deep navy top-right & bottom-left) and dissolving to transparent before
  center. Opacities sit ~0.20–0.32
  (lighter than the window's) so the button stays black with faint navy corner shimmer,
  visible navy ≤10% of the surface. No angle and no seam by construction.
  Applied as background-image over background-color: var(--surface-950).
  Not used on secondary CTAs, nav, or any other interactive surface.

--gradient-text-highlight:
  var(--gradient-accent-ring)
  Use: single hero headline phrase ONLY. Never on section headings, card titles, or multiple headings on one page.
  Agents, Features, and all non-hero headings use solid text.

DEPRECATED — do not use on new code:
--gradient-button-primary (5-stop magenta-to-navy) is retired as a default fill.
  Replaced by --gradient-btn (black → navy tip). Retained in globals.css
  only until callers migrate.
  --hero-blob-gradient-* (cyan/sky/purple/navy blobs) are removed. No floating blobs.
  Benchmark Nova header uses solid --accent-purple 2px underline, not a gradient border.
```

## Buttons

```
Primary — default:  navy-prominent: deep navy base (--surface-800) with brand-navy
                    corner radials at ~0.50–0.65 (four-corner glow approach), white text,
                    1px transparent border carrying var(--gradient-accent-ring) purple
                    ring, radius-btn, no shadow
Primary — hover:     black-dominant: var(--gradient-btn) over a pure black base — four
                    soft radial glows (brand navy top-left & bottom-right, deep navy
                    top-right & bottom-left) at ~0.20–0.32, each dissolving to transparent
                    before center (visible navy ≤10% of the button);
                    border becomes the 1px white stroke rgba(255,255,255,0.9).
                    No glow/shadow on hover.
Primary — focus:     2px solid var(--accent-purple) outline, offset 2px

Hero primary (.btn-hero-primary):
  default:  flat solid fill var(--surface-700) (brand navy), 1px solid border same,
            white text, radius-btn, no gradient, no glow — the hero's single accent
            color on a dark surface
  hover:    fill → var(--surface-800) (a step lighter navy), border follows
  focus:    2px solid var(--accent-purple) outline, offset 2px
            Used ONLY on the hero "Meet the agents" CTA.

Secondary — default: rgba(255,255,255,0.06) fill, 1px solid rgba(255,255,255,0.24) border, white text
Secondary — hover:    fill → rgba(255,255,255,0.12), border brightens to rgba(255,255,255,0.48)
```

All buttons (.btn-primary / .btn-secondary): no fixed height — height is padding-driven.
Vertical padding 12px (top/bottom) + 15px body text ≈ 48px tall, horizontal padding 24px.
Nav CTA (.header-cta) matches at 12px vertical padding, reduced to 14px text.

Arrow icons in CTAs and inline links (nudge-vertical / nudge-horizontal): on hover the
icon gently bobs in the arrow's direction — .nudge-vertical nudges down (translateY 3px),
.nudge-horizontal nudges right (translateX 3px), 1s ease-in-out infinite. Respects
prefers-reduced-motion (animation disabled).
Nav lockup: novaecho-logo.png at 32px + font-display display-xs (18px) semibold
tracking-tight, gap-3 — scales up to stay level with the taller header CTA.

### Nav — hero flush-bar morph

At the top of the homepage the nav bar spans the full viewport: flat flush
bar, solid white, no corner radius, no border, no shadow, flush to the top
and side edges (the temporary header overrides the page gutter to 0 so the
bar's own background reaches the viewport edges). The bar always carries
`px-4` / `lg:px-6` internal padding, so in the flush state the logo/links/CTA
sit offset in from the edges like the hero's copy. Once the hero section
scrolls past — or on any non-homepage — it morphs into the floating centered
pill, width-matched to the sections' `max-w-6xl` content column (1152px; inset
16 mobile / 24 desktop on smaller screens), `rounded-xl`, `border surface-200`,
`shadow-sm`, `bg-white/80` + blur once scrolled; the same `px-4` / `lg:px-6`
keeps the pill's content from touching its edges. At the footer the pill stays
opaque white. The inner content row is always `mx-auto max-w-6xl`, so flush
and pill keep the same left/right alignment as every section.

Geometry (width + side margins) is tweened by GSAP (`useNavMorph`) between
concrete pixel values — `max-width: 100vw → min(1152, 100vw − 2·gap)` with
centering margins (gap 16 mobile / 24 desktop) — because CSS cannot
interpolate `max-width` from `none` or `margin: auto` (those jump).
Everything else (radius, border, shadow, bg, blur) stays a CSS transition on
`--dur-nav` / `--ease-nav`. Pill blur uses `backdrop-filter: blur(--blur-nav)`
(12px), starting from an explicit `blur(0px)` base so the blur transitions
instead of popping. 500ms, `power2.inOut` in GSAP; disabled under
`prefers-reduced-motion`.
Trigger: the nav collapses to the pill as soon as the section following the
hero (currently Features) starts entering the viewport — not when the (much taller) hero
has fully scrolled past; rechecked on scroll.

Only the primary CTA gets the hover ring + glow emphasis. Default state is solid on all buttons. No gradient default fills.

## Typography

Manrope is the display typeface for headings; Inter is the body/UI typeface.
Geist Mono is a functional detail for technical/system contexts only — never body
copy, nav, buttons, or general headings. All loaded via `next/font/google`
(`Manrope` 400–700, `Inter` 300–500, `Geist_Mono` 400–500); no font-management
dependencies.

Manrope is loaded at 400–700; heading weight utilities (font-medium /
font-semibold / font-bold) map to real weights. Hierarchy comes from scale
first, weight second.

```
--font-display: 'Manrope'  — hero, section headlines, feature titles. Weights 400–700.
--font-body:    'Inter'    — paragraphs, UI, buttons, nav. Weights 300 / 400 / 500.
--font-mono:    'Geist Mono' — system status, call duration, technical metadata,
                live activity, data-heavy interface elements. Weights 400 / 500.
```

### Weights

```
400:  paragraphs, descriptions, supporting copy, secondary content
500:  navigation, buttons, UI labels, secondary headings, emphasized interface text
600:  H1, H2, important H3 headings, feature titles, important product statements
700:  sparingly — major pricing values and exceptional display emphasis only
```

Hierarchy comes from scale + spacing + weight + contrast — never gradients,
glow, or text effects. All headings use solid text.

Data and stats (comparison table, pricing values, metric callouts) use Inter
with `font-variant-numeric: tabular-nums`. Geist Mono is used only when a
number is explicitly presented as technical/system information (call timer,
connection status).

### Tracking

```
Display (H1/H2):       tracking-tight (-0.025em)
Body:                  normal (0)
Small uppercase labels: tracking-wider (0.05em) — never tracking-widest
```

### Scale
```
display-2xl: 72px / 76px line-height  — featured success-story metric ONLY
                                        (single numeric outcome, e.g. "8");
                                        never on headings or text outcomes
display-xl:  48px / 50px line-height   — hero headline (desktop)
display-lg:  44px / 48px               — section headlines (desktop), major pricing values
display-md:  34px / 38px               — hero headline (mobile), section headlines (mobile)
display-xs:  18px / 24px               — mobile section headlines that must fit one row
display-sm:  22px / 28px               — ROI modal titles, legal H2s
body-lg:     18px / 28px               — hero subhead, intro copy
body-md:     16px / 24px               — default body
body-sm:     14px / 20px               — supporting text, captions
caption:     12px / 16px               — labels, metadata
```

## Global page shell — overflow + gutter

Horizontal overflow is locked globally and the page gutter is a single
responsive token, so no section can cause sideways scroll or touch the
viewport edge at 375px, 768px, or 1280px.

```
Overflow:      html + body overflow-x hidden (clip where supported).
               Y-axis is never locked — vertical scroll, sticky, and
               modal overflow-y-auto keep working.
--page-gutter: 16px mobile → 24px at lg (both from the spacing scale).
               Applied globally to section.w-full, footer.w-full, and
               header.sticky, overriding per-section px utilities.
               Inner content stays mx-auto max-w-6xl; backgrounds stay
               full-bleed on the section element itself.
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
The vertical gap between a section's subtext paragraph and its main content (card grid, logo track, etc.) must be `mt-5` (20px) on mobile and `lg:mt-6` (24px) on desktop.

## Radius
```
--radius-sm: 4px   (badges, inputs, chips, small panels)
--radius-md: 6px   (cards, form panels)
--radius-btn: 12px  (all buttons/CTAs — btn-primary, btn-secondary, agent rows, list buttons)
--radius-lg: 10px  (modal panels)
--radius-window: 12px  (AgentWindow console panel only — largest radius in the system)
```

## Shadow

No shadow above a soft, low-opacity glow. No hard drop shadows anywhere — this is the direct fix for the audited "thick shadow" problem.

```
--shadow-none: none
--shadow-glow: 0 0 24px rgba(201,161,255,0.18) (lavender — matches the dark-surface accent; hover states only, see Buttons above)
--hero-wave-amp: 26px   (hero bottom audio wave amplitude maxima, per-layer)
```

`--shadow-window` is retired: the console window no longer needs an ambient drop
shadow to separate it from the background — depth comes from its opaque navy-to-black
gradient fill.

## Hero — editorial voice composition

Editorial hero on `--surface-hero`: headline copy block, subheadline, CTA row,
live-status line, and a full-bleed bottom wave. The AgentWindow console once lived
here; it now renders in the Agents section only (below). The animated "Trusted
by Industry Leaders" logo marquee is gone — replaced by a static, restrained
"Trusted by" row (5 select brands) under the subheadline, described below. No
marquee motion anywhere. Two-column text row on lg, stacked on mobile. No
ambient purple/pink Web3 gradient blobs — color comes from a single offset
cyan/blue glow behind the headline and the low-opacity waveform band. Must look
excellent with all effects removed (solid text, flat surfaces).

```
Background:    --surface-hero (near-black #0A0A0A) + 4 vertical hairlines,
               1px rgba(255,255,255,0.035), full hero height, vertically faded at
               both ends, aligned to container. Plus ONE soft radial --hero-glow
               (cyan → blue), offset left behind the headline (at ~24% x / ~14% y),
               dissolving to transparent by ~60% of its width — never centered,
               never a "wealth app" radial. Flat, no motion.
               Mobile/tablet (< lg): swaps to --hero-glow-mobile — a wider,
               shorter radial (85% w × 50% h at ~20% x / ~10% y, slightly lower
               opacity) so it tracks the stacked headline block and stays a faint
               wash instead of a bright smear on a narrow, tall viewport.
Layout:        flex column, min-h-screen (full viewport height — never taller).
               The content column is a flex-1 wrapper that justifies the stack
               to center; the bottom wave is the final flex item, tucking
               directly under the content with no dead space above it. This
               guarantees a single full-viewport hero: the wave sits in the
               lower band, and overflow-hidden clips any sub-pixel spill. No
               overlay, no negative margins except the wave's -mx-4 / lg:-mx-6
               bleed. If content ever exceeds one viewport, tighten spacing —
               never let the hero grow taller than min-h-screen.
Grid:          single centered column at ALL breakpoints — grid-cols-1 gap-6
               max-w-3xl, every element mx-auto and text-left→text-center.
               Order for every viewport: headline + subheadline grouped as one
               tight block (flex-col gap-2 — the lede hugs its headline) → live
               status window
               (3) → CTAs (4) → Trusted by (5) → wave. Trusted by carries an extra mt-4
               so it rests just below the CTA row without adding dead space. Centered
               composition is the desktop rule; do not reintroduce multi-column
               splits or staggered baselines. The live status window spans
               max-w-2xl on desktop (matches the subheadline measure). The
               terminal body breathes on px-4 py-6 with gap-2 between lines.
               No middle-dot separators, no numbered markers.
Headline:      display-sm → display-md → display-xl (22px/28px → 34px/38px →
               48px/50px), font-display, weight 600, sentence case, solid white
               — never gradient. MUST fit on one row at every breakpoint; step
               the size down (not down the type color/weight) when a viewport
               can't hold the phrase on a single line.
               "Never sleep on sales again"
Subheadline:   body-sm (14px/20px), font-body, weight 300 (font-light),
               --text-secondary-on-dark — one line, sentence case, describes the
               product: "AI voice agents that answer calls, qualify leads, and
               book appointments — around the clock."
Live status:   a small live indicator framed as a terminal "install" session
               window, NOT a badge. Window frame (flat bg-surface-900, 1px
               border --hairline-on-dark, radius-window, overflow-hidden, no
               shadow, no blur) with a chrome bar (border-b --hairline-on-dark):
               left = three muted app-window dots (.window-dot) + "Nova Echo
               Session" title (.console-panel-head — mono caption uppercase
               --text-secondary-on-dark, same as AgentWindow chrome); right =
               only the pulsing --status-green dot (no label), as a status LED.
Body = a real CLI install feed (font-mono/Geist Mono,
                text-body-sm, --accent-purple-soft — same light lavender text
                as the AgentWindow; the two console windows share one voice,
                and the hero no longer uses green text). Sequence, like
                scaffolding a framework:
                 banner prints FIRST (fast, 200ms/line):
                   "NOVA ECHO AI"           semibold, full lavender — the
                                            terminal echoing the product name;
                                            the ONE all-caps exception on the
                                            hero
                   "✔ human-like conversations"  check glyph at 40% lavender
                   "✔ 30 languages"               (muted, literal CLI install
                   "✔ 80% lower cost"             checkmark, not emoji), label
                                            at 80% lavender — same column as
                                            the title, no indent
                 then the steps stream (≈2.2s each, opacity fade via
                 .hero-status-line, no translate/shift), each "~$ " prompt
                 (50% lavender) + a real backend action — NO literal step
                 labels:
                   training the model on your playbook
                   currently qualifying a lead
                   transcribing the call in real time
                   call completed — lead converted
               Opacity encodes progression: the active (newest) line is full
               --accent-purple-soft with a blinking 2px block cursor;
               previously
               revealed STEP lines dim to 40%; future lines stay at 0% opacity;
               Banner lines stay full once printed (product identity, not a
               progression step). All lines keep their layout space so the
               window never grows/shrinks and the hero column never shifts.
               Hold ~4s on the completed step, then reset to the banner and
               replay. Pulse ring, line reveal, and cursor blink are disabled
               under prefers-reduced-motion (full log renders static — banner
               constant, steps in dimmed cascade). Frame is w-full max-w-md
               (mobile) → lg:max-w-2xl (desktop).
CTA row:       primary = .btn-hero-primary (flat solid --surface-700 navy, no
               gradient, single accent color) "Meet the agents" (no icon) → #solutions.
               secondary = .btn-secondary (outline) "Receive a call" → #book-call.
               Left column. All breakpoints: both buttons share one row (inline flex,
               gap-4, wrap allowed on narrow screens), each keeping its
               intrinsic (content-hugging) width — never full-bleed,
               never stacked.
Documentation for: Fixed padding (12px/24px) and 15px text stay identical on every
                breakpoint — only the container switches from column to row.
Trusted by:   a static (no marquee, no motion) social-proof row — NOT the
                retired animated logo band. Desktop: col-span-2, row 3 right,
                directly below the subheadline. Mobile: order-5, BELOW the CTA
                buttons. Caption "Trusted by"
                (font-body text-caption --text-secondary-on-dark, sentence
                case) above a flex-wrap row (gap-x-6 gap-y-3) of 2 select
                brands with real assets in the project base — realistic
                prior-implementation partners from the company's history
                (financial + home-improvement call volume): TD Bank and The
                Home Depot. Each entry is a logo+wordmark lockup: the logo PNG
                from /images/companies-trusted (RGBA-transparent) at height
                20px, object-contain, FULL opacity, plus the brand name as a
                text wordmark (font-body text-body-sm font-medium tracking-
                tight text-primary) with gap-2 between. Subdued partner marks,
                never an advertisement grid.
Mobile order:  headline → live status → subheadline → CTAs → trusted by → wave.
Bottom wave:   the full-bleed live waveform at ~12% opacity — see "Hero bottom
               audio wave" below. Purely a subtle texture band, never competing
               with the glow.
```

Motion: hero-entrance reveals `[data-hero-item]` elements (headline, subhead,
CTAs, status line, wave) with the standard opacity/translateY entrance once on
load, disabled under prefers-reduced-motion.

### Agent window voice demo — Conversation → Understanding → Action

Runs inside the AgentWindow in the Agents section (no window on the hero). Three
agent scripts (Receptionist default, Speed-to-Lead, Mass Outbound), each with
its own conversation, actions, description, mock company, and waveform energy. Selecting an agent
resets and replays that agent's sequence once — no reload, no navigation, no modal.
Each run plays once per selection (and once on load); no auto-loop, refresh replays.

```
Engine:        requestAnimationFrame, all geometry in refs (no React re-renders).
               Parameters (amplitude, speed, irregularity, bar energy) ease toward
               per-phase targets every frame — transitions are smooth, never jumping.
Pacing:        ~1x demo sequence — idle 1000 → listening 1100 → processing 800 →
                speaking 1500 → actions stagger 400 each → complete 400.
                Call timer stays real-time (1s ticks).
                Reveal order: conversation first (transcript rows reveal one line
                at a time — AI opener at speaking, customer at action, AI closer at
                complete), then intent (.reveal-block, complete + 800ms), then
                workflow checklist + estimated ROI (.reveal-block, complete + 1300ms).
Layers:        3 flowing curves (hot-purple 1.25px/0.16, purple 1.5px/0.22, purple 1.75px/0.42),
               84 center-weighted bars (purple→hot-purple fill, 0.38), 56 hairline ticks (hot-purple, 0.10).
               Center-weighted envelope: detail concentrates mid-band, edges fade via mask.
Grain:         static SVG feTurbulence rect (fractalNoise, baseFrequency 0.8),
               white speckle at 0.07 opacity, inside the edge-fade mask so it melts
               into the background. Texture on the visualization only — never over text.
Reduced motion: single static idle frame, no loop; full transcript + actions visible,
               timer fixed at 00:42, status reads "Call completed".
Live region:   status + duration line is aria-live polite; hidden transcript rows are
               aria-hidden until revealed; state is never color-alone (text always present).
Previews:      neutral mock businesses only (Bright Smile Studio, Harbor Realty Group,
               Peak Fitness Co.). Never Nova / Nova Echo in preview transcripts or speaker tags.
```

## Iconography

Use Phosphor Icons only for interface and feature icons in this project.

```
Library: @phosphor-icons/react
Style: duotone or regular, consistent weight
Usage: small feature highlights, support metrics, and inline UI icons only
Color: use --accent-purple for icon emphasis on light surfaces; use
       --accent-purple-soft on dark surfaces (keep surrounding text in
       --text-primary-on-dark)
```

## Agents section

The AgentWindow — the voice demo console (agent selector, live call transcript,
workflow rail, Estimated ROI) — renders under the section's headline/subtext on
`--surface-50`. It stays readable on the light surface because the window reuses
the hero terminal frame: flat bg-surface-900 with hairline borders and on-dark
text. The card grid is gone — the interactive demo replaces it. The neon corner
brackets, the --gradient-window navy glow fill, and the neon hairlines are all
retired — the AgentWindow is now visually the same terminal as the hero's, with
one deliberate difference: its live LED and pulse are BRAND PURPLE (--accent-
purple), never the hero's status green.

```
Background:    --surface-50
Headline:      display-md → display-lg, font-display, --text-primary-on-light
Subtext:       body-sm → body-md, --text-secondary-on-light
Window:        AgentWindow — gap mt-8 → lg:mt-10 below the subtext.

Band:        the hero terminal frame, unchanged: overflow-hidden rounded-window
                 (12px) border border-hairline-on-dark bg-surface-900 flat —
                 no gradient fill, no backdrop blur (retired), no drop shadow.
                 No corner brackets, no neon anywhere; hairlines
                 (--hairline-on-dark) do all the separation, exactly like the
                 hero window.
  Chrome bar:  the hero's chrome bar, unchanged: flex items-center gap-2
               border-b border-hairline-on-dark px-4 py-3. Left: three muted
               app-window dots (.window-dot, 10px, rgba(255,255,255,0.16)) +
               .console-panel-head "Nova Echo Console" (mono caption uppercase
               --text-secondary-on-dark — same treatment as the hero's "Nova
Echo Session"). Right (ml-auto): the pulsing live LED only
                (.hero-live-dot — 8px, --accent-purple-soft, soft pulse) — no label,
                exactly like the hero's lone LED. Chrome stays neutral; the
                soft-purple LED is the only accent, and it is brand lavender by
                design — the AgentWindow never uses green and never uses the
                darker hot-purple/7000FF accents of the rest of the site.
                One row at all breakpoints (same as hero chrome).
  Body:        1 col mobile → 12 cols at lg — three panels, no gap, hairlines
               do the separation:
               Agents (span 3)            border-r border-hairline-on-dark at lg
               Call transcription (span 6)  transcript + call intent
               Live workflow (span 3)     border-l border-hairline-on-dark at lg
Panels px-4 py-4 → lg:px-6 lg:py-6. On mobile stacked panels join
                 with a single border-t --hairline-on-dark; the Agents panel sits
                 directly under the chrome bar (no duplicate border). The Live
                 call → Live workflow join is tightened on mobile (pb-2 under the
                 intent, pt-2 above the workflow head) so the payoff rail sits
                 close to the live call; the copy → agents join keeps the standard py.
  Panel head:  .console-panel-head — mono caption uppercase tracking-wider,
               --text-secondary-on-dark (the single header treatment for all
               three panels). mb-2 → lg:mb-3.
Transcript:  the Call transcription text (.hero-speaker-text) matches the
                hero terminal log: font-mono text-body-sm (14px/20px), speaker
                tags mono uppercase chips (AI = soft-purple tint). Pure white for
                the AI lines, --text-secondary-on-dark for the caller line — the
                same dimming logic as the hero's older log lines.
  Emphasis:    the window has exactly two loud moments — the call intent
                (display-xs headline + phase chip) and the Estimated ROI
                (display-md --accent-purple-soft total). Everything else sits a step
                quiet: checklist checks and chrome icons are neutral, agent pills
                are flat. Accent — --accent-purple-soft on the window, so small accent
                text keeps good contrast on the dark surface — is reserved for the two focal
                points plus small functional state (selected agent icon, live dot,
                AI speaker chips). No waveform inside the window — the page's one
                wave motif is the hero's bottom waveform below.
  Call transcription:   the primary panel. Head row = "Call transcription" (panel head) on the left
               and a meta line on the right (mono caption tabular-nums,
               --text-secondary-on-dark, aria-live polite) — agent label · mm:ss.
               Mobile stacks flex-col items-start gap-2; lg flex-row justify-between.
               Transcript → divider (mt-4 border-t --hairline-on-dark pt-4) →
               intent. No waveform in this panel.
Intent:      appears after the conversation block. "Call intent" caption +
                display-xs font-display weight 500 --text-primary-on-dark headline
                (script.callIntent — the caller's goal, per-agent copy) and a
                soft-purple phase chip (.intent-phase-chip, mono caption uppercase,
                --accent-purple-soft on rgba(201,161,255,0.14)) showing the live stage
               (Listening / Processing / Speaking / Taking action / Call completed).
               Revealed 800ms after the call completes (after every transcript row),
               hidden via .reveal-block until then.
  Transcript:  the panel's first block. Rows always in DOM, revealed by opacity
               (.voice-row), one line at a time in dialogue order — AI opener
               reveals at speaking, customer at action, AI closer (aiFollowUp)
               at complete, so the conversation always ends with the agent.
Speaker chip: mono caption uppercase radius-sm, padding 2px 6px.
                AI chip: --accent-purple-soft text on rgba(201,161,255,0.16).
                Caller chip: --text-secondary-on-dark on rgba(255,255,255,0.10).
  Workflow:    the secondary rail. "Live workflow" panel head + checklist of
               body-sm --text-primary-on-dark rows, CheckCircle fill
               --text-secondary-on-dark (neutral — completion is quiet), gap-2.
               Revealed with .reveal-block at complete + 1300ms (500ms after intent)
               — the checklist builds in as the whole block fades up.
               Row alignment: icon top-aligns to the first line
               (.hero-action-check, flex-start + 2px optical nudge) so the check
               sits level with the cap height of the text, not its 20px line box.
Estimated ROI:is the rail's payoff block and the window's dominant accent —
                border-t --hairline-on-dark pt-4. "Estimated ROI calculation" panel-head
                label; monthly total in display-md BOLD --accent-purple-soft tabular-nums +
                "/mo"; annual impact as mono caption --text-secondary-on-dark;
               "Calculate yours" link → openRoi(roiName). Figures are computed via
               calcResults(script.roiExample) from /components/roi/calc — the
               same formula powering the ROI modal. Revealed with .reveal-block at
               complete + 1300ms, after the intent block.
  Selector:    compact vertical rail, no cards. Rows are px-3 py-2.5 rounded-sm
               (radius-btn) buttons with gap-3, flat inside the panel.
               Row = duotone icon (18px) + two-line label (name body-sm 500 +
               tagline caption --text-secondary-on-dark).
  Icons:       PhoneIncoming (Receptionist), Lightning (Speed-to-Lead),
               Megaphone (Mass Outbound).
Active:      rgba(255,255,255,0.10) pill + --text-primary-on-dark medium text +
                icon flips --accent-purple-soft (text label always present —
                never color-alone) + aria-pressed/aria-current.
  Hover:       rgba(255,255,255,0.06) pill, icon → --accent-purple-soft, text → primary.
  Focus:       2px solid --accent-purple-soft outline, offset 2px.
  Description: selected agent description (caption secondary — the scale's
               smallest size) sits below the selector list, separated by a hairline
               (mt-4 border-t --hairline-on-dark pt-4), on the window fill.
               No CTA below the window — the contextual ROI link lives in the
               right-rail Estimated ROI block (RoiPreview) only.
```

## Hero background — near-black + offset glow + structural grid

The hero's one allowed atmospheric treatment: a single soft cyan→blue radial glow
(`--hero-glow`) offset slightly left and up, behind the headline. The center
reading column stays clean `--surface-hero` (near-black #0A0A0A). No purple/pink
Web3-template gradient anywhere. Flat `--surface-hero` everywhere else, with 4
vertical 1px hairlines at rgba(255,255,255,0.035), full hero height, vertically
faded at both ends via mask.

```
Glow:         --hero-glow — radial-gradient(60% 65% at 24% 14%,
              rgba(0,209,255,0.15) 0%, rgba(79,172,254,0.07) 42%,
              rgba(0,209,255,0) 60%). Cyan → blue, brand wave colors.
              Offset left behind the headline, never dead-center. Dissolves
              to transparent by ~60% of its width. Static — no motion.
              < lg: --hero-glow-mobile — radial-gradient(85% 50% at 20% 10%,
              rgba(0,209,255,0.12) 0%, rgba(79,172,254,0.06) 42%,
              rgba(0,209,255,0) 62%) — wider, shorter, softer, tracking the
              stacked headline block on narrow viewports.
Background:   --surface-hero (near-black #0A0A0A), flat, no gradient fill.
Grid:         4 vertical 1px hairlines rgba(255,255,255,0.035), full hero height,
              vertically faded at both ends via mask, aligned to the container.
Motion:       none — the glow is static. The only hero motion is the entrance
              reveal and the live waveform band.
```

RETIRED: the atmospheric SVG dome (displacement + blur), the navy→purple→hot-purple
side washes, the `--gradient-glow` ambient blob, and the `.atmo-*` motion are all
removed.

## Hero bottom audio wave — full-bleed live waveform

The hero's low-opacity texture band: a realistic, smooth waveform that sweeps along
the very bottom edge of the hero, below the copy. It is grounded in the product
(voice calls) and reads as a subtle "call energy" ribbon, not a decorative blob.
It must stay quiet — the glow and headline carry the visual weight, the wave is
texture at ~12% opacity.

```
Placement:     full-bleed block spanning the hero's entire width, edge to edge —
               a direct section child placed after the content column and offset
               against the section padding with negative margins (-mx-4 /
               lg:-mx-6) so it reaches the viewport edges. Sits at the section's
               bottom edge, pb-8 → lg:pb-10 below the wave. overflow-hidden
               wrapper, ~96px tall on desktop (72px mobile).
Opacity:       wrapper carries .hero-wave-band — the whole band is lowered to
               ~12% opacity so it reads as a quiet texture, never competing with
               the glow or headline.
Layers:        4 flowing curves (mirrored envelope so the wave stays symmetric),
               four-tone crest — back accent-purple 2.5px @0.35, accent-blue
               3px @0.45, accent-cyan 3.5px @0.55, front white
               (--text-primary-on-dark) 4px @0.7. Plus a soft mirrored area
               fill beneath the front path (accent-cyan → hot-purple, ≤0.35 fading
               to 0.08). At 12% wrapper opacity the crest reads as a faint
               cyan/blue texture band against the near-black hero. The page's one
               wave motif, always in the background.
Motion:        continuous calibration-waveform flow. Amplitudes drift via layered
               smoothstep noise (per-cluster, interconnected so motion propagates
               left→right like real audio). 60fps RAFA loop, ~2.8s travel across the
               width, amplitude coefficient ~0.5 so peaks swell and relax naturally.
               Slight phase offset between layers (back leads, front follows) for
               depth. No sudden jumps — always smooth.
Reduced motion: the wave is a single static idle frame; no loop.
Accessibility: aria-hidden, decorative only — the real live-call status lives in the
               AgentWindow's aria-live region, not here.
```

This is the ONLY waveform on the hero and the only full-bleed one on the page.
The console has no waveform of its own.

## Pricing section — decision journey (START → SCALE → EXPAND → CUSTOM)

Light section on `--surface-50`. NOT a 3-card SaaS grid and not five equal blocks. Two
parts: (1) three core plans as one bounded progression rail, and (2) two horizontal
editorial "custom solutions" rows separated by a transition heading. Strong price
hierarchy, thin hairlines, mono technical labels, restrained accent, generous
whitespace. No glassmorphism, no neon, no big "MOST POPULAR" badge, no heavy shadows,
no fake discount badges/savings percentages, no price countdowns, no decorative charts.

Information order per plan follows the decision journey: stage → name → price → users →
best-for → call rates → differentiators → View all features → CTA.

```
Intro:
  Eyebrow:      "PRICING" — font-mono caption (12px/16px) medium, uppercase,
                tracking-wider, --accent-purple. Headline "Start with AI. Scale
                without limits." display-md → lg, font-display, semibold;
                subtext body-sm → md, --text-secondary-light.

Part 1 — core plans (desktop ≥1024px):
  Framing:      three separate columns via lg:grid-cols-3 lg:items-start lg:gap-6.
                Light and Hyper are a MATCHED PAIR: identical rounded-md, 1px
                border-surface-200, p-8, transparent bg (hover bg-surface-100/40 lift),
                same font-semibold price (display-md). They visually recede together.
                Super is ELEVATED center: bg-white, 1px border-accent-purple/30,
                py-12 px-8, lg:-my-6 (pokes symmetrically above and below the side
                panels), display-lg BOLD price, name font-semibold, RECOMMENDED chip,
                btn-primary CTA. The height offset + weight change make Super the
                unmistakable focus; sides stay perfectly aligned with each other.
  Stage row:    stage label left, RECOMMENDED chip right on the recommended column.
  Users:        font-mono caption uppercase secondary-light/70 ("1 USER" / "3 USERS" /
                "UNLIMITED USERS") under the price.
  Best-for:     body-sm leading-relaxed secondary-light, one sentence.
  Call rates:   OWN compact treatment directly under the price block (never inside the
                checklist): border-t hairline, "CALL RATES" caption label, then
                label:value rows — body-sm labels secondary-light, values font-mono
                body-sm SEMIBOLD tabular-nums primary-light. No charts, no percentage
                visualizations, no bars.
  Differentiators: border-t hairline; Light = "Core AI capabilities" line only; Super =
                "Everything in Light, plus:" then THAT plan's 4 additions; Hyper =
                "Everything in Super, plus:" then its 3 additions. CheckCircle 14px,
                weight=fill, --accent-purple (light surface). Full feature lists are
                NOT shown by default.
  View all features: caption link --accent-purple + ArrowRight 12px (rotates ↓ when
                open), aria-expanded/aria-controls. Expands the FULL verbatim plan
                feature list via .collapsible-grid — CSS grid-template-rows 0fr↔1fr,
                var(--dur-base) ease-out (smooth height, no page nav). Data preserved.
  CTA:          recommended → btn-primary (see Buttons; navy-prominent default, black-
                dominant hover). Others → 1px border-surface-700/30, text-primary-light,
                hover border-surface-700/60, rounded-btn, full width, whitespace-nowrap.

Part 1 — mobile (<1024px):
  Selector:     segmented control — 1px border-surface-200 rounded-sm bg-white p-1,
                three equal segments LIGHT / SUPER / HYPER (font-mono caption uppercase
                semibold). Active segment inverts to bg-surface-950 + white text
                (aria-pressed). SUPER tab carries a 4px accent-purple dot as the
                recommended marker.
  Panel:        ONE detail block below the selector (never five stacked cards), keyed by
                selection so a switch replays .price-panel-in (opacity 0→1, y 8px,
                var(--dur-base), no page reload). Call-rate values replay .price-rate-in
                with a per-row 60ms stagger. Shows the selected plan's stage label,
                RECOMMENDED chip, name, price, users, best-for, call rates,
                differentiators, View all features, and plan-specific CTA.

Part 2 — custom solutions (both breakpoints):
  Frame:        the whole Part-2 block sits in ONE light card frame —
                rounded-md, 1px --surface-200, bg-surface-100, p-6 → p-8,
                mt-16 / lg:mt-24 from the plan rail. The rows inside remain
                editorial hairlines — they are NOT individual cards.
  Transition:   "NEED MORE THAN A STANDARD PLAN?" — font-mono caption uppercase
                --accent-purple, left-aligned (editorial, not centered; contrast to the
                centered intro). Copy: "Get hands-on implementation or a custom
                enterprise setup built around your specific requirements." body-sm → md.
  Rows:         two horizontal EDITORIAL panels — NOT cards. Each row: 1px border-t
                hairline, pt-6/pt-8; left rail (lg:w-44): label font-mono caption
                uppercase secondary-light/70 + price "Custom Quote" display-sm SEMIBOLD;
                right column: headline display-xs font-display semibold, description
                body-sm, capability tags, CTA + expandable details.
  Tags:         four mono caption uppercase chips — 1px border-surface-200, bg-white,
                rounded-sm, secondary-light. Functional capability groupings, not
                decorative pills. Setup: PROMPT ENGINEERING / WORKFLOW DESIGN /
                CRM INTEGRATION / AUTOMATION SETUP. Enterprise: CUSTOM DEVELOPMENT /
                DEDICATED SUPPORT / VOLUME PRICING / AI GOVERNANCE.
  CTA:          inline --accent-purple link + ArrowRight 14px, .nudge-horizontal arrow
                bob on hover. "Talk to an Expert →" (href "#") and "Contact Enterprise
                Sales →" (booking URL, target=_blank).
  Details:      "View setup details" / "View enterprise details" caption toggle
                (CaretDown 12px, rotates 180° open) → .collapsible-grid expansion of the
                full preserved verbatim detail lists.

Motion (see also Motion & reduced motion):
  .price-panel-in / .price-rate-in  micro entry for the mobile plan switch only;
                                    var(--dur-base), ease-out, disabled under reduced motion.
  .collapsible-grid                 0fr↔1fr height expand for View all features and the
                                    custom-solution details; var(--dur-base) ease-out,
                                    transition disabled under reduced motion.
  Columns hover                     bg-surface-100/40 lift (recommended /90). Restrained —
                                    no glow, no animated gradients, no scroll-triggered
                                    price countdowns.

Grid/spacing: section pattern mt-5 / lg:mt-6 between the intro subtext and the plan
  rail. Part 2 separated by mt-16 / lg:mt-24 (64/96px). Custom rows ribbed by 1px
  border-t hairlines; between-rows gap default spacing scale (mt-8 / lg:mt-10).
```

## Benchmark section — progressive-disclosure comparison

Light section on `--surface-50`. Distinct editorial/data identity — NOT the "Why Nova Echo" product-argument layout. No cards, no rounded containers, no icons: hairline grid, large numerical metrics, mono technical labels, SVG data visuals with subtle grain. Five primary benchmark modules lead; the full 13-row comparison (4 groups) is gated behind a "View Full Benchmark" disclosure so the most important claims scan in seconds on every viewport.

```
Header:
  Eyebrow:      "Precision Benchmark" — font-mono caption (12px/16px) medium,
                uppercase, tracking-wider, --accent-purple. Headline "See how
                Nova Echo stacks up." (display-md → display-lg, font-display,
                semibold, tracking-tight, --text-primary-light) + subtext body-sm
                → body-md --text-secondary-light. Same centered-at-lg master
                pattern as every other section.

Module grid:    mt-10 → lg:mt-12, grid-cols-1 → lg:grid-cols-2, gap 0. Modules
                flanked by hairlines only — border-t --surface-200 on every
                module (the grid's top rule), lg:border-l on the right-column
                modules (02, 04) so the two columns read as a data grid. The
                fifth module (Implementation) spans lg:col-span-2 and breaks the
                grid. Module padding p-6 pb-8 → lg:px-8 lg:py-8 (no bg, no
                radius, no border all around — whitespace, not cards).
Module content: label row (font-mono caption medium uppercase tracking-wider,
                --text-secondary-light; mono index in --accent-purple + a 20px
                1px tick at --surface-700/25 + name) → metric (font-display
                text-display-sm → lg:text-display-md semibold tracking-tight
                tabular-nums --text-primary-light) → visual (relative mt-6,
                w-full) → supporting copy (mt-4 body-sm --text-secondary-light,
                max-w-md). Metric stays solid black — purple is reserved for
                the index numerals and the Nova column of the matrix.

Module visuals: five inline SVGs, viewBox 480×112, w-full h-auto, framed as calm
                instrument/telemetry readouts — NOT logos or doodles. Every visual
                now sits in the same dark window treatment as the Implementation
                board: overflow-hidden rounded-window border border-hairline-on-dark
                bg-surface-900 with px-4 py-4 body padding (the benchmark module
                readouts are dark on the light section — one shared console voice
                across all five, the AgentWindow/hero-terminal fill reused). The
                implementation board alone adds the dots + title chrome bar.
                Every visual shares a BenchGrid frame with its dark variant:
                faint horizontal gridlines (--text-secondary-on-dark at 0.04),
                12px crop-marks at the four corners, plus a grain overlay
                (fractalNoise, baseFrequency 0.9, alpha ~0.07 — container-only,
                never over text). Lines are 1–1.5px
                hairlines in --accent-purple-soft + --text-secondary-on-dark at low
                opacity; flat solid fills only (no gradients, no bars, no neon,
                no arrows/waves for decoration). On scroll into view (once per
                page load, never looping), the primary curves draw on via a
                normalized stroke-dash sweep (useBenchCurveReveal: pathLength=1
                + stroke-dashoffset 1→0, 1.1s power2.inOut, 0.1s stagger across
                each visual's curves — voice waveform, both latency curves,
                call-flow lanes, integration spokes; starts only once the
                benchmark section itself is on screen (trigger is the section,
                start "top 75%", toggleActions play-none). Disabled
                under prefers-reduced-motion — curves render fully static.

Module type — Geist Mono only, three rungs of emphasis (never two focal
                annotations in one visual — exactly one 16px payoff, everything
                else steps down hard):
                  16px / 500 — the focal annotation: GO LIVE, the P95 tag,
                    "≈1.5k / min", "Nova Echo" — metric payoff in
                    --accent-purple-soft
                  10px / 400 — headers + labels + steps: "DAY 1 · 0–24H",
                    axis major values, integration node names, step labels —
                    0.6–0.8
                   8px / 400 — fine print: caption lines, footers, scale
                    ticks — 0.45–0.55
  01 Voice Quality    conversational waveform — 7 speech-like syllabic bursts
                      grouped into 3 phrase clusters (brief pauses between
                      phrases), each with an ASYMMETRIC envelope (fast attack,
                      slower release — real syllabic energy), sampled at ~2px
                      for smooth curves and modulated over three mixed carriers
                      (no test-tone sine); dashed RMS envelope overlay, left
                      amplitude ruler, bottom time ruler with 0s–7s mono labels
                      ("voice · natural prosody" caption at 8px). Reads like a
                      real utterance, not an equalizer. No text payoff — the
                      waveform is the focal detail.
  02 Response Time    latency distributions on a 0–3000ms axis (major values
                      at 10px + minor ticks, labeled): a tight Nova Echo
                      gaussian (~1385ms P50, sd ~58ms → P95 ≈ 1480ms, exactly
                       the sub-1500 claim) in --accent-purple-soft with a "P95
                      1480 ms" tag hanging off the dropline — the visual's ONE
                      focal annotation at 16px/500 — and a broad right-shifted
                      competitor curve (2000–3000ms, gray) labeled "2000–3000
                      ms" at its peak. Bands removed — the curves themselves
                      are the story ("latency · response" caption at 8px).
  03 Calling Capacity throughput flow — 4 inbound lanes (with a trailing ghost
                      dot each) converging through smooth cubics into the solid
                      purple system node, fanning to 5 evenly spaced output dots
                      with small arrowheads at the termini; "≈1.5k / min" is the
                      focal annotation (16px/500, purple) beside the node, with
                      "inbound / distributed" captions at 8px. Symmetric fan,
                      every label clear of lines.
  04 Integrations     system map — solid purple Nova Echo square under a mono
                      "Nova Echo" label (the visual's ONE focal annotation at
                      16px/500), straight hairline spokes (no ring, no
                      arrowheads, no node rings, no legend) to 5 connected-tool
                      dots in a balanced star: CRM + SMS left, EMAIL + CALENDAR
                      right, OTHER TOOLS bottom-center (node labels at 10px).
                      Every label sits on the OUTER side of its dot so no spoke
                      ever crosses text. Footer note "5 shown · 3,000+
                      available" at 8px — a sample of the catalog, not the
                      whole map. Least decorated visual.
  05 Implementation   2-day sprint board — two three-step stacks, "DAY 1 ·
                      0–24H" and "DAY 2 · 24–48H" (day headers at 10px with
                      the step labels) — each a vertical dot rail. Completion state
                      reads at a glance: done items are filled dots with a
                      hairline checkmark, the pending "Human QA pass" stays
                      an open ring — a human gate before cutover. Day columns
                      join by a chevron handoff at mid-height, then a DASHED
                      segment (manual cutover, only after QA signs off) into a
                      solid --accent-purple-soft square flagged "GO LIVE" — the
                      visual's ONE focal annotation at 16px/500. Steps reveal
                      one by one (1.8s each) exactly once per page load — the
                      sequence reaches all six steps, lights GO LIVE, and does
                      NOT loop; only a refresh replays it (reduced-motion
                      renders all six static immediately). Once the board is
                      complete, the dashed segment carries a marching-dash
                      send animation (.bench-send-line, dashoffset 0 → −5,
                      0.6s linear loop, opacity 0.32 → 1) and the GO LIVE
                      square + label light up (.bench-go-live: opacity pulse
                      every 2s + --glow-go-live drop-shadow on both). During
                      the reveal cycle the dash stays static dim and GO LIVE
                      stays flat. All of it is disabled under
                      prefers-reduced-motion (static, full opacity).
                      A bottom hour ruler (0h / 24h / 48h ticks + 8px labels,
                      spanning the board) gives the sprint an absolute
                      elapsed-time scale.

Disclosure:     after the grid — mt-8 → lg:mt-12, centered, generous whitespace,
                no hairline. "Want the full comparison?" (font-display
                text-display-sm semibold) + body-sm supporting copy + a bordered
                CTA button: rounded-btn, 1px border --surface-700/30,
                --text-primary-light, hover border-surface-700/60 +
                hover:text-accent-purple (matches pricing side-card CTA).
                Label "View Full Benchmark" with a 16px ArrowRight that rotates
                90° when open; aria-expanded + aria-controls. Toggles the
                matrix wrapper (height 0→auto / opacity 0→1, 0.5s power3.out,
                collapse 0.35s power2.in; reduced-motion sets height directly).
                Matrix wrapper is inert while collapsed.

Full matrix:    id="bench-matrix", width-matched framing. Desktop (lg): a
                bordered table (rounded-md, 1px --surface-200) with the 4
                columns Metric / Nova Echo AI / Competitors / Humans. Nova
                column keeps its 2px solid --accent-purple bottom border
                (.benchmark-nova-header), --accent-purple values on a
                bg-accent-hot-purple/6 tint; competitors/humans sit secondary.
                13 rows grouped into 4 category bands — VOICE, SCALE,
                OPERATIONS, BUSINESS (mono caption uppercase --accent-purple
                separator rows on a border-t hairline); row dividers
                border-b --surface-200/80. Mobile: stacked collapsible category
                accordions (VOICE+/SCALE+/…), each border-t --surface-200;
                tapping a header (mono caption uppercase label + rotating
                CaretDown, aria-expanded/aria-controls) expands only that
                category via GSAP height 0→auto (0.45s power3.out / 0.3s
                power2.in; reduced-motion jumps). Inside each expanded category:
                per metric, "Nova Echo AI" value on the bg-accent-hot-purple/6
                tinted row first, then Competitors and Humans rows secondary —
                the same emphasis as the desktop column, never a wall of text.
```

## Why Nova Echo section — product argument

The section right after the hero (`/components/features/Features.tsx`, `id="platform"`).
Replaces the old 4-card grid (silent 2×2 card rows) with a product-argument layout: one
strong intro + one large primary proof + three supporting capabilities, ordered as a
narrative — WHY NOVA ECHO → REAL-TIME CONVERSATIONS → SCALE → HUMAN SUPPORT → ONE
CONNECTED PLATFORM. NOT four equal cards, no icon-above-title treatment, no
`data-*` reordering hack.

```
Background: --surface-50.
Frame:      12-col grid at lg (mx-auto max-w-6xl, lg:grid-cols-12 lg:gap-16,
            gap-12 on mobile; data-parallax y=12). Left rail lg:col-span-4,
            LATENCY console right stack lg:col-span-8, then the three-card strip
            FULL-WIDTH below it (lg:col-span-12).

Left rail (all breakpoints — stacks above the proof on mobile):
  Headline:  "Why Nova Echo Leads the Voice AI Platform" display-md → display-lg,
             font-display semibold, tracking-tight, --text-primary-light. Solid.
             The rail starts at the headline — no eyebrow label above it.
  Subtext:   "Pioneer of conversational intelligence since 2023, delivering
             human-like voice employees at scale." body-sm → md,
             --text-secondary-light, max-w-md. No detail block — the rail ends
             after the subtext.

Right stack (lg:col-span-8) — the LOW LATENCY primary panel only.

Three-card strip (lg:col-span-12, full section width) — ONE even 3-column
grid (lg:grid-cols-3 gap-6, stacked on mobile) with the three supporting blocks.
Supporting blocks are EQUAL height (grid stretch), top-anchored content, and each
ends in a bottom-pinned footer line (`mt-auto` + border-t hairline) so their
baselines line up — a ledger rhythm, not a mosaic. Mobile order: LOW LATENCY →
HIGH CALL CAPACITY → PRIORITY SUPPORT → ALL-IN-ONE CRM.

1) LOW LATENCY — the primary proof, a DARK console (the "dark readout on light"
motif: rounded-window, 1px border-hairline-on-dark, bg-surface-900, overflow-hidden,
no shadow/no glass). It is the section's single focal moment, visually heavier than the
three supporting blocks.
  Chrome:    window-dot ×3 + console-panel-head "LIVE CALL · NOVA ECHO"; right:
             hero-live-dot (data-active) + "LOW LATENCY" mono caption uppercase
             --accent-purple-soft.
  Body:      12-col split inside the window: LEFT (5) "Low Latency" display-xs
             font-display semibold + one-line support (body-sm --text-secondary);
             RIGHT (7) the simulated exchange, joined to the left block by a
             border-t hairline (mobile) / border-l hairline (lg):
             CALLER chip + "Can you book me for Friday?" → the waveform → AI chip
             + "Absolutely. I have 9:30 a.m. available." → intent-phase-chip status
             ("RESPONDING" → flips to "BOOKED" at the end).
  Waveform:  a two-segment SVG speech readout (viewBox 480×80, preserveAspectRatio none)
             with three faint horizontal hairlines (stroke-white/5) like an instrument
             grid. Caller utterance "Can you book me for Friday?" draws left→right as a
             closed asymmetrical envelope (buildLatencySegment, pathLength 1,
             non-scaling 1.5px stroke + /10 soft fill, --accent-purple-soft/70), then a
             silent gap strips the width, then the AI reply "Absolutely. I have 9:30 a.m.
             available." draws the same way — the gap IS the response time. — NOT an
             equalizer of many animated bars. Draws in contour-sequential
             (stroke-dashoffset 1→0) then breathes very gently (whole svg opacity
             1→0.82 yoyo). aria-hidden, decorative. This is the call-trace motif,
             grounded in the product, and the section's ONLY motion loop.
  Motion:    useLatencyProof — one-shot sequence on scroll (start "top 80%", play
             none): caller line fades up → caller curve draws in → "RESPONDING" chip
             fades in → gap, then the AI curve draws in → AI reply fades up → chip
             crossfades to "BOOKED" → wave breathing starts. Disabled under
             prefers-reduced-motion (everything static, chip reads "BOOKED").
  Access:    spoken text is real text; waveform aria-hidden; chip aria-live.

2) HIGH CALL CAPACITY → 3) PRIORITY SUPPORT → 4) ALL-IN-ONE CRM — three EQUAL
text-only ledger cards (rounded-md, 1px border-surface-200, bg-surface-100, p-6 →
p-8) via one shared component `LedgerCard` (/components/features/LedgerCard.tsx).
No diagrams, no ticks, no chips, no funnel, no status dots — typography only. Each:
  Docker:    mono caption eyebrow (--text-secondary-light/70) → display heading →
             body-sm support line (--text-secondary-light) → bottom-pinned footer
             (mt-auto, border-t surface-200, pt-4, same mono caption as eyebrow).
             Equal height (grid stretch), all footers align on one baseline — the
             ledger rhythm.
  Card 2:    eyebrow "HIGH CALL CAPACITY" → "10,000+ calls a day per Echo" display-xs
             semibold → "Capacity to answer every single call at once — no extra
             headcount needed to keep up." → "NEVER MISSES A LEAD".
  Card 3:    eyebrow "PRIORITY SUPPORT" → "Not "set-it-and-forget-it" voice AI"
             display-xs semibold → "Hands-on support from a team experienced in
             building and optimizing voice AI employees." → "A TEAM, NOT A QUEUE".
  Card 4:    eyebrow "ALL-IN-ONE CRM" → "One platform for every conversation" display-xs
             semibold → "Every follow-up and sales activity stays connected instead of
             living in separate tools." → "NO SEPARATE TOOLS".
  Motion:    none per card (section-level parallax only). No per-card hooks, no CSS
             animation.
  Parity:    every card is IDENTICALLY structured — eyebrow (1 line) → heading (display-
             xs, wraps to exactly 2 lines) → body (wraps to exactly 4 lines) → footer
             (1 line, border-t, mt-auto). Character counts are balanced to keep wraps
             equal: headings 28/33/35, bodies 84/87/87, footers 19/19/17 chars. Because
             structure and line counts match, the three cards hold perfect top-to-bottom
             alignment at every breakpoint, and the mt-auto footer pins baselines even if
             they ever differ.

Accent discipline: the section's accent goes to the low-latency console
(waveform + status chip). The left rail and the three text cards stay neutral —
the 10,000+ figure is white-kept (no colored number). No gradient on any element,
no glow shadows, most typography neutral.
```

## Partners section

Light section on `--surface-50` with a 3-column card grid. Cards match the standard light
product-panel chrome (`--surface-100` fill, `--surface-200` border). Three partner program types with icons.

```
Background:       --surface-50
Card fill:        --surface-100
Card border:      --surface-200
Card min-height:  min-h-45
Headline:         display-md → display-lg, font-display, --text-primary-light
Subtext:          body-sm → body-md, --text-secondary-light
Icon:             --accent-purple, duotone, 24px
Card title:       font-bold, body-md, --text-primary-light
Card body:        body-sm, --text-secondary-light
Grid:             1 col mobile → 3 cols at lg, gap-6 → gap-8
Gap subtext:      mt-5 / lg:mt-6 (per section pattern)
Card padding:     p-8
Icons:            Buildings, Handshake, ShareNetwork (Phosphor duotone)
```

## Stories section — result-first Success Story system

Light sections on `--surface-50`. Two surfaces share one type system but use
different containers. The homepage is an editorial, frame-free layout; the
Results ("All Success Stories") page is a uniform card grid. On every card the
hierarchy reads: WHO IS THIS? → WHAT DID NOVA ECHO CHANGE? → WHAT DID THE
CUSTOMER SAY? — CUSTOMER identity (credibility) → IMPACT (one uniform,
equal-weight group of outcomes) → CLIENT REVIEW (supporting proof). The three
layers are always separated by thin 1px dividers and never mixed: results
never carry the review, the review never reads as another result. No
checkmarks, no quote icons, no dashboard widgets, no colored result boxes —
impact comes from typography, scale, whitespace, alignment, contrast, and
editorial composition only. The homepage uses `/components/shared/
StoryResult.tsx` (numeric/qualitative auto-scaling) for its result blocks; the
Results page cards do NOT — every impact there renders as the same
mono-uppercase row, and no single impact is ever the "boldest".

### StoryResult component system

```
StoryResultData:
  value:      a measurable figure — "8", "6,500+", "0" (→ NUMERIC rendering)
  label:      compact supporting caption for the figure
  statement:  a non-measurable outcome — "More time for patient experience"
              (→ QUALITATIVE rendering)
  If value is set → numeric; else statement → qualitative. Never invent
  numbers — qualitative stories use the statement tier.

Numeric result:
  value:  font-display BOLD tracking-tight leading-none tabular-nums,
          solid --text-primary-light. Sizes:
            xl = display-2xl (72px) · lg = display-xl (48px)
            md = display-md (34px) · sm = display-sm (22px)
  label:  font-mono caption medium uppercase tracking-wider,
          --text-secondary-light. One line or fewer — compact, quiet.

Qualitative outcome:
  statement: font-display leading-tight tracking-tight --text-primary-light.
             Sizes: xl = display-lg (44px) · lg = display-md (34px)
             md = display-sm (22px) · sm = body-md (16px).
             Weight: bold for xl/lg, semibold for md/sm.
  The statement is the visual stand-in for a metric — strong type, never a
  fabricated figure.

Both block types are plain top-aligned text columns (flex-col gap-1.5) with
zero decoration — scale and contrast carry the hierarchy. Results are the
only shared element across every success-story surface.

Reveal motion (`/components/shared/useStoryResultReveal.ts`):
  Numeric:   count value 0 → target once (0.9s power2.out, ~ target
             reformatted with toLocaleString + suffix) as the block enters
             at "top 85%"; label fades in +6px after. tabular-nums keeps the
             digit column stable.
  Qualitative: block fades up (opacity 0→1, y 16→0, 0.6s power2.out).
  Restrained — no dashboard animation, no glow. Disabled entirely under
  prefers-reduced-motion (final values render statically).
```

### Results page — uniform success-story card grid

`/components/results/Results.tsx` + `/components/shared/SuccessStoryCard.tsx`.
The All Stories page renders every customer story as ONE self-contained,
internally-consistent card in a single 2-column grid — all stories visually
uniform, no featured/lead/compact sizing and no impact-grouping anywhere on
this page. One reusable component (`SuccessStoryCard`); each story supplies
only data (author, company, industries, avatar, impacts, review) and never a
custom layout.

```
Card anatomy (identical in every card):
  1. Customer identity — 40px avatar (rounded-full, 1px --surface-200 ring,
     optional) + author/company row (author font-display semibold, company
     inline secondary) + industry row ("HEALTHCARE · AGENCY" — font-mono
     caption uppercase, middle-dot joined, --text-secondary-light; never
     chips, never colored pills). No "CUSTOMER" label — the avatar + name
     reads as identity on its own.
  2. Business impact — "IMPACT" mono caption eyebrow in --accent-purple (the
     card's one accent spring — hierarchy only, nothing else is accented).
     One hairline, then ALL impacts as a single uniform band of equal-weight
     rows in --text-secondary-light. Every row is a 16px duotone
     --accent-purple Phosphor icon + mono caption uppercase label, one per
     row, vertically stacked (flex-col, gap-3, items-center, gap-2.5). Icons
     are functional / semantic per impact (not decorative emoji) and drawn
     from a keyed map inside the component. Data is a list of
     `{ icon: string, text: string }` pairs; numbers are folded into the
     wording ("8 QUALIFIED TRANSFERS IN 20 MINUTES", "6,500+ CALLS
     HANDLED"). Every card's band is typographically identical regardless
     of whether the underlying data was numeric or qualitative.
  3. Client review — hairline + "CLIENT REVIEW" mono caption eyebrow,
     restrained italic body-sm review (full text, never truncated). The
     author/company NEVER repeat here — identity lives in the top Customer
     block once per card; the review is pure supporting text. When a story
     supplies a longer `reviewFull`, a "Read full review →" mono caption
     --accent-purple toggle (ArrowRight, .nudge-horizontal bob,
     aria-expanded) swaps it in. With the current copy no story needs it.

Card chrome: 1px --surface-200 border, radius-md, flat bg-surface-100,
p-6 → md:p-8, internal 1px dividers between the three sections
(border-t --surface-200, mt-8, pt-8). h-full so cards stretch to their grid
row. No shadows, no glass, no gradients, no nested cards, no hover lift.

Grid/page: section header (heading + subtext) → mt-5 / lg:mt-6 → uniform
grid-cols-1 → lg:grid-cols-2 with gap-6 → lg:gap-8. Every breakpoint keeps
the same CUSTOMER → IMPACT → CLIENT REVIEW order, Impact is the first section
after identity with all rows equal-weight, and results stack cleanly on mobile.

Motion: none on this page — impact rows render statically (the homepage's
count-up / fade lives in `useStoryResultReveal`, not used by the cards).
```

### Homepage stories

`/components/stories/Stories.tsx` + `/components/shared/SuccessStoryCard.tsx`
— the same uniform card system as the Results page (identical data shape and
`impacts` ASCII pad rendering). No workflow visualization, no featured /
secondary type scaling.

```
Layout:   grid-cols-1 → lg:grid-cols-3 with gap-6 → lg:gap-8. One card is
          INTENTIONALLY wider — Stephanie Garzon spans two columns
          (lg:col-span-2, right side) and Paul Suha fills the remaining
          one (left). All-cards-equal-width is the rule for the Results
          page; this single-width-away variant is a homepage-only device to
          signal one story is primary.
Order:    identical CUSTOMER → IMPACT → CLIENT REVIEW anatomy as /results.
Cards:    same chrome (1px --surface-200, radius-md, bg-surface-100,
          p-6 → p-8, internal border-t dividers), so the wider card is
          just a wider frame — no type or treatment change inside.

Section pattern:  subtext → content mt-5 / lg:mt-6. Homepage keeps the
  "Show all stories" ghost link (magenta hover) → /results.
```

## Demo / Build-your-Agent section

Light section (`--surface-50`), final step of the page and of the product
narrative (Hero → Agents → Success Stories → here → "Put your AI employee to
work."). A balanced two-column conversion experience, NOT a generic contact
form: left = headline + copy + a live product visual (an AI employee console),
right = a compact progressive-disclosure "Build your agent" interface. Keeps
the same light-section tokens as Stories; the visual is a DARK console window
on the light section — the done "dark readout on light" motif shared with the
benchmark section. `id="book-call"` is preserved (nav → #book-call).

```
Background:       --surface-50
Layout:           flex-col gap-12 → lg:flex-row lg:items-start lg:gap-16.
                  Left column flex-1; right column w-full → lg:max-w-md.
                  Mobile order: headline → copy → AI employee → Build Agent
                  interface (CTA lives inside it). data-parallax y=12.
Eyebrow:          "THE FINAL STEP" — mono caption uppercase --accent-purple.
Headline:         "Put your AI employee to work." display-md → display-lg,
                  font-display bold, --text-primary-light. No gradient text.
Subtext:          "See what Nova Echo can do for your business. Tell us what
                  you need handled, and we'll help you build the right agent."
                  body-sm → md, max-w-lg, --text-secondary-light.

AI employee visual (left) — AgentProfile, a dark console window reusing the
AgentWindow console voice (the benchmark "dark readout on light" motif):
  Frame:          rounded-window, 1px border-hairline-on-dark, bg-surface-900,
                  overflow-hidden. No shadow, no glass.
  Header:         three window-dots + "YOUR AI EMPLOYEE" (console-panel-head)
                  + right LED tag: hero-live-dot (active) + "READY" caption.
  Body:           ROLE caption → agent role name (display-sm font-display
                  semibold, --text-primary) + mono caption tagline; border-t
                  hairline → HANDLES caption + mono caption rows, each a 14px
                  duotone --accent-purple-soft icon + text (the story-card
                  handle row language, in dark-surface colors); border-t
                  hairline → STATUS row: green hero-status-dot + "STATUS ·
                  READY TO DEPLOY" (--status-green is permitted here: a
                  done/completed state on a dark console surface) with a 5-bar
                  miniature waveform (--accent-purple-soft/60) as the subtle
                  live-activity cue.
  Data:           role/tagline/handles come from `/components/demo/agents.ts`
                  (mirrors agentScripts + pricing custom-solution capabilities);
                  the profile updates live when the visitor picks an agent in
                  the builder. No invented stats, no fake voice/player.
  Motion:         role + tagline remount with .demo-step-in on agent change;
                  waveform bars .demo-wave-bar (scaleY stagger). Both disabled
                  under prefers-reduced-motion.

Build-your-agent interface (right) — progressive disclosure, one step visible:
  Panel:          rounded-md, 1px border-surface-200, bg-surface-100,
                  p-6 → p-8 (same light product-panel chrome as the pricing
                  custom-solutions frame and story cards).
  Header:         "BUILD YOUR AGENT" (mono caption semibold uppercase
                  --text-primary-light) + step counter "01 / 03" (mono caption
                  tabular-nums, aria-live) + supporting line "Tell us a little
                  about what you need. We'll take it from there."
  Progress:       2px hairline (h-0.5 bg-surface-200) with an --accent-purple
                  fill segment whose width is step/3, transition 300ms ease-out.
  Step 01 — agent:  "WHAT SHOULD YOUR AI AGENT DO?" → 2×2 grid of selectable
                  cards (Receptionist · Speed-to-Lead · Mass Outbound ·
                  Something else). Card: rounded-md, border-surface-200,
                  bg-white, p-4, display font body-md label + mono caption
                  blurb; selected → border-accent-purple. Selecting advances
                  to step 02 (auto).
  Step 02 — business: FULL NAME, EMAIL, COMPANY, PHONE (OPTIONAL marker on
                  label). Inputs: rounded-sm, 1px border-surface-200, bg-white,
                  body-sm, px-3 py-2.5, focus:border-accent-purple,
                  placeholder --text-secondary-light/30. Continue button →
                  step 03.
  Step 03 — configure:  First block "CHOOSE YOUR AGENT'S VOICE" — a later
                  configuration step (never first interaction). Dropdown, NOT
                  the first field and NOT one before business info: trigger is
                  input-style (rounded-sm, 1px border-surface-200, bg-white,
                  px-3 py-2.5), chevron rotates open, panel is absolute listbox
                  (mt-1, 1px border-surface-200, bg-white, rounded-sm) with
                  Check marker on the selected voice + hover bg-surface-100,
                  closes on outside click. Voices are the real Nova Echo voice
                  names (Margarita (F) · Troy (M) · Chelsea (F) · Mateo (M) ·
                  Valeria (F) · Margarita (F - Spanish)). NO play buttons / NO
                  fake audio players — previews only ever appear if real
                  samples exist. Then a border-t hairline and the "WHAT SHOULD
                  YOUR AGENT HANDLE?" block: compact 3-row textarea (same input
                  chrome, resize-none) + helper "You don't need to write a
                  perfect prompt. Just describe what you want your agent to
                  do."
  Step bar:       border-t hairline row: "BACK" caption link (secondary-light,
                  hover primary) + next action. Step 02 next = Continue
                  (rounded-btn, 1px border-surface-700/30, body-sm, transparent
                  fill — the pricing secondary-button language). Step 03 next
                  = the PRIMARY CTA.
  Primary CTA:    "Build My Agent" + ArrowRight 16 bold, .btn-primary (.nudge-
                  horizontal), flex-1. Sanctioned: it uses the single allowed
                  gradient default fill. It completes the builder flow and
                  reveals the confirmation state — it does not POST anywhere
                  (no backend; the brief's condition is met: it triggers the
                  existing flow).
  Done:           confirmation (aria-live): "AGENT BUILD RECEIVED" caption in
                  --accent-purple → "{Role} — ready when you are." display-sm
                  → follow-up line (echoes role, chosen voice label, and email
                  if provided) → "START OVER" caption link resets.
  No fake voice:  no play buttons or audio players — voice names are selectable
                  text only. If real samples ever exist, they'd become inline
                  previews in this same dropdown step, never before it.

Motion (see Motion):
  .demo-step-in    step body entry on change — opacity 0 → 1 / translateY(6px)
                   → 0, var(--dur-base) ease-out; used by builder step body and
                   the profile role/tagline swap. No scroll-triggered motion.
  .demo-wave-bar   restrained waveform activity, scaleY ~0.45↔1 stagger.
  All reduced-motion disabled.
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
Contact items:    body-sm, --text-secondary, hover --accent-purple links
Address:          <address> not-italic, line breaks via <br>
```

## Motion (GSAP)

### Durations
```
--dur-fast:  150ms   micro-interactions, hover, focus
--dur-base:  300ms   standard transitions
--dur-slow:  600ms   section reveals on scroll
--dur-hero:  900ms   hero entrance, once per page load
--dur-nav:   500ms   nav flush→pill morph
```
CSS-only transitions (nav morph) use `--dur-nav` with `--ease-nav`
`cubic-bezier(0.22, 1, 0.36, 1)` — a soft ease-out so width/radius/padding
converge without snapping.

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
bench-module:      per module, opacity 0→1 + translateY 24→0, duration 0.5s power2.out,
                   stagger 80ms in data-order (index → metric → visual → supporting),
                   ScrollTrigger start "top 82%", per-module trigger; disabled under
                   prefers-reduced-motion (content stays fully visible). Located in
                   /components/benchmark/useBenchReveal.
bench-disclosure:  matrix wrapper height 0→auto + opacity, 0.5s power3.out (open) /
                   0.35s power2.in (close); category accordions 0.45s / 0.3s. GSAP,
                   reduced-motion jumps to final state without tweening.
```

## ROI Calculator Modal

Full-screen modal overlay triggered by "Calculate ROI" buttons in the Agents section. Dark theme matching the hero, with an 8-field input form on the left and calculated results on the right.

```
Background:       --surface-100 (matches section card bg), border --surface-200
Overlay:          bg-black/60 backdrop-blur-sm
Panel:            max-w-4xl, padding p-6 → lg:p-8
Text:             --text-primary-light / --text-secondary-light throughout
Title:            display-md, font-display, bold, --text-primary — dynamically shows agent name
Subtext:          body-sm, --text-secondary

Input section:
  Label:          caption, medium, --text-secondary at 60% opacity
  Input border:   1px --surface-800, focus-within --accent-purple, rounded-sm
  Input fill:     transparent
  Input text:     body-sm, font-mono, --text-primary
  Input placeholders: "e.g., 200", etc.
  Fields:         totalCalls, missedCalls, holdCalls, closeRate, ticketValue,
                  receptionistCost, hoursSpent, hourlyRate
  Slider fields:  closeRate (0–100, step 1, default 25, unit %),
                  hoursSpent (0–200, step 1, default 40),
                  hourlyRate (0–500, step 5, default 100, unit $)
  Slider track:   8px height, rounded-full, linear-gradient fill using
                  interpolated magenta→hot-purple for the active portion
                  and var(--surface-200) for the inactive portion (light bg)
  Slider thumb:   20px diameter, rounded-full, shadow-glow
                  Fill matches track active color via CSS variable
  Slider value:   font-mono text-body-sm font-semibold text-accent-magenta tabular-nums
                  Hover: scale-110
                  Active: scale-90
                  Focus-visible: 2px surface-950 ring + 4px accent-purple ring via box-shadow
                  Transitions: all, 150ms
  Calculate CTA:  btn-primary, full width, disabled (opacity-40) until all fields filled
  Start Fresh:    clears all form fields and reopens blank calculator

Results section:
  Empty state:    dashed border --surface-800, centered prompt text
  Result rows:    border-b --surface-800/60, font-mono values, accent-purple for key figures
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
