"use client";

import AgentSelector from "./AgentSelector";
import CallReadout from "./CallReadout";
import CallIntent from "./CallIntent";
import WorkflowPreview from "./WorkflowPreview";
import RoiPreview from "./RoiPreview";
import type { VoiceCall } from "./useVoiceCall";

export default function AgentWindow({ call }: { call: VoiceCall }) {
  return (
    <>
      <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900">
        <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-3">
          <span className="window-dot" aria-hidden="true" />
          <span className="window-dot" aria-hidden="true" />
          <span className="window-dot" aria-hidden="true" />
          <p className="console-panel-head">Nova Echo Console</p>
          <span className="hero-live-dot ml-auto" data-active="true" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="px-4 pt-3 pb-4 lg:col-span-3 lg:border-r lg:border-hairline-on-dark lg:px-6 lg:pt-4 lg:pb-6">
            <p className="console-panel-head mb-2 lg:mb-3">Agents</p>
            <AgentSelector
              activeId={call.script.id}
              onSelect={call.selectAgent}
            />
            <p
              key={call.script.id}
              className="mt-4 border-t border-hairline-on-dark pt-4 font-body text-caption leading-relaxed text-text-secondary"
            >
              {call.script.description}
            </p>
          </div>

          <div className="border-t border-hairline-on-dark px-4 pt-3 pb-2 lg:col-span-6 lg:border-t-0 lg:px-6 lg:pt-4 lg:pb-6">
            <div className="mb-2 flex flex-col items-start gap-2 lg:mb-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
              <p className="console-panel-head">Call transcription</p>
              <p
                className="font-mono text-caption tabular-nums text-text-secondary"
                aria-live="polite"
              >
                {call.script.agentLabel} · {call.elapsed}
              </p>
            </div>

            <CallReadout call={call} />

            <div className="mt-4 border-t border-hairline-on-dark pt-4">
              <CallIntent call={call} />
            </div>
          </div>

          <div className="border-t border-hairline-on-dark px-4 pt-2 pb-4 lg:col-span-3 lg:border-l lg:border-t-0 lg:border-hairline-on-dark lg:px-6 lg:pt-4 lg:pb-6">
            <p className="console-panel-head mb-2 lg:mb-3">Live workflow</p>
            <WorkflowPreview call={call} />
            <RoiPreview call={call} />
          </div>
        </div>
      </div>
    </>
  );
}
