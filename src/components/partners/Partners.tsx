import { ArrowRight } from "@phosphor-icons/react/ssr";

type Program = {
  label: string;
  title: string;
  description: string;
  cta: string;
  benefits?: string[];
  commission?: string;
};

const programs: Program[] = [
  {
    label: "Resell",
    title: "Reseller",
    description:
      "Offer Nova Echo as part of your existing services without building the underlying technology yourself.",
    cta: "Explore reseller program",
    benefits: ["Partner support", "Sales resources", "Recurring revenue"],
  },
  {
    label: "Build",
    title: "Agency",
    description:
      "Build a dedicated voice AI business with Nova Echo powering the technology behind the scenes.",
    cta: "Explore agency program",
    benefits: ["White-label", "Client accounts", "Workflows", "Training", "Dedicated support"],
  },
  {
    label: "Refer",
    title: "Affiliate",
    description:
      "Refer businesses to Nova Echo and earn recurring commissions from the customers you bring in.",
    cta: "Join affiliate program",
    commission: "25%",
  },
];

export default function Partners() {
  return (
    <section id="partners" className="w-full scroll-mt-16 bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12" data-section-reveal>
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center" data-reveal-item>
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Build More Revenue With Nova Echo
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Whether you want to resell AI, launch a voice AI service, or earn from referrals,
            Nova Echo gives you the tools to make it happen.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3 lg:gap-6" data-reveal-item>
          {programs.map((program) => (
            <article
              key={program.title}
              className="flex flex-col rounded-md border border-surface-200 bg-surface-100 p-6 md:p-8"
            >
              <p className="font-mono text-caption font-medium uppercase tracking-wider text-accent-purple">
                {program.label}
              </p>
              <h3 className="mt-3 font-display text-display-sm font-semibold tracking-tight text-text-primary-light">
                {program.title}
              </h3>

              {program.commission ? (
                <div className="mt-5 border-t border-surface-200 pt-5">
                  <p className="font-display text-display-lg font-bold tracking-tight tabular-nums text-text-primary-light">
                    {program.commission}
                  </p>
                  <p className="mt-1 font-mono text-caption uppercase tracking-wider text-text-secondary-light">
                    Recurring commission
                  </p>
                </div>
              ) : null}

              <p className="mt-5 text-body-sm leading-relaxed text-text-secondary-light">
                {program.description}
              </p>

              {program.benefits ? (
                <ul className="mt-5 border-t border-surface-200">
                  {program.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="border-b border-surface-200 py-2.5 font-mono text-caption uppercase tracking-wider text-text-secondary-light"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              ) : null}

              <button
                type="button"
                className="group mt-auto inline-flex items-center gap-2 pt-6 text-body-sm font-semibold text-text-primary-light transition-colors hover:text-accent-purple"
              >
                {program.cta}
                <ArrowRight
                  size={14}
                  weight="bold"
                  className="text-accent-purple transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}