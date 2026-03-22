import { useState, useEffect, useRef } from "react";
import ChatWindow from "../components/ChatWindow";
import VoiceRecorder from "../components/VoiceRecorder";
import useSpeech from "../hooks/useSpeech";
import Header from "../components/Header";
import { createSession } from "../services/sessionService";
import { saveMessage } from "../services/messageService";
import "./ChatPage.css";

export default function ChatPage() {

  const [messages, setMessages] = useState([]);
  const [sessionId, setSessionId] = useState(null);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);

  const { speak } = useSpeech();

  const chatEndRef = useRef(null);

  useEffect(() => {
    createCurrentSession();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const createCurrentSession = async () => {
    try {
      const res = await createSession("normal");

      if (!res.success) {
        alert("Something went wrong");
      }

      setSessionId(res.session.id);

    } catch (e) {
      console.log("createSession error", e);
    }
  };

  const sendMessage = async (messageText) => {

    if (!messageText) return;

    setMessages(prev => [
      ...prev,
      { sender: "user", text: messageText }
    ]);

    const res = await saveMessage(sessionId, messageText);

    const { aiReply, correction } = res;

    const aiMessage = {
      sender: "ai",
      text: aiReply,
      correction
    };

    setMessages(prev => [...prev, aiMessage]);
    speak(aiReply);
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

      <Header title="Chat" />


      {/* Chat Area */}

      <div className="chat-body">
        <ChatWindow messages={messages} />
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
          setListening={setListening}
        />
      </div>
    </div>
  );
}