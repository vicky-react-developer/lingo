import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";

interface FetchQueryArgs {
    baseURL: AxiosRequestConfig["baseURL"];
    url: AxiosRequestConfig["url"];
    method?: AxiosRequestConfig["method"];
    params?: AxiosRequestConfig["params"];
    data?: AxiosRequestConfig["data"];
    responseType?: AxiosRequestConfig["responseType"];
}

export const axiosBaseQuery = (): BaseQueryFn<FetchQueryArgs, unknown, unknown> =>
    async ({ baseURL, url, method = "GET", params, data, responseType }) => {
        try {
            const response = await axiosInstance({
                baseURL,
                url,
                method,
                params,
                data,
                responseType
            })

            return {
                data: response.data
            }
        } catch (axiosError) {
            const error = axiosError as AxiosError;
            return {
                status: error.status,
                data: error.response?.data || error.message
            }
        }
    } 