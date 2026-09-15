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
--status-green: #34D399   (success/completed states on dark surfaces — the pulsing
                           "live session" LED in the hero window chrome AND the
                           terminal's ✓ banner checks: "installed" vs. in-flight
                           ~$ steps. Never for in-progress states or buttons.)

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
                                surfaces, and only for done/completed states
                                (LED + terminal ✓ checks).)
                                paired with purple only in glow/gradient contexts, never solid fills)
--accent-cyan: #00D1FF         (scoped accent — the hero bottom wave's cyan crest
                                layer + ribbon top stop + the faint in-window echo
                                waveform. The one blue note on the page —
                                hero background/console texture only.
                                Never used on buttons, text, borders, or light surfaces.)
--accent-blue: #4FACFE         (scoped accent — the hero bottom wave's blue layer
                                (derived from brand sky).
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
  Everything below calms down. Two-point pink→blue hero glow (diagonal light
  flow: soft pink/purple top-left behind the headline, soft blue/cyan behind
  the terminal), low-opacity waveform band, and a faint echo waveform inside
  the hero window.
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

--hero-glow-pink: rgba(217,70,239,0.12)   (hero glow #1 — soft pink/purple, top-left
                                           behind the logo/headline area. Ties to the
                                           pink/magenta logo family.)
--hero-glow-blue: rgba(59,130,246,0.15)   (hero glow #2 — soft blue/cyan, behind/near the
                                           terminal window. Ties to the blue CTA family.)
--hero-glow:
  radial-gradient(36% 44% at 17% 18%, var(--hero-glow-pink) 0%, rgba(217,70,239,0) 62%),
  radial-gradient(44% 54% at 62% 45%, var(--hero-glow-blue) 0%, rgba(59,130,246,0) 62%)
  Use: hero background ONLY (desktop ≥ lg). A two-point radial — one soft pink/
  purple glow top-left behind the headline (at ~17% x / ~18% y), one soft blue/cyan
  glow behind the terminal (at ~62% x / ~45% y) — each dissolving to transparent
  by ~62% of its own size so they never merge into a centered "wealth app" radial.
  Together they read as a diagonal light flow from logo → terminal → CTA. Flat, no
  motion. Never on buttons, text, borders, or light surfaces.

--hero-glow-mobile:
  radial-gradient(60% 40% at 15% 12%, var(--hero-glow-pink) 0%, rgba(217,70,239,0) 58%),
  radial-gradient(58% 42% at 70% 54%, var(--hero-glow-blue) 0%, rgba(59,130,246,0) 60%)
  Use: hero background ONLY (< lg — mobile and tablet). Wider, shorter version of the
  two-point glow — pink tracks the stacked headline block top-left, blue sits
  lower-center-right behind the stacked terminal. Keeps the diagonal flow a faint
  wash on a narrow, tall viewport. Same scope rules as --hero-glow.

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

Secondary — default: transparent fill (ghost), 1px solid rgba(255,255,255,0.24) border, --text-secondary-on-dark text
Secondary — hover:    text → white, fill → rgba(255,255,255,0.08), border brightens to rgba(255,255,255,0.48)

Outline light (.btn-outline-light):
  default:  transparent fill, 1px border color-mix(30% --surface-700, transparent),
            --text-primary-light text, body-sm, font-medium, radius-btn
  hover:    border brightens to 60% --surface-700, text → --accent-purple
  focus:    2px solid --accent-purple outline, offset 2px
            Used for bordered CTAs on light surfaces: Benchmark disclosure,
            Why-Nova Echo transcript disclosure, Stories section tail.
```

All buttons (.btn-primary / .btn-secondary / .btn-outline-light): no fixed height — height is padding-driven.
Vertical padding 12px (top/bottom) + 15px body text ≈ 48px tall, horizontal padding 24px.
Nav CTA (.header-cta) matches at 12px vertical padding, reduced to 14px text.

Arrow icons in CTAs and inline links (nudge-vertical / nudge-horizontal): on hover the
icon gently bobs in the arrow's direction — .nudge-vertical nudges down (translateY 3px),
.nudge-horizontal nudges right (translateX 3px), 1s ease-in-out infinite. Respects
prefers-reduced-motion (animation disabled).

Mini disclosure toggles (All features / Setup details / Enterprise details,
matrix category headers) and story card link CTAs (Read the full story, Read
full review) are text-only — no arrow or caret icons; hover signals on card
links are text-color flips, not icon nudges. The main .btn-outline-light CTAs
(Full Benchmark, Full Transcripts, All Stories) carry a 16px ArrowRight (bold)
that rotates −90° (points up) when open on the two disclosure CTAs — open
reads as "collapse" now that everything is shown; closed keeps the forward
→, and the All Stories link never rotates.

Plain text buttons — no border, no background, text + optional icon only
(Calculate your ROI, Calculate yours, Start Fresh, story card CTAs, Partners
program CTAs, solution disclosure links) — use font-body text-body-sm
font-medium (500) uniformly. Bordered .btn-outline-light CTAs and footer
nav links are not part of this rule.

Button icon rule: inside every button or CTA, icon color always matches the
button's own text color (inherit currentColor). No icon sits in a different
color than the label it accompanies inside a button; accent-colored icons
are reserved for non-button data reads (stat icons, feature checkmarks,
workflow lists).

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
The vertical gap between a section's subtext paragraph and its main content (card grid, logo track, AgentWindow, etc.) must be `mt-5` (20px) on mobile and `lg:mt-6` (24px) on desktop. Applies uniformly to every section — headline, card grids, module grids, plan rails, and demo windows alike. A section tail (ghost link, disclosure CTA) below that content sits `mt-8` (32px) → `lg:mt-10` (40px).

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
ambient purple/pink Web3 gradient blobs — color comes from a two-point diagonal
glow (soft pink/purple top-left behind the headline, soft blue/cyan behind the
terminal) and the low-opacity waveform band. Must look
excellent with all effects removed (solid text, flat surfaces).

```
Background:    --surface-hero (near-black #0A0A0A) + 4 vertical hairlines,
               1px rgba(255,255,255,0.035), full hero height, vertically faded at
               both ends, aligned to container. Plus the two-point --hero-glow
               (pink/purple top-left at ~17% x / ~18% y + blue/cyan at ~62% x /
               ~45% y behind the terminal), each radial dissolving to transparent
               by ~62% of its own size — never merged into a centered
               "wealth app" radial. Flat, no motion.
               Mobile/tablet (< lg): swaps to --hero-glow-mobile — wider, shorter
               two-point radials (pink ~15% x / ~12% y, blue ~70% x / ~54% y,
               slightly lower opacity) so they track the stacked headline block
               and terminal and stay a faint wash instead of a bright smear on a
               narrow, tall viewport.
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
                as the AgentWindow; the two console windows share one voice.
                Green is reserved for done states only: the LED + the ✓ checks).
                Sequence, like
                scaffolding a framework:
                 banner prints FIRST (fast, 200ms/line):
                   "NOVA ECHO AI"           semibold, full lavender — the
                                            terminal echoing the product name;
                                            the ONE all-caps exception on the
                                            hero
                   "✔ human-like conversations"  check glyph in --status-green
                   "✔ 30 languages"               (the success color — installed/
                   "✔ 80% lower cost"             completed, distinct from the
                                            in-flight ~$ steps), label
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
Texture:       a faint echo-waveform band (.hero-window-wave) sits behind the log
               lines — static vertical-bar SVG in --accent-cyan at ~0.5% opacity,
               masked so it melts toward the window edges and stays a whisper
               texture over the near-black fill, never competing with the text.
               Purely decorative (aria-hidden); no motion, so reduced-motion needs
               no special handling. The one exception to the "one wave per page"
               rule — the page's loud waveform is still the hero's bottom band.
