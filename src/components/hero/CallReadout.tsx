"use client";

import type { VoiceCall } from "./useVoiceCall";

type CallReadoutProps = {
  call: VoiceCall;
};

export default function CallReadout({ call }: CallReadoutProps) {
  const { script, turn, showDecision } = call;

  return (
    <div className="hero-transcript" key={script.id}>
      {script.transcript.map((row, i) => (
        <div
          key={i}
          className="voice-row hero-transcript-row"
          data-visible={turn >= i}
          aria-hidden={turn < i}
        >
          <span
            className={
              row.speaker === "ai"
                ? "hero-speaker-tag hero-speaker-tag-ai"
                : "hero-speaker-tag"
            }
          >
            {row.speaker === "ai" ? script.company : script.callerTag}
          </span>
          <p
            className={
              row.speaker === "ai"
                ? "hero-speaker-text"
                : "hero-speaker-text hero-speaker-text-sub"
            }
          >
            {row.text}
          </p>
        </div>
      ))}

      <div
        className="reveal-block mt-3 border-t border-hairline-on-dark pt-3"
        data-visible={showDecision}
        aria-hidden={!showDecision}
      >
        <p className="console-panel-head mb-1">Agent decision</p>
        <p className="font-display text-display-xs font-medium leading-relaxed text-text-primary">
          {script.decision}
        </p>
      </div>
    </div>
  );
}