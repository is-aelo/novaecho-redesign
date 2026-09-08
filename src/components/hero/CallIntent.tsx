"use client";

import type { VoiceCall } from "./useVoiceCall";

type CallIntentProps = {
  call: VoiceCall;
};

export default function CallIntent({ call }: CallIntentProps) {
  return (
    <div className="reveal-block mb-3" data-visible={call.showIntent} aria-hidden={!call.showIntent}>
      <p className="console-panel-head mb-1">Call intent</p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <p className="font-display text-display-xs font-medium text-text-primary">
          {call.script.callIntent}
        </p>
        <span className="intent-phase-chip">{call.statusText}</span>
      </div>
    </div>
  );
}