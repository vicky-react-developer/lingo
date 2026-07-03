import axios from "axios";
import { API_URL } from "../helpers/Constants";

const TOPIC_URL = `${API_URL}topic`;

export const getTopics = async (mode) => {
    try {
        const { data } = await axios.get(`${TOPIC_URL}/get-topics?mode=${mode}`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getTopics failed. Please try again."
        );
    }
};

export const getOneTopic = async (topicId) => {
    try {
        const { data } = await axios.get(`${TOPIC_URL}/get-topic/${topicId}`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getOneTopic failed. Please try again."
        );
    }
};