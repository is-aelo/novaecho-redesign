"use client";

import { AGENTS, type AgentChoice } from "./agents";

export default function AgentProfile({ agent }: { agent: AgentChoice }) {
  const item = AGENTS.find((entry) => entry.id === agent) ?? AGENTS[0];

  return (
    <div className="overflow-hidden rounded-window border border-hairline-on-dark bg-surface-900">
      <div className="flex items-center gap-2 border-b border-hairline-on-dark px-4 py-3">
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <span className="window-dot" aria-hidden="true" />
        <p className="console-panel-head">Your AI employee</p>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="hero-live-dot" data-active="true" aria-hidden="true" />
          <span className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
            Ready
          </span>
        </span>
      </div>

      <div className="px-4 py-5 md:px-6 md:py-6">
        <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
          Role
        </p>
        <p
          key={item.id}
          className="demo-step-in mt-2 font-display text-display-sm font-semibold tracking-tight text-text-primary"
        >
          {item.role}
        </p>
        <p
          key={`${item.id}-tagline`}
          className="demo-step-in mt-1 font-mono text-caption text-text-secondary"
        >
          {item.tagline}
        </p>

        <div className="mt-5 border-t border-hairline-on-dark pt-5">
          <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
            Handles
          </p>
          <ul className="mt-3 flex flex-col gap-3">
            {item.handles.map((handle) => (
              <li key={handle.text} className="flex items-center gap-2.5">
                <handle.icon size={14} weight="duotone" className="shrink-0 text-accent-purple-soft" />
                <span className="font-mono text-caption text-text-secondary">{handle.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-t border-hairline-on-dark pt-5">
          <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary">
            Status
          </p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2">
              <span className="hero-status-dot" aria-hidden="true" />
              <span className="font-mono text-caption font-semibold uppercase tracking-wider text-text-primary">
                Ready to deploy
              </span>
            </span>
            <span className="flex items-end gap-0.5" aria-hidden="true">
              <span className="demo-wave-bar h-3 w-0.5 bg-accent-purple-soft/60" />
              <span className="demo-wave-bar h-3 w-0.5 bg-accent-purple-soft/60" />
              <span className="demo-wave-bar h-3 w-0.5 bg-accent-purple-soft/60" />
              <span className="demo-wave-bar h-3 w-0.5 bg-accent-purple-soft/60" />
              <span className="demo-wave-bar h-3 w-0.5 bg-accent-purple-soft/60" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}