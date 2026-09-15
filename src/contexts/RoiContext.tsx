"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { RoiCalculation } from "@/components/roi/calc";

export type { RoiCalculation };

interface RoiContextValue {
  open: boolean;
  agentType: string;
  sessionCount: number;
  openRoi: (agentType: string) => void;
  closeRoi: () => void;

  resultsOpen: boolean;
  results: RoiCalculation | null;
  openResults: (calc: RoiCalculation) => void;
  closeResults: () => void;
  reopenRoi: () => void;

  isTransitioning: boolean;
  setTransitioning: (v: boolean) => void;
  transitionNote: string;
  setTransitionNote: (v: string) => void;

  formResetKey: number;
  resetForm: () => void;
}

const RoiContext = createContext<RoiContextValue | null>(null);

export function RoiProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [agentType, setAgentType] = useState("");
  const [sessionCount, setSessionCount] = useState(0);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState<RoiCalculation | null>(null);
  const [isTransitioning, setTransitioning] = useState(false);
  const [transitionNote, setTransitionNote] = useState("");
  const [formResetKey, setFormResetKey] = useState(0);

  function openRoi(type: string) {
    setAgentType(type);
    setSessionCount((n) => n + 1);
    setOpen(true);
  }

  function closeRoi() {
    setOpen(false);
  }

  function openResults(calc: RoiCalculation) {
    setResults(calc);
    setResultsOpen(true);
  }

  function closeResults() {
    setResultsOpen(false);
  }

  function reopenRoi() {
    setResultsOpen(false);
    setOpen(true);
  }

  function resetForm() {
    setFormResetKey((k) => k + 1);
  }

  return (
    <RoiContext.Provider
      value={{
        open, agentType, sessionCount, openRoi, closeRoi,
        resultsOpen, results, openResults, closeResults, reopenRoi,
        isTransitioning, setTransitioning,
        transitionNote, setTransitionNote,
        formResetKey, resetForm,
      }}
    >
      {children}
    </RoiContext.Provider>
  );
}

export function useRoiModal() {
  const ctx = useContext(RoiContext);
  if (!ctx) throw new Error("useRoiModal must be used within RoiProvider");
  return ctx;
}
