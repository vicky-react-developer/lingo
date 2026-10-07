export type ChatMode = "normal" | "duolingoChat" | "topic" | "duolingoTopic" | "passage" | "passageTranslation";

export interface ChatExtraInfo {
    title?: string;
    tamilText?: string;
}

export interface SessionPayload {
    mode: ChatMode;
    topicId?: number;
    passageId?: number;
}

export type StartConvo = ChatExtraInfo & SessionPayload;

export type StartConvoPayload = {
  sessionId: number;
  otherInfo: StartConvo
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
    Correction?: Correction | null
}

export interface SaveMessageResponse {
    aiReply: string;
    Correction: Correction | null
}

export interface SaveMessagePayload {
    sessionId: number,
    text: string,
    otherInfo: StartConvo
}

interface SessionMessage {
  text: string;
}

interface SessionTopic {
  title: string;
}

interface SessionPassage {
  tamilText: string;
}

export interface SessionResponse{
  id: string;
  mode: "topic" | "passage";
  updatedAt: string;
  Messages: SessionMessage[];
  Topic?: SessionTopic;
  Passage?: SessionPassage;
}
