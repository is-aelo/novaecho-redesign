import {
  Lightning,
  Headphones,
  ChatCircleDots,
  SquaresFour,
} from "@phosphor-icons/react/ssr";

const features = [
  {
    title: "Low Latency",
    body: "Near-instant voice responses powered by state-of-the-art infrastructure, delivering conversations that feel completely natural.",
    icon: Lightning,
  },
  {
    title: "High Call Capacity",
    body: "Each Echo handles 10,000+ calls per day, so your business never misses a lead or opportunity.",
    icon: Headphones,
  },
  {
    title: "Priority Support",
    body: "Expert support team with years of voice AI experience, ready to help you get the most out of your Echos.",
    icon: ChatCircleDots,
  },
  {
    title: "All-in-One CRM",
    body: "AI calls, human calls, texts, emails, and social media — all in one platform for multi-channel support and sales.",
    icon: SquaresFour,
  },
];

export default function Features() {
  return (
    <section id="platform" className="w-full px-6 py-16 bg-surface-50 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Why Nova Echo Leads the <span className="hero-text-highlight">Voice AI Platform</span>
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Pioneer of conversational intelligence since 2023, delivering human-like voice employees at scale.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-6">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.title}
                className="border border-surface-200 bg-surface-100 rounded-md p-6 md:p-8 flex flex-col gap-3 min-h-45 text-left"
              >
                <div className="flex items-center justify-start">
                  <Icon className="text-accent-purple" size={24} weight="duotone" />
                </div>
                <h3 className="font-semibold text-body-sm md:text-body-md text-text-primary-light">
                  {feature.title}
                </h3>
                <p className="text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
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
