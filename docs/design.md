# Nova Echo — Design System

Source of truth for every visual decision in this build. If a value isn't defined here, it doesn't go in the code — flag it instead of inventing one.

## Color

### Brand (source values — do not alter)
```
--black:        #000000
--white:        #FFFFFF
--navy:         #1E3A8A
--cyan:         #00D1FF   (raw palette only — retired from all accent usage)
--sky:          #4FACFE   (raw palette only — retired from all accent usage)
--magenta:      #E61EAD   (light-surface hover accent)
--purple:       #7000FF
--hot-purple:   #BA0FFF
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
--accent-purple: #7000FF       (primary interactive accent — links, focus rings, active states)
--accent-hot-purple: #BA0FFF   (secondary accent — light stop of the purple ramp,
                                paired with purple only in glow/gradient contexts, never solid fills)
--accent-magenta: #E61EAD      (light-surface hover/active accent — nav, footer, stories)
```

## Gradient system — this is the fix

The current site's problem isn't the colors, it's that saturated gradients compete across buttons, headings, borders, and backgrounds. That reads as a generic startup template. The fix keeps the same brand colors but changes where and how they appear.

**Rule: color communicates hierarchy, not decoration. L1 Solid is the default. Gradients are accent treatments only.**

```
Level 1 --- Solid (default UI):
  Cards, navigation, buttons, surfaces, pricing structures.
  No gradient. Primary CTA default is solid brand navy.

Level 2 --- Subtle gradient (emphasis only):
  Selected cards, hero background lighting, important feature panels.
  --gradient-glow and --gradient-surface only. Never above 20% opacity.

Level 3 --- Hero gradient / glow (reserved):
  Major visual moments only. Hero is the strongest use of color on the page.
  Everything below calms down. Waveform purple-to-hot-purple + one soft glow behind product UI.
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

--gradient-accent-ring (interactive, hover/focus ONLY):
  linear-gradient(135deg, rgba(112,0,255,0.9), rgba(186,15,255,0.9))
  Use: 1.5px border ring on hover/focus, or a low-opacity (≤15%) overlay.
  Never: as a button's default resting-state fill.

--gradient-text-highlight:
  var(--gradient-accent-ring)
  Use: single hero headline phrase ONLY. Never on section headings, card titles, or multiple headings on one page.
  Agents, Features, and all non-hero headings use solid text.

DEPRECATED — do not use on new code:
--gradient-button-primary (5-stop magenta-to-navy) is retired as a default fill.
  Replaced by solid --surface-700. Retained in globals.css only until callers migrate.
  --hero-blob-gradient-* (cyan/sky/purple/navy blobs) are removed. No floating blobs.
  Benchmark Nova header uses solid --accent-purple 2px underline, not a gradient border.
```

## Buttons

```
Primary — default:  solid var(--surface-700) #1E3A8A, white text, 1px transparent border, radius-btn, no shadow
Primary — hover:     border becomes var(--gradient-accent-ring), soft glow (blurred, ≤20% opacity purple, NOT a hard drop shadow)
Primary — focus:     2px solid var(--accent-purple) outline, offset 2px

Secondary — default: rgba(255,255,255,0.06) fill, 1px solid rgba(255,255,255,0.24) border, white text
Secondary — hover:    fill → rgba(255,255,255,0.12), border brightens to rgba(255,255,255,0.48)
```

All buttons (.btn-primary / .btn-secondary): no fixed height — height is padding-driven.
Vertical padding 12px (top/bottom) + 15px body text ≈ 48px tall, horizontal padding 24px.
Nav CTA (.header-cta) matches at 12px vertical padding, reduced to 14px text.
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
hero (Trusted) starts entering the viewport — not when the (much taller) hero
has fully scrolled past; rechecked on scroll.

Only the primary CTA gets the hover ring + glow emphasis. Default state is solid on all buttons. No gradient default fills.

## Typography

Manrope is the display typeface for headings; DM Sans is the body/UI typeface.
Geist Mono is a functional detail for technical/system contexts only — never body
copy, nav, buttons, or general headings. All loaded via `next/font/google`
(`Manrope` 400–700, `DM_Sans` 400–500, `Geist_Mono` 400–500); no font-management
dependencies.

