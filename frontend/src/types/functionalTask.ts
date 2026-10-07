export interface Attempt {
    id: number;
    userAnswer: string;
    correctedAnswer?: string | null;
    explanation?: string | null;
    isCorrect: boolean;
    score?: number | null;
    createdAt: string;
    updatedAt: string;
}


export interface FunctionalExercise {
    id: number;
}

export interface FunctionalTaskResponse {
    id: number;
    type: string;
    title: string;
    completed: number;
    totalQuestions: number;
}

export interface FunctionalExerciseResponse extends FunctionalExercise {
    englishSentence: string;
    tamilSentence: string;
    Attempts: Attempt[];
}

export interface SubmitFunctionalExercisePayload {
    tamilSentence: string;
    englishSentence: string;
    userAnswer: string;
    exerciseId: number;
    taskId: number;
    taskType: string;
}