CTA row:       primary = .btn-hero-primary (flat solid --surface-700 navy, no
               gradient, single accent color) "Meet the agents" (no icon) → #solutions.
               secondary = .btn-secondary (ghost — transparent fill, hairline
               border, secondary text) "Receive a call" → #book-call.
               Hierarchy is intentional: the hero leads with exactly ONE loud
               action (Meet the agents). "Receive a call" shares a target with the
               nav's prominent "Book Discovery Call" (→ #book-call), so it stays a
               quiet ghost — de-emphasized so the nav CTA doesn't compete with two
               equally prominent buttons.
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
agent scripts (Receptionist default, Speed-to-Lead, Mass Outbound) for ONE mock
business (Clarity Skin Studio), each with
its own conversation, actions, description, and waveform energy. All three
share the same studio context so the selector compares agent ROLES, not
industries. Selecting an agent
resets and replays that agent's sequence once — no reload, no navigation, no modal.
Each run plays once per selection (and once on load); no auto-loop, refresh replays.

```
Engine:        requestAnimationFrame, all geometry in refs (no React re-renders).
               Parameters (amplitude, speed, irregularity, bar energy) ease toward
               per-phase targets every frame — transitions are smooth, never jumping.
Pacing:        ~1x demo sequence — idle 1000 → speaking 1900 → listening 1400 →
                 processing 700 → (repeat until transcript ends in an AI line) →
                 actions stagger 400 each → complete 400. Call timer stays
                 real-time (1s ticks).
                 Reveal order: each transcript row lights one line at a time in
                 dialogue order (turn-index driven, `.voice-row` data-visible),
                 always resolving into an AI closer → Agent decision
                 (.reveal-block, complete + 500ms) → intent (complete + 800ms) →
                 workflow checklist + estimated ROI (complete + 1300ms).
Layers:        3 flowing curves (hot-purple 1.25px/0.16, purple 1.5px/0.22, purple 1.75px/0.42),
               84 center-weighted bars (purple→hot-purple fill, 0.38), 56 hairline ticks (hot-purple, 0.10).
               Center-weighted envelope: detail concentrates mid-band, edges fade via mask.
Grain:         static SVG feTurbulence rect (fractalNoise, baseFrequency 0.8),
               white speckle at 0.07 opacity, inside the edge-fade mask so it melts
               into the background. Texture on the visualization only — never over text.
Reduced motion: single static idle frame, no loop; full transcript + Agent
                decision + actions visible, timer fixed at 00:42, status reads "Call completed".
Live region:   status + duration line is aria-live polite; hidden transcript rows are
               aria-hidden until revealed; state is never color-alone (text always present).
Previews:      one neutral mock business only — Clarity Skin Studio — across
               all three agent scripts (front desk, instant follow-up, outbound).
               Never Nova / Nova Echo in preview transcripts or speaker tags.
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
Window:        AgentWindow — gap mt-5 → lg:mt-6 below the subtext.

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
Transcript:  script.transcript is a multi-turn dialogue (typically 5 rows) held
                 as a { speaker, text } array — AI opens, caller replies, AI asks a
                 leading clarifying question that reuses the caller's own detail,
                 caller answers with the constraint/goal that the closing turn then
                 reasons from, AI closes with the choice it made and confirms the
                 action. The AI must never jump to booking/action after one reply —
                 it always asks one qualifying question first and its closer always
                 cites what the caller said. A per-script `decision` string
                 (why that choice, in the caller's words) renders as the "Agent
                 decision" block. Display text matches the Call transcription
                 frame: (.hero-speaker-text) — font-mono text-body-sm (14px/20px),
                 speaker tags mono uppercase chips (AI = soft-purple tint). Pure
                 white for the AI lines, --text-secondary-on-dark for the caller
                 lines — the same dimming logic as the hero's older log lines.
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
                (.voice-row), one line at a time in dialogue order — turn-index
                driven: opening AI row at speaking, caller reply at listening,
                AI row at processing→speaking, and so on until the transcript
                ends on the AI closer, so the conversation always ends with the
                agent. After the final row, an "Agent decision" block
                (.reveal-block, display-xs font-display weight 500
                --text-primary-on-dark) shows script.decision — the visible
                reasoning behind the closer — 500ms after the call completes.
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
                icon follows text color (--text-primary-on-dark — icons always
                match their button's text color) + aria-pressed/aria-current.
  Hover:       rgba(255,255,255,0.06) pill, icon → --text-primary-on-dark with text, same match.
  Focus:       2px solid --accent-purple-soft outline, offset 2px.
  Description: selected agent description (caption secondary — the scale's
               smallest size) sits below the selector list, separated by a hairline
               (mt-4 border-t --hairline-on-dark pt-4), on the window fill.
               No CTA below the window — the contextual ROI link lives in the
               right-rail Estimated ROI block (RoiPreview) only.
```

