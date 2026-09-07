# Nova Echo AI --- Redesign Improvement Plan

> Location: `docs/brief/NOVA_ECHO_REDESIGN_IMPROVEMENTS.md`
> Authority: this file is the product brief. `docs/design.md` remains the sole visual source of truth. If this brief needs a new color, spacing, radius, shadow, gradient, or motion value, update `docs/design.md` first per `AGENTS.md`.

## 0. Split Plan --- How This File Breaks Down

This monolith (29 sections, ~1095 lines) is kept intact as the index. Implementation splits into 7 focused briefs under `docs/brief/`, each mapped to `src/components/*` and to P0/P1/P2 priority. Split by implementation boundary, not by the 29 headings --- 29 files would be overhead.

- [ ] `00-overview.md` --- Project Direction, Sec 1 Core UX Problem (8 decision questions), Sec 27 Final Principle, Sec 28 Case Study Decisions, Sec 29 Definition of Done. No UI. Entry point for case study.
- [ ] `01-visual-system.md` --- Sec 2 Visual Direction, Sec 3 Gradient System (L1 Solid / L2 Subtle / L3 Hero), Sec 19 Typography, Sec 20 Cards, Sec 22 Motion, Sec 23 Accessibility. Requires `docs/design.md` update first for any new token.
- [ ] `02-hero-product.md` --- Sec 4 Hero (eyebrow, headline, Book a Call + Watch Demo, proof strip), Sec 5 Value Pillars, Sec 6 Problem to Solution. Maps to `components/hero`, `components/pillars`. P0-1 Hero.
- [ ] `03-demo-agents.md` --- Sec 7 See It In Action (call UI: transcript + actions + CRM), Sec 8 Agent Selection, Sec 9 Guided Recommendation Flow (goal to volume to support to Agent + Plan + Why + ROI). Maps to `components/demo`, `components/agents`, `components/recommender`. P0-3/4.
- [ ] `04-pricing-roi.md` --- Sec 10 Pricing Architecture (Best-for labels), Sec 11 Pricing + Recommendation Connection, Sec 12 ROI Calculator, Sec 13 Benchmark (progressive disclosure). Maps to `components/pricing-card`, `components/roi`, `components/benchmark`. P0-4/5, P1-9/10.
- [ ] `05-proof-integrations.md` --- Sec 14 Proof by Outcome, Sec 15 Integrations (Agent to CRM/Calendar/SMS/Email diagram), Sec 16 How It Works (01/02/03 onboarding). Maps to `components/stories`, `components/integrations`, `components/how-it-works`.
- [ ] `06-conversion-system.md` --- Sec 17 CTA Strategy, Sec 18 Navigation, Sec 21 Section Rhythm (13-section order), Sec 24 Mobile, Sec 25 Content Integrity (novaecho.co source only), Sec 26 Priority (P0/P1/P2). Maps to `components/nav`, `components/cta`, page layout.

Order: 02 -> 01 -> 03 -> 04 -> 05 -> 06, with 00 as the gate. P0 (Hero, Gradients, Agents, Plan, CTA) ships before P1 polish.

Rule: each split file gets Frontmatter (Status, Priority, Source sections, Components, Depends on, Done when). No new tokens inline --- flag to `docs/design.md`.

---

## Project Direction

This redesign should stay grounded in Nova Echo AI's existing product,
claims, positioning, and offers. The goal is **not to invent a new
brand** or rewrite the business into a different product.

The goal is to improve:

-   information hierarchy
-   visual credibility
-   product comprehension
-   plan/agent selection
-   conversion flow
-   perceived product maturity
-   visual consistency

Reference the official Nova Echo website for source content and
positioning: https://novaecho.co/

The redesign should preserve Nova Echo's existing color identity while
changing **how the colors are used**. The visual direction should feel
like a mature AI SaaS product rather than a cheap startup landing page.

------------------------------------------------------------------------

