import type { DataResponse } from '../../types/common';
import { API } from './config/apiConfig';
import { api } from './api';
import type { 
    FunctionalTaskResponse,
    FunctionalExerciseResponse,
    Attempt,
    SubmitFunctionalExercisePayload,
 } from '../../types/functionalTask';

export const functionalTaskApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchTasks: builder.query<DataResponse<FunctionalTaskResponse[]>, string>({
            query: (category) => ({
                baseURL: API.base,
                url: 'functional-tasks/get-tasks',
                method: 'GET',
                params: { category },
            }),
            providesTags: ["FunctionalTasks"]
        }),

        fetchFunctionalExercises: builder.query<
            DataResponse<FunctionalExerciseResponse[]>,
            number
        >({
            query: (taskId) => ({
                baseURL: API.base,
                url: `functional-tasks/get-functional-exercises/${taskId}`,
                method: 'GET',
            }),
            providesTags: ["FunctionalExercises"]
        }),

        submitFunctionalExercise: builder.mutation<
            DataResponse<Attempt>,
            SubmitFunctionalExercisePayload
        >({
            query: (payload) => ({
                baseURL: API.base,
                url: 'functional-tasks/submit-functional-exercise',
                method: 'POST',
                data: payload,
            }),
            invalidatesTags: ["FunctionalTasks", "FunctionalExercises"]
        })

    })
});

export const {
    useFetchTasksQuery,
    useFetchFunctionalExercisesQuery,
    useSubmitFunctionalExerciseMutation,
} = functionalTaskApi;