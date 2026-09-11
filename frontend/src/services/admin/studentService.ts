import axios from "axios";
import { API_URL } from "../../helpers/Constants";
import type { FetchDataParams } from "../../types/table";
import type { AssignFacultyPayload } from "../../types/users";

const END_POINT = `${API_URL}admin/students`

export const getStudents = async (params: FetchDataParams) => {
    const { data } = await axios.get(`${END_POINT}`, {
        params
    });
    return data;
}

export const assignFaculty = async ({studentId, payload}: AssignFacultyPayload) => {
    const { data } = await axios.put(`${END_POINT}/${studentId}/assign-faculty`, payload);
    return data;
}