"use client";

import type { VoiceCall } from "./useVoiceCall";

type CallReadoutProps = {
  call: VoiceCall;
};

export default function CallReadout({ call }: CallReadoutProps) {
  const { script, statusText, showAi, showCustomer, showClosing, elapsed } = call;

  return (
    <div className="voice-readout" key={script.id}>
      <div className="flex flex-col items-start gap-2 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <p className="flex items-center gap-2 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
          <span className="hero-live-dot" data-active="true" aria-hidden="true" />
          {script.agentLabel}
        </p>
        <p className="font-mono text-caption tabular-nums text-text-secondary" aria-live="polite">
          {statusText} · {elapsed}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 lg:mt-6 lg:pt-6">
        <div className="voice-row" data-visible={showAi} aria-hidden={!showAi}>
          <p className="font-mono text-caption uppercase tracking-wider text-accent-cyan">
            {script.company}
          </p>
          <p className="mt-2 font-body text-body-md text-text-primary">
            {script.aiMessage}
          </p>
        </div>

        <div
          className="voice-row"
          data-visible={showCustomer}
          aria-hidden={!showCustomer}
        >
          <p className="font-mono text-caption uppercase tracking-wider text-text-secondary">
            {script.callerTag}
          </p>
          <p className="mt-2 font-body text-body-md text-text-secondary">
            {script.callerMessage}
          </p>
        </div>

        <div
          className="voice-row"
          data-visible={showClosing}
          aria-hidden={!showClosing}
        >
          <p className="font-mono text-caption uppercase tracking-wider text-accent-cyan">
            {script.company}
          </p>
          <p className="mt-2 font-body text-body-md text-text-primary">
            {script.aiFollowUp}
          </p>
        </div>
      </div>
    </div>
  );
}
