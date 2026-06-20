import { site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-stone-800 bg-[#080807] px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-xl text-stone-200">{site.name}</p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-stone-500">
            {site.tagline}
          </p>
        </div>
        <div className="text-sm text-stone-500">
          <p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="text-stone-400 transition hover:text-stone-200"
            >
              {site.contactEmail}
            </a>
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} Alfred App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
