"use client";

import { useEffect, useState } from "react";

export default function useCallTimer(startSeconds: number) {
  const [elapsed, setElapsed] = useState(startSeconds);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}