Manrope is loaded at 400–700; heading weight utilities (font-medium /
font-semibold / font-bold) map to real weights. Hierarchy comes from scale
first, weight second.

```
--font-display: 'Manrope'  — hero, section headlines, feature titles. Weights 400–700.
--font-body:    'DM Sans'   — paragraphs, UI, buttons, nav. Weights 400 / 500.
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

Data and stats (comparison table, pricing values, metric callouts) use DM Sans
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
--radius-btn: 8px  (all buttons/CTAs — btn-primary, btn-secondary, agent rows, list buttons)
--radius-lg: 10px  (modal panels)
--radius-window: 12px  (hero console window only — largest radius in the system)
```

## Shadow

No shadow above a soft, low-opacity glow. No hard drop shadows anywhere — this is the direct fix for the audited "thick shadow" problem.

```
--shadow-none: none
--shadow-glow: 0 0 24px rgba(112,0,255,0.18)   (hover states only, see Buttons above)
--shadow-window: 0 32px 64px -24px rgba(0,0,0,0.5)   (the light console window on the dark hero — soft ambient, never on other elements)
```

## Hero — editorial voice composition

Editorial hero on `--surface-950`: headline copy block on top, light console window
below it with a clean gap (mt-8 → lg:mt-12). The window reads as a premium
voice-agent dashboard — chrome header bar, three weighted panels, and structural
hairlines. No ambient gradient blobs — depth comes from the wave layering, speaker
chips, and the light-on-dark panel. Must look excellent with all effects removed
(solid text, hairline borders, flat surfaces).

