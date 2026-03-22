import axios from "axios";
import { API_URL } from "../helpers/Constants";

const Message_URL = `${API_URL}message`;

export const saveMessage = async (sessionId, text) => {
    try {
        const { data } = await axios.post(`${Message_URL}/save-message`, {
            sessionId,
            text
        });
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "Registration failed. Please try again."
        );
    }
};