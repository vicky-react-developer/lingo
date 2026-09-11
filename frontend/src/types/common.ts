export interface PaginationResponse<T> {
    success: true;
    data: T[],
    total: number
}

export interface DataResponse<T> {
    success: true;
    data: T[],
}

export interface Options {
    label: string;
    value: string;
}