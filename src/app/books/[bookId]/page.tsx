import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookSampleDownload } from "@/components/BookSampleDownload";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  bookDossiers,
  books,
  getBookById,
  launchCtas,
  site,
} from "@/lib/content";

type BookPageProps = {
  params: Promise<{
    bookId: string;
  }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ bookId: book.id }));
}

export async function generateMetadata({
  params,
}: BookPageProps): Promise<Metadata> {
  const { bookId } = await params;
  const book = getBookById(bookId);
  if (!book) {
    return {
      title: "Book Not Found",
    };
  }
  const dossier = bookDossiers[book.id];
  const title = `${book.title} (${book.subtitle})`;
  return {
    title,
    description: dossier.readerPromise,
    alternates: {
      canonical: `/books/${book.id}`,
    },
    openGraph: {
      title: `${book.title} — ${site.seriesTitle}`,
      description: dossier.readerPromise,
      url: `${site.url}/books/${book.id}`,
      siteName: site.name,
      images: [
        {
          url: book.ogImage,
          width: 1200,
          height: 630,
          alt: `${book.title} Open Graph image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${book.title} — ${site.seriesTitle}`,
      description: dossier.readerPromise,
      images: [book.ogImage],
    },
  };
}

function bookLabel(number: number) {
  return number === 1 ? "Book One" : number === 2 ? "Book Two" : "Book Three";
}

export default async function BookPage({ params }: BookPageProps) {
  const { bookId } = await params;
  const book = getBookById(bookId);
  if (!book) {
    notFound();
  }
  const dossier = bookDossiers[book.id];
  const index = books.findIndex((b) => b.id === book.id);
  const prevBook = index > 0 ? books[index - 1] : null;
  const nextBook = index < books.length - 1 ? books[index + 1] : null;
  const label = bookLabel(book.number);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    isPartOf: {
      "@type": "BookSeries",
      name: site.seriesTitle,
      url: site.url,
    },
    position: book.number,
    author: { "@type": "Person", name: "Alfred App" },
    genre: "Literary political thriller",
    description: dossier.readerPromise,
    image: `${site.url}${book.coverTitled}`,
    url: `${site.url}/books/${book.id}`,
    inLanguage: "en",
  };

  return (
    <>
      <Header />
      <main className="px-6 pt-28 pb-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="mx-auto max-w-6xl">
          <p className="section-label">Volume Page · {label}</p>
          <h1 className="mt-4 font-serif text-4xl text-[#ece8df] md:text-6xl">
            {book.title}
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#8a8578]">
            {dossier.marketPosition}
          </p>

          <section className="mt-10 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-6">
              <div className="overflow-hidden rounded-sm border border-[#2a2724]">
                <Image
                  src={book.coverTitled}
                  alt={`${book.title} cover`}
                  width={1600}
                  height={2560}
                  className="h-auto w-full"
                />
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                {book.subtitle} · {book.status}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-[#8a8578]">
                Complimentary reader sample with branded cover, front matter, and
                the first three chapters
                {book.number === 1 ? " (plus prologue)" : ""} in EPUB or PDF.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={launchCtas.joinLedger}
                  className="inline-flex rounded-sm bg-[#c9a962] px-4 py-2 text-xs font-medium tracking-wide text-[#070605] transition hover:bg-[#dbb872]"
                >
                  Join Launch List
                </a>
                <a
                  href={launchCtas.requestReviewCopy}
                  className="inline-flex rounded-sm border border-[#2a2724] px-4 py-2 text-xs tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
                >
                  Request Review Copy
                </a>
              </div>
              <BookSampleDownload book={book} className="mt-4" />
            </div>

            <div className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
              <p className="font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                Reader promise
              </p>
              <p className="mt-3 font-serif text-2xl italic text-[#ece8df]/95">
                {dossier.readerPromise}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#8a8578]">
                {dossier.stakes}
              </p>

              <h2 className="mt-8 font-serif text-2xl text-[#ece8df]">
                Why this volume converts
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-[#ece8df]/90">
                {dossier.buyerSignals.map((signal) => (
                  <li key={signal} className="flex gap-3">
                    <span className="font-mono text-[#9e2b3c]" aria-hidden>
                      ▸
                    </span>
                    <span>{signal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
              <p className="font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                Featured excerpt
              </p>
              <blockquote className="mt-4 border-l-2 border-[#2a2724] pl-4">
                <p className="font-serif text-xl leading-relaxed text-[#ece8df]/92 italic">
                  &ldquo;{dossier.extendedExcerpt}&rdquo;
                </p>
              </blockquote>
              <p className="mt-4 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                {dossier.excerptContext}
              </p>
            </article>

            <article className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
              <p className="font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                For readers of
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#ece8df]/90">
                {dossier.forReadersOf.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-[#c9a962]" aria-hidden>
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                Media angles
              </p>
              <ul className="mt-4 space-y-3 text-sm text-[#ece8df]/90">
                {dossier.mediaAngles.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="font-mono text-[#9e2b3c]" aria-hidden>
                      ▸
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section className="mt-10 grid gap-8 lg:grid-cols-2">
            <article className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
              <h2 className="font-serif text-2xl text-[#ece8df]">
                Frequently asked before purchase
              </h2>
              <div className="mt-6 space-y-5">
                {dossier.faqs.map((faq) => (
                  <div key={faq.question} className="border-l-2 border-[#2a2724] pl-4">
                    <p className="font-serif text-lg text-[#ece8df]">
                      {faq.question}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-[#8a8578]">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
              <h2 className="font-serif text-2xl text-[#ece8df]">
                Real lines from this volume
              </h2>
              <div className="mt-6 space-y-5">
                {dossier.bookQuotes.map((q) => (
                  <blockquote key={q.text} className="border-l-2 border-[#2a2724] pl-4">
                    <p className="font-serif text-lg italic text-[#ece8df]/90">
                      &ldquo;{q.text}&rdquo;
                    </p>
                    <cite className="mt-2 block font-mono text-[10px] tracking-widest text-[#8a8578] not-italic uppercase">
                      {q.source}
                    </cite>
                  </blockquote>
                ))}
              </div>
            </article>
          </section>

          <section className="mt-10 rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8">
            <p className="section-label">Continue reading</p>
            <div className="mt-4 grid gap-5 md:grid-cols-3">
              {prevBook ? (
                <Link
                  href={`/books/${prevBook.id}`}
                  className="rounded-sm border border-[#2a2724] px-4 py-4 text-sm text-[#ece8df] transition hover:border-[#8a8578]/40"
                >
                  ← {prevBook.subtitle}: {prevBook.title}
                </Link>
              ) : (
                <div className="rounded-sm border border-[#2a2724] px-4 py-4 text-sm text-[#8a8578]">
                  This is the opening volume.
                </div>
              )}

              <Link
                href="/"
                className="rounded-sm border border-[#2a2724] px-4 py-4 text-center text-sm text-[#ece8df] transition hover:border-[#8a8578]/40"
              >
                Return to Trilogy Home
              </Link>

              {nextBook ? (
                <Link
                  href={`/books/${nextBook.id}`}
                  className="rounded-sm border border-[#2a2724] px-4 py-4 text-right text-sm text-[#ece8df] transition hover:border-[#8a8578]/40"
                >
                  {nextBook.subtitle}: {nextBook.title} →
                </Link>
              ) : (
                <div className="rounded-sm border border-[#2a2724] px-4 py-4 text-right text-sm text-[#8a8578]">
                  This is the final volume.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
