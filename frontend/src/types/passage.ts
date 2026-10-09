import type { Attempt } from "./functionalTask";

export interface Passage {
    id: number;
    tamilText: string;
    Attempts: Attempt[]
}

export interface PassageTranslationPayload {
  passageId: number;
  tamilText: string;
  translation: string;
}