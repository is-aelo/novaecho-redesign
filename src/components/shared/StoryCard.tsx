import Image from "next/image";
import { Quotes, CheckCircle } from "@phosphor-icons/react/ssr";

export interface StoryData {
  author: string;
  role: string;
  industry: string;
  story: string;
  results: string[];
  photo?: string;
}

export default function StoryCard({ story }: { story: StoryData }) {
  return (
    <article className="flex flex-col border border-surface-200 bg-surface-100 rounded-md p-6 md:p-8 text-left">
      <div className="flex items-start gap-3 mb-4">
        {story.photo ? (
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
            <Image src={story.photo} alt={story.author} fill className="object-cover" sizes="48px" />
          </div>
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-purple/10 text-caption md:text-body-sm font-semibold text-accent-purple md:h-12 md:w-12">
            {story.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-caption md:text-body-sm text-text-primary-light">
            <span className="font-semibold">{story.author}</span> <span className="text-text-secondary-light/40 mx-1">&bull;</span> <span className="font-normal">{story.role}</span>
          </p>
          <span className="mt-1 inline-block px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-accent-magenta bg-accent-magenta/10 rounded-sm">
            {story.industry}
          </span>
        </div>
      </div>

      <Quotes size={20} weight="fill" className="text-accent-purple/60 mb-2 shrink-0" />
      <blockquote className="flex-1 text-caption md:text-body-sm leading-relaxed text-text-secondary-light">
        {story.story}
      </blockquote>

      <div className="mt-5 bg-navy/5 border border-navy/10 rounded-sm p-3 md:p-4">
        <p className="text-caption font-semibold uppercase tracking-wider text-navy mb-3">
          Key Results
        </p>
        <div className="flex flex-col gap-2">
          {story.results.map((r) => (
            <p key={r} className="flex items-start gap-2 text-caption md:text-body-sm text-text-primary-light">
              <CheckCircle size={14} weight="fill" className="mt-0.5 shrink-0 text-navy" />
              {r}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
}