# 1. Core UX Problem

The current experience gives visitors a lot of information, but it still
makes them do too much interpretation themselves.

A prospective customer should be able to answer these questions quickly:

1.  What is Nova Echo?
2.  Is it relevant to my business?
3.  What can it actually do?
4.  Which AI agent is right for me?
5.  Which plan is right for me?
6.  What will it cost?
7.  Why should I trust it?
8.  What should I do next?

The redesign should therefore move from **information presentation**
toward **decision support**.

Primary principle:

> Don't make users understand the product before helping them choose it.

------------------------------------------------------------------------

# 2. Visual Direction

## Objective

Keep Nova Echo's recognizable colors, but remove the visual treatment
that makes the current redesign feel overly "AI startup template."

The problem is not necessarily the colors themselves.

The problem is:

-   too many gradients competing for attention
-   saturated colors used across large surfaces
-   gradients used as decoration instead of hierarchy
-   insufficient neutral space
-   too many glowing elements
-   excessive visual effects around ordinary UI
-   weak separation between primary and secondary content

## New visual rule

**Color should communicate hierarchy, not decoration.**

Use the Nova Echo palette approximately as:

-   Darkest brand color → page/background foundation
-   Dark/neutral surfaces → cards, sections, navigation
-   Primary brand color → primary CTA and important interactive states
-   Secondary accent → highlights, data visualization, selected states
-   Bright accent/gradient → controlled moments of emphasis only
-   White/light neutral → primary typography
-   Muted neutral → secondary typography

Do not introduce new brand colors unless required for accessibility or
semantic UI.

------------------------------------------------------------------------

# 3. Gradient System

## Current Problem

The redesign currently uses several gradient combinations that compete
with each other.

This creates the visual feeling of:

> "AI startup landing page"

instead of:

> "Established AI product with a sophisticated interface."

## New rule

Gradients become **accent treatments**, not default backgrounds.

### Use gradients for:

-   hero visual focal point
-   selected/active states
-   subtle glow behind product UI
-   occasional CTA emphasis
-   data/ROI visualization
-   decorative light effects behind important sections

### Do NOT use gradients for:

-   every card
-   every section background
-   large blocks of body content
-   every button
-   every heading
-   every border
-   multiple adjacent components

## Gradient hierarchy

Use three levels:

### Level 1 --- Solid

Default UI.

Cards, navigation, buttons, surfaces, pricing structures.

### Level 2 --- Subtle gradient

Used for emphasis.

Selected cards, hero background lighting, important feature panels.

### Level 3 --- Hero gradient / glow

Reserved for major visual moments.

The hero should be the strongest use of color on the entire page.

Everything below should visually calm down.

------------------------------------------------------------------------

# 4. Hero Redesign

## Current Problem

The hero needs to communicate value faster and feel less visually noisy.

The hero should not try to explain the entire product.

It has one job:

> Make the right visitor understand what Nova Echo does and give them a
> reason to continue.

## Hero hierarchy

### Eyebrow

A concise product/category statement.

Example direction:

**AI VOICE EMPLOYEES FOR YOUR BUSINESS**

Do not make this oversized or overly decorative.

### Primary headline

Use the official positioning as the content source, but improve its
presentation.

The headline should communicate:

-   AI voice capability
-   business application
-   outcome

Avoid generic phrases such as:

"Revolutionize your business with AI"

unless they are genuinely part of Nova Echo's source positioning.

### Supporting copy

One short paragraph.

It should explain the mechanism:

AI voice agents can handle long, natural phone conversations, remember
context, and take actions across connected applications.

Do not overload the hero with every feature.

### Primary CTA

**Book a Call**

### Secondary CTA

**Watch Demo**

These should be visually distinct:

Primary = solid brand CTA

Secondary = quiet text/outline interaction

### Hero proof

Instead of additional decorative copy, use a small proof strip
underneath:

-   Human-like conversations
-   5,000+ integrations
-   24/7 availability

