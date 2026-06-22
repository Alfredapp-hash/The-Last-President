import Link from "next/link";
import { launchCtas, startHereCards } from "@/lib/content";

export function StartHere() {
  return (
    <section id="start" className="border-y border-[#2a2724] bg-[#0a0908] px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Reader Paths</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Choose your entry into the ledger.
        </h2>
        <p className="mt-4 max-w-2xl text-[#8a8578] leading-relaxed">
          If you are discovering The Sump Ledger for the first time, begin with
          Book One, then move through the full case file. If you are press or
          review, use the kit and review-copy channels below.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {startHereCards.map((card) => {
            const external = card.href.startsWith("mailto:");
            return (
              <article
                key={card.title}
                className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-6"
              >
                <h3 className="font-serif text-2xl text-[#ece8df]">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8a8578]">
                  {card.description}
                </p>
                {external ? (
                  <a
                    href={card.href}
                    className="mt-6 inline-flex rounded-sm bg-[#c9a962] px-4 py-2 text-xs font-medium tracking-wide text-[#070605] transition hover:bg-[#dbb872]"
                  >
                    {card.cta}
                  </a>
                ) : card.href.startsWith("/") ? (
                  <Link
                    href={card.href}
                    className="mt-6 inline-flex rounded-sm bg-[#c9a962] px-4 py-2 text-xs font-medium tracking-wide text-[#070605] transition hover:bg-[#dbb872]"
                  >
                    {card.cta}
                  </Link>
                ) : (
                  <a
                    href={card.href}
                    className="mt-6 inline-flex rounded-sm bg-[#c9a962] px-4 py-2 text-xs font-medium tracking-wide text-[#070605] transition hover:bg-[#dbb872]"
                  >
                    {card.cta}
                  </a>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={launchCtas.joinLedger}
            className="rounded-sm border border-[#2a2724] px-4 py-2 text-xs tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
          >
            Join Launch List
          </a>
          <a
            href={launchCtas.requestReviewCopy}
            className="rounded-sm border border-[#2a2724] px-4 py-2 text-xs tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
          >
            Media / ARC Requests
          </a>
        </div>
      </div>
    </section>
  );
}