## Hero background — near-black + two-point glow + structural grid

The hero's one allowed atmospheric treatment: a two-point diagonal radial glow
(`--hero-glow`) — soft pink/purple top-left behind the logo/headline area, soft
blue/cyan behind the terminal window. The glow is a flat layer, never decorative
blobs; it ties the pink logo and blue CTA into one diagonal light flow across the
hero. The center reading column stays clean `--surface-hero` (near-black #0A0A0A).
Flat `--surface-hero` everywhere else, with 4
vertical 1px hairlines at rgba(255,255,255,0.035), full hero height, vertically
faded at both ends via mask.

```
Glow:         --hero-glow — two-point radial:
                1) pink/purple, var(--hero-glow-pink) rgba(217,70,239,0.12),
                   at 17% x / 18% y, top-left behind the headline
                2) blue/cyan, var(--hero-glow-blue) rgba(59,130,246,0.15),
                   at 62% x / 45% y, behind the terminal window
              Each radial dissolves to transparent by ~62% of its own size —
              never merged into a dead-center "wealth app" glow. Together they
              read as a diagonal light flow from logo → terminal → CTA.
              Static — no motion.
              < lg: --hero-glow-mobile — wider, shorter pair (pink at ~15% x /
              12% y, blue at ~70% x / 54% y, slightly lower opacity) tracking
              the stacked headline block and terminal on narrow viewports.
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

This is the ONLY full-bleed waveform on the page. The hero console's faint
in-window echo band (see "Live status" above) is the one subtle exception — a
quiet background texture at ~0.5% opacity, never a competing element.

## Pricing section — decision journey (START → SCALE → EXPAND → CUSTOM)

Light section on `--surface-50`. NOT a 3-card SaaS grid and not five equal blocks. Two
parts: (1) three core plans as one bounded progression rail, and (2) two horizontal
editorial "custom solutions" rows separated by a transition heading. Strong price
hierarchy, thin hairlines, mono technical labels, restrained accent, generous
whitespace. No glassmorphism, no neon, no big "MOST POPULAR" badge, no heavy shadows,
no fake discount badges/savings percentages, no price countdowns, no decorative charts.

Information order per plan follows the decision journey: stage → name → price → users →
best-for → call rates → differentiators → All features → CTA.

```
Intro:
  Eyebrow:      "PRICING" — font-mono caption (12px/16px) medium, uppercase,
                tracking-wider, --accent-purple. Headline "Start with AI. Scale
                without limits." display-md → lg, font-display, semibold;
                subtext body-sm → md, --text-secondary-light.

Part 1 — core plans (desktop ≥1024px):
  Framing:      three equal-height columns via lg:grid-cols-3 lg:items-stretch
                lg:gap-6 (all cards aligned, same p-8 padding, buttons on
                mt-auto so CTAs sit on one baseline). Light and Hyper are a
                MATCHED PAIR: identical rounded-md, 1px border-surface-200,
                transparent bg (hover bg-surface-100/40 lift), same
                font-semibold price (display-md). They visually recede together.
                Super is the emphasis WITHOUT elevation: bg-white, 1px
                border-accent-purple/40, display-lg BOLD price, name
                font-semibold, RECOMMENDED chip, btn-primary CTA — the white
                fill + purple border + type weight mark it as the focus while
                all three cards stay top/bottom aligned.
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
  All features: caption link --accent-purple, aria-expanded/aria-controls.
                Expands the FULL verbatim plan
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
                differentiators, All features, and plan-specific CTA.

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
                bob on hover. "Contact Sales →" (href "#") and "Contact
                Sales →" (booking URL, target=_blank).
  Details:      "Setup details" / "Enterprise details" caption toggle → .collapsible-grid expansion of the
                full preserved verbatim detail lists.

Motion (see also Motion & reduced motion):
  .price-panel-in / .price-rate-in  micro entry for the mobile plan switch only;
                                    var(--dur-base), ease-out, disabled under reduced motion.
  .collapsible-grid                 0fr↔1fr height expand for All features and the
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

Light section on `--surface-50`. Distinct editorial/data identity — NOT the "Why Nova Echo" product-argument layout. No cards, no rounded containers, no icons: hairline grid, large numerical metrics, mono technical labels, SVG data visuals with subtle grain. Five primary benchmark modules lead; the full 13-row comparison (4 groups) is gated behind a "Full Benchmark" disclosure so the most important claims scan in seconds on every viewport.

```
Header:
  Eyebrow:      "Precision Benchmark" — font-mono caption (12px/16px) medium,
                uppercase, tracking-wider, --accent-purple. Headline "See how
                Nova Echo stacks up." (display-md → display-lg, font-display,
                semibold, tracking-tight, --text-primary-light) + subtext body-sm
                → body-md --text-secondary-light. Same centered-at-lg master
                pattern as every other section.

Module grid:    mt-5 → lg:mt-6, grid-cols-1 → lg:grid-cols-2, gap 0. Modules
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

Module visuals: five inline SVGs, viewBox 480×280, w-full h-auto, framed as calm
                instrument/telemetry readouts — NOT logos or doodles. The taller
                coordinate canvas gives every visual's labels, axes, and annotations
                real breathing room — vertical gaps between layers are generous
                (rows ≥40 units apart, axis offset from the curve bed), and the
                same w-full scaling means on narrow single-column panels the
                readouts read as a real instrument instead of a squashed strip.
                Every visual
                now sits in the same dark window treatment as the Implementation
                board: overflow-hidden rounded-window border border-hairline-on-dark
                bg-surface-900 with px-4 py-5 body padding (the benchmark module
                readouts are dark on the light section — one shared console voice
                across all five, the AgentWindow/hero-terminal fill reused). The
                implementation board alone adds the dots + title chrome bar,
                and its canvas sits in px-4 py-7.
                Every visual shares a BenchGrid frame with its dark variant:
                faint horizontal gridlines (--text-secondary-on-dark at 0.06),
                12px crop-marks at the four corners (0.22), plus a grain overlay
                (fractalNoise, baseFrequency 0.9, alpha ~0.07 — container-only,
                never over text). Lines are 1–1.5px
                hairlines in --accent-purple-soft + --text-secondary-on-dark at
                legible opacity — layers run 0.25–0.45, focal strokes 0.5–0.7,
                annotations/tags full-strength: ghost layers read as faint but
                never invisible. Flat solid fills only (no gradients, no bars,
                no neon, no arrows/waves for decoration). On scroll into view (once per
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
                    0.85–0.95
                   8px / 400 — fine print: caption lines, footers, scale
                    ticks — 0.7–0.85
  Mobile legibility (< lg, max-width 1023.98px): the three rungs scale up
                in coordinate units so they survive the narrow single-column
                panel, but stay within the fixed 480 × 280 viewBox so no label
                collides with the element above/below it (a ~×2 bump to
                16 / 20 / 26 pushed axis labels into the latency footer and
                stacked ruler labels into their ticks — retired). Implemented as
                the .bench-t2 / .bench-t3 / .bench-t4 utilities in globals.css:
                desktop 8 / 10 / 16 → mobile 12 / 14 / 20 (text renders ~8.6 /
                10 / 14.3px instead of 4.4 / 5.5 / 8.8px on a 343px-wide panel).
                The emphasis hierarchy and the "exactly one payoff" rule carry
                over unchanged — only sizes move.
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
                       0–24H" and "DAY 2 · 24–48H" (day headers stay on the
                       label rung at 10px; step labels sit on the fine-print
                       rung at 8px — the original compact board's proportion,
                       scaled up under lg like every other rung). Step labels
                       flush to the outer rail edge (left column start-anchored
                       at x=76, right column end-anchored at x=344) so they
                       never clip or collide at the larger mobile rungs. Each
                       a vertical
                      dot rail. Completion state
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
                       0.6s linear loop, opacity 0.45 → 1) and the GO LIVE
                       square + label light up (.bench-go-live: static
                       --glow-go-live drop-shadow on both — no opacity pulse,
                       no blink). During
                      the reveal cycle the dash stays static dim and GO LIVE
stays flat. Done steps hold ~0.9 opacity once they age
                       past the active reveal (quiet, but legible); the pending
                       Human QA pass reads dimmer by contrast.
                       All of it is disabled under
                       prefers-reduced-motion (static, full opacity).
                      A bottom hour ruler (0h / 24h / 48h ticks + 8px labels,
                      spanning the board) gives the sprint an absolute
                      elapsed-time scale.

Disclosure:     after the grid — mt-8 → lg:mt-10, centered, generous whitespace,
                no hairline. "Want the full comparison?" (font-display
                text-display-sm semibold) + body-sm supporting copy + a bordered
                CTA button: rounded-btn, 1px border --surface-700/30,
                --text-primary-light, hover border-surface-700/60 +
                hover:text-accent-purple (matches pricing side-card CTA).
                Label "Full Benchmark" with a 16px ArrowRight that rotates
                −90° (points up) when open; aria-expanded + aria-controls. Toggles the
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
                tapping a header (mono caption uppercase label,
                aria-expanded/aria-controls) expands only that
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

Right stack (lg:col-span-8) — the LOW LATENCY primary panel first, spanning the whole
             8 columns (full width as before). The MiniCall windows sit in their own FULL-WIDTH
             strip below it (lg:col-span-12, 3-across: grid-cols-1 md:grid-cols-3, gap-4 →
             lg:gap-5), aligning with the "Why Nova Echo Leads" rail above. The left rail holds
             only the headline + subtext.

Three-card strip (lg:col-span-12, full section width) — ONE even 3-column
grid (lg:grid-cols-3 gap-6, stacked on mobile) with the three supporting blocks.
Supporting blocks are EQUAL height (grid stretch), top-anchored content, and each
ends in a bottom-pinned footer line (`mt-auto` + border-t hairline) so their
baselines line up — a ledger rhythm, not a mosaic. Mobile order: LOW LATENCY →
HIGH CALL CAPACITY → PRIORITY SUPPORT → CRM.

1) LOW LATENCY — the primary proof, a DARK console (the "dark readout on light"
motif: rounded-window, 1px border-hairline-on-dark, bg-surface-900, overflow-hidden,
no shadow/no glass). It is the section's single focal moment, visually heavier than the
three supporting blocks.
  Chrome:    window-dot ×3 + console-panel-head "SCOPE CONFIRMATION"; right:
             hero-live-dot (data-active) + "LOW LATENCY" mono caption uppercase
             --accent-purple-soft.
  Body:      single column, full-width transcript format (matches the Agents window):
             heading BLOCK "Low Latency" display-xs font-display semibold + one-line
             support (body-sm --text-secondary, max-w-xl) sits on top; below it, joined by a
             border-t hairline (mt-5 → lg:mt-6), the simulated exchange rendered in the
             exact Agents transcription idiom (hero-transcript / hero-transcript-row /
             hero-speaker-tag / hero-speaker-text):
AI chip + "Hi Dana, this is Northlight Web Co. — confirming what we've scoped:
             a full site rebuild with a new homepage and services section, CMS migration,
             SEO on key pages, and a month of post-launch support. Does that match what
             you're expecting?" → CALLER chip
             + "That's exactly it — though could we move the target date to next month?"
→ AI chip + "No problem. I've updated the target to next month — the scope
              stays the same. I'll send the revised summary to your inbox." → CALLER chip
             + "Perfect, that's everything. Thanks so much." → intent-phase-chip status
             ("RESPONDING" → flips to "CONFIRMING" at the end) → full-width waveform
             below it. Speaker tags use the same
             business-name format as the Agents window (hero-speaker-tag): "DANA · CALLER"
             for the caller, "NORTHLIGHT WEB CO." for the AI (hero-speaker-tag-ai).
             The flow mirrors the product's onboarding: the AI starts the call, recaps the
             full scope the client is availing to double-check, the caller agrees and asks
             to change the target date, the AI confirms the adjusted plan, and the caller
             closes out the call. A grounded, multi-turn confirmation loop that runs to a
             natural end.
Rows:      four hero-transcript-row entries — ai first (the scope recap), then user,
               ai-2, user-2 (matching the AGENT_SCRIPTS transcript shape). The waveform sits
               between the first AI recap and the caller's reply.
MiniCall rail (full-width strip below the main panel): a 3-across row of compact dark windows
                (same rounded-window/hairline/bg-surface-900 motif as the main panel, px-3
                py-2 chrome) proving CONCURRENCY — the same Northlight Web Co. agent on
                parallel outgoing calls. Each window shows: header = the call's topic only,
                e.g. "INVOICE" (console-panel-head; no "Ongoing call"/"Live call" preamble) + live
                dot + running mm:ss timer
               (useCallTimer, tabular-nums), then TWO transcript rows (company chip + AI
               line, caller chip + caller line), then a footer strip: "CONCURRENT" mono accent
               tag + "Call N of 3" right-aligned. Three calls, distinct topics, all Northlight.
               No waveform in the mini windows — the main panel keeps the section's sole wave
               and motion loop; the rail only carries the live dot pulse + ticking timers
               (persistent subtle life). Each window shows its full conversation (AI-first,
               5 turns) at rest. On mobile they stack into a single column below the
               main card.
   Transcript disclosure: section tail below the MiniCall strip — same pattern as the
               Benchmark section's disclosure (mt-8 → lg:mt-10, centered, no hairline):
"One agent, multiple calls, all at once" (font-display text-display-sm semibold) +
                body-sm supporting copy (open the windows to watch a single agent hold multiple
               parallel conversations — every call answered instantly, none left on hold) +
               bordered CTA "Full Transcripts" (rounded-btn,
               1px border --surface-700/30, --text-primary-light, hover border-surface-700/60 +
               hover:text-accent-purple, 16px ArrowRight that rotates −90° (points up) when open,
aria-expanded + aria-controls="live-transcripts"). All three concurrent call
                windows (Call 1–3 of 3) sit collapsed behind a .collapsible-grid (0fr↔1fr
               height, var(--dur-base) ease-out) in the responsive 3-up grid — none are shown
               by default, and the disclosure reveals them together. Reduced-motion:
               grid-height snaps instantly.
  Waveform:  a hero-wave-style layered speech readout (viewBox 480×80, preserveAspectRatio
             none) with three faint horizontal hairlines (stroke-white/5) like an
             instrument grid. Four layered rolling wave paths — purple / blue / cyan /
             white, strokes 2.5–4px at 0.35–0.7 opacity — exactly mirror the hero
             bottom's HeroWave mechanics (useLatencyWave.ts, same math adapted to
             480 units): a sum of three traveling sines whose phase drifts continuously
             (`phase = x × 0.022 − travel`, travel += dt × 2.8), amplitude breathes
             via a slowly lerped target (0.5 + sin(now × 0.0006 + seed) × 0.3), and
             per-point shape noise (noise1) prevents uniform ripples. A cyan→hot-purple
             gradient ribbon fill sits behind the crests — the same color language as
             the hero wave. An alpha mask (linearGradient fade at 0/0.06/0.94/1) softens
             the edges. The critical storytelling element: a gapEnvelope(x) function
             zeros amplitude smoothly across [200–300] user units — the response-time
             gap reads as a flat silent band between the two spoken halves, so the gap
             IS the response time. The wave rolls continuously from first paint (rAF loop
             from useLatencyWave, no GSAP); reduced-motion draws one static frame
             (amp 0.45). The shape never looks like a fixed envelope or a sliding block
             — crests genuinely travel along the trace like real sound waves. aria-hidden,
             decorative. This is the call-trace motif, grounded in the product, and the
             section's ONLY motion loop.
  Motion:    two hooks. useLatencyProof — one-shot sequence on scroll (start "top
             80%", play none): AI scope recap fades up → "RESPONDING" chip fades in →
             caller reply fades up → the AI change-confirmation line fades up → the
             caller close-out fades up → chip crossfades to "CONFIRMING". useLatencyWave
             runs from first paint — a continuous rAF loop redraws all five paths every
             frame (same mechanics as HeroWave); the transcript reveal is purely
             typographic (no stroke-dashoffset draw-in). Both disabled under
             prefers-reduced-motion (wave static, chip reads "CONFIRMING").
  Access:    spoken text is real text; waveform aria-hidden; chip aria-live.

2) HIGH CALL CAPACITY → 3) PRIORITY SUPPORT → 4) CRM — three EQUAL
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
  Card 4:    eyebrow "CRM" → "Your existing CRM, connected" display-xs
             semibold → "Call outcomes and follow-ups flow into the tools your
             team already uses — no migration required." → "NO NEW TOOL TO
             LEARN". Understated by design: positions Nova Echo as working
             WITH the buyer's existing CRM, deliberately NOT claiming an
             all-in-one replacement this early in the narrative.
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

## Partners section — three deliberate business opportunities

Light section on `--surface-50`. Not three generic feature cards: each card is ONE
distinct business model, introduced by a categorical label (RESELL / BUILD / REFER)
and closed by an understated text CTA. Hierarchy and hairline borders carry the
premium/conversion feel — no gradients, no blobs, no shadows, no feature-illustration
icons, no stock imagery.

```
Background:  --surface-50
Header:      "Build More Revenue With Nova Echo" headline (display-md → display-lg,
             font-display semibold, centered at lg like the benchmark/partners
             header pattern, no eyebrow, no icon) → subtext "Whether you want to
             resell AI, launch a voice AI service, or earn from referrals, Nova Echo
             gives you the tools to make it happen." body-sm → md, --text-secondary.
Grid:        1 col mobile → 3 cols at lg, gap-6, equal-height stretch
Card:        light panel (rounded-md, 1px border-surface-200, bg-surface-100,
             p-6 → p-8), CTA pinned at the bottom with mt-auto

Card anatomy:
  Label:     font-mono caption medium uppercase tracking-wider --accent-purple —
             RESELL · BUILD · REFER. One accent per card.
  Title:     "Reseller" / "Agency" / "Affiliate", display-sm font-display semibold.
  A) Reseller (RESELL): description as specified → 3-row benefit ledger
     (PARTNER SUPPORT · SALES RESOURCES · RECURRING REVENUE) → "Explore reseller program".
  B) Agency (BUILD):     description as specified → 5-row benefit ledger
     (WHITE-LABEL · CLIENT ACCOUNTS · WORKFLOWS · TRAINING · DEDICATED SUPPORT)
     → "Explore agency program".
  C) Affiliate (REFER):  "25%" is the PRIMARY VISUAL HOOK, not buried in copy —
     display-lg BOLD tabular-nums --text-primary-light (number neutral, white-kept)
     + "RECURRING COMMISSION" mono caption, on a border-t zone directly under the
     title, then the referral description → "Join affiliate program".

  Benefit ledger: ul on border-t, rows on border-b hairlines, mono caption
     uppercase --text-secondary-light. Text only — no checkmarks, no bullets, no
     dots, no pill badges.
  CTA:         text button (body-sm font-semibold --text-primary-light) + ArrowRight
     14px bold --accent-purple; hover: text flips --accent-purple and arrow nudges
     +0.5 (translate-x). No real destinations in this concept build.
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