```
Layout:        block flow (no grid). Copy block first, window below with a clear
               gap — no overlap, no underlay, no negative margins. Hero section
               py-16 → lg:py-24.
  Message:     max-w-3xl, left-aligned, relative z-10 (headline, subhead, CTAs).
               Reads fully on the dark hero.
Band:        light console window — solid light card bg-surface-100,
                1px surface-200 border, radius-window (12px), shadow-window,
                overflow-hidden. Relative z-0, mt-8 → lg:mt-12 beneath the copy.
                Sits on the dark hero as the single light panel; no backdrop blur,
                no nesting. No nested card chrome inside; hierarchy comes from
                panel headers and weight.
The Live workflow column sits on the whitest white — pure
                #FFFFFF — at lg ONLY, so the payoff rail reads as the brightest
                strip in the window on desktop. On mobile it shares the window's
                bg-surface-100 so the stacked rows read as ONE continuous card
                (no detached white block).
  Chrome bar:  border-b surface-200, px-4 → lg:px-6, py-3. Left: three muted
               app-window dots (.window-dot, 10px, rgba(0,0,0,0.12), gap-2)
               + Radio duotone --text-secondary-on-light + "Nova Echo Console"
               mono body-sm uppercase --text-primary-on-light. Right: live dot +
               "Simulated call" mono caption --text-secondary-on-light. Chrome
               stays neutral — no accent color here.
               Mobile stacks flex-col items-start gap-2; lg flex-row justify-between.
  Body:        1 col mobile → 12 cols at lg — three panels, no gap, hairlines
               do the separation:
               Agents (span 3)            border-r surface-200 at lg
               Live call (span 6)         active waveform + transcript
               Live workflow (span 3)     border-l surface-200 at lg
Panels px-4 py-4 → lg:px-6 lg:py-6. On mobile stacked panels join
                with a single border-t surface-200; the Agents panel sits directly
                under the chrome bar (no duplicate border). The Live call → Live
                workflow join is tightened on mobile (pb-2 under the waveform,
                pt-2 above the workflow head) so the payoff rail sits close to
                the live call; the copy → agents join keeps the standard py.
  Panel head:  .console-panel-head — mono caption uppercase tracking-wider,
               --text-secondary-on-light (the single header treatment for all
               three panels). mb-2 → lg:mb-3.
  Emphasis:    the window has exactly two loud moments — the call intent
               (display-xs headline + phase chip) and the Estimated ROI
               (display-md --accent-purple total). Everything else sits a step
               quiet: waveform is dimmed texture, checklist checks and chrome
               icons are neutral, agent pills are flat. Accent purple is
               reserved for the two focal points plus small functional state
               (selected agent icon, live dot, AI speaker chips).
  Mobile order: copy → console window (chrome → agents → live call → workflow)
                → CTA row. CTA buttons sit after the window in the DOM and are
                reordered with order utilities (order-3 mobile, order-2 on lg)
                so desktop keeps copy → CTAs → window.
Background:    --surface-950 + 4 vertical hairlines, 1px rgba(255,255,255,0.035),
               full hero height, vertically faded at both ends, aligned to container.
               Hero-noise adds a soft top-center stage glow behind the console
               (navy→hot-purple radial at 50% 8%, ≤16% total layer opacity) plus
               two low side washes — light for the product to sit on, never glow
               blocks floating above it.
Headline:      display-md → display-xl (34px/38px → 48px/50px), font-display, weight 500, solid white — never gradient
Subhead:       body-md (16px / 24px), font-body, --text-secondary-on-dark
CTA row:       primary (btn-primary, solid --surface-700) + secondary (btn-secondary,
               quiet outline, "Clients Wins" → #results Success Stories), gap-4
               (hero value items removed — headline → subhead → CTAs only).
               Mobile: grid-cols-2 so the pair collectively fills the row width;
               lg: back to a content-width flex row.
Live call:     the primary panel. Head row = "Live call" (panel head) on the left
               and a meta line on the right (mono caption tabular-nums,
               --text-secondary-on-light, aria-live polite) — agent label · mm:ss.
               Mobile stacks flex-col items-start gap-2; lg flex-row justify-between.
               Transcript → divider (mt-4 border-t surface-200 pt-4) → intent →
               waveform
  Intent:       appears after the conversation block. "Call intent"
               caption + display-xs font-display weight 500 --text-primary-on-light
               headline (script.callIntent — the caller's goal, per-agent copy) and
               a purple-tinted phase chip (.intent-phase-chip, mono caption uppercase,
               --accent-purple on rgba(112,0,255,0.08)) showing the live stage
               (Listening / Processing / Speaking / Taking action / Call completed).
               Revealed 800ms after the call completes (after every transcript row),
               hidden via .reveal-block until then.
Waveform:    full-width compact band (VoiceWaveform, energy-scaled per agent),
                 height 112 (all breakpoints), edge-faded, grain at 0.07. Sits at
                 the bottom of the Live call panel as quiet texture — opacities
                 are dimmed so it frames the content above instead of competing
                 with it. Never expanded to full height on mobile: a 240px band
                 reads as a void between the stacked panel rows.
  Transcript:  the panel's first block. Rows always in DOM, revealed by opacity
               (.voice-row), one line at a time in dialogue order — AI opener
               reveals at speaking, customer at action, AI closer (aiFollowUp)
               at complete, so the conversation always ends with the agent.
               Speaker chip: mono caption uppercase radius-sm, padding 2px 6px.
               AI chip: --accent-purple text on rgba(112,0,255,0.12).
               Caller chip: --text-secondary-on-light on surface-200.
  Workflow:    the secondary rail. "Live workflow" panel head + checklist of
               body-sm --text-primary-on-light rows, CheckCircle fill
               --text-secondary-on-light (neutral — completion is quiet), gap-2.
Revealed with .reveal-block at complete + 1300ms (500ms after intent) — the
                checklist builds in as the whole block fades up.
               Row alignment: icon top-aligns to the first line
               (.hero-action-check, flex-start + 2px optical nudge) so the check
               sits level with the cap height of the text, not its 20px line box.
  Estimated ROI:is the rail's payoff block and the window's dominant accent —
               border-t surface-200 pt-4. "Estimated ROI calculation" panel-head
               label; monthly total in display-md --accent-purple tabular-nums +
               "/mo"; annual impact as mono caption --text-secondary-on-light;
               "Calculate yours" link → openRoi(roiName). Figures are computed via
               calcResults(script.roiExample) from /components/roi/calc — the
same formula powering the ROI modal. Revealed with .reveal-block at
                complete + 1300ms, after the intent block.
  Selector:      compact vertical rail, no cards. Rows are px-3 py-2.5 rounded-sm
               (radius-btn) buttons with gap-3, flat inside the panel.
               Row = duotone icon (18px) + two-line label (name body-sm 500 +
               tagline caption --text-secondary-on-light).
  Icons:       PhoneIncoming (Receptionist), Lightning (Speed-to-Lead),
               Megaphone (Mass Outbound).
  Active:      rgba(0,0,0,0.08) pill + --text-primary-on-light medium text + icon
               flips --accent-purple (text label always present — never color-alone)
               + aria-pressed/aria-current.
Hover:       rgba(0,0,0,0.05) pill, icon → --accent-purple, text → primary.
   Focus:       2px solid --accent-purple outline, offset 2px.
   Description: selected agent description (caption secondary — the scale's
               smallest size) sits below the selector list, separated by a hairline
               (mt-4 border-t surface-200 pt-4), on the light panel background.
               No CTA below the console — the contextual ROI link lives in the
               right-rail Estimated ROI block (RoiPreview) only.
```

