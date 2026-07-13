# Nova Echo AI — Concept Redesign

Portfolio case study. Concept redesign of novaecho.ai, not affiliated with or endorsed by Nova Echo AI. Next.js (App Router) + Tailwind + GSAP.

## Design system — mandatory, read first

Read `design.md` before writing or editing any component. It is the single source of truth for color, type, spacing, radius, shadow, and motion.

**Never hardcode a color, font size, spacing value, radius, shadow, or gradient directly in JSX, CSS, or Tailwind arbitrary values.** Every visual value must resolve through a Tailwind theme token or CSS variable that traces back to `design.md`. If you need a value that isn't defined there, stop and flag it back to the user — do not invent one inline and do not approximate with an arbitrary value like `bg-[#0a0e1a]`.

Gradients specifically: `design.md` defines exactly where gradients are allowed (subtle navy depth on primary CTA fill, ambient background glow, hover-state rings) and where they are forbidden (loud full-saturation cyan-to-sky on buttons, text). Follow that rule exactly — this is the direct fix for the site's original "harsh gradient CTA" problem, and reverting it defeats the point of the redesign.

## Token wiring

Design tokens live as CSS custom properties in `app/globals.css`, mapped into `tailwind.config.ts` under `theme.extend`. Reference them through Tailwind utility classes or `var(--token-name)` — never raw hex.

```ts
// tailwind.config.ts — extend, do not override
colors: {
  surface: {
    950: 'var(--surface-950)',
    900: 'var(--surface-900)',
    800: 'var(--surface-800)',
    700: 'var(--surface-700)',
  },
  accent: {
    cyan: 'var(--accent-cyan)',
    sky: 'var(--accent-sky)',
  },
},
fontFamily: {
  display: ['var(--font-display)'],
  body: ['var(--font-body)'],
},
```

## Code conventions

- TypeScript strict mode, no `any` unless justified in a one-line note
- Full file rewrites when editing a component — never leave a partial diff half-applied
- One component per file, colocated by section: `/components/hero`, `/components/nav`, `/components/pricing-card`, etc.
- Motion logic (GSAP timelines, ScrollTrigger setup) lives in a dedicated hook per component, not inlined in JSX

### Comments
- Default to no comments. Only add one when the logic genuinely isn't obvious from the code itself — never to restate what a line already says
- When a comment is warranted, keep it to one short line, in English
- Never write comments in Filipino/Taglish
- Never use emoji in a comment, or anywhere in code — no emoji in strings, labels, console logs, commit messages, or UI copy unless explicitly asked for in a specific instance

## Anti-AI-slop checklist

Before treating any component as done, check it against this list. If it matches any of these, revise it.

- Gradient used as a button's default fill instead of the glow/ring-on-hover pattern in `design.md` — subtle navy depth gradient is the allowed default fill; loud full-saturation cyan-to-sky gradients remain forbidden
- Generic rounded-full pill badges used as pure decoration with no functional purpose
- Emoji used as icons in place of a real icon set
- Copy leaning on generic SaaS-hype language — "Unlock," "Elevate," "Supercharge," "Revolutionize," "Seamless" — instead of specific, concrete claims
- Numbered badges (01/02/03) used decoratively where the content isn't actually a sequence
- Decorative blurred gradient "blob" shapes with no relationship to the product (this build's one legitimate exception is the call-trace waveform motif in `design.md`, since it's grounded in the actual product — voice calls)
- Default framework spacing/type scale left untouched instead of the scale defined in `design.md`
- Card grids where every card is identical in structure and weight, with no visual hierarchy between primary and secondary content

## Definition of done

- [ ] No raw hex, px, or arbitrary Tailwind values in component files — everything resolves through a token
- [ ] Responsive and unbroken at 375px, 768px, and 1280px
- [ ] Motion respects `prefers-reduced-motion`
- [ ] No gradient used as a default button fill — glow/ring on hover only, per design.md (subtle navy depth gradient allowed as default fill)
- [ ] No shadow harder than `--shadow-glow`
