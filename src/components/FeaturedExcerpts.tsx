import { featuredExcerpts } from "@/lib/content";

export function FeaturedExcerpts() {
  return (
    <section className="border-t border-[#2a2724] bg-[#0a0908] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Featured Excerpts</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Before you buy, hear the voice.
        </h2>
        <p className="mt-4 max-w-2xl text-[#8a8578] leading-relaxed">
          These lines are selected to represent tone, tension, and the moral
          architecture of the trilogy.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredExcerpts.map((item) => (
            <article
              key={item.title}
              className="rounded-sm border border-[#2a2724] bg-[#0f0e0c] p-8"
            >
              <p className="font-mono text-[10px] tracking-widest text-[#8a8578] uppercase">
                {item.title}
              </p>
              <blockquote className="mt-4">
                <p className="font-serif text-lg leading-relaxed text-[#ece8df]/90 italic">
                  &ldquo;{item.excerpt}&rdquo;
                </p>
              </blockquote>
              <p className="mt-4 font-mono text-[10px] tracking-wide text-[#8a8578]/80 uppercase">
                {item.source}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
