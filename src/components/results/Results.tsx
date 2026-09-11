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
      "When I signed up with Nova Echo, my vision was to help chiropractic offices streamline both inbound reception and outbound lead nurturing. That's exactly what it delivered.",
  },
  {
    author: "Asha Jenkins",
    company: "Self-employed",
    industries: ["Insurance"],
    avatar: "/images/testimonials/imgi_7_asha_jenkins_stock.jpg",
    impacts: [
      { icon: "growth", text: "Productivity multiplied" },
      { icon: "adaptability", text: "AI adapts quickly to new campaigns" },
      { icon: "appointment", text: "Handles objections and books appointments autonomously" },
    ],
    review: "A true game-changer in conversational AI.",
  },
  {
    author: "Michael J. Reyloc",
    company: "John's Spring and Suspension",
    industries: ["Automotive"],
    avatar: "/images/testimonials/imgi_4_Michael Reyloc.jpg",
    impacts: [
      { icon: "automation", text: "AI incorporated into daily operations" },
      { icon: "support", text: "Attentive, responsive support team" },
    ],
    review: "Amazing experience and great product. Joey and his team are awesome.",
  },
  {
    author: "Yousif Thonee",
    company: "AI Magic",
    industries: ["Agency", "Insurance"],
    avatar: "/images/testimonials/imgi_8_Yousif Thonee.jpg",
    impacts: [
      { icon: "conversation", text: "Natural real-time conversation" },
      { icon: "voice", text: "No awkward pauses" },
      { icon: "clarity", text: "Clear, natural voice quality" },
      { icon: "scale", text: "Scales without headaches" },
    ],
    review:
      "Great tech, even better team. I've tried out a bunch of AI voice agents, but Nova Echo really stood out to me.",
  },
  {
    author: "Karam Thonee",
    company: "AI Magic",
    industries: ["Agency", "Real Estate"],
    avatar: "/images/testimonials/imgi_9_Karam Thonee.jpg",
    impacts: [
      { icon: "endtoend", text: "Seamless end-to-end experience" },
      { icon: "onboarding", text: "Seamless onboarding and setup" },
      { icon: "quick", text: "Clear communication and quick responses" },
    ],
    review:
      "I had a fantastic experience with Nova Echo. What stood out the most was how seamless the entire process felt.",
  },
  {
    author: "Sedric Louissaint",
    company: "Show Up Show Out Security",
    industries: ["Security"],
    avatar: "/images/testimonials/imgi_2_Sedric Louissaint.jpg",
    impacts: [
      { icon: "transformed", text: "Customer communications transformed" },
      { icon: "smarter", text: "A smarter way to run customer communications" },
    ],
    review:
      "I recommend definitely getting plugged in with Nova Echo if you're looking to do business the smart way and not get left behind.",
  },
  {
    author: "Christopher Weigart",
    company: "Pool Table Pros",
    industries: ["Home Services"],
    avatar: "/images/testimonials/imgi_5_christopher_weigart.jpg",
    impacts: [
      { icon: "receptionist", text: "The best AI receptionist we tried" },
      { icon: "reliability", text: "Reliable, high-quality call handling" },
    ],
    review: "Awesome AI receptionist!",
  },
  {
    author: "Tyler Lynch",
    company: "Ragnar Real Estate",
    industries: ["Real Estate"],
    avatar: "/images/testimonials/Tyler Lynch.jpg",
    impacts: [
      { icon: "quick", text: "Impact from day one" },
      { icon: "standout", text: "Service and AI capability beyond expectations" },
    ],
    review: "This is far exceeding my expectation and literally just started.",
  },
];

export default function Results() {
  return (
    <section className="w-full bg-surface-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h1 className="font-display text-display-md lg:text-display-lg font-semibold leading-tight tracking-tight text-text-primary-light">
            Results & Customer Success Stories
          </h1>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Every card is one customer&apos;s story — who they are, what
            changed after Nova Echo, and what they had to say about it.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-8">
          {stories.map((story) => (
            <SuccessStoryCard key={`${story.author}-${story.company}`} story={story} />
          ))}
        </div>
      </div>
    </section>
  );
}