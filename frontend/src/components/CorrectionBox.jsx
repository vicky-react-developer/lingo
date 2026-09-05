import { XCircle, CheckCircle2 } from "lucide-react";

export default function CorrectionBox({ correction }) {

  if (!correction) return null;

  return (
    <div className="bg-[#fff3cd] p-2 mt-1.5 mb-2 rounded max-w-[90%]">
      <div className="flex items-center gap-1.5">
        <XCircle size={14} className="text-[#dc3545] shrink-0" /> {correction.wrongText}
      </div>
      <div className="flex items-center gap-1.5">
        <CheckCircle2 size={14} className="text-[#00a76f] shrink-0" /> {correction.correctedText}
      </div>
      <small className="text-[#6c757d]">{correction.explanation}</small>
    </div>
  );
}