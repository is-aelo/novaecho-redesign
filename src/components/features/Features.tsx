"use client";

import { useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import LatencyPanel from "./LatencyPanel";
import MiniCall from "../benchmark/MiniCall";
import LedgerCard from "./LedgerCard";

export default function Features() {
  const [showTranscripts, setShowTranscripts] = useState(false);
  return (
    <section id="platform" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        data-parallax
        data-parallax-y="12"
        data-section-reveal
      >
        <div className="flex flex-col lg:col-span-4" data-reveal-item>
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Why Nova Echo Leads the Voice AI Platform
          </h2>
          <p className="mt-3 max-w-md text-body-sm md:text-body-md leading-relaxed text-text-secondary-light">
            Pioneer of conversational intelligence since 2023, delivering human-like voice
            employees at scale.
          </p>
        </div>

        <div className="flex flex-col lg:col-span-8" data-reveal-item>
          <LatencyPanel />
        </div>

        <div
          id="live-transcripts"
          className={`collapsible-grid lg:col-span-12 ${showTranscripts ? "is-open" : ""}`}
          data-reveal-item
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-5">
            <MiniCall
            heading="Invoice"
            callerTag="Jordan · Client"
            transcript={[
              {
                speaker: "ai",
                text: "Hi Jordan, I can see your invoice for the build is pending — just a quick reminder it's due Friday.",
              },
              {
                speaker: "caller",
                text: "Right, I'll pay it today. Thanks for the nudge.",
              },
              {
                speaker: "ai",
                text: "Great — I'll mark it settled the moment it clears and send you a receipt.",
              },
              {
                speaker: "caller",
                text: "Perfect. Can you also push the tax breakdown to our accountant?",
              },
              {
                speaker: "ai",
                text: "Done — I've emailed the full breakdown to your accountant directly.",
              },
            ]}
            callIndex={1}
            startSeconds={14}
          />
          <MiniCall
            heading="SEO package"
            callerTag="Sofia · Lead"
            transcript={[
              {
                speaker: "ai",
                text: "Hi Sofia, following up on the SEO package for your new site — are you ready to lock in the monthly plan?",
              },
              {
                speaker: "caller",
                text: "Yes, let's go with the standard SaaS plan.",
              },
              {
                speaker: "ai",
                text: "Awesome. The standard plan covers keyword tracking, on-page fixes, and a monthly report.",
              },
              {
                speaker: "caller",
                text: "That works. When does it kick off?",
              },
              {
                speaker: "ai",
                text: "We'll start Monday — you'll get your first report at the end of the month.",
              },
            ]}
            callIndex={2}
            startSeconds={37}
          />
          <MiniCall
            heading="Hosting renewal"
            callerTag="Derek · Client"
            transcript={[
              {
                speaker: "ai",
                text: "Hi Derek, just a heads-up your hosting plan renews next week — want me to keep it on the same tier?",
              },
              {
                speaker: "caller",
                text: "Keep it the same, that works.",
              },
              {
                speaker: "ai",
                text: "Done — I've renewed the same tier, so there's no interruption next week.",
              },
              {
                speaker: "caller",
                text: "Great. And the extra staging site?",
              },
              {
                speaker: "ai",
                text: "That stays included — I've noted it on the renewal so it renews with the plan.",
              },
            ]}
            callIndex={3}
            startSeconds={58}
          />
          </div>
        </div>

        <div className="flex flex-col items-center text-center lg:col-span-12" data-reveal-item>
          <h3 className="font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
            One agent, multiple calls, all at once
          </h3>
          <p className="mt-2 max-w-md text-body-sm leading-relaxed text-text-secondary-light">
            Open the windows to watch a single agent hold multiple parallel
            conversations —
            every call answered instantly, none left on hold.
          </p>
          <button
            type="button"
            onClick={() => setShowTranscripts((v) => !v)}
            aria-expanded={showTranscripts}
            aria-controls="live-transcripts"
            className="btn-outline-light mt-6"
          >
            Full Transcripts
            <ArrowRight
              size={16}
              weight="bold"
              className={`transition-transform ${showTranscripts ? "-rotate-90" : ""}`}
            />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:col-span-12" data-reveal-item>
          <LedgerCard
            eyebrow="High call capacity"
            heading={
              <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary-light">
                10,000+ calls a day per Echo
              </p>
            }
            body="Capacity to answer every single call at once — no extra headcount needed to keep up."
            footer="Never misses a lead"
          />
          <LedgerCard
            eyebrow="Priority support"
            heading={
              <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary-light">
                Not &ldquo;set-it-and-forget-it&rdquo; voice AI
              </p>
            }
            body="Hands-on support from a team experienced in building and optimizing voice AI employees."
            footer="A team, not a queue"
          />
          <LedgerCard
            eyebrow="CRM"
            heading={
              <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary-light">
                Your existing CRM, connected
              </p>
            }
            body="Call outcomes and follow-ups flow into the tools your team already uses — no migration required."
            footer="No new tool to learn"
          />
        </div>
      </div>
    </section>
  );
}