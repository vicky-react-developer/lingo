import axios from "axios";
import { API_URL } from "../helpers/Constants";

const SESSION_URL = `${API_URL}session`;

export const createSession = async (payload) => {
  try {
    const { data } = await axios.post(`${SESSION_URL}/create-session`, {payload});
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

export const getSessions = async () => {
  try {
    const { data } = await axios.get(`${SESSION_URL}/get-sessions`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getSessions failed. Please try again."
    );
  }
};