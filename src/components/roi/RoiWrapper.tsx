"use client";

import { ReactNode, useRef, useEffect } from "react";
import { RoiProvider, useRoiModal } from "@/contexts/RoiContext";
import gsap from "gsap";
import { useParallax } from "@/hooks/useParallax";
import RoiModal from "./RoiModal";
import RoiResultsModal from "./RoiResultsModal";

function TransitionOverlay() {
  const { isTransitioning } = useRoiModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const spinner = spinnerRef.current;
    const text = textRef.current;
    if (!overlay || !spinner || !text) return;

    if (isTransitioning) {
      gsap.set(overlay, { display: "flex" });
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        spinner,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.5)" }
      );
      gsap.fromTo(
        text,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.3, delay: 0.15, ease: "power2.out" }
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => gsap.set(overlay, { display: "none" }),
      });
    }
  }, [isTransitioning]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 items-center justify-center bg-black/60 backdrop-blur-sm hidden"
    >
      <div className="flex flex-col items-center gap-4">
        <div
          ref={spinnerRef}
          className="h-10 w-10 rounded-full border-2 border-accent-purple/20 border-t-accent-purple shadow-glow animate-spin"
        />
        <span
          ref={textRef}
          className="text-body-sm font-medium tracking-wide text-text-secondary"
        >
          Just a moment&hellip;
        </span>
      </div>
    </div>
  );
}

export default function RoiWrapper({ children }: { children: ReactNode }) {
  useParallax();

  return (
    <RoiProvider>
      {children}
      <RoiModal />
      <TransitionOverlay />
      <RoiResultsModal />
    </RoiProvider>
  );
}
