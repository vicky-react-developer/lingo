export default function useSpeech() {

  const speak = (text, callback) => {

    speechSynthesis.cancel(); // stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);

    const englishVoice = speechSynthesis
      .getVoices()
      .find(v => v.lang.startsWith("en"));

    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.lang = "en-US";

    utterance.onend = () => {
      callback?.();
    };

    speechSynthesis.speak(utterance);
  };

  const speakTamil = (text) => {
    speechSynthesis.cancel(); // stop any existing speech

    const utterance = new SpeechSynthesisUtterance(text);

    const tamilVoice = speechSynthesis
      .getVoices()
      .find(v => v.lang.startsWith("ta"));

    if (tamilVoice) {
      utterance.voice = tamilVoice;
    }

    utterance.lang = "ta-IN";

    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    speechSynthesis.cancel();
  };

  return { speak, stop, speakTamil };
}