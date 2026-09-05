import { useState } from "react";
import { Pin, BookOpen, ChevronUp, ChevronDown } from "lucide-react";

export default function ContextBanner({ mode, info }) {
  const [expanded, setExpanded] = useState(false);

  if (mode === "topic" || mode === "duolingoTopic") {
    return (
      <div className="flex items-center gap-2 px-4 py-2.5 mx-3 my-2 rounded-[10px] text-sm bg-[#f0f4ff] border-l-4 border-l-[#4a6cf7] shadow-[0_1px_4px_rgba(0,0,0,0.06)] animate-slideDown">
        <Pin size={16} className="text-[#4a6cf7]" />
        <span className="font-semibold text-[#4a6cf7] whitespace-nowrap">Topic:</span>
        <span className="text-[#333] font-medium whitespace-nowrap overflow-hidden text-ellipsis">{info.title}</span>
      </div>
    );
  }

  if (mode === "passage" || mode === "passageTranslation") {
    return (
      <div className="flex flex-col items-stretch px-4 py-2.5 mx-3 my-2 rounded-[10px] text-sm bg-[#fff7f0] border-l-4 border-l-[#e07b39] shadow-[0_1px_4px_rgba(0,0,0,0.06)] animate-slideDown">
        <div
          className="flex items-center gap-2 cursor-pointer select-none"
          onClick={() => setExpanded(prev => !prev)}
        >
          <BookOpen size={16} className="text-[#e07b39]" />
          <span className="font-semibold text-[#e07b39] flex-1">Passage</span>
          <span className="flex items-center gap-1 text-xs text-[#999]">
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? "Hide" : "Show"}
          </span>
        </div>
        {expanded && (
          <div className="mt-2 pt-2 border-t border-[#f0d8c8] text-[13px] text-[#444] leading-[1.7] whitespace-pre-wrap max-h-[160px] overflow-y-auto">
            {info.tamilText}
          </div>
        )}
      </div>
    );
  }

  return null;
}