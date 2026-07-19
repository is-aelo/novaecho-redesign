import {
  Handshake,
  Buildings,
  ShareNetwork,
} from "@phosphor-icons/react/ssr";

const programs = [
  {
    title: "Reseller Programs",
    body: "Offer Nova Echo to your clients with generous commissions and full partner support.",
    icon: Buildings,
  },
  {
    title: "Agency Programs",
    body: "Build a voice AI agency around our platform with wholesale pricing and dedicated support.",
    icon: Handshake,
  },
  {
    title: "Affiliate Program",
    body: "Earn 25% recurring commissions by referring clients through our affiliate dashboard.",
    icon: ShareNetwork,
  },
];

export default function Partners() {
  return (
    <section className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Partner Programs
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Grow with Nova Echo. Whether you resell, build, or refer — there&#39;s a program for you.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3 lg:gap-8">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <article
                key={program.title}
                className="flex flex-col gap-3 border border-surface-200 bg-surface-100 rounded-md p-6 md:p-8 text-left min-h-45"
              >
                <div className="flex items-center justify-start">
                  <Icon className="text-accent-cyan" size={24} weight="duotone" />
                </div>
                <h3 className="font-bold text-body-sm md:text-body-md text-text-primary-light">
                  {program.title}
                </h3>
                <p className="flex-1 text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
                  {program.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
