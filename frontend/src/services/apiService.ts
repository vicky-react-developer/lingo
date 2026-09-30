import type { RTKQueryError } from "../types/common";

export const handleApiError = (e: unknown) => {
    const err = e as RTKQueryError;
    if (err.data instanceof Object) return err.data.message
    return err.data;
}