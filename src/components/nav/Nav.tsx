"use client";

import { useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Benchmarks", href: "#benchmarks" },
];

const OFFSET = 64;

export default function Nav() {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
          window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - OFFSET);
        }
        return;
      }
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - OFFSET;
        gsap.to(window, {
          scrollTo: { y },
          duration: 0.6,
          ease: "power2.out",
        });
      }
    },
    []
  );

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 bg-surface-950/80 backdrop-blur-md"
      style={{ height: OFFSET }}
    >
      <a href="/" className="flex items-center gap-2.5">
        <Image
          src="/images/novaecho-logo.png"
          alt="Nova Echo logo"
          width={28}
          height={28}
          style={{ width: "auto", height: "auto" }}
          priority
        />
        <span className="font-display text-[15px] font-semibold tracking-tight text-text-primary">
          Nova Echo
        </span>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            onClick={(e) => handleClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <a href="#book-call" className="btn-primary header-cta">
        Book Discovery Call
      </a>
    </header>
  );
}
