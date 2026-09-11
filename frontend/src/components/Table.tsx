import { ChevronsUpDown, ChevronUp, ChevronDown } from "lucide-react";
import type { Column, SortOrder } from "../types/table";

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  getRowKey: (row: T) => number;
  sortBy?: string;
  sortOrder?: SortOrder;
  onSort?: (key: string) => void;
  emptyMessage?: string;
}

export default function Table<T>({
  columns,
  data,
  getRowKey,
  sortBy,
  sortOrder,
  onSort,
  emptyMessage = "No matching results.",
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-stone-200">
      <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-stone-50">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className="border-b border-stone-200 px-4 py-3 font-serif text-[13px] font-semibold tracking-tight text-stone-600"
              >
                {col.sortable && onSort ? (
                  <button
                    type="button"
                    onClick={() => onSort(col.key)}
                    className="flex items-center gap-1 hover:text-teal-800"
                  >
                    {col.header}
                    {sortBy === col.key ? (
                      sortOrder === "ASC" ? (
                        <ChevronUp className="h-3.5 w-3.5" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5" />
                      )
                    ) : (
                      <ChevronsUpDown className="h-3.5 w-3.5 text-stone-300" />
                    )}
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-14 text-center text-stone-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr
                key={getRowKey(row) ?? i}
                className={`border-b border-stone-100 last:border-b-0 transition-colors hover:bg-teal-50/40 ${
                  i % 2 === 1 ? "bg-stone-50/50" : "bg-white"
                }`}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 align-top text-stone-700">
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
