"use client";

import { useState } from "react";
import Image from "next/image";
import { List, X } from "@phosphor-icons/react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Agents", href: "#solutions" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Pricing", href: "#pricing" },
];

const OFFSET = 64;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const scrollTo = useSmoothScroll(OFFSET);

  function handleNav(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
    scrollTo(href, e);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center px-4 py-3">
      <div className="flex w-full max-w-5xl items-center justify-between rounded-xl bg-white/70 px-5 py-2.5 backdrop-blur-xl shadow-sm border border-white/20">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex md:hidden items-center justify-center text-text-primary-light"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>

          <a href="/" className="flex items-center gap-2.5">
            <Image
              src="/images/novaecho-logo.png"
              alt="Nova Echo logo"
              width={28}
              height={28}
              style={{ width: "auto", height: "auto" }}
              priority
            />
            <span className="hidden md:inline font-display text-[15px] font-semibold tracking-tight text-text-primary-light">
              Nova Echo
            </span>
          </a>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium text-text-secondary-light transition-colors hover:text-accent-cyan"
              onClick={(e) => scrollTo(link.href, e)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#book-call" className="btn-primary header-cta hidden md:inline-flex">
          Book Discovery Call
        </a>
      </div>

      {open && (
        <div className="fixed inset-0 top-0 z-40 md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <nav
            className="absolute top-[72px] left-4 right-4 flex flex-col gap-1 rounded-xl bg-white/90 px-4 py-4 backdrop-blur-xl shadow-sm border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center justify-center text-text-secondary-light"
                aria-label="Close menu"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-sm px-4 py-3 text-body-sm font-medium text-text-secondary-light transition-colors hover:bg-surface-100 hover:text-accent-cyan"
                onClick={(e) => handleNav(link.href, e)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#book-call"
              className="btn-primary mt-2 self-start"
              onClick={(e) => { scrollTo("#book-call", e); setOpen(false); }}
            >
              Book Discovery Call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
