import type { Topic } from '../../types/topic';
import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';

export const topicApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchTopics: builder.query<DataResponse<Topic[]>, string>({
            query: (mode) => ({
                baseURL: API.base,
                url: `topic/get-topics`,
                method: "GET",
                params: {
                    mode
                }
            }),
            keepUnusedDataFor: Infinity
        })
    })
});

export const {
    useFetchTopicsQuery,
} = topicApi;