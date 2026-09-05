import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  width?: string;
  render?: (row: T) => ReactNode;
}

export interface FetchDataParams {
  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: SortOrder
}

export type SortOrder = "ASC" | "DESC";
