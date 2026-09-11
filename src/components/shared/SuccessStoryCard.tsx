"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowsClockwise,
  ArrowsCounterClockwise,
  ArrowsLeftRight,
  CalendarCheck,
  ChatCircle,
  ChatsCircle,
  Clock,
  FlowArrow,
  Headphones,
  Heartbeat,
  Infinity,
  Lightning,
  Microphone,
  Phone,
  PhoneIncoming,
  PuzzlePiece,
  Robot,
  ShieldCheck,
  Sparkle,
  TrendUp,
  Trophy,
  UserFocus,
  WaveSine,
} from "@phosphor-icons/react";
import { ArrowRight } from "@phosphor-icons/react";

export interface SuccessStoryCardImpact {
  icon: string;
  text: string;
}

export interface SuccessStoryCardData {
  author: string;
  company: string;
  industries: string[];
  avatar?: string;
  impacts: SuccessStoryCardImpact[];
  review: string;
  reviewFull?: string;
}

const ICONS: Record<string, { icon: typeof Phone; weight: "duotone" }> = {
  transfer: { icon: ArrowsClockwise, weight: "duotone" },
  phone: { icon: Phone, weight: "duotone" },
  reliability: { icon: ShieldCheck, weight: "duotone" },
  patient: { icon: Heartbeat, weight: "duotone" },
  time: { icon: Clock, weight: "duotone" },
  workflow: { icon: FlowArrow, weight: "duotone" },
  focus: { icon: UserFocus, weight: "duotone" },
  growth: { icon: TrendUp, weight: "duotone" },
  adaptability: { icon: ArrowsCounterClockwise, weight: "duotone" },
  appointment: { icon: CalendarCheck, weight: "duotone" },
  automation: { icon: Robot, weight: "duotone" },
  support: { icon: Headphones, weight: "duotone" },
  conversation: { icon: ChatCircle, weight: "duotone" },
  voice: { icon: WaveSine, weight: "duotone" },
  clarity: { icon: Microphone, weight: "duotone" },
  scale: { icon: Infinity, weight: "duotone" },
  endtoend: { icon: ArrowsLeftRight, weight: "duotone" },
  onboarding: { icon: PuzzlePiece, weight: "duotone" },
  quick: { icon: Lightning, weight: "duotone" },
  transformed: { icon: ChatsCircle, weight: "duotone" },
  smarter: { icon: Sparkle, weight: "duotone" },
  receptionist: { icon: PhoneIncoming, weight: "duotone" },
  standout: { icon: Trophy, weight: "duotone" },
};

interface SectionLabelProps {
  children: string;
  accent?: boolean;
}

function SectionLabel({ children, accent = false }: SectionLabelProps) {
  return (
    <p
      className={`font-mono text-caption font-medium uppercase tracking-wider ${
        accent ? "text-accent-purple" : "text-text-secondary-light/60"
      }`}
    >
      {children}
    </p>
  );
}

export default function SuccessStoryCard({ story }: { story: SuccessStoryCardData }) {
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const hasFullReview = !!story.reviewFull && story.reviewFull !== story.review;

  return (
    <article className="flex h-full flex-col border border-surface-200 bg-surface-100 rounded-md p-6 md:p-8 text-left">
      <header>
        <div className="flex items-center gap-3">
          {story.avatar && (
            <Image
              src={story.avatar}
              alt={`${story.author} from ${story.company}`}
              width={80}
              height={80}
              className="h-10 w-10 shrink-0 rounded-full border border-surface-200 object-cover"
            />
          )}
          <div className="min-w-0">
            <p className="font-display text-body-md font-semibold tracking-tight text-text-primary-light">
              {story.author}
              <span className="font-body font-normal text-text-secondary-light"> · {story.company}</span>
            </p>
            {story.industries.length > 0 && (
              <p className="mt-1 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light">
                {story.industries.join(" · ")}
              </p>
            )}
          </div>
        </div>
      </header>

      <section className="mt-8 border-t border-surface-200 pt-8">
        <SectionLabel accent>Impact</SectionLabel>
        <div className="mt-4 flex flex-col gap-3 border-t border-surface-200 pt-6">
          {story.impacts.map((impact) => {
            const icon = ICONS[impact.icon];

            return (
              <div key={impact.text} className="flex items-center gap-2.5">
                {icon && <icon.icon size={16} weight={icon.weight} className="shrink-0 text-accent-purple" />}
                <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light">
                  {impact.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-8 border-t border-surface-200 pt-8">
        <SectionLabel>Client review</SectionLabel>
        <blockquote className="mt-4 max-w-prose font-body text-body-sm italic leading-relaxed text-text-secondary-light">
          &ldquo;{reviewExpanded && hasFullReview ? story.reviewFull : story.review}&rdquo;
        </blockquote>

        {hasFullReview && (
          <button
            type="button"
            onClick={() => setReviewExpanded((value) => !value)}
            aria-expanded={reviewExpanded}
            className="nudge-horizontal mt-4 inline-flex items-center gap-1.5 font-mono text-caption font-medium uppercase tracking-wider text-accent-purple"
          >
            {reviewExpanded ? "Show less" : "Read full review"}
            <ArrowRight size={12} weight="bold" />
          </button>
        )}
      </section>
    </article>
  );
}