### Homepage stories — Partners-style narrative cards

`/components/stories/Stories.tsx` + `/components/stories/StoryCard.tsx`.
The homepage applies the Partners card anatomy (same layout as the partner
program cards): no avatars, no impact icons, no mosaic. Each story is ONE
company card with a categorical label, a primary outcome hook, a hairline
ledger of the remaining results, the client review, and a bottom-pinned
"Read the full story →" CTA to /results. (The Results page keeps its own
uniform avatar-card system — see above.) The section carries
`id="results"` (with scroll-mt matching the nav offset) so the homepage
Nav "Results" link scrolls here and the scroll-spy marks it active when
in view.

```
Header:    "Success Stories" headline (display-md → display-lg, centered at lg)
           + subtext "Real results from real customers..." — same pattern as
           the Partners/benchmark headers, no eyebrow.
Grid:      grid-cols-1 → lg:grid-cols-2 gap-6 — two even equal-width company
           cards (not the old 1+col-span-2 mosaic).
Card anatomy (partner layout):
  Label:     font-mono caption medium uppercase tracking-wider --accent-purple —
             the vertical ("AGENCY", "HEALTHCARE · AGENCY").
  Title:     company name, display-sm font-display semibold.
  Hook:      border-t zone under the title. Numeric stories put ONE leading
             metric as a display-lg BOLD tabular-nums --text-primary-light
             figure + mono caption (e.g. "8" / "QUALIFIED TRANSFERS IN 20
             MINUTES"); qualitative-only stories use a display-md semibold
             statement instead ("More time for patient experience").
  Ledger:    the remaining impacts as hairline rows (border-t on ul, border-b
             on rows, py-2.5, font-mono caption uppercase --text-secondary-light) —
             text only, no icons, no checkmarks, no pills.
  Review:    border-t divider + restrained italic body-sm quote + attribution
             line (mono caption uppercase --text-secondary-light,
             "PAUL SUHA · MAYFLOWER AI"). Full review text, no toggle.
  CTA:       mt-auto text link (body-sm font-semibold --text-primary-light) →
             /results (real destination); hover: text flips --accent-purple.
Section tail: "All Stories" .btn-outline-light (self-center) + 16px ArrowRight
             → /results.
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
  Below visual:   a quiet "Calculate your ROI →" plain-text button (font-body
                  text-body-sm font-medium, --text-primary-light, hover
                  --accent-purple, ArrowRight) that calls openRoi with the
                  currently selected agent's role — a secondary path beneath
                  the primary "Build My Agent" action. No second primary CTA
                  in this section.

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
                  blurb; selected → border-accent-purple. Selecting an agent
                  arms the footer's Continue button (NOTE: it does NOT advance
                  automatically — step 01 now ends on an explicit Continue
                  press, so the visitor confirms their pick before the
                  business-info step). Continue is disabled (opacity-40,
                  cursor-not-allowed, no hover lift) until an agent is
                  selected. Helper under the grid: "Pick an agent, then press
                  Continue."
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
  Step bar:       border-t hairline row — left: "BACK" caption link (secondary-
                  light, hover primary) on steps 02 and 03 (step 01 shows an
                  empty spacer instead). Right: the next action.
                  Step 01 next = Continue (rounded-btn, 1px border-surface-
                  700/30, body-sm, transparent fill — the pricing secondary-
                  button language), disabled until an agent is selected. Step
                  02 next = the same Continue, always enabled. Step 03 next
                  = the PRIMARY CTA.
  Primary CTA:    "Build My Agent" + ArrowRight 16 bold, .btn-primary (.nudge-
                  horizontal), flex-1. Sanctioned: it uses the single allowed
                  gradient default fill. It completes the builder flow and
                  reveals the confirmation state — it does not POST anywhere
                  (no backend; the brief's condition is met: it triggers the
                  existing flow).
  Expectation:    step 03 carries the demo-call promise as a pronounced callout
                  under the CTA row: rounded-md box, 1px border accent-
                  purple/30, fill accent-purple/5, Phone 18 bold icon in
                  --accent-purple, "Expect a demo call." in semibold
                  --text-primary-light with the supporting line naming the
                  chosen voice label (falls back to "voice you chose") and the
                  "details and prompt you entered" — explicit at the point of
                  submission.
  Submit flow:    "Build My Agent" routes through the shared "Just a moment…"
                  transition overlay: it sets isTransitioning(true) + a
                  transition note "A demo call is on its way — your new
                  {role} will ring you shortly." (accent-purple caption under
                  the spinner, 0.3s fade-up at 0.3s delay), waits --dur-base,
                  then reveals the confirmation state and clears the note. The
                  note is demo-only — the ROI calculator transition clears it
                  so its overlay stays generic ("Just a moment…" only).
  Done:           confirmation (aria-live): "AGENT BUILD RECEIVED" caption in
                  --accent-purple → "A demo call is on the way." display-sm →
                  a bordered callout (same chrome as step 03) tying the demo
                  call to the chosen role, voice label, email, and the
                  "details and prompt you entered" — the promise is the
                  headline of the finished state → "START OVER" caption link
                  resets.
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
section-reveal:   global implementation of scroll-reveal — /hooks/useSectionReveal mounted
                   once in RoiWrapper. Marks: [data-section-reveal] on a section's content
                   wrapper (not the full-bleed <section>, so backgrounds stay still) +
                   [data-reveal-item] on its top-level children; targets are direct children
                   (falls back to the group itself if none marked). Per group: opacity 0→1,
                   y 24→0, --dur-slow power2.out, stagger 80ms, ScrollTrigger start "top 80%",
                   toggleActions "play none none none", clearProps transform. Applied to
                   Features, Agents, Pricing, Partners, Stories, Demo, Footer — skipped on
                   Hero (has hero-entrance) and Benchmark (has bench-module). Disabled under
                   prefers-reduced-motion.
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

Full-screen modal overlay triggered by the "Calculate yours" link on the hero ROI preview (`openRoi(agentType)`). Progressive-disclosure, live-updating estimator — no submit-to-see-results. Two-column on desktop (40% inputs / 60% results), stacked on mobile with one input category per step and the live result on screen.

```
Layout:           panel max-w-5xl, SINGLE column — all inputs (scenario + every
                  category) stack above the impact panel, which sits below the fields
