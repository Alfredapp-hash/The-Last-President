import Link from "next/link";
import { evidenceArtifacts, seriesStats, site } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden px-6 pt-28 pb-20">
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 20% 10%, #9e2b3c18, transparent 55%), radial-gradient(ellipse 50% 40% at 85% 75%, #c9a96210, transparent 50%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Copy */}
        <div className="animate-fade-up">
          <p className="section-label">Complete Trilogy · Production Ready</p>
          <h1 className="mt-6 font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.05] text-[#ece8df]">
            Baren Sump
            <span className="mt-2 block text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal text-[#8a8578]">
              and The Last President
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#8a8578]">
            {site.logline}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#books"
              className="inline-flex items-center gap-2 rounded-sm bg-[#9e2b3c] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-[#b83346]"
            >
              Read the Trilogy
            </a>
            <Link
              href="/press"
              className="inline-flex items-center gap-2 rounded-sm border border-[#2a2724] px-7 py-3.5 text-sm tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
            >
              Press Kit
            </Link>
          </div>
          {/* Stats */}
          <dl className="mt-14 grid grid-cols-4 gap-4 border-t border-[#2a2724] pt-8">
            {seriesStats.map((s) => (
              <div key={s.label}>
                <dt className="font-serif text-2xl text-[#ece8df] md:text-3xl">
                  {s.value}
                </dt>
                <dd className="mt-1 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Prediction card artifact */}
        <div className="animate-fade-up-delay-2 relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="evidence-card relative overflow-hidden rounded-sm p-8">
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-[#ffffff10] pb-4">
                <span className="font-mono text-[10px] tracking-[0.25em] text-[#9e2b3c] uppercase">
                  Exhibit A · Recovered
                </span>
                <span className="font-mono text-[10px] text-[#8a8578]">
                  SCORCHED
                </span>
              </div>
              <p className="mt-6 font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                Prediction Card · Veyra Laboratory
              </p>
              <dl className="mt-6 space-y-3">
                {evidenceArtifacts.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-baseline justify-between gap-4 border-b border-[#ffffff06] pb-2"
                  >
                    <dt className="font-mono text-[10px] tracking-wider text-[#8a8578] uppercase">
                      {item.label}
                    </dt>
                    <dd className="font-mono text-sm tracking-wide text-[#c9a962]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 font-serif text-lg italic text-[#ece8df]/90">
                &ldquo;The storm arrived before the priest.&rdquo;
              </p>
              <p className="mt-2 font-mono text-[10px] text-[#8a8578]">
                — Prologue, Book One
              </p>
            </div>
          </div>
          <p className="mt-4 text-center font-mono text-[10px] tracking-widest text-[#8a8578]/60 uppercase">
            Art direction: haunted evidence, not illustration
          </p>
        </div>
      </div>
    </section>
  );
}
