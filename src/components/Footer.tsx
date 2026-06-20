import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-[#2a2724] bg-[#050504] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-[#ece8df]">{site.name}</p>
            <p className="mt-3 text-sm leading-relaxed text-[#8a8578]">
              {site.seriesTitle}
            </p>
            <p className="mt-2 text-sm text-[#8a8578]/80">{site.tagline}</p>
          </div>
          <div>
            <p className="section-label">Navigate</p>
            <ul className="mt-4 space-y-2 text-sm text-[#8a8578]">
              <li>
                <a href="#books" className="transition hover:text-[#ece8df]">
                  The Trilogy
                </a>
              </li>
              <li>
                <a href="#arc" className="transition hover:text-[#ece8df]">
                  Series Arc
                </a>
              </li>
              <li>
                <a href="/press" className="transition hover:text-[#ece8df]">
                  Press Kit
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="section-label">Contact</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-4 block text-sm text-[#c9a962] transition hover:text-[#e0c078]"
            >
              {site.contactEmail}
            </a>
            <p className="mt-6 font-mono text-[10px] tracking-widest text-[#8a8578]/60 uppercase">
              Not a chosen-one story. A case file.
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-[#2a2724] pt-8 text-center text-xs text-[#8a8578]/60">
          © {new Date().getFullYear()} Alfred App. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
