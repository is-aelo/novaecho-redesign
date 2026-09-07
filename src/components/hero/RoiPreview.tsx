"use client";

import { useMemo } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { calcResults } from "@/components/roi/calc";
import { useRoiModal } from "@/contexts/RoiContext";
import type { VoiceCall } from "./useVoiceCall";

const money = (value: number) =>
  "$" + value.toLocaleString("en-US", { maximumFractionDigits: 0 });

type RoiPreviewProps = {
  call: VoiceCall;
};

export default function RoiPreview({ call }: RoiPreviewProps) {
  const { openRoi } = useRoiModal();
  const estimate = useMemo(
    () => calcResults(call.script.roiExample),
    [call.script.roiExample]
  );

  return (
    <div
      className="reveal-block mt-4 border-t border-surface-200 pt-4"
      key={call.script.id}
      data-visible={call.showResult}
      aria-hidden={!call.showResult}
    >
      <p className="console-panel-head mb-2">Estimated ROI calculation</p>
      <p className="flex items-baseline gap-1">
        <span className="font-display text-display-md font-medium tabular-nums text-accent-purple">
          {money(estimate.total)}
        </span>
        <span className="font-mono text-caption text-text-secondary-light">/mo</span>
      </p>
      <p className="mt-1 font-mono text-caption text-text-secondary-light">
        ≈ {money(estimate.annualImpact)} annual impact
      </p>
      <button
        type="button"
        onClick={() => openRoi(call.script.roiName)}
        className="mt-3 inline-flex items-center gap-2 font-body text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-purple"
      >
        Calculate yours
        <ArrowRight size={16} weight="bold" aria-hidden="true" />
      </button>
    </div>
  );
}