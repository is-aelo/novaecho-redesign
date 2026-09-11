"use client";

import { useState } from "react";
import { CheckCircle, ArrowRight, CaretDown } from "@phosphor-icons/react/ssr";

type Rate = { label: string; value: string };

type Plan = {
  key: string;
  name: string;
  short: string;
  stage: string;
  price: string;
  period: string;
  users: string;
  bestFor: string;
  rates: Rate[];
  differentiator: string;
  plus: string[];
  features: string[];
  cta: string;
  recommended?: boolean;
};

type CustomSolution = {
  key: string;
  label: string;
  price: string;
  headline: string;
  description: string;
  tags: string[];
  cta: string;
  href: string;
  external?: boolean;
  detailsTitle: string;
  details: string[];
};

const plans: Plan[] = [
  {
    key: "light",
    name: "Nova Light",
    short: "Light",
    stage: "Start",
    price: "$99",
    period: "/mo",
    users: "1 User",
    bestFor: "Businesses getting started with AI.",
    rates: [
      { label: "Inbound", value: "$0.25/min" },
      { label: "Outbound", value: "$0.25/min" },
    ],
    differentiator: "Core AI capabilities",
    plus: [
      "Unlimited Contacts",
      "Unlimited Concurrent Calls",
      "Outbound Campaigns",
      "Nova University (10+ Agent Creation Lessons)",
    ],
    features: [
      "Unlimited Contacts",
      "Unlimited Concurrent Calls",
      "Outbound Campaigns",
      "Nova University (10+ Agent Creation Lessons)",
      "Weekly Group Support Calls",
      "API Access & Integrations",
      "Advanced V2 Voice Models",
      "Appointment Booking",
      "Live Call Transferring",
      "Call History & Analytics",
      "Form Collection & Summaries",
      "Agent Guardrail Customization",
      "Full CRM System",
    ],
    cta: "Get Started with Nova Light",
  },
  {
    key: "super",
    name: "Nova Super",
    short: "Super",
    stage: "Scale",
    price: "$333",
    period: "/mo",
    users: "3 Users",
    bestFor: "Growing teams ready to put more AI to work.",
    rates: [
      { label: "Inbound", value: "$0.20/min" },
      { label: "Outbound", value: "$0.15/min" },
    ],
    differentiator: "Everything in Light, plus:",
    plus: [
      "White-Glove Onboarding",
      "Private Slack Channel",
      "Personal Account Manager",
      "7 Day/Week Support",
    ],
    features: [
      "Everything in Light",
      "3 Users",
      "White-Glove Onboarding",
      "Private Slack Channel",
      "Personal Account Manager",
      "7 Day/Week Support",
    ],
    cta: "Get Started with Nova Super",
    recommended: true,
  },
  {
    key: "hyper",
    name: "Nova Hyper",
    short: "Hyper",
    stage: "Expand",
    price: "$1,299",
    period: "/mo",
    users: "Unlimited Users",
    bestFor: "Businesses ready to make AI a core part of their sales operation.",
    rates: [
      { label: "Inbound", value: "$0.18/min" },
      { label: "Outbound", value: "$0.13/min" },
    ],
    differentiator: "Everything in Super, plus:",
    plus: [
      "2x Monthly Performance Consultations",
      "Prompt Review & Optimization",
      "Priority Support",
    ],
    features: [
      "Everything in Super",
      "Unlimited Users",
      "2x Monthly Performance Consultations",
      "Prompt Review and Optimizations",
      "Priority Support",
    ],
    cta: "Get Started with Nova Hyper",
  },
];

const customSolutions: CustomSolution[] = [
  {
    key: "setup",
    label: "Done for You Setup",
    price: "Custom Quote",
    headline: "We build it with you.",
    description:
      "Let the Nova Echo team build and optimize your AI workforce around your business — from prompts and workflows to integrations and automation.",
    tags: ["Prompt Engineering", "Workflow Design", "CRM Integration", "Automation Setup"],
    cta: "Talk to an Expert",
    href: "#",
    detailsTitle: "View setup details",
    details: [
      "Advanced prompt engineered scripting",
      "Appointment booking & live transfer setup",
      "Support question handling optimization",
      "Objection handling optimization",
      "CRM integration setup",
      "Custom automation development: SMS, email, voicemail, summaries, quotes, and more",
    ],
  },
  {
    key: "enterprise",
    label: "Nova Enterprise",
    price: "Custom Quote",
    headline: "Built around your organization.",
    description:
      "An enterprise-grade AI solution for organizations that need higher volume, custom development, dedicated support, and governance.",
    tags: ["Custom Development", "Dedicated Support", "Volume Pricing", "AI Governance"],
    cta: "Contact Enterprise Sales",
    href: "https://api.leadconnectorhq.com/widget/booking/eWxaTEEvKvievf4MpUhs",
    external: true,
    detailsTitle: "View enterprise details",
    details: [
      "Done-for-you setup included",
      "Custom development & complex integrations",
      "#1 priority support & dedicated CSM",
      "Minute volume discounts",
      "Brand guideline, AI ethics, and voice AI governance consultation",
      "Detailed compliance features & prompt guardrail creation to ensure your AI employees represent your brand appropriately",
    ],
  },
];

