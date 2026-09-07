"use client";

import { useState, useRef, useEffect } from "react";
import { CheckCircle, CaretDown } from "@phosphor-icons/react/ssr";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  const initialized = useRef(false);

  const toggleFeatures = (name: string) => {
    setExpandedPlans((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const priceAnim = useRef(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#pricing",
      start: "top 80%",
      once: true,
      onEnter: () => {
        priceAnim.current = true;
        const el = document.querySelector("[data-price='nova-light']");
        if (!el) return;
        el.textContent = "$125";
        const cents = { val: 12500 };
        gsap.to(cents, {
          val: 9900,
          duration: 0.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = `$${(cents.val / 100).toFixed(0)}`;
          },
        });
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      if (!window.matchMedia("(min-width: 1024px)").matches) {
        gsap.set("[data-toggle]", {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          y: -4,
          overflow: "hidden",
        });
      }
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia("(min-width: 1024px)").matches) return;
    document.querySelectorAll<HTMLElement>("[data-plan]").forEach((card) => {
      const name = card.getAttribute("data-plan");
      if (!name) return;
      const isExpanded = expandedPlans.includes(name);
      const toggles = card.querySelectorAll<HTMLElement>("[data-toggle]");
      if (isExpanded) {
        gsap.to(toggles, {
          opacity: 1,
          height: "auto",
          marginTop: 0,
          marginBottom: 0,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out",
          clearProps: "overflow",
        });
      } else {
        gsap.to(toggles, {
          opacity: 0,
          height: 0,
          marginTop: 0,
          marginBottom: 0,
          y: -4,
          overflow: "hidden",
          duration: 0.3,
          ease: "power2.in",
        });
      }
    });
  }, [expandedPlans]);

  return (
    <section id="pricing" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
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
              data-plan={plan.name}
              className={`relative flex h-full flex-col border text-left rounded-md ${
                plan.popular
                  ? "border-accent-purple/30 bg-surface-950 shadow-glow py-10 px-6 lg:px-8"
                  : "border-surface-700/30 bg-white p-6 lg:p-8"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-caption font-semibold uppercase tracking-wider text-accent-purple bg-surface-950 border border-accent-purple/30 rounded-sm">
                  Popular
                </span>
              )}

              <p className={`font-semibold text-body-md lg:text-body-lg ${plan.popular ? "text-text-primary" : "text-text-primary-light"}`}>
                {plan.name}
              </p>

              <div className="mt-2 flex items-baseline gap-1">
                <span
                  {...(plan.name === "Nova Light" ? { "data-price": "nova-light" } : {})}
                  className={`font-display text-display-lg font-bold leading-none tabular-nums ${plan.popular ? "text-text-primary" : "text-text-primary-light"}`}
                >
                  {plan.price}
                </span>
                <span className={`text-body-sm ${plan.popular ? "text-text-secondary" : "text-text-secondary-light"}`}>
                  {plan.period}
                </span>
              </div>

              <p className={`mt-1 text-body-sm ${plan.popular ? "text-text-secondary" : "text-text-secondary-light"}`}>
                {plan.users}
              </p>

              <div className={`mt-6 space-y-1 border-t pt-4 ${plan.popular ? "border-surface-700/50" : "border-surface-200"}`}>
                <p className={`text-caption font-semibold uppercase tracking-wider ${plan.popular ? "text-text-secondary/60" : "text-text-secondary-light/60"}`}>
                  Call Rates
                </p>
                {plan.rates.map((rate) => (
                  <div key={rate.label} className="flex items-center justify-between">
                    <span className={`text-body-sm ${plan.popular ? "text-text-secondary" : "text-text-secondary-light"}`}>
                      {rate.label}
                    </span>
                    <span className={`text-body-sm font-semibold ${plan.popular ? "text-accent-purple" : "text-surface-700"}`}>
                      {rate.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className={`mt-6 flex flex-1 flex-col ${plan.popular ? "text-text-secondary" : "text-text-secondary-light"}`}>
                <ul className="flex flex-col gap-2">
                  {plan.features.map((feature, i) => (
                    <li
                      key={feature}
                      {...(i >= INITIAL_FEATURES ? { "data-toggle": "" } : {})}
                      className="flex items-start gap-2 text-caption lg:flex"
                    >
                      <CheckCircle size={14} weight="fill" className={`mt-0.5 shrink-0 ${plan.popular ? "text-accent-purple" : "text-surface-700"}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.features.length > INITIAL_FEATURES && (
                  <button
                    onClick={() => toggleFeatures(plan.name)}
                    className={`mt-2 self-center flex items-center justify-center gap-1 text-caption font-medium transition-colors lg:hidden ${
                      plan.popular ? "text-accent-purple hover:text-accent-magenta" : "text-surface-700 hover:text-surface-800"
                    }`}
                  >
                    {expandedPlans.includes(plan.name) ? "Show less" : `Show all ${plan.features.length} features`}
                    <CaretDown size={12} weight="bold" className={`transition-transform ${expandedPlans.includes(plan.name) ? "rotate-180" : ""}`} />
                  </button>
                )}
              </div>

              {plan.popular ? (
                <a href="#" className="mt-8 w-full btn-primary whitespace-nowrap text-caption md:text-body-sm">{plan.cta}</a>
              ) : (
                <a href="#" className="mt-8 w-full border border-surface-700/30 px-6 py-2.5 text-caption md:text-body-sm font-semibold text-text-primary-light text-center whitespace-nowrap transition-all hover:border-surface-700/60 rounded-btn">{plan.cta}</a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <article className="relative flex h-full flex-col border border-surface-700/30 bg-white rounded-md p-6 lg:p-8 text-left">
            <p className="font-semibold text-body-md lg:text-body-lg text-text-primary-light">Done For You Setup</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-display-sm font-semibold leading-none text-text-primary-light">Custom Quote</span>
            </div>
            <p className="mt-3 text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
              Our team of experts work hands-on with you to optimize your voice AI employees by developing custom prompts, workflows, and integrations tailored to your specific business needs.
            </p>

            <ul className="mt-6 flex flex-col gap-2 text-text-secondary-light">
              {[
                "Advanced prompt engineered scripting",
                "Appointment booking & live transfer setup",
                "Support question handling optimization",
                "Objection handling optimization",
                "CRM integration setup",
                "Custom automation development: SMS, email, voicemail, summaries, quotes, and more",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-caption">
                  <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-surface-700" />
                  {item}
                </li>
              ))}
            </ul>
          </article>

            <article className="relative flex h-full flex-col border border-surface-700/30 bg-white rounded-md p-6 lg:p-8 text-left">
            <p className="font-semibold text-body-md lg:text-body-lg text-text-primary-light">Nova Enterprise</p>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="font-display text-display-sm font-semibold leading-none text-text-primary-light">Custom Quote</span>
            </div>
            <p className="mt-3 text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
              Enterprise-grade solution with volume discounts, custom development, dedicated support, and compliance features for large organizations.
            </p>

            <ul className="mt-6 flex flex-1 flex-col gap-2 text-text-secondary-light">
              {[
                "Done-for-you setup included",
                "Custom development & complex integrations",
                "#1 priority support & dedicated CSM",
                "Minute volume discounts",
                "Brand guideline, AI ethics, and voice AI governance consultation",
                "Detailed compliance features & prompt guardrail creation to ensure your AI employees represent your brand perfectly",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-caption">
                  <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-surface-700" />
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://api.leadconnectorhq.com/widget/booking/eWxaTEEvKvievf4MpUhs"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full btn-primary whitespace-nowrap text-caption md:text-body-sm"
            >
              Contact Enterprise Sales
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
