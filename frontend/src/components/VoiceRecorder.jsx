import useVoiceInput from "../hooks/useVoiceInput";
import { TamilMic, EnglishMic } from "../helpers/Constants";

export default function VoiceRecorder({ onText, language }) {

  const { listening, startListening } = useVoiceInput(onText, language);

  return (

    <button
      className={`w-[42px] h-[42px] rounded-full border-none flex items-center justify-center cursor-pointer transition-transform duration-200 active:scale-95 ${listening ? "animate-micPulse" : ""}`}
      onClick={startListening}
    >
      <img src={language === "ta-IN" ? TamilMic : EnglishMic} width={30} height={30} />

    </button>

  );
}