Only use claims that are supported by the official source.

## Hero visual

The hero needs a **product visualization**, not just abstract gradients.

Preferred direction:

A dark product interface showing an AI agent actively handling a call.

Possible visual elements:

-   active call state
-   waveform
-   transcript
-   caller information
-   action being executed
-   appointment/result status
-   integration indicators

The visual should look like a **real product system**, even if it is a
conceptual visualization.

Avoid:

-   random floating blobs
-   excessive glassmorphism
-   generic AI brains
-   neon wireframes
-   excessive floating cards
-   decorative 3D objects without product meaning

The hero should communicate:

> "This is a working AI employee."

------------------------------------------------------------------------

# 5. Immediate Product Explanation

After the hero, answer:

## What does Nova Echo actually do?

Use three high-level value pillars based on the official positioning:

### Expanded Sales Team

Instantly add scalable AI sales capacity.

### Cost Predictability

Reduce the operational burden associated with traditional sales
staffing.

### Consistent Performance

Deliver repeatable interactions based on trained scripts and business
goals.

Each card should contain:

-   concise title
-   one-sentence explanation
-   small supporting visual/icon

Do not over-design these cards.

------------------------------------------------------------------------

# 6. Problem → Solution Section

Create a clear transition from customer pain to Nova Echo's solution.

## Structure

### The problem

Traditional sales teams introduce:

-   turnover
-   overhead
-   training requirements
-   inconsistent performance

### The solution

Nova Echo provides an AI workforce that can:

-   handle phone conversations
-   follow trained scripts
-   run campaigns
-   take actions through connected applications
-   operate continuously

This section should feel editorial and confident.

Avoid another grid of glowing cards.

------------------------------------------------------------------------

# 7. "See It In Action" Section

The official site already emphasizes demonstrations and examples.

The redesign should turn this into one of the strongest proof sections.

## Recommended UI

Use a large featured AI call interface.

Example:

Left: - agent name - call state - conversation transcript

Right: - actions taken - lead status - appointment booked -
CRM/application update

Below: - audio/demo controls

The purpose is to let visitors understand the product through
**observable behavior**, not marketing claims.

------------------------------------------------------------------------

# 8. AI Agent Selection

This is one of the highest-priority improvements.

Visitors should not have to understand every option before knowing what
is relevant to them.

## Section title

**Which AI Agent Fits Your Business?**

Short explanation:

> Tell us what you need to improve and we'll point you toward the right
> setup.

## Agent categories

Use only agent types supported by the actual Nova Echo product/content.

For each agent:

-   Agent name
-   Primary job
-   Best for
-   Key capability
-   CTA

Avoid making every agent look equally suitable.

The UI should communicate a recommendation hierarchy.

------------------------------------------------------------------------

# 9. Guided Recommendation Flow

Add a lightweight product-selection experience.

## Step 1 --- What are you trying to improve?

Possible choices based on Nova Echo's actual offerings:

-   Generate more leads
-   Follow up with leads
-   Handle customer support
-   Increase outbound activity
-   Improve multiple areas

## Step 2 --- How much volume do you handle?

Use ranges appropriate to the actual pricing/product model.

## Step 3 --- What level of support do you need?

Examples:

-   Getting started
-   Growing
-   High volume
-   Fully managed

## Result

Show:

### Recommended Agent

Agent name

One-sentence explanation.

### Recommended Plan

Plan name

One-sentence explanation.

### Why this fits

3 concise reasons.

### Estimated ROI

Only if the calculation is based on the existing ROI model and
assumptions.

### CTA

**See My Recommended Setup**

This should feel like a recommendation tool, not a personality quiz.

------------------------------------------------------------------------

# 10. Pricing Architecture

The pricing section should help users choose rather than simply compare
numbers.

## Card hierarchy

Each plan should show:

1.  Plan name
2.  Best for
3.  Price
4.  Core differentiator
5.  Primary CTA
6.  Secondary features

