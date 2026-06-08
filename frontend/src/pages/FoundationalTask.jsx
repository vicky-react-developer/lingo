import { useState, useEffect } from "react";
import "./FoundationalTask.css";
import Header from "../components/Header";
import { useParams, useLocation, useNavigate } from "react-router";
import MySpinner from "../components/MySpinner";
import { getTamilSentences, submitTamilTranslation, getWordTasks, submitWordTask } from "../services/foundationalTaskservice";
import VoiceRecorder from "../components/VoiceRecorder";

export default function FoundationalTask() {
    const { taskId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [answer, setAnswer] = useState("");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [answered, setAnswered] = useState(0);

    const { taskType } = location.state || {}

    useEffect(() => {
        if (taskType === "tamil_to_english") {
            fetchTamilSentences();
        }

        if (taskType === "own_words") {
            fetchWordTasks();
        }
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

    console.log(questions)

    const fetchTamilSentences = async () => {
        try {
            setLoading(true);
            const res = await getTamilSentences(taskId)
            if (!res.success) {
                return;
            };
            let answered = 0;
            let currentIndex = 0;
            const questions = res.data?.map((item, index) => {
                if (item.Attempts?.length > 0) {
                    answered += 1
                } else if (currentIndex === 0) {
                    currentIndex = index
                }
                return {
                    id: item.id,
                    question: item.tamilText,
                    answer: item.expectedEnglish,
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

    const fetchWordTasks = async () => {
        try {
            setLoading(true);
            const res = await getWordTasks(taskId)
            if (!res.success) {
                return;
            };
            let answered = 0;
            let currentIndex = 0;
            const questions = res.data?.map((item, index) => {
                if (item.Attempts?.length > 0) {
                    answered += 1
                } else if (currentIndex === 0) {
                    currentIndex = index
                }
                return {
                    id: item.id,
                    question: item.word,
                    attempts: item.Attempts
                }
            });
            setAnswered(answered);
            setCurrentIndex(currentIndex);
            setQuestions(questions);
        } catch (e) {
            console.log("fetchWordTasks err:", e)
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = () => {
        if (!answer.trim()) return;
        if (taskType === "tamil_to_english") {
            handleTamilTranslationSubmit();
        }
        if (taskType === "own_words") {
            handleSubmitWordTask();
        }
    };

    const handleTamilTranslationSubmit = async () => {
        try {
            const currentQuestion = questions[currentIndex]
            const payload = {
                tamilText: currentQuestion.question,
                expectedEnglish: currentQuestion.answer,
                userAnswer: answer,
                sentenceId: currentQuestion.id,
                taskId
            }
            const res = await submitTamilTranslation(payload);
            if (!res.success) {
                alert(res.message);
            };
            setAnswered(prev => prev + 1);
            setResult(res?.data);
        } catch (e) {
            console.log("handleTamilTranslationSubmit err:", e)
        }
    }

    const handleSubmitWordTask = async () => {
        try {
            const currentQuestion = questions[currentIndex]
            const payload = {
                word: currentQuestion.question,
                userAnswer: answer,
                wordTaskId: currentQuestion.id,
                taskId
            }
            const res = await submitWordTask(payload);
            if (!res.success) {
                alert(res.message);
            };
            setAnswered(prev => prev + 1);
            setResult(res?.data);
        } catch (e) {
            console.log("handleTamilTranslationSubmit err:", e)
        }
    }

    const handleNext = () => {
        if (currentIndex < questions?.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            navigate(-1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex !== 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };


    const currentQuestion = questions[currentIndex];
    const progress = (answered / questions?.length) * 100;
    const isLastQuestion = currentIndex === questions?.length - 1

    return (
        <div>
            <Header
                primaryTitle={taskType === "tamil_to_english" ? "Foundational Tamil → English" : taskType === "own_words" ? "Foundational Own Words" : ""}
                secondaryTitle={taskType === "tamil_to_english" ? "Translate Tamil sentences into English." : taskType === "own_words" ? "Create English sentences using given words and improve sentence formation." : ""}
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
                            {taskType === "tamil_to_english" ? "Translate to English" : taskType === "own_words" ? "Form a Sentence" : ""}
                        </span>

                        <h2>
                            {currentQuestion?.question}
                        </h2>

                    </div>


                    <div className="answer-section">

                        <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="answer-box"
                            placeholder="Type your answer here..."
                            disabled={result}
                        />

                        {/* <button className="mic-btn">
                            <i className="bi bi-mic-fill"></i>
                        </button> */}

                    </div>

                    {!result &&
                        <div className="d-flex justify-content-center mt-3">
                            <VoiceRecorder
                                onText={setAnswer}
                            // setListening={setListening}
                            />
                        </div>
                    }

                    {!result &&
                        <button
                            className="submit-btn"
                            onClick={handleSubmit}
                        >
                            Submit Answer
                        </button>
                    }


                    {result && (
                        <div className="result-sheet">

                            <div className="sheet-handle"></div>

                            <div className="result-status">

                                <i className={`${result?.isCorrect ? "bi bi-check-circle text-success" : "bi bi-x-circle-fill text-danger"}`}></i>

                                <span className={`${result?.isCorrect ? "text-success" : "text-danger"}`}>{result?.isCorrect ? "Congradulations" : "Needs Improvement"}</span>

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