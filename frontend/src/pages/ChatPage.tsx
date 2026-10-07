import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import ChatWindow from "../components/ChatWindow";
import ContextBanner from "../components/ContextBanner";
import Header from "../layouts/Header";
import VoiceRecorder from "../components/VoiceRecorder";
import { useLocation } from 'react-router';
import useSpeech from "../hooks/useSpeech";
import type {
  MessageStructure,
  StartConvo
} from "../types/chat";
import { useCreateSessionMutation } from "../state/api/session.api";
import {
  useFetchMessagesQuery,
  useSaveMessageMutation,
  useInitiateConversationMutation
} from "../state/api/chat.api";

export default function ChatPage() {
  const [createSession] = useCreateSessionMutation();
  const [initiateConversation] = useInitiateConversationMutation();
  const [saveMessage] = useSaveMessageMutation();

  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  // const [messages, setMessages] = useState<MessageStructure[]>([]);
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { speak, stop, speakTamil } = useSpeech();

  const { sessionPayload, info } = location?.state || {};

  const { data } = useFetchMessagesQuery(sessionId!, { skip: !sessionId });


  const isDuolingo = sessionPayload?.mode?.startsWith("duolingo");
  const messages = data?.data ?? [];

  useEffect(() => {
    if (sessionPayload?.sessionId) {
      setSessionId(sessionPayload.sessionId);
    } else {
      createCurrentSession();
    }

    return () => stop();
  }, [location]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  const createCurrentSession = async () => {
    try {
      const res = await createSession(sessionPayload ?? { mode: "normal" }).unwrap();

      if (!res.success) {
        alert("Something went wrong");
      }

      const sessionId = res.data.sessionId;

      setSessionId(sessionId);

      startConvo(sessionId, { ...sessionPayload, ...info })

    } catch (e) {
      console.log("createSession error", e);
    }
  };

  const startConvo = async (sessionId: number, payload: StartConvo) => {
    setIsTyping(true);
    try {
      const data = {
        sessionId,
        otherInfo: payload
      }
      const res = await initiateConversation(data).unwrap();

      const aiReply = res.aiReply;

      // setMessages([
      //   {
      //     sender: "ai",
      //     text: res.aiReply
      //   }
      // ]);

      if (isDuolingo) {
        speakDuolingo(aiReply)
      } else {
        speak(aiReply);
      }

    } catch (e) {
      console.log("startConvo error", e);
    } finally {
      setIsTyping(false);
    }
  };

  const speakDuolingo = (reply: string) => {
    const parts = reply
      .replace(/\r\n/g, "\n")
      .split(/\n\s*\n/);

    const partsLength = parts.length;

    const english = parts.slice(0, partsLength - 1).join(" ")
    const tamil = parts[partsLength - 1];

    console.log("english", english, tamil)

    speak(english, () => {
      if (tamil?.trim()) {
        speakTamil(tamil);
      }
    });
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    stop();
    // setMessages(prev => [
    //   ...prev,
    //   { sender: "user", text: messageText }
    // ]);

    setIsTyping(true); // Set typing to true

    const data = {
      sessionId: sessionId!,
      text: messageText,
      otherInfo:  {...sessionPayload, ...info }
    } 

    try {
      const res = await saveMessage(data).unwrap();
      const { aiReply } = res;

      // const aiMessage: MessageStructure = {
      //   sender: "ai",
      //   text: aiReply,
      //   Correction
      // };

      // setMessages(prev => [...prev, aiMessage]);
      if (isDuolingo) {
        speakDuolingo(aiReply)
      } else {
        speak(aiReply);
      }
    } catch (error) {
      console.error("Failed to send message", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = () => {
    sendMessage(text);
    setText("");
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleVoice = (value: string) => {
    if (isDuolingo) {
      setText(prev => prev + value + "\n");
    } else {
      setText(value);
    }
  }

  return (

    <div className="h-screen mx-auto flex flex-col bg-[#f4f4f7]">

      {/* Header */}
      <Header primaryTitle="Chat" />

      {/* Context Banner — shown only for topic/passage modes */}
      <ContextBanner mode={sessionPayload?.mode} info={info} />

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-[15px] py-5">
        <ChatWindow messages={messages} isTyping={isTyping} />
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-2.5 bg-white border-t border-[#eee]">

        <textarea
          className="flex-1 resize-none border border-[#ddd] rounded-[10px] p-2.5 text-xs outline-none min-h-[70px] max-h-[120px]"
          placeholder="Speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        {isDuolingo && (
          <VoiceRecorder
            language="ta-IN"
            onText={handleVoice}
          />
        )}

        <VoiceRecorder
          language="en-US"
          onText={handleVoice}
        />

        <button
          className="w-[42px] h-[42px] shrink-0 rounded-full border-none flex items-center justify-center text-white bg-[#00CCFF] disabled:opacity-50"
          onClick={handleSubmit}
          disabled={!text.trim()}
        >
          <Send size={16} />
        </button>

      </div>
    </div>
  );
}