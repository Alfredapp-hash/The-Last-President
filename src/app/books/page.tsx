import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BookBuyButton } from "@/components/BookBuyButton";
import { BookSampleDownload } from "@/components/BookSampleDownload";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { books, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Volumes",
  description:
    "Explore each volume of Baren Sump and The Last President — hooks, excerpts, first-3-chapter samples, and reader positioning.",
  alternates: {
    canonical: "/books",
  },
  openGraph: {
    title: `Volumes — ${site.seriesTitle}`,
    description:
      "Three volumes. One pressure system. Download the first three chapters of each book or open the full volume page.",
    url: `${site.url}/books`,
    siteName: site.name,
  },
};

export default function BooksIndexPage() {
  return (
    <>
      <Header />
      <main className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Volume Briefings</p>
          <h1 className="mt-4 font-serif text-4xl text-[#ece8df] md:text-5xl">
            Three volumes. One pressure system.
          </h1>
          <p className="mt-6 max-w-2xl text-[#8a8578] leading-relaxed">
            Each volume has its own landing page with positioning, extended
            excerpts, and reader FAQs. Download the first three chapters free
            below, or open any volume page for the full briefing.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {books.map((book) => (
              <article
                key={book.id}
                className="flex flex-col overflow-hidden rounded-sm border border-[#2a2724] bg-[#0f0e0c]"
                style={{ boxShadow: `inset 3px 0 0 ${book.accent}` }}
              >
                <Link
                  href={`/books/${book.id}`}
                  className="group flex flex-1 flex-col transition hover:bg-[#0f0e0c]"
                  aria-label={`Open ${book.title} volume page`}
                >
                  <div className="p-6" style={{ backgroundColor: book.accentMuted }}>
                    <div className="mx-auto w-32 overflow-hidden rounded-sm shadow-[0_16px_32px_-8px_#000000cc]">
                      <Image
                        src={book.coverTitled}
                        alt={`${book.title} cover`}
                        width={1600}
                        height={2560}
                        className="h-auto w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a8578] uppercase">
                      {book.subtitle} · {book.positioning}
                    </span>
                    <h2 className="mt-3 font-serif text-2xl text-[#ece8df]">
                      {book.title}
                    </h2>
                    <p
                      className="mt-3 font-serif text-base italic"
                      style={{ color: book.accent }}
                    >
                      &ldquo;{book.controlling}&rdquo;
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-[#8a8578]">
                      {book.hook}
                    </p>
                    <p className="mt-6 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase transition group-hover:text-[#ece8df]">
                      Open volume page →
                    </p>
                  </div>
                </Link>
                <div className="space-y-4 border-t border-[#2a2724] bg-[#0a0908] p-6">
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                      Buy full volume
                    </p>
                    <BookBuyButton book={book} compact />
                  </div>
                  <div>
                    <p className="mb-3 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                      Free sample · EPUB / PDF
                    </p>
                    <BookSampleDownload book={book} compact />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
