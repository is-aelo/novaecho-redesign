import SuccessStoryCard, { type SuccessStoryCardData } from "@/components/shared/SuccessStoryCard";

const stories: SuccessStoryCardData[] = [
  {
    author: "Paul Suha",
    company: "Mayflower AI",
    industries: ["Agency"],
    avatar: "/images/testimonials/imgi_3_Paul Suha.jpg",
    impacts: [
      { icon: "transfer", text: "8 qualified transfers in 20 minutes" },
      { icon: "phone", text: "6,500+ calls handled" },
      { icon: "reliability", text: "0 transfer failures" },
    ],
    review:
      "Nova Echo Is Legendary. Genuinely such a pleasure to work with a company like this. Team is insanely helpful, literally treat you like family.",
  },
  {
    author: "Stephanie Garzon",
    company: "The Content Well",
    industries: ["Healthcare", "Agency"],
    avatar: "/images/testimonials/imgi_6_stephanie_garzon_2.jpg",
    impacts: [
      { icon: "patient", text: "More time for patient experience" },
      { icon: "time", text: "Hours freed for staff" },
      { icon: "workflow", text: "Inbound and outbound workflows streamlined" },
      { icon: "focus", text: "Front desk focused on patient experience" },
    ],
    review:
      "Our clients can focus more on crafting an exceptional patient experience and less on constantly being tied to the phone.",
  },
];

export default function Stories() {
  return (
    <section className="w-full bg-surface-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Real results from real customers. See why businesses trust Nova Echo.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3 lg:gap-8">
          <SuccessStoryCard key="paul-suha" story={stories[0]} />
          <div className="lg:col-span-2">
            <SuccessStoryCard key="stephanie-garzon" story={stories[1]} />
          </div>
        </div>

        <a
          href="/results"
          className="mt-8 self-center px-6 py-2.5 text-caption md:text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-magenta rounded-btn"
        >
          Show all stories
        </a>
      </div>
    </section>
  );
}
