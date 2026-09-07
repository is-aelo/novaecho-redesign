export type AgentId = "receptionist" | "speed-to-lead" | "outbound";

export type DemoScript = {
  id: AgentId;
  name: string;
  roiName: string;
  roiCta: string;
  description: string;
  agentLabel: string;
  company: string;
  callerTag: string;
  aiMessage: string;
  callerMessage: string;
  aiFollowUp: string;
  actions: string[];
  energy: { amp: number; speed: number };
};

export const AGENT_SCRIPTS: DemoScript[] = [
  {
    id: "receptionist",
    name: "Receptionist",
    roiName: "Receptionist",
    roiCta: "Calculate Receptionist ROI",
    description:
      "Greet clients, answer questions, fill forms, and schedule appointments — all through natural conversation.",
    agentLabel: "AI Receptionist",
    company: "Bright Smile Studio",
    callerTag: "Ava · Caller",
    aiMessage:
      "Hi, thanks for calling Bright Smile Studio. How can I help you today?",
    callerMessage: "Hi, I'd like to book a facial for Friday morning.",
    aiFollowUp:
      "You're booked for Friday at 9:30 AM — I'll send a confirmation with everything you need.",
    actions: ["Appointment scheduled · Fri 9:30 AM", "Client information captured"],
    energy: { amp: 1, speed: 1 },
  },
  {
    id: "speed-to-lead",
    name: "Speed-to-Lead",
    roiName: "Speed-to-Lead",
    roiCta: "Calculate Speed-to-Lead ROI",
    description:
      "Call leads within 60 seconds, deliver a dynamic pitch, and instantly transfer hot prospects or book appointments.",
    agentLabel: "AI Speed-to-Lead",
    company: "Harbor Realty Group",
    callerTag: "Marcus · Lead",
    aiMessage:
      "Hi Marcus, this is Harbor Realty Group following up on your viewing request — do you have two minutes?",
    callerMessage: "Sure — what does onboarding look like?",
    aiFollowUp:
      "I'll lock you in for Thursday at 2:30 PM and send the walkthrough details right over.",
    actions: ["Lead qualified", "Appointment booked · Thu 2:30 PM"],
    energy: { amp: 1.1, speed: 1.35 },
  },
  {
    id: "outbound",
    name: "Mass Outbound",
    roiName: "Mass Outbound Calling",
    roiCta: "Calculate Outbound ROI",
    description:
      "Upload your opt-in leads and let your agent call every lead, pitch them, and hand off hot prospects.",
    agentLabel: "AI Outbound Agent",
    company: "Peak Fitness Co.",
    callerTag: "Priya · Prospect",
    aiMessage:
      "Hi Priya, quick call from Peak Fitness Co. about your recent inquiry — is now a good time?",
    callerMessage: "I'm interested — send me the details.",
    aiFollowUp:
      "Done — details are on their way, and I'm connecting you to sales now while you're free.",
    actions: ["Prospect engaged", "Hot lead identified", "Sales handoff triggered"],
    energy: { amp: 1.2, speed: 0.9 },
  },
];