Background:       --surface-100 panel, border --surface-200 (light, highly readable)
Overlay:          bg-black/60 backdrop-blur-sm
Header:           sticky, border-b --surface-200, bg-surface-100/90 backdrop-blur
  Eyebrow:        "ROI ESTIMATOR" — font-mono caption, semibold, --accent-purple
  Title:          "What are missed calls costing you?" — display-sm → lg:display-md
  Subtext:        "Estimate the revenue, time, and opportunities your business could
                  recover with Nova Echo."
  Close:          h-9 w-9, rounded-btn, --text-secondary-light, hover bg-surface-200

Scenario:         "What are you trying to improve?" — three compact selectable rows
                  (Receptionist / Speed-to-Lead / Mass Outbound), NOT pricing cards.
                  Row: rounded-sm, 1px border, bg-white, display-sm semibold title +
                  one-line mono caption description + dot indicator (--accent-purple
                  when active, --surface-200 otherwise). Selection is contextual UI:
                  it preselects on open from the opened agent's script and seeds that
                  scenario's default inputs; switching mid-modal keeps the user's
                  numbers and does NOT alter the calculation formula.
                  Agent sync: the builder's "What should your AI agent do?" pick and
                  the calculator's scenario share one source of truth (builderAgent
                  in the ROI context). Picking an agent in the builder seeds the
                  calculator on open; changing the scenario rows INSIDE the
                  calculator writes the matching agent back to the builder's grid.
                  "Something else" has no calculator scenario and is left untouched
                  when the calculator silently falls back to Receptionist.

