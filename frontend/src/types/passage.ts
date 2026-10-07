export interface Attempt {
    id: number;
    score?: number
}

export interface Passage {
    id: number;
    tamilText: string;
    Attempts: Attempt[]
}