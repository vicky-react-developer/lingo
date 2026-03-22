import axios from "axios";
import { API_URL } from "../helpers/Constants";

const SESSION_URL = `${API_URL}session`;

export const createSession = async (mode) => {
  try {
    const { data } = await axios.post(`${SESSION_URL}/create-session`, {mode});
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Registration failed. Please try again."
    );
  }
};