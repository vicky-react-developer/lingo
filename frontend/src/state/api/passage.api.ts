import type { Passage, PassageTranslationPayload } from '../../types/passage';
import type { Attempt } from '../../types/functionalTask';
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
            providesTags: ["Passages"]
        }),
        fetchOnePassage: builder.query<DataResponse<Passage>, number>({
            query: (passageId) => ({
                baseURL: API.base,
                url: `passage/get-passage/${passageId}`,
                method: "GET"
            }),
            providesTags: (_result, _error, passageId) => [
                "Passages",
                { type: "Passages", id: passageId }
            ]
        }),
        submitPassageTranslation: builder.mutation<DataResponse<Attempt>, PassageTranslationPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `passage/submit-passage-translation`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: (_result, _error, { passageId }) => [
                "Passages",
                { type: "Passages", id: passageId }
            ]
        }),
    })
});

export const {
    useFetchPassagesQuery,
    useFetchOnePassageQuery,
    useSubmitPassageTranslationMutation
} = passageApi;