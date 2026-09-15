import Image from "next/image";

const DOTS = [
  { cls: "animate-[loading-dot_1.4s_ease-in-out_0s_infinite]", tone: "bg-accent-purple-soft" },
  { cls: "animate-[loading-dot_1.4s_ease-in-out_0.2s_infinite]", tone: "bg-accent-purple-soft/70" },
  { cls: "animate-[loading-dot_1.4s_ease-in-out_0.4s_infinite]", tone: "bg-accent-purple-soft/40" },
];

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-hero">
      <div className="flex flex-col items-center gap-6" role="status" aria-label="Loading Nova Echo">
        <div className="relative">
          <div
            className="loading-ring absolute -inset-3 rounded-full border border-accent-purple-soft/60 animate-[loading-ring_2s_ease-in-out_infinite]"
            aria-hidden="true"
          />
          <Image
            src="/images/novaecho-logo.png"
            alt=""
            width={64}
            height={64}
            className="relative h-16 w-16 rounded-lg object-contain"
          />
        </div>
        <div className="flex items-center gap-2" aria-hidden="true">
          {DOTS.map((dot, index) => (
            <span key={index} className={`loading-dot h-1.5 w-1.5 rounded-full ${dot.tone} ${dot.cls}`} />
          ))}
        </div>
      </div>
    </div>
  );
}