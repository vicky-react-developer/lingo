import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

type PageItem = { gap: false; page: number } | { gap: true; key: string };

export default function Pagination({ page, total, limit, onPageChange }: PaginationProps) {

  const pageCount = useMemo(() => {
    return Math.ceil(total / limit)
  }, [total, limit]);

  const pages = useMemo(() => {
    const set = new Set<number>([1, pageCount, page, page - 1, page + 1]);
    return [...set].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  }, [page, pageCount]);

  if (pageCount <= 1) return null;

  const items: PageItem[] = [];
  let prev = 0;
  for (const p of pages) {
    if (p - prev > 1) items.push({ gap: true, key: `gap-${p}` });
    items.push({ gap: false, page: p });
    prev = p;
  }

  const start = ((page - 1) * limit)

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-stone-500">
        Showing <span className="font-medium text-stone-700">{total === 0 ? 0 : start + 1}</span>–
        <span className="font-medium text-stone-700">
          {Math.min(start + limit, total)}
        </span>{" "}
        of <span className="font-medium text-stone-700">{total}</span> students
      </p>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-300 text-stone-500 transition hover:border-teal-700 hover:text-teal-800 disabled:pointer-events-none disabled:opacity-30"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {items.map((it) =>
          it.gap ? (
            <span key={it.key} className="px-1.5 text-sm text-stone-400 select-none">
              …
            </span>
          ) : (
            <button
              type="button"
              key={it.page}
              onClick={() => onPageChange(it.page)}
              aria-current={it.page === page ? "page" : undefined}
              className={`h-8 min-w-[2rem] rounded-md px-2 text-sm font-medium transition ${it.page === page ? "bg-teal-800 text-white" : "text-stone-600 hover:bg-stone-100"
                }`}
            >
              {it.page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={page === pageCount}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-stone-300 text-stone-500 transition hover:border-teal-700 hover:text-teal-800 disabled:pointer-events-none disabled:opacity-30"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
}
