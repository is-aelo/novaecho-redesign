"use client";

import { useState } from "react";
import { CheckCircle, CaretDown } from "@phosphor-icons/react/ssr";

const plans = [
  {
    name: "Nova Light",
    price: "$99",
    period: "/mo",
    users: "1 User",
    rates: [
      { label: "Inbound", value: "$0.25/min" },
      { label: "Outbound", value: "$0.25/min" },
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
    popular: false,
  },
  {
    name: "Nova Super",
    price: "$333",
    period: "/mo",
    users: "3 Users",
    rates: [
      { label: "Inbound", value: "$0.20/min" },
      { label: "Outbound", value: "$0.15/min" },
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
    popular: true,
  },
  {
    name: "Nova Hyper",
    price: "$1,299",
    period: "/mo",
    users: "Unlimited Users",
    rates: [
      { label: "Inbound", value: "$0.18/min" },
      { label: "Outbound", value: "$0.13/min" },
    ],
    features: [
      "Everything in Super",
      "Unlimited Users",
      "2x Monthly Performance Consultations",
      "Prompt Review and Optimizations",
      "Priority Support",
    ],
    cta: "Get Started with Nova Hyper",
    popular: false,
  },
];

const INITIAL_FEATURES = 4;

export default function Pricing() {
  const [expandedPlans, setExpandedPlans] = useState<string[]>([]);

  const toggleFeatures = (name: string) => {
    setExpandedPlans((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };
  return (
    <section id="pricing" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Pricing
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Simple, transparent pricing. Scale as you grow.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col border text-left ${
                plan.popular
                  ? "border-accent-cyan/40 bg-surface-950 shadow-glow py-10 px-8"
                  : "border-surface-200 bg-surface-100 p-8"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-caption font-bold uppercase tracking-widest text-accent-cyan bg-surface-950 border border-accent-cyan/40">
                  Popular
                </span>
              )}

              <p className={`font-bold text-body-lg ${
                plan.popular ? "text-text-primary" : "text-text-primary-light"
              }`}>
                {plan.name}
              </p>

              <div className="mt-2 flex items-baseline gap-1">
                <span className={`font-display text-display-lg font-bold leading-none ${
                  plan.popular ? "text-text-primary" : "text-text-primary-light"
                }`}>
                  {plan.price}
                </span>
                <span className={`text-body-sm ${
                  plan.popular ? "text-text-secondary" : "text-text-secondary-light"
                }`}>
                  {plan.period}
                </span>
              </div>

              <p className={`mt-1 text-body-sm ${
                plan.popular ? "text-text-secondary" : "text-text-secondary-light"
              }`}>
                {plan.users}
              </p>

              <div className={`mt-6 space-y-1 border-t pt-4 ${
                plan.popular ? "border-surface-700/50" : "border-surface-200"
              }`}>
                <p className={`text-caption font-semibold uppercase tracking-wider ${
                  plan.popular ? "text-text-secondary/60" : "text-text-secondary-light/60"
                }`}>
                  Call Rates
                </p>
                {plan.rates.map((rate) => (
                  <div key={rate.label} className="flex items-center justify-between">
                    <span className={`text-body-sm ${
                      plan.popular ? "text-text-secondary" : "text-text-secondary-light"
                    }`}>
                      {rate.label}
                    </span>
                    <span className="text-body-sm font-semibold text-accent-cyan">
                      {rate.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`mt-6 flex flex-1 flex-col ${
                plan.popular ? "text-text-secondary" : "text-text-secondary-light"
              }`}>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-caption ${
                        i >= INITIAL_FEATURES && !expandedPlans.includes(plan.name)
                          ? "hidden lg:flex"
                          : ""
                      }`}
                    >
                      <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-accent-cyan" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.features.length > INITIAL_FEATURES && (
                  <button
                    onClick={() => toggleFeatures(plan.name)}
                    className="mt-2 flex items-center gap-1 text-caption font-medium text-accent-cyan transition-colors hover:text-accent-sky lg:hidden"
                  >
                    {expandedPlans.includes(plan.name)
                      ? "Show less"
                      : `Show all ${plan.features.length} features`}
                    <CaretDown
                      size={12}
                      weight="bold"
                      className={`transition-transform ${
                        expandedPlans.includes(plan.name) ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                )}
              </div>

              {plan.popular ? (
                <a
                  href="#"
                  className="mt-8 self-center whitespace-nowrap btn-primary"
                >
                  {plan.cta}
                </a>
              ) : (
                <a
                  href="#"
                  className="mt-8 self-center whitespace-nowrap border border-surface-700/30 px-6 py-2.5 text-body-sm font-semibold text-text-primary-light transition-all hover:border-surface-700/60"
                >
                  {plan.cta}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
