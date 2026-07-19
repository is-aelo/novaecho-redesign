"use client";

import {
  UserCircle,
  Rocket,
  Phone,
  ArrowRight,
} from "@phosphor-icons/react/ssr";
import { useRoiModal } from "@/contexts/RoiContext";

const agents = [
  {
    title: "Receptionist",
    body: "Greet clients, answer questions, fill forms, and schedule appointments — all through natural conversation.",
    icon: UserCircle,
  },
  {
    title: "Speed-to-Lead",
    body: "Call leads within 60 seconds, deliver a dynamic pitch, and instantly transfer hot prospects or book appointments.",
    icon: Rocket,
  },
  {
    title: "Mass Outbound Calling",
    body: "Upload your opt-in leads and let your agent call every lead, pitch them, and hand off hot prospects.",
    icon: Phone,
  },
];

export default function Agents() {
  const { openRoi } = useRoiModal();

  return (
    <section id="solutions" className="w-full px-6 py-16 bg-surface-50 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Your Agents to <span className="hero-text-highlight">Success</span>
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Three specialized AI agents — each one sounds, thinks, and responds like a real person.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3">
          {agents.map((agent) => {
            const Icon = agent.icon;

            return (
              <article
                key={agent.title}
                className="flex flex-col gap-3 border border-surface-200 bg-surface-100 rounded-md p-6 md:p-8 text-left min-h-45"
              >
                <div className="flex items-center justify-start">
                  <Icon className="text-accent-cyan" size={24} weight="duotone" />
                </div>
                <h3 className="font-bold text-body-sm md:text-body-md text-text-primary-light">
                  {agent.title}
                </h3>
                <p className="text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
                  {agent.body}
                </p>
                <button
                  onClick={() => openRoi(agent.title)}
                  className="mt-auto inline-flex items-center gap-2 text-caption md:text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-magenta"
                >
                  Calculate ROI
                  <ArrowRight size={16} weight="bold" />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
