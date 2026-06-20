import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { books, pressFacts, pullQuotes, site } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Press Kit",
  description: "Media resources for Baren Sump and The Last President trilogy.",
};

export default function PressPage() {
  return (
    <>
      <Header />
      <main className="px-6 pt-28 pb-24">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs tracking-[0.35em] text-stone-500 uppercase">
            Media Resources
          </p>
          <h1 className="mt-4 font-serif text-4xl text-stone-100">Press Kit</h1>
          <p className="mt-6 text-stone-400 leading-relaxed">
            {site.seriesTitle} is a completed literary thriller trilogy (~232,600
            words). Use the materials below for reviews, interviews, and catalog
            copy.
          </p>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-stone-200">At a glance</h2>
            <dl className="mt-6 divide-y divide-stone-800 rounded-lg border border-stone-800">
              {pressFacts.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-3 gap-4 px-6 py-4">
                  <dt className="text-sm text-stone-500">{label}</dt>
                  <dd className="col-span-2 text-sm text-stone-300">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-stone-200">Series logline</h2>
            <p className="mt-4 rounded-lg border border-stone-800 bg-[#121110] p-6 font-serif text-lg italic text-stone-300">
              When a dying inventor leaves a scorched prediction naming a monitored
              child and the phrase THE LAST PRESIDENT, a dynasty, a court, and a
              country must decide whether Baren Sump is prophecy, evidence, or
              simply a boy who refuses to remain available.
            </p>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-stone-200">Book blurbs</h2>
            <div className="mt-6 space-y-8">
              {books.map((book) => (
                <article
                  key={book.id}
                  className="rounded-lg border border-stone-800 p-6"
                >
                  <h3 className="font-serif text-xl text-stone-100">
                    {book.subtitle}: {book.title}
                  </h3>
                  <p className="mt-2 text-sm italic text-[#c4a35a]">{book.hook}</p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-400">
                    {book.blurb}
                  </p>
                  <p className="mt-3 text-xs text-stone-600">
                    {book.chapters} · {book.wordCount}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-stone-200">
              Pull quotes (approved)
            </h2>
            <ul className="mt-6 space-y-4">
              {pullQuotes.map((q) => (
                <li
                  key={q.text}
                  className="border-l-2 border-[#8b2635] pl-4 text-stone-400"
                >
                  <span className="font-serif italic text-stone-300">
                    &ldquo;{q.text}&rdquo;
                  </span>
                  <span className="mt-1 block text-xs text-stone-600">
                    {q.source}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16">
            <h2 className="font-serif text-2xl text-stone-200">Contact</h2>
            <p className="mt-4 text-stone-400">
              Review copies, interview requests, and rights inquiries:{" "}
              <a
                href={`mailto:${site.contactEmail}?subject=Press%20Inquiry%20-%20Sump%20Ledger`}
                className="text-[#c4a35a] underline underline-offset-4"
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
