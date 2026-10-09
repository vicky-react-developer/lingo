import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Header from "../layouts/Header";
import VoiceRecorder from "../components/VoiceRecorder";
import Loader from "../components/Loader";
import useSpeech from "../hooks/useSpeech";
import { useFetchOnePassageQuery, useSubmitPassageTranslationMutation } from "../state/api/passage.api";

export default function StoryTranslation() {
    const location = useLocation();
    const { passageId } = location.state || {};

    const { data } = useFetchOnePassageQuery(passageId);
    const passage = data?.data || null;
    const result = passage?.Attempts[0] ?? null;

    const [submitPassageTranslation, { isLoading: submitting }] = useSubmitPassageTranslationMutation();

    const [translation, setTranslation] = useState("");
    const { speak, stop } = useSpeech();

    useEffect(() => {
        return () => stop();
    }, []);

    const handleSubmit = async () => {
        if (!translation.trim()) {
            return;
        }

        if (!passage) {
            alert("Something went wrong!");
            return;
        };

        try {
            const payload = {
                passageId: passage.id,
                tamilText: passage.tamilText,
                translation
            }
            const res = await submitPassageTranslation(payload).unwrap();
            // setResult(res?.data);
            speak(res.data?.explanation!);
        } catch (e) {
            console.log("submitPassageTranslation err:", e);
            alert("Something went wrong!");
        }
    }

    const handleVoice = (value: string) => {
        setTranslation(prev => prev + value + " ");
    }

    return (
        <div>
            <Header primaryTitle="Story Translation" />
            <div className="bg-[#f7f9fc] min-h-screen p-5">
                <div className="bg-white rounded-2xl p-[18px] mb-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                    <div className="text-[15px] leading-[1.8] text-[#444] max-h-[160px] overflow-y-auto">
                        {passage?.tamilText}
                    </div>
                </div>

                {!result &&
                    <div>

                        <label className="font-semibold mb-2.5 block">
                            Translate the story into English
                        </label>

                        <textarea
                            className="w-full border border-gray-300 rounded-2xl p-3.5 text-[15px] resize-none outline-none"
                            rows={6}
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                            placeholder="Speak your Answer..."
                        />

                        <div className="flex justify-center mt-3">
                            <VoiceRecorder
                                onText={handleVoice}
                            />
                        </div>

                        <button
                            className="w-full mt-4 rounded-2xl p-3.5 bg-[#00CCFF] text-white font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            Submit Translation
                            {submitting &&
                                <Loader />
                            }
                        </button>
                    </div>
                }


                {result && (
                    <div>
                        <div className="bg-white rounded-2xl p-6 text-center mt-5 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                            <h1 className="m-0 text-[#00CCFF] text-[42px]">{result.score}%</h1>
                            <span>
                                {result.score >= 90
                                    ? "Excellent"
                                    : result!.score >= 70
                                        ? "Good"
                                        : "Keep Practicing"}
                            </span>
                        </div>

                        {!result.isCorrect && (
                            <>
                                <div className="bg-white rounded-2xl p-4 mt-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                                    <h6 className="font-semibold">Your Answer</h6>
                                    <p>{result.userAnswer}</p>
                                </div>

                                <div className="bg-white rounded-2xl p-4 mt-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                                    <h6 className="font-semibold">Corrected Translation</h6>
                                    <p>{result.correctedAnswer}</p>
                                </div>

                                <div className="bg-white rounded-2xl p-4 mt-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                                    <h6 className="font-semibold">Explanation</h6>
                                    <p>{result.explanation}</p>
                                </div>
                            </>
                        )}
                    </div>
                )}

            </div>
        </div>

    )
}