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
    success: boolean;
    message: string;
}

export interface ApiErrorResponse {
    success: false;
    message: string;
}

export interface RTKQueryError {
    status: number;
    data: string | ApiErrorResponse;
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

export type OutletContext = {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ParentModes {
    chat: Mode[];
    duolingo: Mode[];
    story: Mode[];
    functionalTasks: Mode[]
}

// export type MenuCategory = "duolingo" | "functionalTasks" | "story" | "chat";

// export interface HomeMode extends Mode {
//     id: MenuCategory;
// }