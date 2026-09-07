import { BookOpen, Code, PlayCircle } from "@phosphor-icons/react/ssr";

const features = [
  { icon: BookOpen, title: "Complete API Reference", body: "Every endpoint, parameter, and response model documented in full." },
  { icon: Code, title: "Code Examples", body: "Drop-in snippets in Python, JavaScript, cURL, and more — ready to copy and run." },
  { icon: PlayCircle, title: "Interactive Playground", body: "Test API calls live with real-time responses, right from your browser." },
];

export default function ApiDocs() {
  return (
    <section className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <span className="inline-block px-4 py-1 text-caption font-semibold uppercase tracking-wider text-accent-purple bg-surface-50 border border-accent-purple/40 mb-6 rounded-sm">
            Coming Soon
          </span>

          <h1 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            API Documentation
          </h1>

          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Our API documentation is in active development and will be ready shortly.
            Sign up to get notified when it launches.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-3 lg:gap-8">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <article
                key={f.title}
                className="flex flex-col gap-3 border border-surface-200 bg-surface-100 rounded-md p-8 text-left min-h-45"
              >
                <div className="flex items-center justify-start">
                  <Icon className="text-accent-purple" size={24} weight="duotone" />
                </div>
                <h3 className="font-semibold text-body-md text-text-primary-light">
                  {f.title}
                </h3>
                <p className="flex-1 text-body-sm leading-relaxed text-text-secondary-light">
                  {f.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
