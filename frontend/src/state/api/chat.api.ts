import type { MessageStructure, SaveMessageResponse, SaveMessagePayload, StartConvoPayload } from '../../types/chat';
import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';

export const chatApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchMessages: builder.query<DataResponse<MessageStructure[]>, number>({
            query: (sessionId) => ({
                baseURL: API.base,
                url: `message/get-all-messages/${sessionId}`,
                method: "GET"
            }),
            providesTags: ["Chats"]
        }),
        saveMessage: builder.mutation<SaveMessageResponse, SaveMessagePayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `message/save-message`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: ["Chats"]
        }),
        initiateConversation: builder.mutation<Omit<SaveMessageResponse, "Correction">, StartConvoPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `message/initiate-conversation`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: ["Chats"]
        })
    })
});

export const {
    useFetchMessagesQuery,
    useSaveMessageMutation,
    useInitiateConversationMutation
} = chatApi;