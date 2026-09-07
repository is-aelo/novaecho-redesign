"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { List, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Agents", href: "#solutions" },
  { label: "Benchmarks", href: "#benchmarks" },
  { label: "Pricing", href: "#pricing" },
  { label: "Results", href: "#results" },
  { label: "Demo", href: "#book-call" },
];

const pageLinks = new Set(["/results"]);

const OFFSET = 64;

function isOnHomepage() {
  return typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "");
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [shouldBlur, setShouldBlur] = useState(false);
  const pathname = usePathname();
  const scrollTo = useSmoothScroll(OFFSET);
  const menuRef = useRef<HTMLElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (pageLinks.has(pathname)) {
      setActive("#results");
      return;
    }
    if (!isOnHomepage()) return;

    const ids = links.map((l) => l.href.replace("#", ""));
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: `-${OFFSET + 24}px 0px -40% 0px` }
    );

    els.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    function check() {
      const hero = document.getElementById("hero");
      if (!hero) return;
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      const footer = document.querySelector("footer");
      const atFooter = footer ? footer.getBoundingClientRect().top < window.innerHeight : false;
      setShouldBlur(pastHero && !atFooter);
    }
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (!initialized.current) {
      initialized.current = true;
      gsap.set(menu, { display: "none" });
      return;
    }

    if (open) {
      gsap.set(menu, { display: "flex" });
      gsap.fromTo(
        menu,
        { opacity: 0, y: -10, scaleY: 0.96, transformOrigin: "top center" },
        {
          opacity: 1,
          y: 0,
          scaleY: 1,
          duration: 0.5,
          ease: "power4.out",
        }
      );
      gsap.fromTo(
        menu.querySelectorAll("[data-nav-item]"),
        { opacity: 0, y: -8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power3.out",
        }
      );
    } else {
      gsap.to(menu.querySelectorAll("[data-nav-item]"), {
        opacity: 0,
        y: -6,
        duration: 0.2,
        ease: "power2.in",
      });
      gsap.to(menu, {
        opacity: 0,
        y: -8,
        scaleY: 0.96,
        duration: 0.25,
        ease: "power2.in",
        delay: 0.15,
        transformOrigin: "top center",
        onComplete: () => gsap.set(menu, { display: "none" }),
      });
    }
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    function handle(e: MediaQueryListEvent | MediaQueryList) {
      if (e.matches) setOpen(false);
    }
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  function handleNav(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
    if (href.startsWith("#")) {
      if (document.getElementById(href.replace("#", ""))) {
        scrollTo(href, e);
      } else {
        window.location.href = "/" + href;
      }
    }
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-center px-4 py-3">
      <div className={`relative flex w-full max-w-5xl rounded-xl shadow-sm border border-surface-200 transition-all duration-300 ${shouldBlur ? "bg-white/80 backdrop-blur-md" : "bg-white"}`}>
        <div className="flex w-full items-center justify-between px-5 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex lg:hidden items-center justify-center text-text-primary-light"
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
              <span className="hidden lg:inline font-display text-[15px] font-semibold tracking-tight text-text-primary-light">
                Nova Echo
              </span>
            </a>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[14px] font-medium transition-colors hover:text-accent-magenta ${
                  active === link.href
                    ? "text-accent-magenta"
                    : "text-text-secondary-light"
                }`}
                onClick={(e) => {
                  if (link.href.startsWith("#")) {
                    if (document.getElementById(link.href.replace("#", ""))) {
                      scrollTo(link.href, e);
                    } else {
                      window.location.href = "/" + link.href;
                    }
                  }
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a href="#book-call" className="btn-primary header-cta hidden lg:inline-flex" onClick={(e) => { if (!document.getElementById("book-call")) { e.preventDefault(); window.location.href = "/#book-call"; } }}>
            Book Discovery Call
          </a>
        </div>

        <nav
          ref={menuRef}
          className="absolute left-0 right-0 top-full mt-1 flex-col gap-1 rounded-xl bg-white px-5 py-4 shadow-sm border border-surface-200 lg:hidden"
        >
          {links.map((link) => (
            <a
              key={link.href}
              data-nav-item
              href={link.href}
              className={`rounded-btn px-4 py-3 text-body-sm font-medium transition-colors hover:bg-surface-100 hover:text-accent-magenta ${
                active === link.href
                  ? "text-accent-magenta bg-accent-magenta/5"
                  : "text-text-secondary-light"
              }`}
              onClick={(e) => handleNav(link.href, e)}
            >
              {link.label}
            </a>
          ))}

        </nav>
      </div>
    </header>
  );
}
