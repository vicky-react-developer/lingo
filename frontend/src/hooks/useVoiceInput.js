import { useState } from "react";

export default function useVoiceInput(onResult) {

  const [listening, setListening] = useState(false);

  const startListening = () => {

    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech recognition is not supported");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
    };

    recognition.onerror = (event) => {
      console.log("Speech error:", event.error);
    };

    recognition.onnomatch = () => {
      console.log("No speech detected");
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  return {
    listening,
    startListening
  };
}