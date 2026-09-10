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
--accent-purple-soft: #C9A1FF  (AgentWindow accent ONLY — the light lavender-violet
                                used for the AgentWindow's LED, AI speaker chip,
                                phase chip, ROI total, and hover states. Flat
                                lighter purple so the window reads airier than the
                                hero. Never on light surfaces, never outside the
                                AgentWindow.)
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
--shadow-glow: 0 0 24px rgba(112,0,255,0.18)   (hover states only, see Buttons above)
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
Color: use --accent-purple for icon emphasis; keep surrounding text in --text-primary-on-dark
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

## Pricing section

Light section on `--surface-50` with a 3-column card grid. The center "Recommended" card uses `--surface-950` (pure black) with a purple glow border (`shadow-glow`) and extra vertical padding to stand out against the light side cards. Side cards use `--surface-100` (light gray) matching the Features/Agents card style.

```
Background:       --surface-50
Side card fill:   --surface-100
Side card border: --surface-200
Center card fill: --surface-950 + shadow-glow
Center border:    --accent-purple/30
Center padding:   py-10 px-8 (lg: py-12) — taller than side cards (p-8)
Headline:         display-md → display-lg, font-display, --text-primary-light
Subtext:          body-sm → body-md, --text-secondary-light
Tier label:       caption, uppercase, tracking-widest, --accent-purple
Plan name:        body-md, font-display, semibold, --text-primary-light (side) / --text-primary (center)
Price:            display-lg, font-display, bold, --text-primary-light (side) / --text-primary (center)
Feature icon:     CheckCircle, --accent-purple, weight=fill
Feature text:     body-sm, --text-secondary-light (side) / --text-secondary (center)
Side CTA:         1px border surface-700/30, text-primary-light, hover border surface-700/60
Center CTA:       btn-primary class (same as hero CTA), --gradient-button-primary, white text, hover shadow-glow
Grid:             1 col mobile → 3 cols at lg, gap-6 → gap-8
Gap subtext:      mt-5 / lg:mt-6 (per section pattern)
Card padding:     p-8 (side), py-10 px-8 lg:py-12 (center)
```

## Benchmark section — progressive-disclosure comparison

Light section on `--surface-50`. Distinct editorial/data identity — NOT the "Why Nova Echo" card system. No cards, no rounded containers, no icons: hairline grid, large numerical metrics, mono technical labels, SVG data visuals with subtle grain. Five primary benchmark modules lead; the full 13-row comparison (4 groups) is gated behind a "View Full Benchmark" disclosure so the most important claims scan in seconds on every viewport.

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
                shares a BenchGrid frame: faint horizontal gridlines
                (--text-secondary-on-light at 0.04), 12px crop-marks at the four
                corners, plus a grain overlay (fractalNoise, baseFrequency 0.9,
                alpha ~0.07 — black speckle on the light surface, container-only,
                never over text). Lines are 1–1.5px hairlines in --accent-purple +
                --text-secondary-on-light at low opacity; flat solid fills only
                (no gradients, no bars, no neon, no arrows/waves for decoration).

Module type — Geist Mono only, three rungs of emphasis (never two focal
                annotations in one visual — exactly one 16px payoff, everything
                else steps down hard):
                  16px / 500 — the focal annotation: GO LIVE, the P95 tag,
                    "≈1.5k / min", "Nova Echo" — metric payoff in
                    --accent-purple
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
                      the sub-1500 claim) in --accent-purple with a "P95
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
                      solid --accent-purple square flagged "GO LIVE" — the
                      visual's ONE focal annotation at 16px/500. A bottom
                      hour ruler (0h / 24h / 48h ticks + 8px labels, spanning
                      the board) gives the sprint an absolute elapsed-time
                      scale ("implementation · sprint board" caption at 8px).

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

## Partners section

Light section on `--surface-50` with a 3-column card grid. Cards match the Features card style (`--surface-100` fill, `--surface-200` border). Three partner program types with icons.

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

## Stories section

Light section on `--surface-50` with a 3-column testimonial card grid. Each card features a large faded quote icon, a blockquote, and an author credit with a thin top border.

```
Background:       --surface-50
Card fill:        --surface-100
Card border:      --surface-200
Quote icon:       Quotes, 28px, weight=fill, --accent-purple at 60% opacity
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
Input border:     1px solid --surface-200, focus-within transitions to --accent-purple
Input fill:       transparent
Input text:       body-sm, font-mono, --text-primary-light
Input placeholder:--text-secondary-light at 30% opacity
Input padding:    px-3 py-2.5

Voice dropdown:
  Trigger:        same border/typography as inputs, chevron icon rotates on open
  Panel:          absolute, top-full, mt-1, --surface-100, 1px --surface-200 border
  Item:           px-3 py-2.5, hover --surface-200, selected item shows Check icon in --accent-purple
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