The most important distinction between plans should be visually obvious.

Do not give every feature equal visual weight.

## Recommended labels

Use a small "Best for" statement:

**Best for:** Getting started

**Best for:** Growing teams

**Best for:** High-volume operations

For any managed/enterprise offering, make the difference explicit.

------------------------------------------------------------------------

# 11. Pricing + Recommendation Connection

The recommendation flow should feed directly into pricing.

Example:

> Based on your needs, **Nova Super** is the best fit.

Then show the relevant plan card already highlighted.

This creates a continuous flow:

**Need → Agent → Plan → Price → CTA**

rather than:

**Need → Browse agents → Browse pricing → Figure everything out
yourself**

------------------------------------------------------------------------

# 12. ROI Calculator

Keep the ROI calculator because it is one of the strongest conversion
tools in the redesign.

However, improve its presentation.

## Current issue

A calculator can easily look like a spreadsheet.

## New direction

Present it as:

### "What could Nova Echo be worth to your business?"

Inputs on the left.

Results on the right.

Primary result:

**Estimated Monthly ROI**

Secondary results:

-   potential revenue
-   estimated savings
-   recovered opportunities
-   equivalent staffing cost

Use the existing calculation logic.

Do not invent business results.

Make assumptions transparent.

------------------------------------------------------------------------

# 13. Competitive Benchmark

Keep the comparison section, but treat it as a decision-support
component.

## Default state

Show only the highest-value comparison criteria.

## Expanded state

Allow users to reveal the remaining comparisons.

This follows progressive disclosure.

### Design decision

> The benchmark contains many comparison points, but displaying every
> criterion immediately creates unnecessary cognitive load. The redesign
> surfaces the most decision-relevant information first and keeps the
> complete comparison available on demand.

Use restrained styling.

Avoid making every "Yes" or "No" a giant colored badge.

------------------------------------------------------------------------

# 14. Proof / Trust

The official site contains testimonials and business examples.

Use them strategically.

## Instead of a giant testimonial wall

Create:

### Proof by outcome

Example structure:

**Increase Lead Conversion**

Short testimonial.

Customer role/industry.

Supporting result if officially provided.

Then another:

**Retention Increased**

Short testimonial.

Customer role/industry.

This creates a narrative around business outcomes rather than simply
displaying quotes.

Only use real testimonials and verified results from the official site.

------------------------------------------------------------------------

# 15. Integrations

Nova Echo's official positioning emphasizes broad application
connectivity.

The redesign should communicate this without turning the section into a
logo dump.

## Better presentation

Show:

**Nova Echo Agent**

connected to:

CRM → Calendar → SMS → Email → Business Apps

Then provide a restrained integration grid underneath.

The visual should communicate:

> The AI doesn't just talk. It can take actions inside the systems your
> business already uses.

------------------------------------------------------------------------

# 16. How It Works

Keep the existing onboarding flow from the official site.

Structure:

### 01 --- Book Your Onboarding Call

Start the setup process.

### 02 --- Fill Out Your Intake

Provide business details and information needed to configure the agent.

### 03 --- Train Your AI Agent

Provide scripts and relevant sales-call material for training.

Keep this section simple.

Do not turn it into another complex card grid.

------------------------------------------------------------------------

# 17. CTA Strategy

The website currently has many opportunities to ask users to act.

The problem is not necessarily the number of CTAs.

The problem is CTA hierarchy.

## Primary CTA

**Book a Call**

## Secondary CTA

**Watch Demo**

## Contextual CTA

**Find My Best Fit**

## Agent CTA

**Explore Agent**

## Pricing CTA

**Get Started**

Every section should have one clear next action.

Avoid having several equally bright buttons competing within the same
viewport.

------------------------------------------------------------------------

# 18. Navigation

Navigation should reflect the user's decision journey.

Recommended structure:

