import { API_URL } from "../../helpers/Constants";

export const API = {
    base: API_URL,
    admin: `${API_URL}admin`,
} as const;