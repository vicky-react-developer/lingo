import "./ChatPage.css";

import { getAllMessages, initiateConversation, saveMessage } from "../services/messageService";
import { useEffect, useRef, useState } from "react";

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
  const { speak, stop } = useSpeech();

  const chatEndRef = useRef(null);
  const location = useLocation();

  const { sessionPayload, info } = location?.state || {};

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

      speak(aiReply);

    } catch (e) {
      console.log("startConvo error", e);
    } finally {
      setIsTyping(false);
    }
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
      speak(aiReply);
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

  return (

    <div className="chat-page">

      {/* Header */}
      <Header primaryTitle="Chat" />

      {/* Context Banner — shown only for topic/passage modes */}
      <ContextBanner mode={sessionPayload?.mode} info={info} />

      {/* Chat Area */}
      <div className="chat-body">
        <ChatWindow messages={messages} isTyping={isTyping} />
        <div ref={chatEndRef}></div>
      </div>

      {/* Input */}
      <div className="chat-input-container">

        <input
          className="chat-input"
          placeholder="Type your message.."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <VoiceRecorder
          onText={sendMessage}
        />
      </div>
    </div>
  );
}