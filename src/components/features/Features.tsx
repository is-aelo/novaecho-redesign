import {
  ChatCircleDots,
  ChartLineUp,
  GlobeHemisphereWest,
  Lightning,
} from "@phosphor-icons/react/ssr";

const features = [
  {
    title: "Human-like Conversations",
    body: "Deliver natural, context-aware voice experiences that feel effortless for every customer.",
    icon: ChatCircleDots,
  },
  {
    title: "Instant Scale",
    body: "Handle surges in demand without adding headcount or sacrificing quality.",
    icon: Lightning,
  },
  {
    title: "Multilingual by Design",
    body: "Support global audiences with fluid language switching and localized experience.",
    icon: GlobeHemisphereWest,
  },
  {
    title: "Operational Insight",
    body: "Turn every interaction into actionable intelligence for your team and leadership.",
    icon: ChartLineUp,
  },
];

export default function Features() {
  return (
    <section className="w-full px-6 py-12 bg-surface-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 className="font-display text-display-md md:text-display-lg font-bold leading-tight tracking-tight text-text-primary md:whitespace-nowrap">
            Why Nova Echo Leads the Voice AI Evolution
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm md:text-body-md leading-relaxed text-text-secondary md:whitespace-nowrap">
            Pioneer of conversational intelligence since 2023, delivering human-like voice employees at scale.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="border border-surface-800 bg-surface-900 p-8 flex flex-col h-full justify-between gap-3 min-h-45"
              >
                <div className="flex items-center justify-start">
                  <Icon className="text-accent-cyan" size={24} weight="duotone" />
                </div>
                <h3 className="font-bold text-[1rem] text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-text-secondary">
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
