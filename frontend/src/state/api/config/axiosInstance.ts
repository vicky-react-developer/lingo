import axios from "axios";
import { userLogout } from "../../../services/authService";

const axiosInstance = axios.create({ timeout: 10000});

axios.interceptors.request.use(
    (config) => {
        // Get token from storage (adjust as needed)
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(function onFulfilled(response) {
    return response;
}, function onRejected(error) {
    if (error.response?.status === 401) {
        userLogout();
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from storage (adjust as needed)
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(function onFulfilled(response) {
    return response;
}, function onRejected(error) {
    if (error.response?.status === 401) {
        userLogout();
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosInstance;