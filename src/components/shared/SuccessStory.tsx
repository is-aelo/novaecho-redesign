"use client";

import { useRef } from "react";
import StoryResult, { type StoryResultData, type StoryResultSize } from "./StoryResult";
import { useStoryResultReveal } from "./useStoryResultReveal";

export interface StoryData {
  author: string;
  company: string;
  industry: string;
  primary?: StoryResultData;
  supporting?: StoryResultData[];
  quote?: string;
  workflowSteps?: string[];
  workflowLabel?: string;
}

interface SuccessStoryProps {
  story: StoryData;
  emphasis?: "featured" | "secondary" | "compact";
}

const PRIMARY_SIZE: Record<"featured" | "secondary" | "compact", StoryResultSize> = {
  featured: "xl",
  secondary: "lg",
  compact: "md",
};

const SUPPORTING_SIZE: Record<"featured" | "secondary" | "compact", StoryResultSize> = {
  featured: "md",
  secondary: "md",
  compact: "sm",
};

function StoryMeta({
  company,
  author,
  industry,
}: {
  company: string;
  author: string;
  industry: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/60">
        Customer
      </p>
      <p className="font-display font-semibold tracking-tight text-text-primary-light">
        {company}
      </p>
      <p className="font-body text-body-sm text-text-secondary-light">{author}</p>
      <span className="mt-0.5 self-start rounded-sm px-1.5 py-0.5 font-mono text-caption font-medium uppercase tracking-wider text-accent-magenta bg-accent-magenta/10">
        {industry}
      </span>
    </div>
  );
}

function StoryQuote({ quote }: { quote: string }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="h-px w-full bg-surface-200" />
      <blockquote className="max-w-sm font-body text-body-sm leading-relaxed italic text-text-secondary-light">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </div>
  );
}

function WorkflowSection({
  steps,
  label,
  emphasis,
}: {
  steps: string[];
  label?: string;
  emphasis: "featured" | "secondary" | "compact";
}) {
  return (
    <div className={`flex flex-col ${emphasis === "featured" ? "mt-2 gap-3" : "gap-2"}`}>
      <div className="h-px w-full bg-surface-200" />
      {label && (
        <p className="mt-2 font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
          {label}
        </p>
      )}
      <div className="flex flex-col gap-1.5">
        {steps.map((step) => (
          <div key={step} className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-purple/40" />
            <p
              className={`font-body leading-snug text-text-secondary-light ${
                emphasis === "featured" ? "text-body-sm" : "text-caption"
              }`}
            >
              {step}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SuccessStory({
  story,
  emphasis = "secondary",
}: SuccessStoryProps) {
  const scopeRef = useRef<HTMLElement>(null);
  useStoryResultReveal(scopeRef);

  return (
    <article
      ref={scopeRef}
      className={`flex flex-col gap-6 text-left ${emphasis === "featured" ? "lg:gap-8" : ""}`}
    >
      <StoryMeta company={story.company} author={story.author} industry={story.industry} />

      {story.primary && (
        <div>
          <StoryResult result={story.primary} size={PRIMARY_SIZE[emphasis]} />
        </div>
      )}

      {story.supporting && story.supporting.length > 0 && (
        <div
          className={
            emphasis === "featured"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-3"
              : "flex flex-col gap-4"
          }
        >
          {story.supporting.map((result) => (
            <StoryResult key={result.label ?? result.statement} result={result} size={SUPPORTING_SIZE[emphasis]} />
          ))}
        </div>
      )}

      {story.quote && <StoryQuote quote={story.quote} />}

      {story.workflowSteps && (
        <WorkflowSection
          steps={story.workflowSteps}
          label={story.workflowLabel}
          emphasis={emphasis}
        />
      )}
    </article>
  );
}