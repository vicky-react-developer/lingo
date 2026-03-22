import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {

  return (
    <div>
      {messages.map((msg, index) => (

        <div
          key={index}
          className={`message-row ${msg.sender}`}
        >
          <MessageBubble key={index} message={msg} />

        </div>

      ))}
    </div>
  );
}