-   Product
-   AI Agents
-   How It Works
-   Compare
-   Pricing

Right side:

**Watch Demo**

**Book a Call**

Avoid excessive navigation items.

The navbar should remain visually quiet.

------------------------------------------------------------------------

# 19. Typography

Typography should create a strong hierarchy before color does.

## Hierarchy

### H1

Large, high-impact, short.

### H2

Strong section statement.

### H3

Functional subsection heading.

### Body

Readable and restrained.

### Labels

Small uppercase or compact UI labels.

Avoid:

-   too many font weights
-   giant text everywhere
-   excessive letter spacing
-   gradient text on multiple headings

Use gradient text only if it creates meaningful hierarchy.

------------------------------------------------------------------------

# 20. Cards

Cards are currently one of the easiest ways for an AI website to become
visually repetitive.

## New card rules

Not every piece of content needs a card.

Use cards for:

-   plans
-   agents
-   product UI
-   structured comparisons
-   interactive tools

Use open layouts for:

-   editorial explanations
-   problem statements
-   testimonials
-   process sections
-   large marketing statements

This will immediately make the page feel more sophisticated.

------------------------------------------------------------------------

# 21. Section Rhythm

Create visual contrast between sections.

Recommended rhythm:

1.  Dark hero
2.  Neutral/dark product explanation
3.  Editorial problem section
4.  Product demo
5.  Agent section
6.  Recommendation tool
7.  Benchmark
8.  Integrations
9.  Pricing
10. ROI
11. Proof
12. How it works
13. Final CTA

Do not make every section visually identical.

A sophisticated SaaS site needs **rhythm**, not constant visual
intensity.

------------------------------------------------------------------------

# 22. Motion

Motion should reinforce hierarchy and interaction.

Use:

-   subtle entrance transitions
-   restrained hover states
-   smooth section transitions
-   product UI micro-interactions
-   calculator result transitions
-   agent selection states

Avoid:

-   constant floating animation
-   excessive glow pulses
-   everything moving on scroll
-   decorative animation with no semantic purpose

Rule:

> If the animation does not communicate state, hierarchy, or
> interaction, remove it.

------------------------------------------------------------------------

# 23. Accessibility

Do not sacrifice usability for visual identity.

Check:

-   text contrast
-   CTA contrast
-   focus states
-   keyboard navigation
-   reduced-motion behavior
-   readable font sizes
-   button hit areas
-   mobile spacing
-   gradient text contrast

The dark aesthetic should remain highly readable.

------------------------------------------------------------------------

# 24. Mobile Experience

The mobile version should not simply stack the desktop cards.

Priorities:

1.  Hero headline and CTA
2.  Product visualization
3.  Value proposition
4.  Agent selection
5.  Recommendation flow
6.  Pricing
7.  ROI calculator
8.  Proof
9.  Final CTA

For the agent and pricing sections, use:

-   horizontal scrolling where appropriate
-   collapsible details
-   sticky selection controls only when useful
-   progressive disclosure

Avoid making users scroll through massive feature lists.

------------------------------------------------------------------------

# 25. Content Integrity

Use the official Nova Echo website as the source of truth for product
claims.

Do not invent:

-   customer numbers
-   performance percentages
-   pricing
-   integrations
-   capabilities
-   testimonials
-   logos
-   conversion improvements
-   technical specifications

If a claim is used in the redesign, it should either:

1.  exist on the official source, or
2.  be clearly presented as conceptual/demo content.

This is especially important for a portfolio project.

------------------------------------------------------------------------

# 26. Recommended Improvement Priority

## P0 --- Must Fix

### 1. Hero

Make the value proposition immediately understandable.

### 2. Gradient usage

Reduce saturation and visual noise.

### 3. Agent selection

Make it obvious which agent solves which problem.

### 4. Plan recommendation

Help visitors identify the right plan instead of making them compare
everything.

### 5. CTA hierarchy

Create one clear primary conversion path.

