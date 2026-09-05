import { getAllMessages, initiateConversation, saveMessage } from "../services/messageService";
import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";

import ChatWindow from "../components/ChatWindow";
import ContextBanner from "../components/ContextBanner";
import Header from "../components/Header";
import VoiceRecorder from "../components/VoiceRecorder";
import { createSession } from "../services/sessionService";
import { useLocation } from 'react-router';
import useSpeech from "../hooks/useSpeech";

export default function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const { speak, stop, speakTamil } = useSpeech();

  const chatEndRef = useRef(null);
  const location = useLocation();

  const { sessionPayload, info } = location?.state || {};

  const isDuolingo = sessionPayload?.mode?.startsWith("duolingo");

  useEffect(() => {
    if (sessionPayload?.sessionId) {
      setSessionId(sessionPayload.sessionId);
      fetchAllMessages(sessionPayload.sessionId)
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

  const fetchAllMessages = async (sessionId) => {
    try {
      const res = await getAllMessages(sessionId);

      if (!res.success) {
        alert("Something went wrong");
      }

      setMessages(res.data);

    } catch (e) {
      console.log("createSession error", e);
    }
  }

  const createCurrentSession = async () => {
    try {
      const res = await createSession(sessionPayload ?? { mode: "normal" });

      if (!res.success) {
        alert("Something went wrong");
      }

      const sessionId = res.session.id

      setSessionId(sessionId);

      startConvo(sessionId, { ...sessionPayload, ...info })

    } catch (e) {
      console.log("createSession error", e);
    }
  };

  const startConvo = async (sessionId, payload) => {
    setIsTyping(true);

    try {
      const res = await initiateConversation(sessionId, payload);

      if (!res.success) {
        alert("Something went wrong");
      }

      const aiReply = res.reply;

      setMessages([
        {
          sender: "ai",
          text: res.reply
        }
      ]);

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

  const speakDuolingo = (reply) => {
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

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    stop();
    setMessages(prev => [
      ...prev,
      { sender: "user", text: messageText }
    ]);

    setIsTyping(true); // Set typing to true

    try {
      const res = await saveMessage(sessionId, messageText, { ...sessionPayload, ...info });
      const { aiReply, correction } = res;

      const aiMessage = {
        sender: "ai",
        text: aiReply,
        correction
      };

      setMessages(prev => [...prev, aiMessage]);
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

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleVoice = (value) => {
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