type PlanBodyOptions = {
  isOpen: boolean;
  onToggle: (key: string) => void;
  animateRates?: boolean;
};

function renderPlanBody(
  plan: Plan,
  { isOpen, onToggle, animateRates = false }: PlanBodyOptions
) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className="font-mono text-caption font-semibold uppercase tracking-wider text-text-secondary-light/70">
          {plan.stage}
        </span>
        {plan.recommended && (
          <span className="inline-flex items-center rounded-sm border border-accent-purple/40 px-2 py-0.5 font-mono text-caption font-semibold uppercase tracking-wider text-accent-purple">
            Recommended
          </span>
        )}
      </div>

      <h3
        className={`mt-5 font-display text-body-lg tracking-tight ${
          plan.recommended ? "font-semibold" : "font-medium"
        } text-text-primary-light`}
      >
        {plan.name}
      </h3>

      <div className="mt-2 flex items-baseline gap-1">
        <span
        className={`font-display leading-none tracking-tight tabular-nums ${
          plan.recommended
            ? "text-display-lg font-bold"
            : "text-display-md font-semibold"
        } text-text-primary-light`}
      >
          {plan.price}
        </span>
        <span className="text-body-sm text-text-secondary-light">{plan.period}</span>
      </div>

      <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary-light/70">
        {plan.users}
      </p>

      <p className="mt-3 text-body-sm leading-relaxed text-text-secondary-light">
        {plan.bestFor}
      </p>

      <div className="mt-6 border-t border-surface-200 pt-3">
        <p className="text-caption font-medium uppercase tracking-wider text-text-secondary-light/60">
          Call Rates
        </p>
        <div className="mt-1">
          {plan.rates.map((rate, i) => (
            <div key={rate.label} className="flex items-baseline justify-between py-1">
              <span className="text-caption text-text-secondary-light">{rate.label}</span>
              <span
                className={`font-mono text-body-sm font-semibold tabular-nums text-text-primary-light ${
                  animateRates ? "price-rate-in" : ""
                }`}
                style={animateRates ? { animationDelay: `${i * 60}ms` } : undefined}
              >
                {rate.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6 mt-6 border-t border-surface-200 pt-4">
        <p className="text-body-sm font-medium text-text-primary-light">
          {plan.differentiator}
        </p>
        {plan.plus.length > 0 && (
          <ul className="mt-3 space-y-2">
            {plan.plus.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-body-sm leading-relaxed text-text-secondary-light"
              >
                <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-accent-purple" />
                {feature}
              </li>
            ))}
          </ul>
        )}
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`features-${plan.key}`}
          onClick={() => onToggle(plan.key)}
          className="mt-4 inline-flex items-center gap-1 text-caption font-medium text-accent-purple transition-opacity hover:opacity-80"
        >
          {isOpen ? "Hide features" : "View all features"}
          <ArrowRight size={12} weight="bold" className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
        </button>
        <div id={`features-${plan.key}`} className={`collapsible-grid ${isOpen ? "is-open" : ""}`}>
          <div>
            <ul className="mt-4 space-y-2 border-t border-surface-200 pt-4">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-caption leading-relaxed text-text-secondary-light"
                >
                  <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-accent-purple" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a
        href="#"
        className={`mt-auto w-full whitespace-nowrap text-caption md:text-body-sm ${
          plan.recommended
            ? "btn-primary"
            : "flex w-full items-center justify-center rounded-btn border border-surface-700/30 px-6 py-2.5 font-semibold text-text-primary-light transition-colors hover:border-surface-700/60"
        }`}
      >
        {plan.cta}
      </a>
    </>
  );
}

