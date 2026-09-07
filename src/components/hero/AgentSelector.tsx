"use client";

import { AGENT_SCRIPTS, type AgentId } from "./agentScripts";

type AgentSelectorProps = {
  activeId: AgentId;
  onSelect: (id: AgentId) => void;
};

export default function AgentSelector({ activeId, onSelect }: AgentSelectorProps) {
  return (
    <div>
      <p className="font-mono text-caption uppercase tracking-wider text-text-secondary">
        Choose your agent
      </p>
      <div
        className="mt-4 flex flex-col"
        role="group"
        aria-label="Choose your agent"
      >
        {AGENT_SCRIPTS.map((agent) => {
          const isActive = agent.id === activeId;
          return (
            <button
              key={agent.id}
              type="button"
              aria-pressed={isActive}
              aria-current={isActive}
              onClick={() => onSelect(agent.id)}
              className="agent-nav-btn"
              data-active={isActive}
            >
              <span className="agent-nav-bar" aria-hidden="true" />
              {agent.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
