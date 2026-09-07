"use client";

import { CheckCircle } from "@phosphor-icons/react";
import type { VoiceCall } from "./useVoiceCall";

type WorkflowPreviewProps = {
  call: VoiceCall;
};

export default function WorkflowPreview({ call }: WorkflowPreviewProps) {
  const { script, visibleActions, showResult } = call;

  return (
    <div
      key={script.id}
      className="reveal-block"
      data-visible={showResult}
      aria-hidden={!showResult}
    >
      <ul className="flex flex-col gap-2">
        {script.actions.slice(0, visibleActions).map((action) => (
          <li key={action} className="hero-action-row">
            <CheckCircle
              size={16}
              weight="fill"
              aria-hidden="true"
              className="hero-action-check text-text-secondary-light"
            />
            <span className="font-body text-body-sm text-text-primary-light">{action}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}