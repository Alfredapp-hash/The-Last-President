import type { Book } from "@/lib/content";

type BookSampleDownloadProps = {
  book: Book;
  className?: string;
};

export function BookSampleDownload({ book, className = "" }: BookSampleDownloadProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      <a
        href={book.sampleDownloadTxt}
        download
        className="inline-flex rounded-sm border border-[#2a2724] px-3 py-1.5 font-mono text-[10px] tracking-wide text-[#ece8df] uppercase transition hover:border-[#8a8578]/40"
      >
        First 3 Chapters (TXT)
      </a>
      <a
        href={book.sampleDownloadMd}
        download
        className="inline-flex rounded-sm border border-[#2a2724] px-3 py-1.5 font-mono text-[10px] tracking-wide text-[#ece8df] uppercase transition hover:border-[#8a8578]/40"
      >
        First 3 Chapters (MD)
      </a>
    </div>
  );
}
