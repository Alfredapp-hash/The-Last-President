import type { Book } from "@/lib/content";

type BookBuyButtonProps = {
  book: Book;
  className?: string;
  compact?: boolean;
  primary?: boolean;
};

export function BookBuyButton({
  book,
  className = "",
  compact = false,
  primary = true,
}: BookBuyButtonProps) {
  const label = `Buy on Gumroad — $${book.priceUsd.toFixed(2)}`;
  const sizeClass = compact
    ? "px-3 py-1.5 text-[10px]"
    : "px-4 py-2 text-xs font-medium";

  if (primary) {
    return (
      <a
        href={book.gumroadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center rounded-sm bg-[#c9a962] font-mono tracking-wide text-[#070605] uppercase transition hover:bg-[#dbb872] ${sizeClass} ${className}`}
      >
        {label}
      </a>
    );
  }

  return (
    <a
      href={book.gumroadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center rounded-sm border border-[#2a2724] font-mono tracking-wide text-[#ece8df] uppercase transition hover:border-[#8a8578]/40 ${sizeClass} ${className}`}
    >
      {label}
    </a>
  );
}