import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Pricing", href: "#pricing" },
  { label: "Benchmarks", href: "#benchmarks" },
];

export default function Nav() {
  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 bg-surface-950/80 backdrop-blur-md"
      style={{ height: 64 }}
    >
      <Link href="/" className="flex items-center gap-2.5">
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
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="nav-link">
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href="#book-call" className="btn-primary header-cta">
        Book Discovery Call
      </Link>
    </header>
  );
}
