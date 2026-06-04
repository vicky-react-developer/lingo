import { useState, useEffect } from "react";
import "./FoundationalTask.css";
import Header from "../components/Header";
import { getTamilSentences } from "../services/foundationalTaskservice";
import { useParams, useLocation } from "react-router";
import MySpinner from "../components/MySpinner";
import { submitTamilTranslation } from "../services/foundationalTaskservice";

export default function FoundationalTask() {
    const { taskId } = useParams();
    const location = useLocation();

    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const { taskType } = location.state || {}

    useEffect(() => {
        if (taskType === "tamil_to_english") {
            fetchTamilSentences();
        }
    }, [taskType]);

    const fetchTamilSentences = async () => {
        try {
            setLoading(true);
            const res = await getTamilSentences(taskId)
            if (!res.success) {
                return;
            };
            const questions = res.data;
            setQuestions(res.data);
        } catch (e) {
            console.log("fetchTamilSentences err:", e)
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        if (!answer.trim()) return;
        if (taskType === "tamil_to_english") {
            handleTamilTranslationSubmit();
        }
    };

    const handleTamilTranslationSubmit = async () => {
        try {
            const currentQuestion = questions[currentIndex]
            const payload = {
                tamilText: currentQuestion.tamilText,
                expectedEnglish: currentQuestion.expectedEnglish,
                userAnswer: answer,
                sentenceId: currentQuestion.id,
                taskId
            }
            const res = await submitTamilTranslation(payload);
            if (!res.success) {
                alert(res.message);
            };
            setResult(res?.data);
        } catch (e) {
            console.log("handleTamilTranslationSubmit err:", e)
        }
    }

    const handleNext = () => {
        setResult(null);
        setAnswer("");
        currentIndex(prev => prev + 1);
    };

    const currentQuestion = questions[currentIndex];

    return (
        <div>
            <Header
                primaryTitle="Foundational Tamil → English"
                secondaryTitle="Transalte the Tamil sentence into English"
            />
            {questions?.length > 0 &&
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


                    <div className="question-card">

                        <span className="task-badge">
                            Translate to English
                        </span>

                        <h2>
                            {currentQuestion?.tamilText}
                        </h2>

                    </div>


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

                    <button
                        className="submit-btn"
                        onClick={handleSubmit}
                    >
                        Submit Answer
                    </button>


                    {result && (

                        <div className="result-sheet">

                            <div className="sheet-handle"></div>

                            <div className="result-status">

                                <i className="bi bi-x-circle-fill"></i>

                                <span>Needs Improvement</span>

                            </div>

                            <div className="result-block">

                                <label>Your Answer</label>

                                <p>
                                    {result?.userAnswer}
                                </p>

                            </div>

                            <div className="result-block">

                                <label>Correct Answer</label>

                                <p className="correct-answer">
                                    {result?.correctedAnswer}
                                </p>

                            </div>

                            <div className="result-block">

                                <label>Explanation</label>

                                <p>
                                    {result?.explanation}
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
            }
        </div>

    );
}