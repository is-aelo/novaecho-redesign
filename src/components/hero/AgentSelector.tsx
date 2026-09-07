"use client";

import { Lightning, Megaphone, PhoneIncoming } from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { AGENT_SCRIPTS, type AgentId } from "./agentScripts";

const AGENT_ICONS: Record<AgentId, Icon> = {
  receptionist: PhoneIncoming,
  "speed-to-lead": Lightning,
  outbound: Megaphone,
};

type AgentSelectorProps = {
  activeId: AgentId;
  onSelect: (id: AgentId) => void;
};

export default function AgentSelector({ activeId, onSelect }: AgentSelectorProps) {
  return (
    <div className="agent-nav-list" role="group" aria-label="Choose your agent">
      {AGENT_SCRIPTS.map((agent) => {
        const isActive = agent.id === activeId;
        const Icon = AGENT_ICONS[agent.id];
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
            <Icon size={18} weight="duotone" aria-hidden="true" className="agent-nav-icon shrink-0" />
            <span className="flex min-w-0 flex-col items-start">
              <span className="agent-nav-name">{agent.name}</span>
              <span className="agent-nav-tagline">{agent.tagline}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}