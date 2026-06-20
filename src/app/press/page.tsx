import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { books, boxSet, pressFacts, pullQuotes, site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Kit",
  description:
    "Media resources for Baren Sump and The Last President — complete trilogy, ~232,600 words.",
};

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="section-label">Media Resources</p>
          <h1 className="mt-4 font-serif text-4xl text-[#ece8df] md:text-5xl">
            Press Kit
          </h1>
          <p className="mt-6 text-[#8a8578] leading-relaxed">
            {site.seriesTitle} is a completed literary thriller trilogy
            (~232,600 words, 84 chapters). Production ready for query and beta.
          </p>

          <div className="mt-10 overflow-hidden rounded-sm border border-[#2a2724]">
            <Image
              src={boxSet}
              alt="Baren Sump trilogy box set"
              width={2560}
              height={1600}
              className="h-auto w-full"
            />
          </div>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-[#ece8df]">At a glance</h2>
            <dl className="mt-6 divide-y divide-[#2a2724] rounded-sm border border-[#2a2724] bg-[#0f0e0c]">
              {pressFacts.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-3 gap-4 px-6 py-4">
                  <dt className="font-mono text-[11px] tracking-wide text-[#8a8578] uppercase">
                    {label}
                  </dt>
                  <dd className="col-span-2 text-sm text-[#ece8df]/90">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-[#ece8df]">
              Series logline
            </h2>
            <p className="mt-4 rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-6 font-serif text-lg italic leading-relaxed text-[#ece8df]/90">
              {site.logline}
            </p>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-[#ece8df]">Book blurbs</h2>
            <div className="mt-6 space-y-6">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="flex gap-5 rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-6"
                  style={{ borderLeftColor: book.accent, borderLeftWidth: 3 }}
                >
                  <div className="hidden w-24 shrink-0 overflow-hidden rounded-sm shadow-lg sm:block">
                    <Image
                      src={book.coverTitled}
                      alt={`${book.title} cover`}
                      width={1600}
                      height={2560}
                      className="h-auto w-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-[#ece8df]">
                      {book.subtitle}: {book.title}
                    </h3>
                    <p
                      className="mt-2 font-serif text-base italic"
                      style={{ color: book.accent }}
                    >
                      &ldquo;{book.controlling}&rdquo;
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-[#8a8578]">
                      {book.blurb}
                    </p>
                    <p className="mt-3 font-mono text-[10px] tracking-wide text-[#8a8578]/70 uppercase">
                      {book.chapters} · {book.wordCount} words
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-[#ece8df]">
              Pull quotes (approved)
            </h2>
            <ul className="mt-6 space-y-4">
              {pullQuotes.map((q) => (
                <li
                  key={q.text}
                  className="border-l-2 border-[#9e2b3c] pl-4"
                >
                  <span className="font-serif italic text-[#ece8df]/90">
                    &ldquo;{q.text}&rdquo;
                  </span>
                  <span className="mt-1 block font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                    {q.source}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-[#ece8df]">Contact</h2>
            <p className="mt-4 text-[#8a8578]">
              Review copies, interview requests, and rights inquiries:{" "}
              <a
                href={`mailto:${site.contactEmail}?subject=Press%20Inquiry%20-%20Sump%20Ledger`}
                className="text-[#c9a962] underline underline-offset-4 transition hover:text-[#dbb872]"
              >
                {site.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
