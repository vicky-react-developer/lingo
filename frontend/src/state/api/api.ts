import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './config/axiosBaseQuery';

export const api = createApi({
    reducerPath: "api",
    baseQuery: axiosBaseQuery(),

    tagTypes: [
        "Students",
        "Faculties",
        "Profile",
        "Chats",
        "FunctionalTasks",
        "FunctionalExercises",
        "Passages"
    ],

    endpoints: () => ({}),
});