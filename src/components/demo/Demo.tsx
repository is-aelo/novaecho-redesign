"use client";

import { useState, useRef, useEffect } from "react";
import { CaretDown, Check } from "@phosphor-icons/react";

const voices = [
  { label: "Margarita (F)", value: "margarita" },
  { label: "Troy (M)", value: "troy" },
  { label: "Chelsea (F)", value: "chelsea" },
  { label: "Mateo (M)", value: "mateo" },
  { label: "Valeria (F)", value: "valeria" },
  { label: "Margarita (F - Spanish)", value: "margarita-spanish" },
];

const inputClass =
  "w-full bg-transparent text-caption md:text-body-sm text-text-primary-light placeholder:text-text-secondary-light/30 outline-none";

const fieldBorderClass =
  "border border-surface-700/30 focus-within:border-accent-cyan rounded-sm transition-[border-color]";

export default function Demo() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    voice: "",
    instructions: "",
  });

  const [voiceOpen, setVoiceOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setVoiceOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedVoice = voices.find((v) => v.value === form.voice);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <section id="book-call" className="w-full bg-surface-50 px-6 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col justify-center">
          <h2 className="font-display text-display-md lg:text-display-lg font-bold leading-tight tracking-tight text-text-primary-light">
            Still in doubt?
          </h2>
          <p className="mt-4 max-w-lg text-body-sm lg:text-body-md leading-relaxed text-text-secondary-light">
            Book a discovery call and hear your custom AI agent in action.
          </p>
        </div>

        <div className="w-full border border-surface-700/50 bg-surface-100 rounded-md p-6 lg:max-w-lg lg:p-8">
          <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
            <label className="flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Full Name
              </span>
              <div className={fieldBorderClass}>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  placeholder="Jane Reyes"
                  className={`${inputClass} px-3 py-2.5`}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Email
              </span>
              <div className={fieldBorderClass}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  className={`${inputClass} px-3 py-2.5`}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Phone Number
              </span>
              <div className={fieldBorderClass}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className={`${inputClass} px-3 py-2.5`}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Company Name
              </span>
              <div className={fieldBorderClass}>
                <input
                  type="text"
                  value={form.company}
                  onChange={(e) => update("company", e.target.value)}
                  placeholder="Your company name"
                  className={`${inputClass} px-3 py-2.5`}
                />
              </div>
            </label>

            <div ref={dropdownRef} className="relative flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                Select Voice
              </span>
              <button
                type="button"
                onClick={() => setVoiceOpen((prev) => !prev)}
                className={`flex items-center justify-between ${fieldBorderClass} px-3 py-2.5 text-caption md:text-body-sm text-left cursor-pointer rounded-sm ${
                  selectedVoice ? "text-text-primary-light" : "text-text-secondary-light/30"
                }`}
              >
                <span className={inputClass}>
                  {selectedVoice ? selectedVoice.label : "Choose a voice"}
                </span>
                <CaretDown
                  size={14}
                  className={`shrink-0 text-text-secondary-light/40 transition-transform ${
                    voiceOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {voiceOpen && (
                <div className="absolute left-0 right-0 bottom-full z-10 mb-1 border border-surface-200 bg-surface-100 rounded-sm">
                  {voices.map((v) => (
                    <button
                      key={v.value}
                      type="button"
                      onClick={() => {
                        update("voice", v.value);
                        setVoiceOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-3 py-2.5 text-body-sm text-left transition-colors hover:bg-accent-magenta ${
                        form.voice === v.value
                          ? "text-accent-cyan"
                          : "text-text-primary-light"
                      }`}
                    >
                      <Check
                        size={14}
                        weight="bold"
                        className={`shrink-0 ${
                          form.voice === v.value ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      {v.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-caption font-semibold uppercase tracking-wider text-text-secondary-light">
                System Instructions
              </span>
              <div className={fieldBorderClass}>
                <textarea
                  rows={2}
                  value={form.instructions}
                  onChange={(e) => update("instructions", e.target.value)}
                  placeholder="Define how your AI agent should behave during calls..."
                  className={`${inputClass} resize-none px-3 py-2.5`}
                />
              </div>
            </label>

            <button type="submit" className="btn-primary w-full">
              Request a Demo Call
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
