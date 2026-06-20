import Link from "next/link";
import { site } from "@/lib/content";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-800/80 bg-[#0c0b0a]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex flex-col">
          <span className="font-serif text-lg tracking-[0.2em] text-stone-100 uppercase">
            The Sump Ledger
          </span>
          <span className="text-[10px] tracking-[0.35em] text-stone-500 uppercase group-hover:text-stone-400">
            Baren Sump
          </span>
        </Link>
        <nav className="flex items-center gap-8 text-sm tracking-wide text-stone-400">
          <a href="#books" className="transition hover:text-stone-100">
            Books
          </a>
          <a href="#series" className="transition hover:text-stone-100">
            Series
          </a>
          <Link href="/press" className="transition hover:text-stone-100">
            Press
          </Link>
          <a
            href={`mailto:${site.contactEmail}`}
            className="rounded border border-stone-700 px-3 py-1.5 text-stone-200 transition hover:border-[#8b2635] hover:text-white"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
}
