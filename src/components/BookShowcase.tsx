import Image from "next/image";
import type { Book } from "@/lib/content";
import { books } from "@/lib/content";

function BookPanel({ book, index }: { book: Book; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <article
      id={book.id}
      className="book-card scroll-mt-28 overflow-hidden rounded-sm border border-[#2a2724] bg-[#0f0e0c]"
      style={{ boxShadow: `inset 3px 0 0 ${book.accent}` }}
    >
      <div
        className={`grid lg:grid-cols-2 ${reversed ? "lg:[direction:rtl]" : ""}`}
      >
        {/* Meta panel */}
        <div
          className={`relative flex flex-col justify-center gap-8 p-10 lg:flex-row lg:items-center lg:p-14 ${reversed ? "lg:[direction:ltr]" : ""}`}
          style={{ backgroundColor: book.accentMuted }}
        >
          <div className="relative w-32 shrink-0 overflow-hidden rounded-sm shadow-[0_24px_48px_-12px_#000000cc] sm:w-40">
            <Image
              src={book.coverTitled}
              alt={`${book.title} — cover`}
              width={1600}
              height={2560}
              className="h-auto w-full"
            />
          </div>
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-[#8a8578] uppercase">
              {book.subtitle} · {book.positioning}
            </span>
            <h3 className="mt-3 font-serif text-4xl text-[#ece8df] md:text-5xl">
              {book.title}
            </h3>
            <p
              className="mt-4 font-serif text-xl italic"
              style={{ color: book.accent }}
            >
              &ldquo;{book.controlling}&rdquo;
            </p>
            <p className="mt-2 font-mono text-[11px] tracking-wide text-[#8a8578] uppercase">
              {book.arc}
            </p>
          </div>
        </div>

        {/* Content panel */}
        <div
          className={`flex flex-col justify-between p-10 lg:p-14 ${reversed ? "lg:[direction:ltr]" : ""}`}
        >
          <div>
            <p className="font-mono text-[11px] tracking-wide text-[#c9a962] uppercase">
              {book.hook}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#8a8578]">
              {book.blurb}
            </p>
            <blockquote className="mt-6 border-l-2 border-[#2a2724] pl-4">
              <p className="font-serif text-base italic leading-relaxed text-[#ece8df]/90">
                &ldquo;{book.excerpt}&rdquo;
              </p>
              <cite className="mt-2 block font-mono text-[10px] tracking-widest text-[#8a8578] not-italic uppercase">
                {book.excerptSource}
              </cite>
            </blockquote>
            <ul className="mt-8 flex flex-wrap gap-2">
              {book.themes.map((theme) => (
                <li
                  key={theme}
                  className="rounded-sm border border-[#2a2724] px-3 py-1 font-mono text-[10px] tracking-wide text-[#8a8578] uppercase"
                >
                  {theme}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-10 flex items-center justify-between border-t border-[#2a2724] pt-6">
            <p className="font-mono text-[11px] text-[#8a8578] uppercase">
              {book.arc}
            </p>
            <span className="rounded-sm border border-[#2a2724] px-3 py-1 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
              {book.status}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export function BookShowcase() {
  return (
    <section id="books" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Volume Briefings</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Three volumes. One pressure system.
        </h2>
        <p className="mt-4 max-w-2xl text-[#8a8578] leading-relaxed">
          Not a chosen-one fantasy. A literary political thriller where children
          are monitored like assets, language becomes a weapon of state, and
          ordinary life can be the quietest victory.
        </p>
        <div className="mt-16 space-y-10">
          {books.map((book, i) => (
            <BookPanel key={book.id} book={book} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
