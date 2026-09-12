import LatencyPanel from "./LatencyPanel";
import LedgerCard from "./LedgerCard";

export default function Features() {
  return (
    <section id="platform" className="w-full bg-surface-50 px-6 py-16 scroll-mt-16">
      <div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16"
        data-parallax
        data-parallax-y="12"
      >
        <div className="flex flex-col lg:col-span-4">
          <h2 className="mt-3 font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Why Nova Echo Leads the Voice AI Platform
          </h2>
          <p className="mt-4 max-w-md text-body-sm md:text-body-md leading-relaxed text-text-secondary-light">
            Pioneer of conversational intelligence since 2023, delivering human-like voice
            employees at scale.
          </p>
        </div>

        <div className="flex flex-col gap-6 lg:col-span-8">
          <LatencyPanel />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:col-span-12">
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
            eyebrow="All-in-one CRM"
            heading={
              <p className="font-display text-display-xs font-semibold tracking-tight text-text-primary-light">
                One platform for every conversation
              </p>
            }
            body="Every follow-up and sales activity stays connected instead of living in separate tools."
            footer="No separate tools"
          />
        </div>
      </div>
    </section>
  );
}