export interface PaginationResponse<T> {
    success: true;
    data: T[],
    total: number
}