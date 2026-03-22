import useVoiceInput from "../hooks/useVoiceInput";

export default function VoiceRecorder({ onText }) {

  const { listening, startListening } = useVoiceInput(onText);

  return (

    <button
      className={`mic-button ${listening ? "listening" : ""}`}
      onClick={startListening}
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        fill="white"
        viewBox="0 0 16 16"
      >
        <path d="M8 12a3 3 0 0 0 3-3V4a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3z"/>
        <path d="M5 10a.5.5 0 0 1 .5.5A2.5 2.5 0 0 0 8 13a2.5 2.5 0 0 0 2.5-2.5.5.5 0 0 1 1 0A3.5 3.5 0 0 1 8 14v1.5a.5.5 0 0 1-1 0V14A3.5 3.5 0 0 1 4.5 10.5.5.5 0 0 1 5 10z"/>
      </svg>

    </button>

  );
}