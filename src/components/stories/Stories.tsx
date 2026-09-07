import StoryCard from "@/components/shared/StoryCard";
import type { StoryData } from "@/components/shared/StoryCard";

const stories: StoryData[] = [
  {
    author: "Paul Suha",
    role: "Mayflower AI",
    industry: "Agency",
    photo: "/images/testimonials/imgi_3_Paul Suha.jpg",
    story: "Nova Echo is legendary. The whole team goes an extra mile to make sure you succeed. It ran by itself today without needing me at all. They asked me to turn it off because they couldn't handle the volume.",
    results: ["8 qualified transfers in 20 minutes", "6,500+ calls with zero transfer failures", "Ran fully autonomously with no human intervention"],
  },
  {
    author: "Stephanie Garzon",
    role: "The Content Well",
    industry: "Healthcare",
    photo: "/images/testimonials/imgi_6_stephanie_garzon_2.jpg",
    story: "Nova Echo delivered exactly what my chiropractic agency needed. With Nova Echo, our clients can focus more on crafting an exceptional patient experience and less on constantly being tied to the phone.",
    results: ["Frees up hours each week for staff", "Streamlined inbound reception and outbound lead nurturing", "Allowed front desk teams to focus on patient experience"],
  },
];

export default function Stories() {
  return (
    <section id="results" className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col" data-parallax data-parallax-y="12">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Real results from real customers. See why businesses trust Nova Echo.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-8">
          {stories.map((s) => (
            <StoryCard key={s.author} story={s} />
          ))}
        </div>

        <a
          href="/results"
          className="mt-8 self-center px-6 py-2.5 text-caption md:text-body-sm font-medium text-text-primary-light transition-colors hover:text-accent-magenta rounded-sm"
        >
          Show all stories
        </a>
      </div>
    </section>
  );
}
