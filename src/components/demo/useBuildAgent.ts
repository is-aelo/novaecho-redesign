import { useState } from "react";
import type { AgentChoice } from "./agents";

export type FormField = "fullName" | "email" | "company" | "phone" | "instructions";

export type BuildStep = 1 | 2 | 3 | "done";

export type BuildAgentState = {
  step: BuildStep;
  agent: AgentChoice | null;
  voice: string;
  fullName: string;
  email: string;
  company: string;
  phone: string;
  instructions: string;
  selectAgent: (agent: AgentChoice) => void;
  selectVoice: (voice: string) => void;
  updateField: (field: FormField, value: string) => void;
  goBack: () => void;
  goNext: () => void;
  submit: () => void;
  reset: () => void;
};

export default function useBuildAgent(): BuildAgentState {
  const [step, setStep] = useState<BuildStep>(1);
  const [agent, setAgent] = useState<AgentChoice | null>(null);
  const [voice, setVoice] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    instructions: "",
  });

  function selectAgent(value: AgentChoice) {
    setAgent(value);
    setStep(2);
  }

  function selectVoice(value: string) {
    setVoice(value);
  }

  function updateField(field: FormField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function goBack() {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  }

  function goNext() {
    if (step === 2) setStep(3);
  }

  function submit() {
    setStep("done");
  }

  function reset() {
    setStep(1);
    setAgent(null);
    setVoice("");
    setForm({ fullName: "", email: "", company: "", phone: "", instructions: "" });
  }

  return {
    step,
    agent,
    voice,
    fullName: form.fullName,
    email: form.email,
    company: form.company,
    phone: form.phone,
    instructions: form.instructions,
    selectAgent,
    selectVoice,
    updateField,
    goBack,
    goNext,
    submit,
    reset,
  };
}