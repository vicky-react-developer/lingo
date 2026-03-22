import axios from "axios";
import { API_URL } from "../helpers/Constants";

const Passage_URL = `${API_URL}passage`;

export const getPassages = async () => {
    try {
        const { data } = await axios.get(`${Passage_URL}/get-passages`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getPassages failed. Please try again."
        );
    }
};

export const getOnePassage = async (passageId) => {
    try {
        const { data } = await axios.get(`${Passage_URL}/get-passage/${passageId}`);
        return data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message || "getOnePassage failed. Please try again."
        );
    }
};