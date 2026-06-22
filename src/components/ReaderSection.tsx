import { readerComp } from "@/lib/content";

export function ReaderSection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        <div>
          <p className="section-label">Reader Positioning</p>
          <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
            Why this trilogy cuts deeper.
          </h2>
          <div className="mt-6 space-y-5 text-[#8a8578] leading-relaxed">
            <p>
              Predictions arrive on scorched cards. Confession machines turn
              numbers into names. A boy named like an empty field sits at the
              center—monitored, priced, and never chosen.
            </p>
            <p>
              Book One builds the machine. Book Two opens the Look-Away Ledger
              and asks who looked away. Book Three walks the black path: a
              refusal to remain available to every hand that calls itself safe.
            </p>
            <p className="font-serif text-lg italic text-[#ece8df]/80">
              The art treats every image as recovered evidence—pencil sketches,
              exhibits, sealed records. Baren is never shown as magical,
              heroic, or chosen.
            </p>
          </div>
        </div>
        <div className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-10">
          <p className="section-label">For readers who love</p>
          <ul className="mt-8 space-y-4">
            {readerComp.map((item) => (
              <li key={item} className="flex gap-4 text-sm text-[#ece8df]/90">
                <span
                  className="mt-0.5 shrink-0 font-mono text-[#9e2b3c]"
                  aria-hidden
                >
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
