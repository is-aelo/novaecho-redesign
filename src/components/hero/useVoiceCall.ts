"use client";

import { useEffect, useState } from "react";
import { AGENT_SCRIPTS, type AgentId, type DemoScript } from "./agentScripts";

export type VoicePhase =
  | "idle"
  | "listening"
  | "processing"
  | "speaking"
  | "action"
  | "complete";

export type VoiceCall = {
  phase: VoicePhase;
  statusText: string;
  script: DemoScript;
  showAi: boolean;
  showCustomer: boolean;
  showClosing: boolean;
  showIntent: boolean;
  showResult: boolean;
  visibleActions: number;
  isComplete: boolean;
  elapsed: string;
  reducedMotion: boolean;
  selectAgent: (id: AgentId) => void;
};

const STATUS_TEXT: Record<VoicePhase, string> = {
  idle: "Idle",
  listening: "Listening",
  processing: "Processing",
  speaking: "Speaking",
  action: "Taking action",
  complete: "Call completed",
};

function formatElapsed(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export default function useVoiceCall(): VoiceCall {
  const [agentId, setAgentId] = useState<AgentId>("receptionist");
  const [phase, setPhase] = useState<VoicePhase>("idle");
  const [visibleActions, setVisibleActions] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [revealIntent, setRevealIntent] = useState(false);
  const [revealResult, setRevealResult] = useState(false);

  const script = AGENT_SCRIPTS.find((entry) => entry.id === agentId) ?? AGENT_SCRIPTS[0];

  function selectAgent(id: AgentId) {
    if (id === agentId) return;
    setAgentId(id);
    setPhase("idle");
    setVisibleActions(0);
    setSeconds(0);
    setRevealIntent(false);
    setRevealResult(false);
  }

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    function handleChange(event: MediaQueryListEvent) {
      setReducedMotion(event.matches);
    }
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    if (phase === "idle") {
      const timer = window.setTimeout(() => {
        setSeconds(0);
        setVisibleActions(0);
        setPhase("listening");
      }, 1000);
      return () => window.clearTimeout(timer);
    }
    if (phase === "listening") {
      const timer = window.setTimeout(() => setPhase("processing"), 1100);
      return () => window.clearTimeout(timer);
    }
    if (phase === "processing") {
      const timer = window.setTimeout(() => setPhase("speaking"), 800);
      return () => window.clearTimeout(timer);
    }
    if (phase === "speaking") {
      const timer = window.setTimeout(() => setPhase("action"), 1500);
      return () => window.clearTimeout(timer);
    }
    if (phase === "action") {
      if (visibleActions < script.actions.length) {
        const timer = window.setTimeout(
          () => setVisibleActions((count) => count + 1),
          400
        );
        return () => window.clearTimeout(timer);
      }
      const timer = window.setTimeout(() => setPhase("complete"), 400);
      return () => window.clearTimeout(timer);
    }
    if (phase === "complete") {
      const intentTimer = window.setTimeout(() => setRevealIntent(true), 800);
      const resultTimer = window.setTimeout(() => setRevealResult(true), 1300);
      return () => {
        window.clearTimeout(intentTimer);
        window.clearTimeout(resultTimer);
      };
    }
    return;
  }, [phase, visibleActions, reducedMotion, script.actions.length]);

  useEffect(() => {
    if (reducedMotion || phase === "idle" || phase === "complete") return;
    const interval = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phase, reducedMotion]);

  const displayPhase: VoicePhase = reducedMotion ? "complete" : phase;
  const displayActions = reducedMotion ? script.actions.length : visibleActions;
  const inCallEnd = displayPhase === "action" || displayPhase === "complete";

  return {
    phase: displayPhase,
    statusText: STATUS_TEXT[displayPhase],
    script,
    showAi:
      displayPhase === "speaking" ||
      displayPhase === "action" ||
      displayPhase === "complete",
    showCustomer: inCallEnd,
    showClosing: displayPhase === "complete",
    showIntent: reducedMotion || revealIntent,
    showResult: reducedMotion || revealResult,
    visibleActions: displayActions,
    isComplete: displayPhase === "complete",
    elapsed: reducedMotion ? "00:42" : formatElapsed(seconds),
    reducedMotion,
    selectAgent,
  };
}