------------------------------------------------------------------------

## P1 --- High Impact

### 6. Product visualization

Replace generic decorative visuals with meaningful AI call/product UI.

### 7. Problem → solution narrative

Connect Nova Echo's capabilities directly to business pain.

### 8. Pricing hierarchy

Make plan differences easier to understand.

### 9. ROI calculator

Present the calculator as a business decision tool rather than a form.

### 10. Competitive benchmark

Use progressive disclosure and stronger information hierarchy.

------------------------------------------------------------------------

## P2 --- Polish

### 11. Typography refinement

### 12. Card reduction

### 13. Motion refinement

### 14. Mobile optimization

### 15. Accessibility

### 16. Trust/proof presentation

------------------------------------------------------------------------

# 27. Final Design Principle

The redesign should not try to look "more AI."

It should look **more credible, more intentional, and easier to buy
from.**

The visual system should communicate:

**Premium** without looking expensive for the sake of looking expensive.

**Technical** without looking like a developer dashboard.

**Modern** without relying on generic AI gradients.

**Confident** without filling every section with marketing hype.

The final experience should feel like:

> **A mature AI SaaS company that knows exactly what its product does
> and exactly how to help a customer choose it.**

------------------------------------------------------------------------

# 28. Case Study Design Decisions to Document

For the portfolio case study, focus on 5--6 major decisions rather than
documenting every small UI change.

Recommended decisions:

### Decision 01 --- Clarify the value proposition

**Problem:** The product's capabilities are broad and can be difficult
to understand immediately.

**Reasoning:** Visitors need to understand the business value before
exploring technical capabilities.

**Outcome:** A more focused hero and product narrative.

### Decision 02 --- Reduce visual noise

**Problem:** Heavy gradient usage can make the interface feel generic
and less credible.

**Reasoning:** Nova Echo already has a strong color identity; the issue
is usage, not lack of color.

**Outcome:** Brand colors become controlled accents rather than constant
decoration.

### Decision 03 --- Organize around jobs-to-be-done

**Problem:** Users need to understand which AI agent is relevant to
their business.

**Reasoning:** Organizing by customer problem is easier to understand
than organizing by technical features.

**Outcome:** A clearer agent-selection experience.

### Decision 04 --- Guide plan selection

**Problem:** Multiple plans create decision fatigue.

**Reasoning:** A recommendation layer can connect business needs, usage,
and support requirements to the most relevant plan.

**Outcome:** Users receive a clear recommended setup instead of
comparing every plan manually.

### Decision 05 --- Turn ROI into a decision tool

**Problem:** Pricing alone does not communicate business value.

**Reasoning:** ROI gives users a way to evaluate the product against
their own business context.

**Outcome:** A more concrete path from product interest to purchase
consideration.

### Decision 06 --- Design for credibility

**Problem:** Heavy effects and excessive card-based layouts can make AI
products feel interchangeable.

**Reasoning:** Mature SaaS products rely on hierarchy, restraint, proof,
and meaningful product visuals.

**Outcome:** A cleaner visual system that feels more established while
preserving Nova Echo's brand identity.

------------------------------------------------------------------------

# 29. Definition of Done

The redesign is ready when:

-   The hero explains Nova Echo within seconds.
-   The hero has one dominant visual focal point.
-   Gradients are controlled and intentional.
-   No section feels visually overloaded.
-   Users can understand the three core product value pillars.
-   Users can identify which agent is relevant to their problem.
-   Users can receive a recommended plan.
-   Pricing differences are immediately understandable.
-   ROI is easy to use and easy to interpret.
-   Benchmark information is scannable.
-   Proof is connected to business outcomes.
-   CTAs have a clear hierarchy.
-   Mobile does not feel like a compressed desktop.
-   Every major product claim can be traced to Nova Echo's source
    content.
-   The overall interface feels like a mature AI SaaS product rather
    than a generic AI landing-page template.
