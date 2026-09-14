"use client";

import useCallTimer from "./useCallTimer";

type TranscriptRow = {
  speaker: "ai" | "caller";
  text: string;
};

type MiniCallProps = {
  heading: string;
  callerTag: string;
  transcript: TranscriptRow[];
  callIndex: number;
  startSeconds: number;
};

export default function MiniCall({
  heading,
  callerTag,
  transcript,
  callIndex,
  startSeconds,
}: MiniCallProps) {
  const elapsed = useCallTimer(startSeconds);

  const renderRow = (row: TranscriptRow, i: number) => (
    <div key={i} className="flex flex-col items-start gap-1">
      <span
        className={
          row.speaker === "ai" ? "hero-speaker-tag hero-speaker-tag-ai" : "hero-speaker-tag"
        }
      >
        {row.speaker === "ai" ? "Northlight Web Co." : callerTag}
      </span>
      <p
        className={
          row.speaker === "ai"
            ? "hero-speaker-text"
            : "hero-speaker-text hero-speaker-text-sub"
        }
      >
        &ldquo;{row.text}&rdquo;
      </p>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900">
      <div className="flex items-center gap-2 border-b border-hairline-on-dark px-3 py-2">
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <p className="console-panel-head">{heading}</p>
        <span className="ml-auto flex items-center gap-2">
          <span className="hero-live-dot" data-active="true" aria-hidden="true" />
          <span className="font-mono text-caption tabular-nums text-text-secondary">{elapsed}</span>
        </span>
      </div>

      <div className="flex flex-col gap-3 px-3 py-3">{transcript.map(renderRow)}</div>

      <div className="flex items-center gap-2 border-t border-hairline-on-dark px-3 py-2">
        <span className="font-mono text-caption uppercase tracking-wider text-accent-purple-soft">
          Concurrent
        </span>
        <span className="ml-auto font-mono text-caption tabular-nums text-text-secondary">
          Call {callIndex} of 3
        </span>
      </div>
    </div>
  );
}