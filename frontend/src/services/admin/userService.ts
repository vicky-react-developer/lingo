import axios from "axios";
import { API_URL } from "../../helpers/Constants";
import type { UpdateUserStatusPayload } from "../../types/users";

const END_POINT = `${API_URL}admin/users`

export const updateUserStatus = async ({ userId, payload }: UpdateUserStatusPayload) => {
    const { data } = await axios.patch(`${END_POINT}/${userId}/update-status`, payload);
    return data;
}