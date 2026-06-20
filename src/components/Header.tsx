import Link from "next/link";
import { site } from "@/lib/content";

const links = [
  { href: "#arc", label: "The Arc" },
  { href: "#books", label: "Books" },
  { href: "#quotes", label: "Excerpts" },
  { href: "/press", label: "Press" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[#2a2724]/80 bg-[#070605]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-serif text-xl tracking-wide text-[#ece8df]">
            The Sump Ledger
          </span>
          <span className="hidden font-mono text-[10px] tracking-widest text-[#8a8578] uppercase sm:inline">
            Case File
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-[13px] tracking-wide text-[#8a8578]">
          {links.map((l) =>
            l.href.startsWith("/") ? (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-[#ece8df]"
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="hidden transition hover:text-[#ece8df] sm:inline"
              >
                {l.label}
              </a>
            ),
          )}
          <a
            href={`mailto:${site.contactEmail}`}
            className="rounded-sm border border-[#2a2724] px-3 py-1.5 text-[#ece8df] transition hover:border-[#9e2b3c]/60 hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
