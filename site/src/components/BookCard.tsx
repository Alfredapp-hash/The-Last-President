import type { Book } from "@/lib/content";

export function BookCard({ book }: { book: Book }) {
  return (
    <article
      id={book.id}
      className="group relative flex flex-col overflow-hidden rounded-lg border border-stone-800 bg-[#121110] transition hover:border-stone-700"
    >
      <div
        className="h-1.5 w-full"
        style={{ backgroundColor: book.accent }}
        aria-hidden
      />
      <div className="flex flex-1 flex-col p-8">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.25em] text-stone-500 uppercase">
              {book.subtitle}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-stone-100">
              {book.title}
            </h3>
          </div>
          <span className="shrink-0 rounded border border-stone-700 px-2 py-0.5 text-[10px] tracking-wider text-stone-400 uppercase">
            {book.status}
          </span>
        </div>
        <p className="font-serif text-lg italic text-[#c4a35a]">{book.hook}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-stone-400">
          {book.blurb}
        </p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {book.themes.map((theme) => (
            <li
              key={theme}
              className="rounded-full border border-stone-800 px-3 py-1 text-xs text-stone-500"
            >
              {theme}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex gap-4 border-t border-stone-800 pt-4 text-xs text-stone-600">
          <span>{book.chapters}</span>
          <span>·</span>
          <span>{book.wordCount}</span>
        </div>
      </div>
    </article>
  );
}