Categories:       three, separated by border-t hairline dividers (NOT cards):
  YOUR CALLS        total calls, missed calls, calls left on hold
  YOUR REVENUE      average customer value ($), booking / close rate (slider %)
  YOUR CURRENT COST monthly receptionist cost ($/mo), hours spent answering calls
                    (hrs), value of your time per hour (slider $)
  Category header: font-mono caption semibold uppercase, --surface-700
  Field label:     font-mono caption medium uppercase, --text-secondary-light 60%;
                   flashes to --accent-purple for ~600ms when its value changes
  Field grid:      fields render in a responsive grid inside a category —
                   grid-cols-1 → sm:grid-cols-2 → lg:grid-cols-3, gap-4 — to keep
                   the input stack compact; categories separated by mt-5/pt-5
                   hairline dividers
Number inputs:    h-10 box, rounded-sm, 1px --surface-200, bg-white,
                  focus-within:border-accent-purple; contextual prefix ($) / suffix
                  (calls/mo, hrs, /mo) in mono caption 50% opacity — prefix and suffix
                  are whitespace-nowrap + shrink-0 single-line units, input is min-w-0
                  so the unit never wraps; body-sm --text-primary-light; inputMode
                  numeric, digits only. NO vague placeholders — every field ships with
                  a sensible default so the estimate is live from the moment the modal
                  opens.
