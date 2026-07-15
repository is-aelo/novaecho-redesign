import { Quotes } from "@phosphor-icons/react/ssr";

const stories = [
  {
    quote: "It ran by itself today without needing me at all. We got 8 qualified transfers in 20 minutes, and they asked me to turn it off because they couldn't handle it. Everything's great — no feedback other than positive.",
    author: "Paul Suha",
    role: "Mayflower Company",
  },
  {
    quote: "I was spending too much on a mediocre customer success team and outbound sales. I needed to outsource to cut costs without hurting performance. After demos with a few competitors, Nova Echo blew me away — best purchase I've made this year.",
    author: "Skyler B.",
    role: "Agency Owner",
  },
];

export default function Stories() {
  return (
    <section className="w-full bg-surface-50 px-6 py-16">
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
          {stories.map((story) => (
            <article
              key={story.author}
              className="flex flex-col border border-surface-200 bg-surface-100 p-8 text-left"
            >
              <Quotes size={28} weight="fill" className="text-accent-cyan/20 mb-4 shrink-0" />
              <blockquote className="flex-1 text-body-sm leading-relaxed text-text-secondary-light">
                {story.quote}
              </blockquote>
              <div className="mt-6 flex items-center gap-3 border-t border-surface-200 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-cyan/10 text-body-sm font-bold text-accent-cyan">
                  {story.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-body-sm text-text-primary-light">
                    {story.author}
                  </p>
                  <p className="text-caption text-text-secondary-light/60">
                    {story.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
