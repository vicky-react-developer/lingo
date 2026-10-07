import type { Passage } from '../../types/passage';
import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';

export const passageApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchPassages: builder.query<DataResponse<Passage[]>, string>({
            query: (mode) => ({
                baseURL: API.base,
                url: `passage/get-passages`,
                method: "GET",
                params: {
                    mode
                }
            }),
            keepUnusedDataFor: Infinity
        }),
        fetchOnePassage: builder.query<DataResponse<Passage[]>, void>({
            query: () => ({
                baseURL: API.base,
                url: `topic/get-topics`,
                method: "GET"
            }),
            keepUnusedDataFor: Infinity
        }),
    })
});

export const {
    useFetchPassagesQuery,
    useFetchOnePassageQuery
} = passageApi;