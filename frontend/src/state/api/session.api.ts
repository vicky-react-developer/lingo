import type { MessageStructure, SessionPayload, SessionResponse } from '../../types/chat';
import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';

export const sessionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchsessions: builder.query<DataResponse<SessionResponse[]>, string>({
            query: (mode) => ({
                baseURL: API.base,
                url: `session/get-sessions`,
                method: "GET",
                params: {
                    mode
                }
            })
        }),
        createSession: builder.mutation<DataResponse<{sessionId: number}>, SessionPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `session/create-session`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: ["Chats"]
        }),
    })
});

export const {
    useFetchsessionsQuery,
    useCreateSessionMutation
} = sessionApi;