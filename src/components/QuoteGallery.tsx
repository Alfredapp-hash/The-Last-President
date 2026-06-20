import { pullQuotes } from "@/lib/content";

export function QuoteGallery() {
  return (
    <section id="quotes" className="border-t border-[#2a2724] bg-[#0a0908] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">From the Record</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Lines that survive the sentence.
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pullQuotes.map((q) => (
            <blockquote
              key={q.text}
              className="group relative rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8 transition hover:border-[#9e2b3c]/30"
            >
              <span className="quote-mark absolute top-4 left-6" aria-hidden>
                &ldquo;
              </span>
              <p className="relative z-10 pt-8 font-serif text-lg leading-snug text-[#ece8df] italic">
                {q.text}
              </p>
              <cite className="mt-5 block font-mono text-[10px] tracking-widest text-[#8a8578] not-italic uppercase">
                {q.source}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
