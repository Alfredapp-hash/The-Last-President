import Image from "next/image";
import { interiorPlates } from "@/lib/content";

export function EvidenceGallery() {
  return (
    <section className="border-t border-[#2a2724] bg-[#0a0908] px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Exhibits</p>
        <h2 className="mt-4 font-serif text-3xl text-[#ece8df] md:text-4xl">
          Recovered from the file.
        </h2>
        <p className="mt-4 max-w-2xl text-[#8a8578] leading-relaxed">
          Every image in this world is found, logged, or sealed — never merely
          illustrated. A child is never shown. Only the rooms, the objects, and
          the shadows left behind.
        </p>
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {interiorPlates.map((plate) => (
            <figure
              key={plate.src}
              className="group relative overflow-hidden rounded-sm border border-[#2a2724]"
            >
              <Image
                src={plate.src}
                alt={plate.caption}
                width={1600}
                height={1600}
                className="h-auto w-full opacity-90 transition group-hover:opacity-100"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#070605] to-transparent p-3">
                <span className="font-serif text-sm text-[#ece8df]">
                  {plate.caption}
                </span>
                <span className="block font-mono text-[9px] tracking-widest text-[#8a8578] uppercase">
                  {plate.anchor}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
