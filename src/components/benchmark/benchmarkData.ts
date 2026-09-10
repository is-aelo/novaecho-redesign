export type BenchmarkRow = {
  metric: string;
  nova: string;
  comp: string;
  human: string;
};

export type BenchmarkCategory = {
  key: string;
  label: string;
  rows: BenchmarkRow[];
};

export type BenchmarkModule = {
  index: string;
  name: string;
  metric: string;
  support: string;
  visual: "voice" | "response" | "calls" | "integrations" | "timeline";
};

export const benchmarkModules: BenchmarkModule[] = [
  {
    index: "01",
    name: "Voice Quality",
    metric: "Hyper human-like",
    support:
      "Natural-sounding conversations designed to feel less like traditional automated systems and more like real interactions.",
    visual: "voice",
  },
  {
    index: "02",
    name: "Response Time",
    metric: "Sub-1500ms",
    support:
      "Fast responses help keep conversations flowing naturally without long pauses between turns.",
    visual: "response",
  },
  {
    index: "03",
    name: "Calling Capacity",
    metric: "1,500+ calls / min",
    support:
      "Built for high-volume calling, allowing businesses to handle more conversations without scaling headcount at the same rate.",
    visual: "calls",
  },
  {
    index: "04",
    name: "Integrations",
    metric: "10+ native · 3,000+ third-party",
    support:
      "Connect Nova Echo with the tools your team already relies on across CRM, communication, scheduling, and other workflows.",
    visual: "integrations",
  },
  {
    index: "05",
    name: "Implementation",
    metric: "Go live in as little as 48 hours",
    support:
      "Move from agent setup and testing to launch without a lengthy implementation cycle.",
    visual: "timeline",
  },
];

export const benchmarkCategories: BenchmarkCategory[] = [
  {
    key: "voice",
    label: "Voice",
    rows: [
      {
        metric: "Voice Quality",
        nova: "Hyper human-like",
        comp: "Human-like (less natural)",
        human: "Human",
      },
      {
        metric: "Latency (Phone Calls)",
        nova: "Sub-1500ms",
        comp: "2000–3000ms",
        human: "Varies; human reaction time",
      },
      {
        metric: "Voice Customization",
        nova: "Extensive tone & speed control",
        comp: "Basic options only",
        human: "None",
      },
      {
        metric: "Languages Supported",
        nova: "35+",
        comp: "35+",
        human: "1–2",
      },
    ],
  },
  {
    key: "scale",
    label: "Scale",
    rows: [
      {
        metric: "Calling Capacity",
        nova: "1500+ calls/minute",
        comp: "10–60 calls/minute",
        human: "1 call/minute",
      },
      {
        metric: "Accuracy & Consistency",
        nova: "Highly consistent",
        comp: "Frequent script errors",
        human: "Prone to mistakes",
      },
    ],
  },
  {
    key: "operations",
    label: "Operations",
    rows: [
      {
        metric: "Support",
        nova: "24/7 White-Glove + Slack",
        comp: "9–5 email support",
        human: "N/A",
      },
      {
        metric: "Ease of Use",
        nova: "Simple, intuitive",
        comp: "Often overly complex",
        human: "N/A",
      },
      {
        metric: "Integrations",
        nova: "10+ native, 3000+ third-party",
        comp: "Third-party only",
        human: "Limited by learning curve",
      },
      {
        metric: "Implementation Speed",
        nova: "48 hours",
        comp: "2–4 weeks",
        human: "3–6 weeks",
      },
    ],
  },
  {
    key: "business",
    label: "Business",
    rows: [
      {
        metric: "Pricing Transparency",
        nova: "Fully transparent",
        comp: "Hidden fees common",
        human: "N/A",
      },
      {
        metric: "Speed-to-Lead Time",
        nova: "< 1 minute",
        comp: "< 1 minute",
        human: "5–120 minutes",
      },
      {
        metric: "Data & Insights",
        nova: "Full analytics & reporting",
        comp: "Limited dashboards",
        human: "Minimal recall",
      },
    ],
  },
];

export const benchmarkColumnHeaders = [
  "Metric",
  "Nova Echo AI",
  "Competitors",
  "Humans",
];