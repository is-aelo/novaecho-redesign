"use client";

import AgentWindow from "@/components/hero/AgentWindow";
import useVoiceCall from "@/components/hero/useVoiceCall";

export default function Agents() {
  const call = useVoiceCall();

  return (
    <section id="solutions" className="w-full px-6 py-16 bg-surface-50 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Your Agents to <span className="hero-text-highlight">Success</span>
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Three specialized AI agents — each one sounds, thinks, and responds like a real person.
          </p>
        </div>

        <div className="relative z-0 mt-8 lg:mt-10">
          <AgentWindow call={call} />
        </div>
      </div>
    </section>
  );
}
