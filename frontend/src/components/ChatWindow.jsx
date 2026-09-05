import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages, isTyping }) {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={`mt-2.5 mb-2.5 ${msg.sender === "user" ? "flex" : ""}`}>
          <MessageBubble message={msg} />
        </div>
      ))}

      {isTyping && (
        <div className="mt-2.5 mb-2.5">
          <div className="bg-[#ececf4] rounded-xl w-fit px-5 py-3 flex items-center">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-[#6c63ff] rounded-full opacity-40 animate-typingBounce [animation-delay:-0.32s]"></span>
              <span className="w-2 h-2 bg-[#6c63ff] rounded-full opacity-40 animate-typingBounce [animation-delay:-0.16s]"></span>
              <span className="w-2 h-2 bg-[#6c63ff] rounded-full opacity-40 animate-typingBounce"></span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}