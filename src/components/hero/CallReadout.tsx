"use client";

import type { VoiceCall } from "./useVoiceCall";

type CallReadoutProps = {
  call: VoiceCall;
};

export default function CallReadout({ call }: CallReadoutProps) {
  const { script, showAi, showCustomer, showClosing } = call;

  return (
    <div className="hero-transcript" key={script.id}>
      <div className="voice-row hero-transcript-row" data-visible={showAi} aria-hidden={!showAi}>
        <span className="hero-speaker-tag hero-speaker-tag-ai">{script.company}</span>
        <p className="hero-speaker-text">{script.aiMessage}</p>
      </div>

      <div
        className="voice-row hero-transcript-row"
        data-visible={showCustomer}
        aria-hidden={!showCustomer}
      >
        <span className="hero-speaker-tag">{script.callerTag}</span>
        <p className="hero-speaker-text hero-speaker-text-sub">{script.callerMessage}</p>
      </div>

      <div
        className="voice-row hero-transcript-row"
        data-visible={showClosing}
        aria-hidden={!showClosing}
      >
        <span className="hero-speaker-tag hero-speaker-tag-ai">{script.company}</span>
        <p className="hero-speaker-text">{script.aiFollowUp}</p>
      </div>
    </div>
  );
}