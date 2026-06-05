import { useState, useEffect } from "react";
import "./FoundationalTask.css";
import Header from "../components/Header";
import { useParams, useLocation } from "react-router";
import MySpinner from "../components/MySpinner";
import { getTamilSentences, submitTamilTranslation, getWordTasks, submitWordTask } from "../services/foundationalTaskservice";

export default function FoundationalTask() {
    const { taskId } = useParams();
    const location = useLocation();

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

    const fetchTamilSentences = async () => {
        try {
            setLoading(true);
            const res = await getTamilSentences(taskId)
            if (!res.success) {
                return;
            };
            let answered = 0;
            const questions = res.data?.map(item => {
                if (item.Attempts?.length > 0) answered += 1;
                return {
                    id: item.id,
                    question: item.tamilText,
                    answer: item.expectedEnglish
                }
            });
            setAnswered(answered);
            setCurrentIndex(answered);
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
            const questions = res.data?.map(item => {
                if (item.Attempts?.length > 0) answered += 1;
                return {
                    id: item.id,
                    question: item.word,
                }
            });
            setAnswered(answered);
            setCurrentIndex(answered);
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
            setResult(res?.data);
        } catch (e) {
            console.log("handleTamilTranslationSubmit err:", e)
        }
    }

    const handleNext = () => {
        setResult(null);
        setAnswer("");
        setCurrentIndex(prev => prev + 1);
        setAnswered(prev => prev + 1);
    };


    const currentQuestion = questions[currentIndex];
    const progress = (currentIndex / questions?.length) * 100;

    return (
        <div>
            <Header
                primaryTitle={taskType === "tamil_to_english" ? "Foundational Tamil → English" : taskType === "own_words" ? "Foundational Own Words" : ""}
                secondaryTitle={taskType === "tamil_to_english" ? "Translate Tamil sentences into English." : taskType === "own_words" ? "Create English sentences using given words and improve sentence formation." : ""}
            />
            {questions?.length > 0 &&
                <div className="lesson-page">
                    <div className="lesson-header">

                        {/* <button className="back-btn">
                            <i className="bi bi-arrow-left"></i>
                        </button> */}

                        <div className="progress">

                            <div
                                className="progress-bar"
                                style={{ width: `${progress}%` }}
                            />

                        </div>

                        <span className="question-count">
                            {currentIndex} / {questions?.length}
                        </span>

                    </div>


                    <div className="question-card">

                        <span className="task-badge">
                            Translate to English
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

                            {result?.correctedAnswer &&
                                <div className="result-block">

                                    <label>Correct Answer</label>

                                    <p className="correct-answer">
                                        {result?.correctedAnswer}
                                    </p>

                                </div>
                            }
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