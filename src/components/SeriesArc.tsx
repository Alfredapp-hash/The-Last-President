import Link from "next/link";
import { arcPhases } from "@/lib/content";

export function SeriesArc() {
  return (
    <section id="arc" className="border-y border-[#2a2724] bg-[#0a0908] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Series Architecture</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          One arc. Three movements.
        </h2>
        <p className="mt-4 max-w-2xl text-[#8a8578] leading-relaxed">
          A single case file that moves from prophecy and spectacle to
          protection, accountability, and refusal. Each book escalates the
          pressure, then narrows the question: who gets to stay human when
          institutions need a symbol?
        </p>

        <div className="arc-line mt-16 hidden md:block" />

        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-6">
          {arcPhases.map((phase, i) => (
            <Link
              key={phase.phase}
              href={`/books/${phase.bookId}`}
              className="group relative block rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8 transition hover:border-[#8a8578]/25"
              aria-label={`Open ${phase.book} volume page`}
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-[#9e2b3c] uppercase">
                Movement {phase.phase}
              </span>
              <h3 className="mt-3 font-serif text-2xl text-[#ece8df]">
                {phase.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-wide text-[#c9a962]">
                {phase.book}
              </p>
              <p className="mt-5 text-sm leading-relaxed text-[#8a8578]">
                {phase.description}
              </p>
              <p className="mt-6 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase transition group-hover:text-[#ece8df]">
                Open volume page →
              </p>
              {i < arcPhases.length - 1 && (
                <span
                  className="absolute -right-3 top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full bg-[#2a2724] md:block"
                  aria-hidden
                />
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
