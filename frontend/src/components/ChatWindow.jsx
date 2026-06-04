import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, isTyping }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={`message-row ${msg.sender}`}>
          <MessageBubble message={msg} />
        </div>
      ))}

      {isTyping && (
        <div className="message-row ai">
          <div className="ai-message-card typing-bubble">
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}