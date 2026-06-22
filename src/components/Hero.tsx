import Link from "next/link";
import Image from "next/image";
import { boxSet, heroHighlights, launchCtas, site } from "@/lib/content";

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
          <p className="section-label">A Literary Political Thriller Trilogy</p>
          <h1 className="mt-6 font-serif text-[clamp(2.75rem,6vw,4.75rem)] leading-[1.05] text-[#ece8df]">
            Baren Sump
            <span className="mt-2 block text-[clamp(1.5rem,3.5vw,2.25rem)] font-normal text-[#8a8578]">
              and The Last President
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-[#8a8578]">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-[#ece8df]/90">
            &ldquo;{site.logline}&rdquo;
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={launchCtas.startReading}
              className="inline-flex items-center gap-2 rounded-sm bg-[#9e2b3c] px-7 py-3.5 text-sm font-medium tracking-wide text-white transition hover:bg-[#b83346]"
            >
              Start with Book One
            </a>
            <Link
              href={launchCtas.pressKit}
              className="inline-flex items-center gap-2 rounded-sm border border-[#2a2724] px-7 py-3.5 text-sm tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
            >
              Media Kit
            </Link>
          </div>
          {/* Marketing highlights */}
          <dl className="mt-14 grid gap-4 border-t border-[#2a2724] pt-8 sm:grid-cols-2">
            {heroHighlights.map((item) => (
              <div
                key={item.label}
                className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-4"
              >
                <dt className="font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#ece8df]/85">
                  {item.line}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Trilogy box set */}
        <div className="animate-fade-up-delay-2 relative mx-auto w-full max-w-lg lg:max-w-none">
          <div
            className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, #9e2b3c33, transparent 70%)",
            }}
          />
          <div className="relative overflow-hidden rounded-sm border border-[#2a2724] shadow-[0_40px_80px_-20px_#000000cc]">
            <Image
              src={boxSet}
              alt="Baren Sump trilogy — sealed evidence set"
              width={2560}
              height={1600}
              priority
              className="h-auto w-full"
            />
          </div>
          <p className="mt-4 text-center font-mono text-[10px] tracking-widest text-[#8a8578]/60 uppercase">
            Three books · one sealed case file
          </p>
        </div>
      </div>
    </section>
  );
}
