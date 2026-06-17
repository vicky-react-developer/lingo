import useVoiceInput from "../hooks/useVoiceInput";
import { TamilMic, EnglishMic } from "../helpers/Constants";

export default function VoiceRecorder({ onText, language }) {

  const { listening, startListening } = useVoiceInput(onText, language);

  return (

    <button
      className={`mic-button ${listening ? "listening" : ""}`}
      onClick={startListening}
    >
      <img src={language === "ta-IN" ? TamilMic : EnglishMic} width={30} height={30} />

    </button>

  );
}