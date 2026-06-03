import { useState, useEffect } from "react";
import "./FoundationalTask.css";
import Header from "../components/Header";
import { getTaskQuestions } from "../services/foundationalTaskservice";
import { useParams } from "react-router";
import MySpinner from "../components/MySpinner";

export default function FoundationalTask() {
    const { taskId } = useParams();

    const [answer, setAnswer] = useState("");
    const [showResult, setShowResult] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchTaskQuestions();
    }, []);

    const fetchTaskQuestions = async () => {
        try {
            setLoading(true);
            const res = await getTaskQuestions(taskId)
            if (!res.success) {
                return;
            }
            setQuestions(res.data);
        } catch (e) {
            console.log("fetchTaskQuestions err:", e)
        } finally {
            setLoading(false);
        }
    }

    const currentQuestion = {
        tamil: "நான் பள்ளிக்கு செல்கிறேன்",
        userAnswer: "I going school",
        correctedAnswer: "I am going to school",
        explanation: "Use the helping verb 'am' before the present continuous tense."
    };

    const handleSubmit = () => {
        if (!answer.trim()) return;
        setShowResult(true);
    };

    const handleNext = () => {
        setShowResult(false);
        setAnswer("");
    };

    if(loading) <MySpinner loading={loading} />

    return (
        <div>
            <Header
                primaryTitle="Foundational Tamil → English"
                secondaryTitle="Transalte the Tamil sentence into English"
            />
            <div className="lesson-page">
                <div className="lesson-header">

                    <button className="back-btn">
                        <i className="bi bi-arrow-left"></i>
                    </button>

                    <div className="progress">

                        <div
                            className="progress-bar"
                            style={{ width: "50%" }}
                        />

                    </div>

                    <span className="question-count">
                        12 / 50
                    </span>

                </div>

                {/* Question */}

                <div className="question-card">

                    <span className="task-badge">
                        Translate to English
                    </span>

                    <h2>
                        {currentQuestion.tamil}
                    </h2>

                </div>

                {/* Answer */}

                <div className="answer-section">

                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="answer-box"
                        placeholder="Type your answer here..."
                    />

                    <button className="mic-btn">
                        <i className="bi bi-mic-fill"></i>
                    </button>

                </div>

                {/* Submit */}

                <button
                    className="submit-btn"
                    onClick={handleSubmit}
                >
                    Submit Answer
                </button>

                {/* Result Sheet */}

                {showResult && (

                    <div className="result-sheet">

                        <div className="sheet-handle"></div>

                        <div className="result-status">

                            <i className="bi bi-x-circle-fill"></i>

                            <span>Needs Improvement</span>

                        </div>

                        <div className="result-block">

                            <label>Your Answer</label>

                            <p>
                                {currentQuestion.userAnswer}
                            </p>

                        </div>

                        <div className="result-block">

                            <label>Correct Answer</label>

                            <p className="correct-answer">
                                {currentQuestion.correctedAnswer}
                            </p>

                        </div>

                        <div className="result-block">

                            <label>Explanation</label>

                            <p>
                                {currentQuestion.explanation}
                            </p>

                        </div>

                        <button
                            className="next-btn"
                            onClick={handleNext}
                        >
                            Continue
                        </button>

                    </div>

                )}

            </div>
        </div>

    );
}