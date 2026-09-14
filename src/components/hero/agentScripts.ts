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
    callIntent: "Qualify the lead and book a consult",
    company: "Clarity Skin Studio",
    callerTag: "Marcus · Lead",
    transcript: [
      {
        speaker: "ai",
        text: "Hi Marcus, this is Clarity Skin Studio following up on your quote request for the bridal glow package — do you have two minutes?",
      },
      {
        speaker: "caller",
        text: "Sure — I need it done before my wedding, on the 24th.",
      },
      {
        speaker: "ai",
        text: "The bridal glow runs two sessions, and the first has to land at least three weeks out — the 24th is too tight to hit. We do have a Rush Glow that fits a single 75-minute session the week before, if that works for you.",
      },
      {
        speaker: "caller",
        text: "Rush Glow it is — Thursday's the only day I can make.",
      },
      {
        speaker: "ai",
        text: "Then Thursday at 2:00 with Dana, our lead esthetician — she'll tailor it to your skin so it holds through the big day. I'll hold the slot and text the prep checklist now.",
      },
    ],
    decision: "Caught the wedding deadline — re-matched him to the single-session Rush Glow instead of letting the two-session plan miss the date.",
    actions: [
      "Lead qualified (wedding deadline)",
      "Treatment re-matched (Rush Glow)",
      "Appointment booked · Thu 2:00 PM",
    ],
    energy: { amp: 1.1, speed: 1.35 },
    roiExample: {
      totalCalls: 400,
      missedCalls: 20,
      holdCalls: 8,
      closeRate: 24,
      ticketValue: 950,
      receptionistCost: 0,
      hoursSpent: 35,
      hourlyRate: 80,
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
    callIntent: "Qualify the call and hand off to a specialist",
    company: "Clarity Skin Studio",
    callerTag: "Priya · Prospect",
    transcript: [
      {
        speaker: "ai",
        text: "Hi Priya, quick call from Clarity Skin Studio about our new HydraGlow membership — is now a good time?",
      },
      {
        speaker: "caller",
        text: "I'm interested — tell me more.",
      },
      {
        speaker: "ai",
        text: "Happy to. Quick one first — have you had a treatment with us before, or is this your first facial routine?",
      },
      {
        speaker: "caller",
        text: "First time — I've been managing with at-home masks.",
      },
      {
        speaker: "ai",
        text: "Then we won't start you in the strong-actives track right away. I'll set you on the Foundation facial membership with Maria as your esthetician, and text the pricing now.",
      },
    ],
    decision: "Matched her first-timer status — routed her into the Foundation plan instead of the strong-actives skincare funnel.",
    actions: [
      "Prospect engaged",
      "Membership matched (Foundation)",
      "Esthetician assigned (Maria)",
    ],
    energy: { amp: 1.2, speed: 0.9 },
    roiExample: {
      totalCalls: 1200,
      missedCalls: 80,
      holdCalls: 0,
      closeRate: 10,
      ticketValue: 600,
      receptionistCost: 0,
      hoursSpent: 45,
      hourlyRate: 60,
    },
  },
];