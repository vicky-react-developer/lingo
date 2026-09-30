import type { MessageResponse } from '../../types/common';
import type { UpdateUserStatusPayload } from '../../types/users';
import { API } from './config/apiConfig';
import { api } from './api';

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        activateUser: builder.mutation<MessageResponse, UpdateUserStatusPayload>({
            query: ({ userId, payload }) => ({
                baseURL: API.admin,
                url: `users/${userId}/update-status`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: (_result, _error, { payload }) => payload.role === "Students" ? ["Students"] : ["Faculties"]
        })
    })
});

export const {
    useActivateUserMutation
} = usersApi;