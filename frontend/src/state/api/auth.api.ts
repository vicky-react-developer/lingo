import { API } from './config/apiConfig';
import { api } from './api';
import type {
    RegistrationResponse,
    RegisterPayload,
    LoginResponse,
    LoginPayload,
    ForgotPasswordResponse,
    ForgotPasswordPayload,
    ResetPasswordPayload
} from '../../types/auth';
import type { MessageResponse } from '../../types/common';

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        registerUser: builder.mutation<RegistrationResponse, RegisterPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `auth/register`,
                method: "POST",
                data: payload
            })
        }),
        loginUser: builder.mutation<LoginResponse, LoginPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `auth/login`,
                method: "POST",
                data: payload
            }),
            invalidatesTags: ["Profile"]
        }),
        logoutUser: builder.mutation<MessageResponse, void>({
            query: () => ({
                baseURL: API.base,
                url: `auth/logout`,
                method: "POST",
            }),
            invalidatesTags: ["Profile"]
        }),
        forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `auth/forgot-password`,
                method: "POST",
                data: payload
            })
        }),
        resetPassword: builder.mutation<MessageResponse, ResetPasswordPayload>({
            query: (payload) => ({
                baseURL: API.base,
                url: `auth/reset-password`,
                method: "POST",
                data: payload
            })
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation
} = authApi;