export default function Pricing() {
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState<string[]>([]);

  const toggle = (key: string) =>
    setOpen((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  return (
    <section id="pricing" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Start with AI. Scale without limits.
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Choose the level of support and capacity your business needs today. Upgrade
            as your AI operation grows.
          </p>
        </div>

        <div className="mt-5 hidden lg:mt-6 lg:grid lg:grid-cols-3 lg:gap-6">
          {plans.map((plan) => (
            <article
              key={plan.key}
              className={`flex flex-col transition-colors ${
                plan.recommended
                  ? "relative rounded-md border border-accent-purple/30 bg-white px-8 py-12 lg:-my-6"
                  : "rounded-md border border-surface-200 p-8 hover:bg-surface-100/40"
              }`}
            >
              {renderPlanBody(plan, {
                isOpen: open.includes(plan.key),
                onToggle: toggle,
              })}
            </article>
          ))}
        </div>

        <div className="mt-5 lg:hidden lg:mt-6">
          <div className="flex gap-1 overflow-hidden rounded-sm border border-surface-200 bg-white p-1">
            {plans.map((plan, i) => (
              <button
                key={plan.key}
                type="button"
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                className={`flex flex-1 flex-col items-center justify-center gap-1 px-3 py-2 font-mono text-caption font-semibold uppercase tracking-wider transition-colors ${
                  selected === i
                    ? "bg-surface-950 text-text-primary"
                    : "text-text-secondary-light hover:bg-surface-100 hover:text-text-primary-light"
                }`}
              >
                {plan.short}
                {plan.recommended && (
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent-purple" />
                )}
              </button>
            ))}
          </div>

          <div
            key={selected}
            data-price-panel
            className="price-panel-in mt-4 rounded-md border border-surface-200 bg-white p-6"
          >
            {renderPlanBody(plans[selected], {
              isOpen: open.includes(plans[selected].key),
              onToggle: toggle,
              animateRates: true,
            })}
          </div>
        </div>

        <div className="mt-16 rounded-md border border-surface-200 bg-surface-100 p-6 md:p-8 lg:mt-24">
          <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
            Need More Than a Standard Plan?
          </p>
          <p className="mt-2 max-w-2xl text-body-sm md:text-body-md leading-relaxed text-text-secondary-light">
            Get hands-on implementation or a custom enterprise setup built around your
            specific requirements.
          </p>

          <div className="mt-8 flex flex-col">
            {customSolutions.map((solution, i) => {
              const isOpen = open.includes(solution.key);
              return (
                <article
                  key={solution.key}
                  className={`flex flex-col gap-4 border-t border-surface-200 pt-6 lg:flex-row lg:gap-0 lg:pt-8 ${
                    i > 0 ? "mt-8 lg:mt-10" : ""
                  }`}
                >
                  <div className="lg:w-44 lg:shrink-0 lg:pr-8">
                    <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/70">
                      {solution.label}
                    </p>
                    <p className="mt-2 font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
                      {solution.price}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-display-xs font-semibold tracking-tight text-text-primary-light">
                      {solution.headline}
                    </h3>
                    <p className="mt-2 text-body-sm leading-relaxed text-text-secondary-light">
                      {solution.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {solution.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-sm border border-surface-200 bg-white px-2.5 py-1 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
                      <a
                        href={solution.href}
                        {...(solution.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="nudge-horizontal inline-flex items-center gap-1 font-body text-body-sm font-semibold text-accent-purple"
                      >
                        {solution.cta}
                        <ArrowRight size={14} weight="bold" />
                      </a>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`${solution.key}-details`}
                        onClick={() => toggle(solution.key)}
                        className="inline-flex items-center gap-1 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light transition-colors hover:text-text-primary-light"
                      >
                        {isOpen ? "Hide details" : solution.detailsTitle}
                        <CaretDown
                          size={12}
                          weight="bold"
                          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    <div
                      id={`${solution.key}-details`}
                      className={`collapsible-grid ${isOpen ? "is-open" : ""}`}
                    >
                      <div>
                        <ul className="mt-4 space-y-2 border-t border-surface-200 pt-4">
                          {solution.details.map((detail) => (
                            <li
                              key={detail}
                              className="flex items-start gap-2 text-caption leading-relaxed text-text-secondary-light"
                            >
                              <CheckCircle
                                size={14}
                                weight="fill"
                                className="mt-0.5 shrink-0 text-accent-purple"
                              />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}