import axios from "axios";
import { API_URL } from "../../helpers/Constants";
import type { FetchDataParams } from "../../types/table";

const END_POINT = `${API_URL}admin/students`

export const getStudents = async (params: FetchDataParams) => {
    const { data } = await axios.get(`${END_POINT}/get-students`, {
        params
    });
    return data;
}