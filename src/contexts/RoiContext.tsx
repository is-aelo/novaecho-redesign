"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface RoiCalculation {
  total: number;
  plan: string;
  planPrice: number;
  netRoi: number;
  roiPct: number;
  annualImpact: number;
  revenueBenefit: number;
  costSavings: number;
  timeValue: number;
}

interface RoiContextValue {
  open: boolean;
  agentType: string;
  openRoi: (agentType: string) => void;
  closeRoi: () => void;

  resultsOpen: boolean;
  results: RoiCalculation | null;
  openResults: (calc: RoiCalculation) => void;
  closeResults: () => void;
  reopenRoi: () => void;

  isTransitioning: boolean;
  setTransitioning: (v: boolean) => void;
}

const RoiContext = createContext<RoiContextValue | null>(null);

export function RoiProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [agentType, setAgentType] = useState("");
  const [resultsOpen, setResultsOpen] = useState(false);
  const [results, setResults] = useState<RoiCalculation | null>(null);
  const [isTransitioning, setTransitioning] = useState(false);

  function openRoi(type: string) {
    setAgentType(type);
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

  return (
    <RoiContext.Provider
      value={{
        open, agentType, openRoi, closeRoi,
        resultsOpen, results, openResults, closeResults, reopenRoi,
        isTransitioning, setTransitioning,
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
