"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FacebookLogo,
  XLogo,
  LinkedinLogo,
  YoutubeLogo,
  InstagramLogo,
} from "@phosphor-icons/react/dist/ssr";

const socials = [
  { icon: XLogo, href: "https://x.com/nova_echo_ai", label: "X" },
  { icon: FacebookLogo, href: "https://www.facebook.com/profile.php?id=61550701074739", label: "Facebook" },
  { icon: LinkedinLogo, href: "https://www.linkedin.com/company/nova-echo-ai/", label: "LinkedIn" },
  { icon: YoutubeLogo, href: "https://www.youtube.com/@novaechoai", label: "YouTube" },
  { icon: InstagramLogo, href: "https://www.instagram.com/novaechoai", label: "Instagram" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-surface-950 px-6 py-12 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:justify-between">
        <div className="flex max-w-md flex-col gap-5">
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
              Nova Echo AI
            </span>
          </a>

          <p className="text-body-sm leading-relaxed text-text-secondary max-w-sm">
            The #1 platform to train, manage, deploy, scale, and monitor hyper human-like voice AI employees.
          </p>

          <div className="flex items-center gap-3">
            <Image
              src="/images/companies-trusted/imgi_16_Nova Echo Top Sales Software Tekpon Award.png"
              alt="Top Lead Generation Software"
              width={110}
              height={28}
              className="h-7 w-auto"
              style={{ width: "auto" }}
            />
            <Image
              src="/images/companies-trusted/imgi_18_HIPAA Complaint Banner (1).png"
              alt="HIPAA Compliant"
              width={110}
              height={28}
              className="h-7 w-auto"
              style={{ width: "auto" }}
            />
          </div>

          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-6 w-6 items-center justify-center text-text-secondary transition-colors hover:text-accent-cyan"
              >
                <Icon size={20} weight="fill" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-body-md font-semibold text-text-primary">
            Docs
          </h3>
          <div className="flex flex-col gap-2 text-body-sm text-text-secondary leading-relaxed">
            <a
              href="/results"
              className={`transition-colors hover:text-accent-cyan ${pathname === "/results" ? "text-accent-cyan" : ""}`}
            >
              Results & Stories
            </a>
            <a
              href="/api-docs"
              className={`transition-colors hover:text-accent-cyan ${pathname === "/api-docs" ? "text-accent-cyan" : ""}`}
            >
              API Documentation
            </a>
            <a
              href="/privacy"
              className={`transition-colors hover:text-accent-cyan ${pathname === "/privacy" ? "text-accent-cyan" : ""}`}
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className={`transition-colors hover:text-accent-cyan ${pathname === "/terms" ? "text-accent-cyan" : ""}`}
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="font-display text-body-md font-semibold text-text-primary">
            Contact Us
          </h3>
          <div className="flex flex-col gap-2 text-body-sm text-text-secondary leading-relaxed">
            <a
              href="tel:+15614751497"
              className="transition-colors hover:text-accent-cyan"
            >
              +1 (561) 475-1497
            </a>
            <a
              href="mailto:support@novaecho.ai"
              className="transition-colors hover:text-accent-cyan"
            >
              support@novaecho.ai
            </a>
            <address className="not-italic">
              4834 NW 2nd Ave, Unit #500
              <br />
              Boca Raton, FL 33431
              <br />
              United States
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
