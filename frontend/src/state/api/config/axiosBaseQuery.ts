import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, type AxiosRequestConfig } from "axios";
import axiosInstance from "./axiosInstance";
import type { ApiErrorResponse } from "../../../types/common";

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
            const error = axiosError as AxiosError<ApiErrorResponse>;
            return {
                error: {
                    status: error.status,
                    data: error.response?.data || error.message,
                }
            }
        }
    } 