### Hero voice demo — Conversation → Understanding → Action

Three agent scripts (Receptionist default, Speed-to-Lead, Mass Outbound), each with
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

Light background (`--surface-100`), 3-column card grid on desktop. Cards are white (`--surface-50`) with subtle border (`--surface-200`). Each card has a title, body, and a "Calculate ROI" link styled in accent-purple.

```
Background:    --surface-100
Card fill:     --surface-50
Card border:   --surface-200
Headline:      display-md → display-lg, font-display, --text-primary-on-light
Subtext:       body-sm → body-md, --text-secondary-on-light
Card title:    display-sm, font-display, font-bold, --text-primary-on-light
Card body:     body-sm, --text-secondary-on-light
CTA link:      body-sm, font-medium, --accent-purple → hover --accent-hot-purple
Grid:          1 col mobile → 3 cols at lg, gap-6
Gap subtext:   mt-5 / lg:mt-6 (per section pattern)
Card padding:  p-8
```

## Hero background — atmospheric dome + structural grid

The hero's one allowed atmospheric treatment: soft vertical washes of luminous
color at the left and right edges over the upper ~72% of the hero, behind the
nav and headline. The center reading column stays clean `--surface-950`.
Flat `--surface-950` everywhere else, with 4 vertical 1px hairlines at
rgba(255,255,255,0.035), full hero height, vertically faded at both ends via mask.

```
Form:          ONE continuous arch mass spanning full width, painted by a
               horizontal fill that peaks at both screen edges and is fully
               transparent across the center — so only the side washes show.
               Lower edge uneven and organic via turbulence displacement.
Colors:        system only, navy-dominant. Each side leads dark navy → purple →
               hot-purple hint, dissolving to 0 opacity before the center
               column. No bands: stops bleed into each other under heavy blur.
Texture:       none — clean displaced + blurred mass, smooth against the flat
               surface. No mottling, no film grain.
Motion:        slow waveform sway, transform + opacity only — y -8→10px / 7s,
                scaleY 1→1.03 / 9s, xPercent 0→-1.5% / 11s, opacity 0.92→1 / 6s.
                All sine.inOut yoyo. Calm swell, never aggressive.
                Disabled under prefers-reduced-motion.
Bleed:         SVG element is oversized (120% width, 124% height, centered on
                top:-12% / left:-10%) so translations never expose a hard edge.
Fade:          mask fades BOTH ends — transparent → full over the top 20% (no
                hard "cut" seam where the atmosphere meets the page top edge),
                full through the working band, dissolving to 0 by the bottom.
Implementation: static SVG filter (displacement + blur, rendered once),
                GSAP sway on the wrapper via useAtmosphereMotion. No filter animation.
```

RETIRED: the full-bleed scrolling bar waveform, the multi-color sine paths, and the
single ambient `--gradient-glow` blob are all removed.

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

## Benchmark section

Light comparison table on `--surface-50` background. 4-column matrix comparing Nova Echo AI vs Competitors vs Humans across 13 metrics. The "Nova Echo AI" column header has a solid `--accent-purple` 2px bottom border; values under it use `--accent-purple` for visual emphasis.

```
Background:       --surface-50
Header labels:    body-sm, semibold, uppercase, tracking-wider
  Nova Echo AI:   text-primary-light, solid 2px bottom border --accent-purple
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
