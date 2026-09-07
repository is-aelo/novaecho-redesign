"use client";

import { CheckCircle } from "@phosphor-icons/react";
import type { VoiceCall } from "./useVoiceCall";

type WorkflowPreviewProps = {
  call: VoiceCall;
};

export default function WorkflowPreview({ call }: WorkflowPreviewProps) {
  const { script, visibleActions } = call;

  return (
    <div className="voice-readout" key={script.id}>
      <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
        Live workflow
      </p>

      <div
        className="voice-row mt-6 border-t border-white/10 pt-6"
        data-visible={visibleActions > 0}
        aria-hidden={visibleActions === 0}
      >
        <ul className="flex flex-col gap-2">
          {script.actions.slice(0, visibleActions).map((action) => (
            <li key={action} className="hero-action-row">
              <CheckCircle
                size={16}
                weight="fill"
                aria-hidden="true"
                className="shrink-0 text-accent-cyan"
              />
              <span className="font-mono text-body-sm text-text-primary">
                {action}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
