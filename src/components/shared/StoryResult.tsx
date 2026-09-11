"use client";

export type StoryResultSize = "xl" | "lg" | "md" | "sm";

export interface StoryResultData {
  value?: string;
  statement?: string;
  label?: string;
}

interface StoryResultProps {
  result: StoryResultData;
  size?: StoryResultSize;
}

const NUMERIC_SIZE: Record<StoryResultSize, string> = {
  xl: "text-display-2xl",
  lg: "text-display-xl",
  md: "text-display-md",
  sm: "text-display-sm",
};

const STATEMENT_SIZE: Record<StoryResultSize, string> = {
  xl: "text-display-lg",
  lg: "text-display-md",
  md: "text-display-sm",
  sm: "text-body-md",
};

const STATEMENT_WEIGHT: Record<StoryResultSize, string> = {
  xl: "font-bold",
  lg: "font-bold",
  md: "font-semibold",
  sm: "font-semibold",
};

export default function StoryResult({ result, size = "md" }: StoryResultProps) {
  if (result.value) {
    return (
      <div data-story-result className="flex flex-col gap-1.5">
        <p
          data-story-count
          data-value={result.value}
          className={`font-display font-bold leading-none tracking-tight tabular-nums text-text-primary-light ${NUMERIC_SIZE[size]}`}
        >
          {result.value}
        </p>
        {result.label && (
          <p
            data-story-label
            className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light"
          >
            {result.label}
          </p>
        )}
      </div>
    );
  }

  return (
    <div data-story-result className="flex flex-col gap-1.5">
      <p
        className={`font-display ${STATEMENT_WEIGHT[size]} leading-tight tracking-tight text-text-primary-light ${STATEMENT_SIZE[size]}`}
      >
        {result.statement}
      </p>
    </div>
  );
}