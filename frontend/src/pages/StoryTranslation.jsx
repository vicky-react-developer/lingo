import React, { useState, useEffect } from "react";
import { getOnePassage, submitPassageTranslation } from "../services/passageService";
import { useLocation, useNavigate } from "react-router";
import Header from "../components/Header";
import "./StoryTranslation.css";

export default function StoryTranslation() {
    const location = useLocation();
    const navigate = useNavigate();

    const [translation, setTranslation] = useState("");
    const [passage, setPassage] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const { passageId } = location.state || {};

    console.log("passageId", passageId)
    useEffect(() => {
        if (passageId) {
            fetchOnePassage();
        }
    }, [passageId])

    const fetchOnePassage = async () => {
        try {
            setLoading(true);
            const res = await getOnePassage(passageId);
            if (!res.success) {
                return;
            }
            setPassage(res.data);
            if (res?.data?.Attempts.length > 0) {
                setResult(res?.data?.Attempts[0])
            }
        } catch (e) {
            console.log("fetchOnePassage error", e)
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!translation) {
            alert("Please fill the text box!");
            return;
        }
        try {
            const payload = {
                passageId: passage?.id,
                tamilText: passage.tamilText,
                translation
            }
            const res = await submitPassageTranslation(payload);
            if (!res.success) {
                alert(res.message);
                return;
            };
            setResult(res?.data);
        } catch (e) {
            console.log("submitPassageTranslation err:", e)
        }
    }

    console.log(result)

    return (
        <div>
            <Header primaryTitle="Story Translation" />
            <div className="translation-page">
                <div className="story-card">
                    <div className="story-title">
                        📖 {passage?.title}
                    </div>

                    <div className="story-content">
                        {passage?.tamilText}
                    </div>
                </div>

                {!result &&
                    <div className="translation-section">

                        <label>
                            Translate the story into English
                        </label>

                        <textarea
                            className="translation-input"
                            rows={10}
                            value={translation}
                            onChange={(e) => setTranslation(e.target.value)}
                            placeholder="Type your English translation..."
                        />

                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit Translation
                        </button>

                    </div>
                }

                {result && (
                    <div className="result-section">

                        <div className="score-card">
                            <h1>{result.score}%</h1>
                            <span>
                                {result.score >= 90
                                    ? "Excellent"
                                    : result.score >= 70
                                        ? "Good"
                                        : "Keep Practicing"}
                            </span>
                        </div>

                        {!result.isCorrect && (
                            <>
                                <div className="feedback-card">
                                    <h6>Your Answer</h6>
                                    <p>{result.userAnswer}</p>
                                </div>

                                <div className="feedback-card">
                                    <h6>Corrected Translation</h6>
                                    <p>{result.correctedAnswer}</p>
                                </div>

                                <div className="feedback-card">
                                    <h6>Explanation</h6>
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