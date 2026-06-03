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

export const getTaskQuestions = async (taskId) => {
  try {
    const { data } = await axios.get(`${API_URL}foundational-tasks/get-task-questions/${taskId}`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getTamilSentences failed. Please try again."
    );
  }
};
