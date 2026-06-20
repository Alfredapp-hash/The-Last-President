import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { books, pullQuotes, site } from "@/lib/content";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-24 pb-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 80% 60% at 50% 0%, #8b263522, transparent), radial-gradient(ellipse 60% 40% at 80% 80%, #c4a35a15, transparent)",
            }}
          />
          <div className="relative mx-auto max-w-4xl text-center">
            <p className="mb-6 text-xs tracking-[0.4em] text-stone-500 uppercase">
              A trilogy in 84 chapters · ~232,000 words
            </p>
            <h1 className="font-serif text-5xl leading-tight text-stone-100 md:text-7xl">
              Baren Sump
              <span className="mt-2 block text-3xl text-stone-400 md:text-4xl">
                and The Last President
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone-400">
              {site.tagline}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="#books"
                className="rounded bg-[#8b2635] px-8 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-[#a12f42]"
              >
                Explore the Trilogy
              </a>
              <Link
                href="/press"
                className="rounded border border-stone-700 px-8 py-3 text-sm tracking-wide text-stone-300 transition hover:border-stone-500 hover:text-white"
              >
                Press Kit
              </Link>
            </div>
            <p className="mt-16 font-mono text-xs tracking-widest text-stone-600 uppercase">
              Gold Tower · Boy: Baren · Glass Coast Blood Event · Sump
            </p>
          </div>
        </section>

        {/* Pull quotes */}
        <section className="border-y border-stone-800 bg-[#0a0908] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {pullQuotes.map((q) => (
              <blockquote
                key={q.text}
                className="border-l-2 border-[#8b2635] pl-6"
              >
                <p className="font-serif text-xl italic text-stone-300">
                  &ldquo;{q.text}&rdquo;
                </p>
                <cite className="mt-3 block text-xs tracking-wide text-stone-600 not-italic uppercase">
                  {q.source}
                </cite>
              </blockquote>
            ))}
          </div>
        </section>

        {/* Books */}
        <section id="books" className="px-6 py-24">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-serif text-3xl text-stone-100 md:text-4xl">
              The Trilogy
            </h2>
            <p className="mt-4 max-w-2xl text-stone-400">
              Three books. Continuous chapter numbering from Prologue through
              Chapter 84. A single arc from prophecy and spectacle to protection,
              accountability, and refusal.
            </p>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </section>

        {/* Series */}
        <section id="series" className="border-t border-stone-800 bg-[#0a0908] px-6 py-24">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl text-stone-100">
                What kind of story is this?
              </h2>
              <div className="mt-6 space-y-4 text-stone-400 leading-relaxed">
                <p>
                  This is not a chosen-one fantasy. It is a haunted case file—a
                  literary political thriller where predictions arrive on scorched
                  cards, children are monitored like assets, and language itself
                  becomes a weapon of state.
                </p>
                <p>
                  Book One builds the machine: algorithms, dynasties, confession
                  records, and the boy at the center who is named like an empty
                  field. Book Two asks who looked away—and whether children can
                  ever be merely evidence. Book Three walks the black path: a
                  refusal to remain available to every hand that calls itself
                  safe.
                </p>
                <p>
                  The art direction treats every image as recovered evidence—pencil
                  sketches, exhibits, sealed records—not glossy illustration. Baren
                  is never shown as magical, heroic, or chosen.
                </p>
              </div>
            </div>
            <div className="rounded-lg border border-stone-800 bg-[#121110] p-8">
              <h3 className="text-xs tracking-[0.3em] text-stone-500 uppercase">
                For readers who love
              </h3>
              <ul className="mt-6 space-y-3 text-stone-300">
                {[
                  "Institutional dread and procedural thriller craft",
                  "Prophecy used as political infrastructure",
                  "Child-centered narratives that refuse spectacle",
                  "Near-future systems fiction with literary voice",
                  "Moral architecture over twist-for-twist plotting",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm">
                    <span className="text-[#8b2635]">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-24">
          <div className="mx-auto max-w-2xl rounded-lg border border-stone-800 bg-[#121110] p-10 text-center">
            <h2 className="font-serif text-2xl text-stone-100">
              Stay in the ledger
            </h2>
            <p className="mt-4 text-stone-400">
              Launch updates, excerpt releases, and press inquiries. The trilogy
              is production-ready—distribution coming soon.
            </p>
            <a
              href={`mailto:${site.contactEmail}?subject=Sump%20Ledger%20Updates`}
              className="mt-8 inline-block rounded bg-[#c4a35a] px-8 py-3 text-sm font-medium tracking-wide text-[#0c0b0a] transition hover:bg-[#d4b36a]"
            >
              Request Updates
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
