import axios from "axios";
import { API_URL } from "../helpers/Constants";

// ── REGISTER ──────────────────────────────────────────────────────────────────
export const getTasks = async (type) => {
  try {
    const { data } = await axios.get(`${API_URL}foundational-tasks/get-tasks/${type}`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getTasks failed. Please try again."
    );
  }
};

export const getTamilSentences = async (taskId) => {
  try {
    const { data } = await axios.get(`${API_URL}foundational-tasks/get-tamil-sentences/${taskId}`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getTamilSentences failed. Please try again."
    );
  }
};

export const submitTamilTranslation = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}foundational-tasks/submit-tamil-translation`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "submitTamilTranslation failed. Please try again."
    );
  }
};