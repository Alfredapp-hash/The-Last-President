import { site } from "@/lib/content";

export function CTA() {
  return (
    <section className="border-t border-[#2a2724] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="section-label">Stay in the Ledger</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Enter the case file.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-[#8a8578] leading-relaxed">
          Launch updates, excerpt drops, review copies, and rights inquiries for
          readers who want political thrillers with literary teeth.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${site.contactEmail}?subject=Sump%20Ledger%20Updates`}
            className="inline-flex rounded-sm bg-[#c9a962] px-8 py-3.5 text-sm font-medium tracking-wide text-[#070605] transition hover:bg-[#dbb872]"
          >
            Request Updates
          </a>
          <a
            href={`mailto:${site.contactEmail}?subject=Review%20Copy%20Request`}
            className="inline-flex rounded-sm border border-[#2a2724] px-8 py-3.5 text-sm tracking-wide text-[#ece8df] transition hover:border-[#8a8578]/40"
          >
            Request Review Copy
          </a>
        </div>
      </div>
    </section>
  );
}
