import StoryCard from "@/components/shared/StoryCard";
import type { StoryData } from "@/components/shared/StoryCard";

const stories: StoryData[] = [
  {
    author: "Paul Suha",
    role: "Mayflower AI",
    industry: "Agency",
    story: "Nova Echo is legendary. Genuinely such a pleasure to work with a company like this. Team is insanely helpful, literally treat you like family. Every random question, every 'how do I set up an automation' they would help me out. DM, Slack, even hopping on a Zoom call. The whole team goes an extra mile to make sure you succeed which isn't something you see too often. The AI itself is incredible too. It ran by itself today without needing me at all. They asked me to turn it off because they couldn't handle the volume. Everything's great — no feedback other than positive.",
    results: ["8 qualified transfers in 20 minutes", "6,500+ calls with zero transfer failures", "Ran fully autonomously with no human intervention"],
  },
  {
    author: "Stephanie Garzon",
    role: "The Content Well",
    industry: "Healthcare, Agency",
    story: "When I signed up with Nova Echo, my vision was to help chiropractic offices streamline both inbound reception and outbound lead nurturing. That's exactly what it delivered. What I've always prided myself on is the ability to make clients' lives easier, not just for the doctors themselves but also for their front desk teams. With Nova Echo, they can focus more on crafting an exceptional patient experience and less on constantly being tied to the phone. Nova Echo delivered exactly what my chiropractic agency needed.",
    results: ["Frees up hours each week for staff", "Streamlined inbound reception and outbound lead nurturing", "Allowed front desk teams to focus on patient experience"],
  },
  {
    author: "Yousif Thonee",
    role: "AI Magic",
    industry: "Agency, Insurance",
    story: "I've tried out a bunch of AI voice agents, but Nova Echo really stood out to me. The latency is what got my attention first, because with most systems there's that weird pause that makes the whole thing feel fake, but with Nova Echo it feels like you're actually having a real conversation. The voice quality is solid too, not that flat robotic sound I've run into elsewhere, but clear and natural. The platform itself has been smooth, easy to work with, and scales without any headaches. On top of that, Joey and the Nova Echo team have been awesome — super responsive, professional, and just easy to work with, which honestly made the whole experience even better.",
    results: ["Natural real-time conversation with no awkward pauses", "Clear, natural voice quality — not robotic", "Platform scales without headaches"],
  },
  {
    author: "Asha Jenkins",
    role: "Insurance",
    industry: "Insurance",
    story: "Nova Echo is on another level. Their conversational AI isn't just 'smart' — it's professional, reliable, and feels genuinely human in tone and delivery. It books appointments, handles objections, and mirrors my business tone exactly as instructed. I will add it is simple, but hard to setup. I HIGHLY recommend using the pros to complete your initial setup. What sets Nova Echo apart is how seamless the experience is. The setup was truly simple, the AI adapts quickly to different campaigns, and the support team is amazingly responsive and invested in my success. I can confidently say Nova Echo has multiplied my productivity and allowed me to scale outreach without sacrificing quality.",
    results: ["Multiplied productivity across outreach campaigns", "AI adapts quickly to different campaigns", "Handles objections and books appointments autonomously"],
  },
  {
    author: "Karam Thonee",
    role: "AI Magic",
    industry: "Agency, Real Estate",
    story: "I had a fantastic experience with Nova Echo. From the start, their team was professional, attentive, and genuinely committed to delivering great results. What stood out most was how seamless the entire process felt — clear communication, quick responses, and a real sense that they cared about getting things right. I had a fantastic experience with Nova Echo. What stood out most was how seamless the entire process felt.",
    results: ["Seamless onboarding and setup process", "Clear communication and quick responses from the team"],
  },
  {
    author: "Michael J. Reyloc",
    role: "John's Spring and Suspension",
    industry: "Automotive",
    story: "Amazing experience and great product. Joey and his team are awesome. They are attentive and super responsive. They absolutely care about what they do and I feel that they have a genuine interest in the success of my business. The technology is fascinating and it's awesome incorporating it at my level. The team goes above and beyond to ensure everything runs smoothly.",
    results: ["Attentive, responsive support team", "Successfully incorporated AI into daily business operations"],
  },
  {
    author: "Sedric Louissaint",
    role: "Show Up Show Out Security",
    industry: "Security",
    story: "I recommend definitely getting plugged in with Nova Echo if you're looking to do business the smart way and not get left behind. The technology has made a real difference in how we handle our customer communications.",
    results: ["Transformed customer communication approach"],
  },
  {
    author: "Christopher Weigart",
    role: "Pool Table Pros",
    industry: "Home Services",
    story: "Their AI receptionist is better than any other I could find on the market. Awesome AI receptionist! We tried multiple solutions before finding Nova Echo and nothing else compared to the quality and reliability.",
    results: ["Best AI receptionist compared to competitors", "Reliable, high-quality call handling"],
  },
  {
    author: "Tyler Lynch",
    role: "Ragnar Real Estate",
    industry: "Real Estate",
    story: "This is far exceeding my expectation and literally just started. The level of service and AI capability has already made a noticeable impact on our real estate operations from day one.",
    results: ["Exceeded expectations from day one", "Immediate noticeable impact on operations"],
  },
];

export default function Results() {
  return (
    <section className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col">
        <div className="flex max-w-3xl flex-col items-start text-left lg:mx-auto lg:items-center lg:text-center">
          <h1 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Results & Customer Success Stories
          </h1>
          <p className="mt-3 max-w-2xl text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Real clients. Real results. Real echoing impact.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-6 lg:mt-6 lg:grid-cols-2 lg:gap-8">
          {stories.map((s) => (
            <StoryCard key={s.author} story={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