Sliders:          closeRate (0–100, step 1, %) and hourlyRate ($0–500, step 5)
  Value:          mono body-sm semibold --accent-purple tabular-nums, prominent
  Track:          h-1.5 rounded-full --surface-200, active fill 1.5 --accent-purple
  Thumb:          16px, rounded-full, --accent-purple via --thumb-bg CSS var,
                  shadow-glow, hover scale-110, active scale-90, focus-visible 2px
                  surface-100 + 4px accent-purple ring, transitions 150ms

Flow:             one consistent flow on every breakpoint — scenario, then all
                  categories, then the impact panel. No step gating; the result is
                  always directly below the last field.

Result panel:     the visual anchor — dark. --surface-950, border --surface-800,
                  rounded-md, p-6 → md:p-7, full width under the inputs, height
                  hugs content (no stretch)
  Eyebrow:        "YOUR POTENTIAL IMPACT" — mono caption semibold --accent-purple-soft
  Primary:        totalMonthlyBenefit — display-lg bold tabular, --text-primary;
                  label "ESTIMATED MONTHLY OPPORTUNITY" (mono caption, secondary 70%).
                  The number tweens smoothly on every input change (GSAP number tween,
                  0.5s power2.out, instant under reduced motion).
  Chart:          "recovered revenue · cumulative" — a 12-month benchmark-style chart
                  (ImpactChart.tsx) reusing the Benchmark module visual language:
                  framed rounded-window box, --surface-900, border-hairline-on-dark,
                  BenchGrid (dark) hairline grid + corner brackets, BenchGrain noise
                  overlay, viewBox 480×280 max-w-md mx-auto. Cumulative recovered line
                  (12 evenly spaced months, cumulative = totalMonthlyBenefit × month
                  with a deterministic micro-wobble that is zero at months 1 and 12 so
                  the endpoint lands exactly on totalMonthlyBenefit × 12). Accent line
                  1.25px --accent-purple-soft opacity 0.7, area fill opacity 0.1; solid
                  reference line at the bookings-recovered figure (revenueBenefit, gray,
                  opacity 0.45, label "bookings ≈X / mo"), grid
                  rows at 25 / 50 / 75 / 100% of annual, $ axis labels (compact) on the
                  left, month ticks 1–12 and "month" unit on the baseline, ONE focal
                  16px annotation "≈value / yr" at the month-12 endpoint. Curves
                  (pathLength 1) draw in once on open — dash 1→0, 1.1s power2.inOut,
                  stagger 0.12s — and re-draw on each reopen (keyed to `open`);
                  static under prefers-reduced-motion. Live: line, axis, and annotation
                  values update on every input change.
  Secondary:      two supporting metrics under a border-t hairline: annual opportunity
                  (totalMonthlyBenefit × 12) in --accent-purple-soft and staff time
                  recovered / month in --text-primary, both display-sm semibold
                  tabular-nums.
  Explanation:    body-sm, --text-secondary 90% — dynamically generated plain-English
                  sentence: "Your {missed} missed calls and {hold} calls left on hold
                  each month represent about {revenueBenefit}/month in lost or delayed
                  bookings — before counting the {hours} hours of staff time spent on
                  the phone."
  CTA:            btn-primary full width, "SEE YOUR FULL ROI" + ArrowRight 16 — routes
                  through the shared "Just a moment" transition into the results modal.

