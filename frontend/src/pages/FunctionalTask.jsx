import { useState, useEffect } from "react";
import "./FunctionalTask.css";
import Header from "../components/Header";
import { useParams, useLocation, useNavigate } from "react-router";
import MySpinner from "../components/MySpinner";
import { getFunctionalExercises, submitFunctionalExercise, submitWordTask } from "../services/functionalTaskservice";
import VoiceRecorder from "../components/VoiceRecorder";
import Loader from "../components/Loader";
import useSpeech from "../hooks/useSpeech";

export default function FunctionalTask() {
    const { taskId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [answered, setAnswered] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const { speak, stop } = useSpeech();

    const { taskType, taskTitle } = location.state || {}

    useEffect(() => {
        fetchFunctionalExercises();

        return () => stop();
    }, [taskType]);

    useEffect(() => {
        const currentQuestion = questions[currentIndex];
        if (currentQuestion?.attempts?.length > 0) {
            const answer = currentQuestion?.attempts[0]
            setResult(answer);
            setAnswer(answer.userAnswer)
        } else {
            setResult(null);
            setAnswer("");
        }
    }, [currentIndex, questions]);

    const fetchFunctionalExercises = async () => {
        try {
            setLoading(true);
            const res = await getFunctionalExercises(taskId)
            if (!res.success) {
                return;
            };
            let answered = 0;
            let currentIndex = null;
            const questions = res.data?.map((item, index) => {
                if (item.Attempts?.length > 0) {
                    answered += 1
                } else if (currentIndex === null) {
                    currentIndex = index
                }

                return {
                    id: item.id,
                    tamilSentence: item.tamilSentence,
                    englishSentence: item.englishSentence,
                    attempts: item.Attempts
                }
            });
            setAnswered(answered);
            setCurrentIndex(currentIndex);
            setQuestions(questions);
        } catch (e) {
            console.log("fetchTamilSentences err:", e)
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async () => {
        if (!answer.trim()) return;
        setSubmitting(true);
        try {
            const currentQuestion = questions[currentIndex]
            const payload = {
                tamilSentence: currentQuestion.tamilSentence,
                englishSentence: currentQuestion.englishSentence,
                userAnswer: answer,
                exerciseId: currentQuestion.id,
                taskId,
                taskType
            }
            const res = await submitFunctionalExercise(payload);
            if (!res.success) {
                alert(res.message);
            };
            setAnswered(prev => prev + 1);
            injectAttempt(currentQuestion.id, res?.data)
            speak(res.data?.explanation);
        } catch (e) {
            alert("Something went wrong!");
            console.log("handleTamilTranslationSubmit err:", e)
        } finally {
            setSubmitting(false);
        }
    };

    const injectAttempt = (questionId, attempt) => {
        if (!questionId) return;
        setQuestions(prev => prev.map(item => {
            if (item.id === questionId) {
                const itemCopy = { ...item };
                itemCopy.attempts = [attempt];
                return itemCopy
            }
            return item;
        }))
    }

    const handleNext = () => {
        stop();
        if (currentIndex < questions?.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        stop();
        if (currentIndex !== 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };


    const currentQuestion = questions[currentIndex];
    const progress = (answered / questions?.length) * 100;
    const isLastQuestion = currentIndex === questions?.length - 1;

    return (
        <div>
            <Header
                primaryTitle={taskTitle}
            />
            {questions?.length > 0 &&
                <div className="lesson-page">
                    <div className="lesson-header">

                        {currentIndex !== 0 &&
                            <button className="back-btn" onClick={handlePrevious}>
                                <i className="bi bi-arrow-left"></i>
                            </button>
                        }

                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            />

                        </div>

                        <span className="question-count">
                            {answered} / {questions?.length}
                        </span>

                        {!isLastQuestion &&
                            <button className="back-btn" onClick={handleNext}>
                                <i className="bi bi-arrow-right"></i>
                            </button>
                        }

                    </div>


                    <div className="question-card">

                        <span className="task-badge">
                            {taskType === "FIB" ? "Translate to English" : taskType === "OSM" ? "Form a Sentence" : ""}
                        </span>

                        {currentQuestion?.tamilSentence &&
                            <h2>
                                {currentQuestion?.tamilSentence}
                            </h2>
                        }

                        <h2>
                            {currentQuestion?.englishSentence}
                        </h2>

                    </div>


                    <div className="answer-section">

                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="answer-box"
                            placeholder="Speak your Answer..."
                            disabled={result}
                        />

                    </div>

                    {!result &&
                        <div className="d-flex justify-content-center mt-3">
                            <VoiceRecorder
                                onText={setAnswer}
                            />
                        </div>
                    }

                    {!result &&
                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            Submit Answer
                            {submitting &&
                                <Loader />
                            }
                        </button>
                    }


                    {result && (
                        <div className="result-sheet">

                            <div className="sheet-handle"></div>

                            <div className="result-status">

                                <i className={`${result?.isCorrect ? "bi bi-check-circle text-success" : "bi bi-x-circle-fill text-danger"}`}></i>

                                <span className={`${result?.isCorrect ? "text-success" : "text-danger"}`}>{result?.isCorrect ? "Congradulations!" : "Needs Improvement"}</span>

                            </div>

                            <div className="result-block">

                                <label>Your Answer</label>

                                <p>
                                    {result?.userAnswer}
                                </p>

                            </div>

                            {result?.correctedAnswer &&
                                <div className="result-block">

                                    <label>Correct Answer</label>

                                    <p className="correct-answer">
                                        {result?.correctedAnswer}
                                    </p>

                                </div>
                            }

                            {result?.explanation &&
                                <div className="result-block">

                                    <label>Explanation</label>

                                    <p>
                                        {result?.explanation}
                                    </p>

                                </div>
                            }

                            <button
                                className="next-btn"
                                onClick={handleNext}
                            >
                                {isLastQuestion ? "Finish" : "Continue"}
                            </button>

                        </div>
                    )}

                </div>
            }
        </div>

    );
}