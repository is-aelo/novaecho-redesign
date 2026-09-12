import type { ReactNode } from "react";

type LedgerCardProps = {
  eyebrow: string;
  heading: ReactNode;
  body: string;
  footer: string;
};

export default function LedgerCard({ eyebrow, heading, body, footer }: LedgerCardProps) {
  return (
    <div className="flex flex-col rounded-md border border-surface-200 bg-surface-100 p-6 md:p-8">
      <p className="font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/70">
        {eyebrow}
      </p>
      <div className="mt-4">{heading}</div>
      <p className="mt-5 text-body-sm leading-relaxed text-text-secondary-light">{body}</p>
      <p className="mt-auto border-t border-surface-200 pt-4 font-mono text-caption font-medium uppercase tracking-wider text-text-secondary-light/70">
        {footer}
      </p>
    </div>
  );
}