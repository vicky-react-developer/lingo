import axios from "axios";
import { API_URL } from "../helpers/Constants";

// ── REGISTER ──────────────────────────────────────────────────────────────────
export const registerUserApi = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}auth/register`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Registration failed. Please try again."
    );
  }
};

// ── LOGIN ─────────────────────────────────────────────────────────────────────
export const loginUserApi = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}auth/login`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Login failed. Please try again."
    );
  }
};

// ── FORGOT PASSWORD ───────────────────────────────────────────────────────────
export const forgotPasswordApi = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}auth/forgot-password`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Verification failed. Please try again."
    );
  }
};

// ── RESET PASSWORD ────────────────────────────────────────────────────────────
export const resetPasswordApi = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}auth/reset-password`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Password reset failed. Please try again."
    );
  }
};

// ── LOGOUT ────────────────────────────────────────────────────────────────────
export const logoutUserApi = async () => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.post(
      `${API_URL}auth/logout`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "Logout failed. Please try again."
    );
  }
};

//others
export const userLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}