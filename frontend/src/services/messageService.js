import axios from "axios";
import { API_URL } from "../helpers/Constants";

const Message_URL = `${API_URL}message`;

export const saveMessage = async (sessionId, text, otherInfo) => {
    try {
        const { data } = await axios.post(`${Message_URL}/save-message`, {
            sessionId,
            text,
            otherInfo
        });
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "Save Message failed."
        );
    }
};

export const initiateConversation = async (sessionId, otherInfo) => {
    try {
        const { data } = await axios.post(`${Message_URL}/initiate-conversation`, {
            sessionId,
            otherInfo
        });
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "Initiate Conversation failed."
        );
    }
};

export const getAllMessages = async (sessionId) => {
    try {
        const { data } = await axios.get(`${Message_URL}/get-all-messages/${sessionId}`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getAllMessages failed."
        );
    }
};