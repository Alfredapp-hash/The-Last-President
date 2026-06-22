import type { Book } from "@/lib/content";

type BookSampleDownloadProps = {
  book: Book;
  className?: string;
  compact?: boolean;
};

export function BookSampleDownload({
  book,
  className = "",
  compact = false,
}: BookSampleDownloadProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={book.sampleDownloadEpub}
        download
        className={`inline-flex items-center rounded-sm bg-[#c9a962] font-mono tracking-wide text-[#070605] uppercase transition hover:bg-[#dbb872] ${
          compact
            ? "px-3 py-1.5 text-[10px]"
            : "px-4 py-2 text-[11px] font-medium"
        }`}
      >
        Sample EPUB
      </a>
      <a
        href={book.sampleDownloadPdf}
        download
        className={`inline-flex items-center rounded-sm border border-[#2a2724] font-mono tracking-wide text-[#ece8df] uppercase transition hover:border-[#8a8578]/40 ${
          compact
            ? "px-3 py-1.5 text-[10px]"
            : "px-4 py-2 text-[11px]"
        }`}
      >
        Sample PDF
      </a>
    </div>
  );
}
