interface PageSizeProps {
    limit: number;
    setLimit: (l: number) => void;
    setPage: (p: number) => void
}

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;

export default function PageSize({ limit, setLimit, setPage }: PageSizeProps) {
    return (
        <div className="flex items-center gap-2 text-sm text-stone-500">
            <span>Show</span>
            <select
                value={limit}
                onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                }}
                className="rounded-md border border-stone-300 bg-white px-2 py-1.5 text-sm text-stone-700 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/15"
            >
                {PAGE_SIZE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                        {n}
                    </option>
                ))}
            </select>
            <span>entries</span>
        </div>
    )
}