import { useState } from "react";
import PageSize from "./PageSize";
import Table from "./Table";
import SearchBox from "./SearchBox";
import Pagination from "./Pagination";
import type { Column, SortOrder, FetchDataParams } from "../types/table";
import type { PaginationResponse } from "../types/common";
import { useQuery, type QueryKey } from "@tanstack/react-query";

interface DataTableProps<T> {
    title: string;
    columns: Column<T>[];
    queryFn: (params: FetchDataParams) => Promise<PaginationResponse<T>>;
    queryKeys: QueryKey;
    getRowKey: (row: T) => number
}

export default function DataTable<T>({ title, columns, queryFn, queryKeys, getRowKey }: DataTableProps<T>) {
    const [search, setSearch] = useState("");
    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState(1);
    const [sortBy, setSortBy] = useState<string>("");
    const [sortOrder, setSortOrder] = useState<SortOrder>("ASC");

    const { data } = useQuery({
        queryFn: () => queryFn({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        }),
        queryKey: [...queryKeys, page, limit, search, sortBy, sortOrder]
    });

    const handleSort = (key: string) => {
        if (sortBy === key) {
            setSortOrder((d) => (d === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortBy(key);
            setSortOrder("ASC");
        }
        setPage(1);
    };

    const tableData = data?.data ?? [];
    const total = data?.total ?? 0

    return (
        <div className="min-h-screen bg-[#F7F5F0] py-10">
            <div className="mx-auto max-w-[1240px]">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between border-b border-stone-200 pb-6">
                    <h1 className="mt-1 font-serif text-3xl font-semibold text-stone-900">
                        {title}
                    </h1>
                </div>

                {/* Toolbar */}
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <PageSize
                        limit={limit}
                        setLimit={setLimit}
                        setPage={setPage}
                    />

                    <SearchBox
                        value={search}
                        onChange={(v) => {
                            setSearch(v);
                            setPage(1);
                        }}
                        placeholder="Search name, phone, organization…"
                    />
                </div>

                {/* Table */}
                <Table<T>
                    columns={columns}
                    data={tableData}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                    onSort={handleSort}
                    getRowKey={getRowKey}
                    emptyMessage="No data found."
                />

                <Pagination
                    page={page}
                    total={total}
                    limit={limit}
                    onPageChange={setPage}
                />
            </div>
        </div>
    )
}