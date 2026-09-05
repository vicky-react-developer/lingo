import { Bot } from "lucide-react";
import CorrectionBox from "./CorrectionBox";

export default function MessageBubble({ message }) {

  const isUser = message.sender === "user";

  return (
    <>
      {!isUser && message.correction && (
        <CorrectionBox correction={message.correction} />
      )}
      {
        !isUser ?
          <div className="bg-[#ececf4] p-[15px] rounded-xl max-w-[90%]">
            <div className="flex items-center mb-2">
              <div className="w-[26px] h-[26px] bg-[#6c63ff] text-white rounded-full flex items-center justify-center mr-2">
                <Bot size={14} />
              </div>

              <div className="font-semibold text-[13px] text-[#666]">
                NILA AI Teacher
              </div>

            </div>

            <div className="text-[15px] leading-[1.4] whitespace-pre-wrap">
              {message.text}
            </div>

          </div>

          :
          <div className="bg-[#6c63ff] text-white px-3.5 py-2.5 rounded-2xl max-w-[70%] ml-auto whitespace-pre-wrap">
            {message.text}
          </div>
      }
    </>
  );
}