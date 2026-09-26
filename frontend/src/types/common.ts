import type { LucideIcon } from "lucide-react";

export interface PaginationResponse<T> {
    success: boolean;
    data: T[],
    total: number
}

export interface DataResponse<T> {
    success: boolean;
    data: T[],
}

export interface MessageResponse {
    success: true;
    message: string;
}

export interface Options {
    label: string;
    value: string;
}

export interface Mode {
    id: string;
    icon: LucideIcon;
    title: string;
    desc: string;
}