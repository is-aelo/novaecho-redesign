export type AgentId = "receptionist" | "speed-to-lead" | "outbound";

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
  aiMessage: string;
  callerMessage: string;
  aiFollowUp: string;
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
      "Greet clients, answer questions, fill forms, and schedule appointments — all through natural conversation.",
    agentLabel: "AI Receptionist",
    callIntent: "Book a facial for Friday morning",
    company: "Bright Smile Studio",
    callerTag: "Ava · Caller",
    aiMessage:
      "Hi, thanks for calling Bright Smile Studio. How can I help you today?",
    callerMessage: "Hi, I'd like to book a facial for Friday morning.",
    aiFollowUp:
      "You're booked for Friday at 9:30 AM — I'll send a confirmation with everything you need.",
    actions: ["Appointment scheduled · Fri 9:30 AM", "Client information captured"],
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
      "Call leads within 60 seconds, deliver a dynamic pitch, and instantly transfer hot prospects or book appointments.",
    agentLabel: "AI Speed-to-Lead",
    callIntent: "Qualify the lead and book a walkthrough",
    company: "Harbor Realty Group",
    callerTag: "Marcus · Lead",
    aiMessage:
      "Hi Marcus, this is Harbor Realty Group following up on your viewing request — do you have two minutes?",
    callerMessage: "Sure — what does onboarding look like?",
    aiFollowUp:
      "I'll lock you in for Thursday at 2:30 PM and send the walkthrough details right over.",
    actions: ["Lead qualified", "Appointment booked · Thu 2:30 PM"],
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
      "Upload your opt-in leads and let your agent call every lead, pitch them, and hand off hot prospects.",
    agentLabel: "AI Outbound Agent",
    callIntent: "Qualify the call and hand off to sales",
    company: "Peak Fitness Co.",
    callerTag: "Priya · Prospect",
    aiMessage:
      "Hi Priya, quick call from Peak Fitness Co. about your recent inquiry — is now a good time?",
    callerMessage: "I'm interested — send me the details.",
    aiFollowUp:
      "Done — details are on their way, and I'm connecting you to sales now while you're free.",
    actions: ["Prospect engaged", "Hot lead identified", "Sales handoff triggered"],
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
