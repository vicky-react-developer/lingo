import type { FetchDataParams } from '../../types/table';
import type { PaginationResponse, DataResponse } from '../../types/common';
import type { FacultyOptions } from '../../types/users';
import type { User } from '../../types/users';
import { API } from './config/apiConfig';
import { api } from './api';

export const facultiesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchFaculties: builder.query<PaginationResponse<User>, FetchDataParams>({
            query: (params) => ({
                baseURL: API.admin,
                url: "faculties",
                method: "GET",
                params: params
            }),
            providesTags: ["Faculties"]
        }),
        fetchFacultiesOptions: builder.query<DataResponse<FacultyOptions>, void>({
            query: () => ({
                baseURL: API.admin,
                url: "faculties/options",
                method: "GET",
            }),
            providesTags: ["Faculties"]
        })
    })
});

export const {
    useFetchFacultiesQuery,
    useFetchFacultiesOptionsQuery
} = facultiesApi;