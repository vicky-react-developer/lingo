import type { FetchDataParams } from '../../types/table';
import type { PaginationResponse, MessageResponse } from '../../types/common';
import type { User, AssignFacultyPayload } from '../../types/users';
import { API } from './config/apiConfig';
import { api } from './api';

export const studentsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchStudents: builder.query<PaginationResponse<User>, FetchDataParams>({
            query: (params) => ({
                baseURL: API.admin,
                url: "students",
                method: "GET",
                params: params
            }),
            providesTags: ["Students"]
        }),
        assignFaculty: builder.mutation<MessageResponse, AssignFacultyPayload>({
            query: ({ studentId, payload }) => ({
                baseURL: API.admin,
                url: `students/${studentId}/assign-faculty`,
                method: "PUT",
                data: payload
            }),
            invalidatesTags: [
                "Students",
            ]
        })
    })
});

export const {
    useFetchStudentsQuery,
    useAssignFacultyMutation
} = studentsApi;