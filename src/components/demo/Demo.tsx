"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, CaretDown, Check, Phone } from "@phosphor-icons/react";
import AgentProfile from "./AgentProfile";
import { AGENTS, VOICES, type AgentChoice } from "./agents";
import useBuildAgent, { type BuildAgentState, type FormField } from "./useBuildAgent";
import { useRoiModal } from "@/contexts/RoiContext";

const inputClass =
  "w-full rounded-sm border border-surface-200 bg-white px-3 py-2.5 font-body text-body-sm text-text-primary-light placeholder:text-text-secondary-light/30 outline-none transition-colors focus:border-accent-purple";

function FieldLabel({ children }: { children: string }) {
  return (
    <span className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/60">
      {children}
    </span>
  );
}

function VoiceSelect({ builder }: { builder: BuildAgentState }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selected = VOICES.find((v) => v.value === builder.voice);

  return (
    <div ref={containerRef} className="relative flex flex-col gap-2">
      <FieldLabel>Choose your agent&apos;s voice</FieldLabel>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full items-center justify-between rounded-sm border border-surface-200 bg-white px-3 py-2.5 text-left transition-colors ${
          selected ? "text-text-primary-light" : "text-text-secondary-light/30"
        }`}
      >
        <span className="font-body text-body-sm">{selected ? selected.label : "Choose a voice"}</span>
        <CaretDown
          size={14}
          className={`shrink-0 text-text-secondary-light/40 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Agent voice"
          className="absolute left-0 right-0 top-full z-10 mt-1 rounded-sm border border-surface-200 bg-white py-1"
        >
          {VOICES.map((v) => (
            <li key={v.value} role="option" aria-selected={builder.voice === v.value}>
              <button
                type="button"
                onClick={() => {
                  builder.selectVoice(v.value);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2.5 text-left font-body text-body-sm transition-colors hover:bg-surface-100 ${
                  builder.voice === v.value ? "text-accent-purple" : "text-text-primary-light"
                }`}
              >
                <Check
                  size={14}
                  weight="bold"
                  className={`shrink-0 ${builder.voice === v.value ? "opacity-100" : "opacity-0"}`}
                />
                {v.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function BuildAgentPanel({
  builder,
  onSubmit,
  onSelectAgent,
}: {
  builder: BuildAgentState;
  onSubmit: () => void;
  onSelectAgent: (agent: AgentChoice) => void;
}) {
  const selected = AGENTS.find((entry) => entry.id === builder.agent) ?? null;
  const voice = VOICES.find((v) => v.value === builder.voice);
  const divisor = builder.step === "done" ? 3 : builder.step;
  const progress = `${Math.round((divisor / 3) * 100)}%`;
  const progressLabel = builder.step === "done" ? "03 / 03" : `0${builder.step} / 03`;

  const field = (label: string, name: FormField, placeholder: string, type = "text", optional = false) => (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline gap-2">
        <FieldLabel>{label}</FieldLabel>
        {optional && <span className="font-body text-caption text-text-secondary-light/40">optional</span>}
      </span>
      <input
        type={type}
        value={builder[name]}
        onChange={(e) => builder.updateField(name, e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </label>
  );

  return (
    <div className="rounded-md border border-surface-200 bg-surface-100 p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-mono text-caption font-semibold uppercase tracking-wider text-text-primary-light">
          Build your agent
        </p>
        <p className="font-mono text-caption tabular-nums text-text-secondary-light/60" aria-live="polite">
          {progressLabel}
        </p>
      </div>
      <p className="mt-1 text-caption leading-relaxed text-text-secondary-light">
        Tell us a little about what you need. We&apos;ll take it from there.
      </p>

      <div className="mt-4 h-0.5 w-full bg-surface-200">
        <div
          className="h-0.5 bg-accent-purple transition-[width] duration-300 ease-out"
          style={{ width: progress }}
        />
      </div>

      <div key={builder.step} className="demo-step-in mt-6">
        {builder.step === 1 && (
          <>
            <div className="pb-5">
              <VoiceSelect builder={builder} />
            </div>
            <FieldLabel>What should your AI agent do?</FieldLabel>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {AGENTS.map((agent) => (
                <button
                  key={agent.id}
                  type="button"
                  aria-pressed={builder.agent === agent.id}
                  onClick={() => {
                    onSelectAgent(agent.id);
                    builder.selectAgent(agent.id);
                  }}
                  className={`rounded-md border p-4 text-left transition-colors ${
                    builder.agent === agent.id
                      ? "border-accent-purple bg-white"
                      : "border-surface-200 bg-white hover:border-surface-700/40"
                  }`}
                >
                  <span className="font-display text-body-md font-semibold text-text-primary-light">
                    {agent.short}
                  </span>
                  <span className="mt-1 block font-mono text-caption text-text-secondary-light/70">
                    {agent.blurb}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 font-mono text-caption text-text-secondary-light/50">
              Pick an agent, then press Continue.
            </p>
          </>
        )}

        {builder.step === 2 && (
          <>
            <FieldLabel>Tell us about your business</FieldLabel>
            <div className="mt-4 flex flex-col gap-4">
              {field("Full name", "fullName", "Jane Reyes")}
              {field("Email", "email", "you@company.com", "email")}
              {field("Company", "company", "Your company name")}
              {field("Phone number", "phone", "+1 (555) 000-0000", "tel", true)}
            </div>
          </>
        )}

        {builder.step === 3 && (
          <>
            <FieldLabel>What should your agent handle?</FieldLabel>
            <label className="mt-4 flex flex-col gap-2">
              <textarea
                rows={8}
                value={builder.instructions}
                onChange={(e) => builder.updateField("instructions", e.target.value)}
                placeholder="Describe the calls, questions, or tasks you want your agent to handle."
                className={`${inputClass} resize-none`}
              />
            </label>
            <p className="mt-2 font-body text-caption leading-relaxed text-text-secondary-light/60">
              You don&apos;t need to write a perfect prompt. Just describe what you want your agent to do.
            </p>
          </>
        )}

        {builder.step === "done" && (
          <div aria-live="polite">
            <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
              Agent build received
            </p>
            <p className="mt-3 font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
              A demo call is on the way.
            </p>
            <div className="mt-3 flex items-start gap-3 rounded-md border border-accent-purple/30 bg-accent-purple/5 px-4 py-3">
              <Phone size={18} weight="fill" className="mt-0.5 shrink-0 text-accent-purple" />
              <p className="font-body text-caption leading-relaxed text-text-secondary-light">
                Your {selected ? selected.role.toUpperCase() : "agent"} will ring you soon to
                demo how it handles real calls{voice ? ` in the ${voice.label} voice` : ""},
                using the details and prompt you entered{builder.email ? ` at ${builder.email}` : ""}.
              </p>
            </div>
            <button
              type="button"
              onClick={builder.reset}
              className="mt-4 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light transition-colors hover:text-text-primary-light"
            >
              Start over
            </button>
          </div>
        )}
      </div>

      {builder.step !== "done" && (
        <>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-surface-200 pt-5">
            {builder.step === 1 ? (
              <span aria-hidden="true" />
            ) : (
              <button
                type="button"
                onClick={builder.goBack}
                className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light transition-colors hover:text-text-primary-light"
              >
                Back
              </button>
            )}
            {builder.step === 1 && (
              <button
                type="button"
                onClick={builder.goNext}
                disabled={!builder.agent}
                className="nudge-horizontal inline-flex items-center gap-1 rounded-btn border border-surface-700/30 px-6 py-3 font-body text-body-sm font-medium text-text-primary-light transition-colors hover:border-surface-700/60 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-surface-700/30"
              >
                Continue
                <ArrowRight size={14} weight="bold" />
              </button>
            )}
            {builder.step === 2 && (
              <button
                type="button"
                onClick={builder.goNext}
                className="nudge-horizontal inline-flex items-center gap-1 rounded-btn border border-surface-700/30 px-6 py-3 font-body text-body-sm font-medium text-text-primary-light transition-colors hover:border-surface-700/60"
              >
                Continue
                <ArrowRight size={14} weight="bold" />
              </button>
            )}
            {builder.step === 3 && (
              <button type="button" onClick={onSubmit} className="btn-primary nudge-horizontal flex-1">
                Build My Agent
                <ArrowRight size={16} weight="bold" />
              </button>
            )}
          </div>
          {builder.step === 3 && (
            <div className="mt-4 flex items-start gap-3 rounded-md border border-accent-purple/30 bg-accent-purple/5 px-4 py-3">
              <Phone size={18} weight="fill" className="mt-0.5 shrink-0 text-accent-purple" />
              <p className="font-body text-caption leading-relaxed text-text-secondary-light">
                <span className="font-semibold text-text-primary-light">
                  Expect a demo call.
                </span>{" "}
                Your new agent will ring you in the{" "}
                {voice ? `${voice.label} voice` : "voice you chose"}, using the
                details and prompt you entered.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function Demo() {
  const builder = useBuildAgent();
  const { openRoi, setTransitioning, setTransitionNote, builderAgent, setBuilderAgent } = useRoiModal();

  useEffect(() => {
    if (builderAgent && builderAgent !== builder.agent) {
      builder.selectAgent(builderAgent);
    }
  }, [builderAgent]);

  const selectedRole = AGENTS.find((entry) => entry.id === builder.agent)?.role ?? "Receptionist";

  function handleBuild() {
    const role = AGENTS.find((entry) => entry.id === builder.agent)?.role;
    setTransitionNote(
      `A demo call is on its way — your new ${role ?? "agent"} will ring you shortly.`
    );
    setTransitioning(true);
    setTimeout(() => {
      setTransitioning(false);
      setTransitionNote("");
      builder.submit();
    }, 400);
  }

  return (
    <section id="book-call" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-start lg:gap-16" data-parallax data-parallax-y="12" data-section-reveal>
        <div className="flex flex-1 flex-col" data-reveal-item>
          <h2 className="mt-3 font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Put your AI employee to work.
          </h2>
          <p className="mt-3 max-w-lg text-body-sm md:text-body-md leading-relaxed text-text-secondary-light">
            See what Nova Echo can do for your business. Tell us what you need handled,
            and we&apos;ll help you build the right agent.
          </p>

          <div className="mt-5 lg:mt-6">
            <AgentProfile agent={builder.agent ?? "receptionist"} />
          </div>

          <button
            type="button"
            onClick={() => openRoi(selectedRole)}
            className="nudge-horizontal mt-4 inline-flex items-center gap-2 font-body text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-purple"
          >
            Calculate your ROI
            <ArrowRight size={16} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <div className="w-full lg:max-w-md" data-reveal-item>
          <BuildAgentPanel builder={builder} onSubmit={handleBuild} onSelectAgent={setBuilderAgent} />
        </div>
      </div>
    </section>
  );
}