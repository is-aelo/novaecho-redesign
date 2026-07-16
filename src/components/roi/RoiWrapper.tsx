"use client";

import { ReactNode } from "react";
import { RoiProvider } from "@/contexts/RoiContext";
import RoiModal from "./RoiModal";
import RoiResultsModal from "./RoiResultsModal";

export default function RoiWrapper({ children }: { children: ReactNode }) {
  return (
    <RoiProvider>
      {children}
      <RoiModal />
      <RoiResultsModal />
    </RoiProvider>
  );
}
