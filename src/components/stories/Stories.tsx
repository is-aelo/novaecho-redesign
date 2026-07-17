import { Quotes } from "@phosphor-icons/react/ssr";

const stories = [
  {
    author: "Paul Suha",
    role: "Mayflower AI",
    industry: "Agency",
    story: "Nova Echo is legendary. The whole team goes an extra mile to make sure you succeed. It ran by itself today without needing me at all. They asked me to turn it off because they couldn't handle the volume.",
    results: ["8 qualified transfers in 20 minutes", "6,500+ calls with zero transfer failures", "Ran fully autonomously with no human intervention"],
  },
  {
    author: "Stephanie Garzon",
    role: "The Content Well",
    industry: "Healthcare",
    story: "Nova Echo delivered exactly what my chiropractic agency needed. With Nova Echo, our clients can focus more on crafting an exceptional patient experience and less on constantly being tied to the phone.",
    results: ["Frees up hours each week for staff", "Streamlined inbound reception and outbound lead nurturing", "Allowed front desk teams to focus on patient experience"],
  },
];

export default function Stories() {
  return (
    <section id="results" className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Success Stories
          </h2>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Real results from real customers. See why businesses trust Nova Echo.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-8">
          {stories.map((s) => (
            <article
              key={s.author}
              className="flex flex-col border border-surface-200 bg-surface-100 p-8 text-left"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10 text-body-sm font-bold text-accent-cyan">
                  {s.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-body-sm text-text-primary-light">
                    {s.author} <span className="text-text-secondary-light/40 mx-1">&bull;</span> {s.role}
                    <span className="ml-2 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-magenta bg-accent-magenta/10 rounded-sm align-middle">
                      {s.industry}
                    </span>
                  </p>
                </div>
              </div>

              <Quotes size={20} weight="fill" className="text-accent-cyan/60 mb-2 shrink-0" />
              <blockquote className="flex-1 text-body-sm leading-relaxed text-text-secondary-light">
                {s.story}
              </blockquote>

              <div className="mt-5 border-t border-surface-200 pt-4">
                <p className="text-caption font-bold uppercase tracking-wider text-text-primary-light mb-2">
                  Key Results
                </p>
                <div className="flex flex-col gap-1.5">
                  {s.results.map((r) => (
                    <p key={r} className="text-body-sm text-text-primary-light">
                      {r}
                    </p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <a
          href="/results"
          className="mt-8 self-center border border-surface-700/30 px-6 py-2.5 text-body-sm font-semibold text-text-primary-light transition-all hover:border-surface-700/60"
        >
          Show all stories
        </a>
      </div>
    </section>
  );
}
