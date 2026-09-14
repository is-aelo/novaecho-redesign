export type AgentId = "receptionist" | "speed-to-lead" | "outbound";

export type TranscriptTurn = {
  speaker: "ai" | "caller";
  text: string;
};

export type DemoScript = {
  id: AgentId;
  name: string;
  tagline: string;
  roiName: string;
  description: string;
  agentLabel: string;
  callIntent: string;
  company: string;
  callerTag: string;
  transcript: TranscriptTurn[];
  decision: string;
  actions: string[];
  energy: { amp: number; speed: number };
  roiExample: Record<string, number>;
};

export const AGENT_SCRIPTS: DemoScript[] = [
  {
    id: "receptionist",
    name: "Receptionist",
    tagline: "Front desk · booking",
    roiName: "Receptionist",
    description:
      "Greet clients, answer questions, qualify what they actually need, and schedule appointments — all through natural conversation.",
    agentLabel: "AI Receptionist",
    callIntent: "Book a facial for Friday morning",
    company: "Clarity Skin Studio",
    callerTag: "Rhea · Caller",
    transcript: [
      {
        speaker: "ai",
        text: "Hi, thanks for calling Clarity Skin Studio — this is Ava. How can I help you today?",
      },
      {
        speaker: "caller",
        text: "Hi, I'd like to book a facial for Friday morning.",
      },
      {
        speaker: "ai",
        text: "We have two openings Friday morning — our 45-minute classic or the 75-minute express glow. Which fits your morning better?",
      },
      {
        speaker: "caller",
        text: "The longer one — I've got nowhere to be until noon.",
      },
      {
        speaker: "ai",
        text: "The express glow at 9:00 it is, with Maria so you're with someone who knows your skin. I'll text the confirmation right now.",
      },
    ],
    decision: "Chose the longer treatment to match her open morning, not just the first free slot.",
    actions: [
      "Appointment scheduled · Fri 9:00 AM",
      "Esthetician matched (Maria)",
      "Confirmation texted",
    ],
    energy: { amp: 1, speed: 1 },
    roiExample: {
      totalCalls: 300,
      missedCalls: 25,
      holdCalls: 10,
      closeRate: 28,
      ticketValue: 350,
      receptionistCost: 2400,
      hoursSpent: 45,
      hourlyRate: 70,
    },
  },
  {
    id: "speed-to-lead",
    name: "Speed-to-Lead",
    tagline: "Instant lead follow-up",
    roiName: "Speed-to-Lead",
    description:
      "Call leads within 60 seconds, qualify what they actually need, and re-book hot prospects — transferring when a better fit exists.",
    agentLabel: "AI Speed-to-Lead",
    callIntent: "Qualify the lead and book a walkthrough",
    company: "Harbor Realty Group",
    callerTag: "Marcus · Lead",
    transcript: [
      {
        speaker: "ai",
        text: "Hi Marcus, this is Harbor Realty Group following up on your viewing request for the Granite Ave unit — do you have two minutes?",
      },
      {
        speaker: "caller",
        text: "Sure — what does move-in look like?",
      },
      {
        speaker: "ai",
        text: "Granite Ave clears about two weeks after closing. Is that timeline workable for you, or do you need to move in sooner?",
      },
      {
        speaker: "caller",
        text: "Sooner — I'm out of my lease by the tenth.",
      },
      {
        speaker: "ai",
        text: "Then Granite Ave is a risk. Let's switch you to the Wilson St unit, which is available immediately, and hold a walkthrough Thursday at 2:30 — I'll confirm the address now.",
      },
    ],
    decision: "Heard the 10-day deadline — re-routed him to an immediately available unit instead of forcing the original listing.",
    actions: [
      "Lead qualified (urgent timeline)",
      "Property re-matched (immediate)",
      "Appointment booked · Thu 2:30 PM",
    ],
    energy: { amp: 1.1, speed: 1.35 },
    roiExample: {
      totalCalls: 400,
      missedCalls: 20,
      holdCalls: 8,
      closeRate: 12,
      ticketValue: 2500,
      receptionistCost: 0,
      hoursSpent: 40,
      hourlyRate: 100,
    },
  },
  {
    id: "outbound",
    name: "Mass Outbound",
    tagline: "High-volume calls · handoff",
    roiName: "Mass Outbound Calling",
    description:
      "Upload your opt-in leads and let your agent call every lead, ask what fits them, and hand off the best matches to sales.",
    agentLabel: "AI Outbound Agent",
    callIntent: "Qualify the call and hand off to sales",
    company: "Peak Fitness Co.",
    callerTag: "Priya · Prospect",
    transcript: [
      {
        speaker: "ai",
        text: "Hi Priya, quick call from Peak Fitness Co. about your recent inquiry — is now a good time?",
      },
      {
        speaker: "caller",
        text: "I'm interested — send me the details.",
      },
      {
        speaker: "ai",
        text: "Happy to. Quick one first — are you brand-new to the gym, or coming back to training?",
      },
      {
        speaker: "caller",
        text: "Coming back — I lifted through college.",
      },
      {
        speaker: "ai",
        text: "Then we won't start you in the beginner track. I'll set you up on the Lifting Foundations plan with a free form check this week, and text over the pricing now.",
      },
    ],
    decision: "Matched the plan to her experience level — routed a returning lifter to the advanced track, not the beginner funnel.",
    actions: [
      "Prospect engaged",
      "Plan matched (Lifting)",
      "Coach handoff triggered",
    ],
    energy: { amp: 1.2, speed: 0.9 },
    roiExample: {
      totalCalls: 1200,
      missedCalls: 80,
      holdCalls: 0,
      closeRate: 4,
      ticketValue: 2500,
      receptionistCost: 0,
      hoursSpent: 60,
      hourlyRate: 50,
    },
  },
];