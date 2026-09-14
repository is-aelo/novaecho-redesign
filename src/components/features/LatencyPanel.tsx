"use client";

import { useRef } from "react";
import useLatencyProof from "./useLatencyProof";
import useLatencyWave from "./useLatencyWave";

export default function LatencyPanel() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<SVGSVGElement>(null);
  useLatencyProof(scopeRef);
  useLatencyWave();

  return (
    <div
      ref={scopeRef}
      className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900"
    >
      <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-3">
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <p className="console-panel-head">Scope confirmation</p>
        <span className="ml-auto flex items-center gap-2">
          <span className="hero-live-dot" data-active="true" aria-hidden="true" />
          <span className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple-soft">
            Low latency
          </span>
        </span>
      </div>

      <div className="flex flex-col px-4 py-5 md:px-6 md:py-6">
        <div>
          <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary">
            Low Latency
          </p>
          <p className="mt-2 max-w-xl text-body-sm leading-relaxed text-text-secondary">
            Conversations feel natural because responses arrive without the awkward pauses
            that make voice AI feel artificial.
          </p>
        </div>

        <div className="hero-transcript mt-5 border-t border-hairline-on-dark pt-5 lg:mt-6">
          <div className="hero-transcript-row" data-latency-row="ai">
            <span className="hero-speaker-tag hero-speaker-tag-ai">Northlight Web Co.</span>
            <p className="hero-speaker-text">
              &ldquo;Hi Dana, this is Northlight Web Co. &mdash; confirming what we&rsquo;ve scoped: a full site rebuild with a new homepage and services section, CMS migration, SEO on key pages, and a month of post-launch support. Does that match what you&rsquo;re expecting?&rdquo;
            </p>
          </div>

          <div className="hero-transcript-row" data-latency-row="user">
            <span className="hero-speaker-tag">Dana · Caller</span>
            <p className="hero-speaker-text hero-speaker-text-sub">
              &ldquo;That&rsquo;s exactly it &mdash; though could we move the target date to
              next month?&rdquo;
            </p>
          </div>

          <div className="hero-transcript-row" data-latency-row="ai-2">
            <span className="hero-speaker-tag hero-speaker-tag-ai">Northlight Web Co.</span>
            <p className="hero-speaker-text">
              &ldquo;No problem. I&rsquo;ve updated the target to next month &mdash; the scope
              stays the same. I&rsquo;ll send the revised summary to your inbox.&rdquo;
            </p>
          </div>

          <div className="hero-transcript-row" data-latency-row="user-2">
            <span className="hero-speaker-tag">Dana · Caller</span>
            <p className="hero-speaker-text hero-speaker-text-sub">
              &ldquo;Perfect, that&rsquo;s everything. Thanks so much.&rdquo;
            </p>
          </div>

          <p className="intent-phase-chip mt-3 self-start" data-latency-status>
            Responding
          </p>

          <svg
            ref={waveRef}
            viewBox="0 0 480 80"
            preserveAspectRatio="none"
            className="mt-3 h-9 w-full"
            data-latency-wave
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="latency-wave-fade" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#fff" stopOpacity="0" />
                <stop offset="0.06" stopColor="#fff" stopOpacity="1" />
                <stop offset="0.94" stopColor="#fff" stopOpacity="1" />
                <stop offset="1" stopColor="#fff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="latency-wave-ribbon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--accent-cyan)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--accent-hot-purple)" stopOpacity="0.06" />
              </linearGradient>
              <mask id="latency-wave-mask" mask-type="alpha">
                <rect x="0" y="0" width="480" height="80" fill="url(#latency-wave-fade)" />
              </mask>
            </defs>
            <line x1="0" x2="480" y1="20" y2="20" className="stroke-white/5" strokeWidth="1" />
            <line x1="0" x2="480" y1="40" y2="40" className="stroke-white/5" strokeWidth="1" />
            <line x1="0" x2="480" y1="60" y2="60" className="stroke-white/5" strokeWidth="1" />
            <g mask="url(#latency-wave-mask)">
              <path
                data-latency-ribbon
                d="M0,40 L480,40 Z"
                fill="url(#latency-wave-ribbon)"
                opacity="0.9"
              />
              <path
                data-latency-line
                d="M0,40 L480,40"
                fill="none"
                stroke="var(--accent-purple)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity="0.35"
              />
              <path
                data-latency-line
                d="M0,40 L480,40"
                fill="none"
                stroke="var(--accent-blue)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.45"
              />
              <path
                data-latency-line
                d="M0,40 L480,40"
                fill="none"
                stroke="var(--accent-cyan)"
                strokeWidth="3.5"
                strokeLinecap="round"
                opacity="0.55"
              />
              <path
                data-latency-line
                d="M0,40 L480,40"
                fill="none"
                stroke="var(--text-primary-on-dark)"
                strokeWidth="4"
                strokeLinecap="round"
                opacity="0.7"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}