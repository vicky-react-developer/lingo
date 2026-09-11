import axios from "axios";
import { API_URL } from "../../helpers/Constants";
import type { FetchDataParams } from "../../types/table";

const END_POINT = `${API_URL}admin/faculties`

export const getFaculties = async (params: FetchDataParams) => {
    const { data } = await axios.get(`${END_POINT}`, {
        params
    });
    return data;
}

export const getFacultyOptions = async () => {
    const { data } = await axios.get(`${END_POINT}/options`);
    return data;
}