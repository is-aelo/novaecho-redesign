import { ArrowRight } from "@phosphor-icons/react/ssr";
import StoryCard, { type StoryCardData } from "./StoryCard";

const stories: StoryCardData[] = [
  {
    label: "Agency",
    company: "Mayflower AI",
    hook: { value: "8", caption: "Qualified transfers in 20 minutes" },
    ledgers: ["6,500+ calls handled", "0 transfer failures"],
    review:
      "Nova Echo Is Legendary. Genuinely such a pleasure to work with a company like this. Team is insanely helpful, literally treat you like family.",
    attribution: "Paul Suha · Mayflower AI",
  },
  {
    label: "Healthcare · Agency",
    company: "The Content Well",
    statement: "More time for patient experience",
    ledgers: [
      "Hours freed for staff",
      "Inbound and outbound workflows streamlined",
      "Front desk focused on patient experience",
    ],
    review:
      "Our clients can focus more on crafting an exceptional patient experience and less on constantly being tied to the phone.",
    attribution: "Stephanie Garzon · The Content Well",
  },
];

export default function Stories() {
  return (
    <section id="results" className="w-full bg-surface-50 py-16 scroll-mt-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12" data-section-reveal>
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center" data-reveal-item>
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Real results from real customers. See why businesses trust Nova Echo.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-6" data-reveal-item>
          {stories.map((story) => (
            <StoryCard key={story.company} story={story} />
          ))}
        </div>

        <a
          href="/results"
          className="btn-outline-light mt-8 self-center lg:mt-10"
          data-reveal-item
        >
          All Stories
          <ArrowRight size={16} weight="bold" />
        </a>
      </div>
    </section>
  );
}