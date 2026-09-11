import type { Icon } from "@phosphor-icons/react";
import {
  ArrowsClockwise,
  CalendarCheck,
  ChatCircle,
  Lightning,
  Phone,
  PhoneIncoming,
  PuzzlePiece,
  Robot,
  Sparkle,
  UserFocus,
} from "@phosphor-icons/react";

export type AgentChoice = "receptionist" | "speed-to-lead" | "outbound" | "custom";

export type AgentItem = {
  id: AgentChoice;
  short: string;
  blurb: string;
  role: string;
  tagline: string;
  handles: { icon: Icon; text: string }[];
};

export type Voice = {
  label: string;
  value: string;
};

export const VOICES: Voice[] = [
  { label: "Margarita (F)", value: "margarita" },
  { label: "Troy (M)", value: "troy" },
  { label: "Chelsea (F)", value: "chelsea" },
  { label: "Mateo (M)", value: "mateo" },
  { label: "Valeria (F)", value: "valeria" },
  { label: "Margarita (F - Spanish)", value: "margarita-spanish" },
];

export const AGENTS: AgentItem[] = [
  {
    id: "receptionist",
    short: "Receptionist",
    blurb: "Front desk · booking",
    role: "Receptionist",
    tagline: "Answers every call, books appointments",
    handles: [
      { icon: PhoneIncoming, text: "Inbound calls" },
      { icon: CalendarCheck, text: "Appointment booking" },
      { icon: UserFocus, text: "Lead qualification" },
    ],
  },
  {
    id: "speed-to-lead",
    short: "Speed-to-Lead",
    blurb: "Instant lead follow-up",
    role: "Speed-to-Lead",
    tagline: "Calls leads within 60 seconds",
    handles: [
      { icon: Lightning, text: "Answers every lead" },
      { icon: Phone, text: "Follows up instantly" },
      { icon: CalendarCheck, text: "Books appointments" },
    ],
  },
  {
    id: "outbound",
    short: "Mass Outbound",
    blurb: "High-volume calls · handoff",
    role: "Mass Outbound",
    tagline: "Pitches your leads at scale",
    handles: [
      { icon: Phone, text: "High-volume outbound calling" },
      { icon: ChatCircle, text: "Delivers your pitch" },
      { icon: ArrowsClockwise, text: "Hot-lead handoff" },
    ],
  },
  {
    id: "custom",
    short: "Something else",
    blurb: "Custom role, built to fit",
    role: "Custom Agent",
    tagline: "Configured around your workflow",
    handles: [
      { icon: PuzzlePiece, text: "Custom workflow design" },
      { icon: Sparkle, text: "Hands-on implementation" },
      { icon: Robot, text: "Configured around your business" },
    ],
  },
];