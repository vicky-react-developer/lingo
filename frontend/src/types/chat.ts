export type ChatMode = "normal" | "duolingoChat" | "topic" | "duolingoTopic" | "passage" | "passageTranslation";

export interface ChatExtraInfo {
    title: string;
    tamilText?: string;
}

export interface SessionPayload {
    mode: ChatMode;
    topicId?: number;
    passageId?: number;
}

export type ChatParticipants = "ai" | "user";

export interface Correction {
    wrongText: string;
    correctedText: string;
    explanation: string;
}

export interface MessageStructure {
    sender: ChatParticipants;
    text: string
    Correction: Correction | null
}