Results modal:    the ROI report screen — light, matching the calculator (same
                  max-w-5xl, same --surface-100 panel with --surface-200 border), so
                  the two screens feel like one product: enter in the estimator, land
                  in the report. Cards sit on white (bg-white, border --surface-200,
                  rounded-md) — this is the light complement to the calculator's dark
                  impact panel, and the dark ImpactChart framed visual reads as the
                  deliberate dark moment inside the report (same pattern as the
                  estimator's dark panel under light fields).
  Header:         sticky, --surface-100/90 backdrop-blur, border-b --surface-200.
                  Eyebrow "NOVA ECHO · ROI REPORT" in mono caption --accent-purple;
                  H2 "Your ROI Results"; subtitle "Modeled from the metrics you
                  entered."
  Hero:           NET MONTHLY ROI — display-md → lg, font-bold tabular-nums,
                  --accent-purple, TrendUp 22 --accent-purple beside it; mono caption
                  "AFTER {PLAN} · $X/MO". Flanked on desktop by the secondary block
                  (border-l hairlined): monthly benefit total and "{roiPct}% return
                  on ${planPrice}/mo".
  Visual row:     lg:grid-cols-5 — the cumulative recovered-revenue graph
                  (ImpactChart, reusing the calculator's chart, col-span-3)
                  beside the MONTHLY BENEFIT COMPOSITION card (col-span-2): a 2px
                  stacked bar (rounded-full, --surface-200 track) with three
                  proportional segments (recovered bookings --accent-purple · cost
                  savings --accent-purple-soft · returned staff time --surface-700)
                  and a legend of swatch + mono label + $ value.
  Annual + plan:  sm:grid-cols-2 row — ESTIMATED ANNUAL IMPACT (net × 12, display-md
                  bold --accent-purple, caption "12 MONTHS, WITH {PLAN} INCLUDED")
                  beside the recommended-plan callout (border --accent-purple/30,
                  bg --accent-purple/5): Medal icon + plan name + price, caption
                  "fits your $X/mo benefit level".
  CTA:            btn-primary "BOOK DISCOVERY CALL" full width → smooth-scrolls to
                  #book-call (closes modal); "Start Fresh" link beneath replays the
                  transition overlay and reopens the ROI estimator seeded to the
                  same agent type (light hover uses --accent-magenta per the
                  light-surface hover accent rule).
  Disclaimer:     mono caption, --text-secondary-light 60%, centered.
  Motion:         panel entrance as the ROI modal; then the bands + CTAs stagger-in
                  (opacity 0→1, y 16→0, 0.5s power3.out, 0.08s stagger, 0.15s delay),
                  the composition segments scaleX 0→1 (0.7s power3.out, 0.1s stagger,
                  0.3s delay), and the chart's curves draw on reopen via its `active`
                  prop. All skipped under prefers-reduced-motion. Report figures
                  stay static (no live tween).

Defaults (seeded per scenario on open — the modal remounts per session via a
  context session counter, so state resets to the triggering scenario's defaults
  without setState-in-effect):
  Receptionist:   300 / 25 / 10 / 28% / $350 / $2,400 / 45h / $70
  Speed-to-Lead:  400 / 20 / 8 / 24% / $950 / $0 / 35h / $80     (no front desk)
  Mass Outbound:  1,200 / 80 / 0 / 10% / $600 / $0 / 45h / $60   (no front desk)

Calculation (UNCHANGED — business formulas preserved):
  recoveredMissedRevenue  = missedCalls × (closeRate/100) × ticketValue
  recoveredHoldRevenue    = holdCalls × (closeRate/100) × ticketValue
  revenueBenefit          = recoveredMissed + recoveredHold
  costSavings             = receptionistCost
  timeValue               = hoursSpent × hourlyRate
  totalMonthlyBenefit     = revenueBenefit + costSavings + timeValue
  netMonthlyROI           = totalMonthlyBenefit − planCost
  roiPercentage           = (netMonthlyROI / planCost) × 100
  annualImpact            = netMonthlyROI × 12
  Displayed live:         totalMonthlyBenefit (primary), totalMonthlyBenefit × 12
                          (annual), hoursSpent (time). The full plan/net breakdown
                          lives in the results modal, reached via "See your full ROI."
  Plan recommendation:    Total < $500 → Nova Light ($99/mo) · $500–$1,999 → Nova
                          Super ($333/mo) · ≥ $2,000 → Nova Hyper ($1,299/mo)

Modal entrance:  GSAP scale 0.97→1, y 24→0, opacity 0→1, power3.out, 0.4s
Overlay:         GSAP opacity 0→1, power2.out, 0.3s
```

## Motion (GSAP)

### Hard rules
- Animate only `transform` and `opacity` for performance. Never animate `box-shadow` blur directly — crossfade a pre-blurred glow element's opacity instead.
- Respect `prefers-reduced-motion`: disable scroll-reveal stagger and hero-entrance, keep only essential state changes (hover feedback can stay, minimal).
