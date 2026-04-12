import axios from "axios";
import { API_URL } from "../helpers/Constants";

const USER_URL = `${API_URL}user`;

export const getOneUser = async () => {
    try {
        const { data } = await axios.get(`${USER_URL}/get-one-user`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getOneUser failed. Please try again."
        );
    }
};