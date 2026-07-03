import axios from "axios";
import { API_URL } from "../helpers/Constants";

export const getTasks = async (category) => {
  try {
    const { data } = await axios.get(`${API_URL}functional-tasks/get-tasks?category=${category}`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getTasks failed. Please try again."
    );
  }
};

export const getFunctionalExercises = async (taskId) => {
  try {
    const { data } = await axios.get(`${API_URL}functional-tasks/get-functional-exercises/${taskId}`);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "getFunctionalExercises failed. Please try again."
    );
  }
};

export const submitFunctionalExercise = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}functional-tasks/submit-functional-exercise`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "submitFunctionalExercise failed. Please try again."
    );
  }
};

export const submitWordTask = async (payload) => {
  try {
    const { data } = await axios.post(`${API_URL}functional-tasks/submit-word-task`, payload);
    return data;
  } catch (error) {
    throw new Error(
      error?.response?.data?.message || "submitWordTask failed. Please try again."
    );
  }
};