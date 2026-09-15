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
  turn: number;
  showDecision: boolean;
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
  const [turn, setTurn] = useState(-1);
  const [visibleActions, setVisibleActions] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion);
  const [revealDecision, setRevealDecision] = useState(false);
  const [revealIntent, setRevealIntent] = useState(false);
  const [revealResult, setRevealResult] = useState(false);

  const script = AGENT_SCRIPTS.find((entry) => entry.id === agentId) ?? AGENT_SCRIPTS[0];

  function selectAgent(id: AgentId) {
    if (id === agentId) return;
    setAgentId(id);
    setPhase("idle");
    setTurn(-1);
    setVisibleActions(0);
    setSeconds(0);
    setRevealDecision(false);
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
        setTurn(0);
        setPhase("speaking");
      }, 350);
      return () => window.clearTimeout(timer);
    }
    if (phase === "speaking") {
      const timer = window.setTimeout(() => {
        const next = turn + 1;
        if (next < script.transcript.length && script.transcript[next].speaker === "caller") {
          setTurn(next);
          setPhase("listening");
        } else {
          setPhase("action");
        }
      }, 650);
      return () => window.clearTimeout(timer);
    }
    if (phase === "listening") {
      const timer = window.setTimeout(() => {
        setTurn(turn + 1);
        setPhase("processing");
      }, 450);
      return () => window.clearTimeout(timer);
    }
    if (phase === "processing") {
      const timer = window.setTimeout(() => setPhase("speaking"), 250);
      return () => window.clearTimeout(timer);
    }
    if (phase === "action") {
      if (visibleActions < script.actions.length) {
        const timer = window.setTimeout(
          () => setVisibleActions((count) => count + 1),
          150
        );
        return () => window.clearTimeout(timer);
      }
      const timer = window.setTimeout(() => setPhase("complete"), 150);
      return () => window.clearTimeout(timer);
    }
    if (phase === "complete") {
      const decisionTimer = window.setTimeout(() => setRevealDecision(true), 200);
      const intentTimer = window.setTimeout(() => setRevealIntent(true), 300);
      const resultTimer = window.setTimeout(() => setRevealResult(true), 450);
      return () => {
        window.clearTimeout(decisionTimer);
        window.clearTimeout(intentTimer);
        window.clearTimeout(resultTimer);
      };
    }
    return;
  }, [phase, turn, visibleActions, reducedMotion, script]);

  useEffect(() => {
    if (reducedMotion || phase === "idle" || phase === "complete") return;
    const interval = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(interval);
  }, [phase, reducedMotion]);

  const displayPhase: VoicePhase = reducedMotion ? "complete" : phase;
  const displayActions = reducedMotion ? script.actions.length : visibleActions;

  return {
    phase: displayPhase,
    statusText: STATUS_TEXT[displayPhase],
    script,
    turn: reducedMotion ? script.transcript.length - 1 : turn,
    showDecision: reducedMotion || revealDecision,
    showIntent: reducedMotion || revealIntent,
    showResult: reducedMotion || revealResult,
    visibleActions: displayActions,
    isComplete: displayPhase === "complete",
    elapsed: reducedMotion ? "00:42" : formatElapsed(seconds),
    reducedMotion,
    selectAgent,
  };
}