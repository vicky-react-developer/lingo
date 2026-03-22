import CorrectionBox from "./CorrectionBox";

export default function MessageBubble({ message }) {

  const isUser = message.sender === "user";

  return (
    <>
      {
        !isUser ?
          <div className="ai-message-card">
            <div className="ai-header">
              <div className="ai-avatar">
                <i className="bi bi-robot"></i>
              </div>

              <div className="ai-name">
                Lingo AI Teacher
              </div>

            </div>

            <div className="ai-text">
              {message.text}
            </div>

          </div>

          :
          <div className="user-message">
            {message.text}
          </div>
      }
      {!isUser && message.correction && (
        <CorrectionBox correction={message.correction} />
      )}
    </>
  );
}