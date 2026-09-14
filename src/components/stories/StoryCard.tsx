import { ArrowRight } from "@phosphor-icons/react/ssr";

export type StoryCardData = {
  label: string;
  company: string;
  hook?: { value: string; caption: string };
  statement?: string;
  ledgers: string[];
  review: string;
  attribution: string;
};

export default function StoryCard({ story }: { story: StoryCardData }) {
  return (
    <article className="flex flex-col rounded-md border border-surface-200 bg-surface-100 p-6 md:p-8">
      <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
        {story.label}
      </p>
      <h3 className="mt-3 font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
        {story.company}
      </h3>

      <div className="mt-5 border-t border-surface-200 pt-5">
        {story.hook ? (
          <>
            <p className="font-display text-display-lg font-bold tracking-tight tabular-nums text-text-primary-light">
              {story.hook.value}
            </p>
            <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary-light">
              {story.hook.caption}
            </p>
          </>
        ) : (
          <p className="font-display text-display-md font-semibold tracking-tight text-text-primary-light">
            {story.statement}
          </p>
        )}
      </div>

      {story.ledgers.length > 0 && (
        <ul className="mt-5 border-t border-surface-200">
          {story.ledgers.map((ledger) => (
            <li
              key={ledger}
              className="border-b border-surface-200 py-2.5 font-mono text-caption uppercase tracking-wider text-text-secondary-light"
            >
              {ledger}
            </li>
          ))}
        </ul>
      )}

      <blockquote className="mt-5 border-t border-surface-200 pt-5 text-body-sm italic leading-relaxed text-text-secondary-light">
        &ldquo;{story.review}&rdquo;
      </blockquote>
      <p className="mt-3 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light">
        {story.attribution}
      </p>

      <a
        href="/results"
        className="group mt-auto inline-flex items-center gap-2 pt-6 text-body-sm font-semibold text-text-primary-light transition-colors hover:text-accent-purple"
      >
        Read the full story
        <ArrowRight
          size={14}
          weight="bold"
          className="text-accent-purple transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </a>
    </article>
  );
}