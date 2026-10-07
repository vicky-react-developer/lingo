import type { MessageResponse } from '../../types/common';
import type { ChangePasswordPayload, UserProfile, User } from '../../types/users';
import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';

export const usersApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchCurrentUser: builder.query<DataResponse<User>, void>({
            query: () => ({
                baseURL: API.base,
                url: `user/get-one-user`,
                method: "GET"
            }),
            providesTags: ["Profile"]
        }),
        updateProfile: builder.mutation<MessageResponse, UserProfile>({
            query: (payload) => ({
                baseURL: API.base,
                url: `user/update-profile`,
                method: "PUT",
                data: payload
            }),
            invalidatesTags: ["Profile"]
        }),
        changePassword: builder.mutation<MessageResponse, ChangePasswordPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `user/change-password`,
                method: "PUT",
                data: payload
            }),
        })
    })
});

export const {
    useFetchCurrentUserQuery,
    useUpdateProfileMutation,
    useChangePasswordMutation
} = usersApi;