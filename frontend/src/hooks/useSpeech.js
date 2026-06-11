export default function useSpeech() {

  const speak = (text) => {

    speechSynthesis.cancel(); // stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
  };

  return { speak, stop };
}