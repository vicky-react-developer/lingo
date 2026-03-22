import { useState } from "react";

export default function useVoiceInput(onResult) {

  const [listening, setListening] = useState(false);

  const startListening = () => {

    const recognition = new window.webkitSpeechRecognition();

    recognition.lang = "en-US";
    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      onResult(text);
      setListening(false);
    };

    recognition.onerror = () => {
      setListening(false);
    };
  };

  return { listening, startListening };
}