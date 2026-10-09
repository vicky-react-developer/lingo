import { useState, useEffect, useMemo, useRef } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import Header from "../layouts/Header";
import { useParams, useLocation, useNavigate } from "react-router";
import VoiceRecorder from "../components/VoiceRecorder";
import Loader from "../components/Loader";
import useSpeech from "../hooks/useSpeech";
import { useFetchFunctionalExercisesQuery, useSubmitFunctionalExerciseMutation } from "../state/api/functionalTask.api";

export default function FunctionalTask() {
    const { taskId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const initialized = useRef(false);

    const { speak, stop } = useSpeech();

    const { taskType, taskTitle } = location.state || {}
    const { data } = useFetchFunctionalExercisesQuery(Number(taskId));
    const [submitFunctionalExercise, { isLoading: submitting }] = useSubmitFunctionalExerciseMutation();

    const questions = data?.data || [];

    const [answer, setAnswer] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if(initialized.current || questions.length === 0) return;

        const firstUnansweredIndex = questions.findIndex(item => item.Attempts.length === 0);
        setCurrentIndex(firstUnansweredIndex === -1 ? 0 : firstUnansweredIndex);
        initialized.current = true;

        return () => stop();
    }, [questions]);

    const answered = useMemo(() => {
        return questions.filter(item => item.Attempts.length > 0).length;
    }, [questions]);

    const handleSubmit = async () => {
        if (!answer.trim()) return;
        if (!currentQuestion) {
            alert("Something went wrong!");
            return;
        }
        try {
            const currentQuestion = questions[currentIndex]
            const payload = {
                tamilSentence: currentQuestion.tamilSentence,
                englishSentence: currentQuestion.englishSentence,
                userAnswer: answer,
                exerciseId: currentQuestion.id,
                taskId: Number(taskId),
                taskType
            }
            const res = await submitFunctionalExercise(payload).unwrap();
            speak(res.data?.explanation!);
        } catch (e) {
            alert("Something went wrong!");
            console.log("handleSubmit err:", e)
        }
    };

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

    const result = currentQuestion?.Attempts[0] || null;

    return (
        <div>
            <Header
                primaryTitle={taskTitle}
            />
            {questions?.length > 0 &&
                <div className="min-h-screen bg-[#f6f8fb] p-5 relative">
                    <div className="flex items-center gap-3 mb-[30px]">

                        {currentIndex !== 0 &&
                            <button
                                className="border-none bg-white w-[42px] h-[42px] rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0"
                                onClick={handlePrevious}
                            >
                                <ArrowLeft size={18} />
                            </button>
                        }

                        <div className="flex-1 h-2.5 bg-[#e8edf3] rounded-full overflow-hidden">

                            <div
                                className="h-full bg-[#00ccff] rounded-full"
                                style={{ width: `${progress}%` }}
                            />

                        </div>

                        <span className="text-[13px] font-semibold text-[#666] shrink-0">
                            {answered} / {questions?.length}
                        </span>

                        {!isLastQuestion &&
                            <button
                                className="border-none bg-white w-[42px] h-[42px] rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.08)] flex items-center justify-center shrink-0"
                                onClick={handleNext}
                            >
                                <ArrowRight size={18} />
                            </button>
                        }

                    </div>


                    <div className="bg-white rounded-[24px] p-[25px] shadow-[0_6px_20px_rgba(0,0,0,0.05)] mb-[25px]">

                        <span className="bg-[#e9f9ff] text-[#00a5cf] px-3 py-1.5 rounded-full text-xs font-semibold">
                            {taskType === "FIB" ? "Translate to English" : taskType === "OSM" ? "Form a Sentence" : ""}
                        </span>

                        <div className="mt-3">
                            {currentQuestion?.tamilSentence &&
                                <h4 className="mt-[18px] text-[28px] leading-[1.5] text-[#222]">
                                    {currentQuestion?.tamilSentence}
                                </h4>
                            }

                            <h4 className="mt-[18px] text-[28px] leading-[1.5] text-[#222]">
                                {currentQuestion?.englishSentence}
                            </h4>
                        </div>
                    </div>


                    <div className="relative">

                        <textarea
                            value={result?.userAnswer || answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="w-full min-h-[150px] border-none outline-none rounded-[20px] p-[18px] text-base bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] resize-none disabled:opacity-70"
                            placeholder="Speak your Answer..."
                            disabled={Boolean(result)}
                        />

                    </div>

                    {!result &&
                        <div className="flex justify-center mt-3">
                            <VoiceRecorder
                                onText={setAnswer}
                            />
                        </div>
                    }

                    {!result &&
                        <button
                            className="mt-[25px] w-full h-[55px] border-none rounded-2xl bg-[#00ccff] text-white text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
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
                        <div className="fixed left-0 right-0 bottom-0 bg-white rounded-t-[24px] p-[25px] shadow-[0_-10px_30px_rgba(0,0,0,0.1)] animate-[slideUp_0.25s_ease]">

                            <div className="w-[50px] h-[5px] bg-[#ddd] rounded-full mx-auto mb-5"></div>

                            <div className={`flex items-center gap-2.5 text-lg font-bold mb-5 ${result?.isCorrect ? "text-[#00a76f]" : "text-[#dc3545]"}`}>

                                {result?.isCorrect ? <CheckCircle2 size={22} /> : <XCircle size={22} />}

                                <span>{result?.isCorrect ? "Congradulations!" : "Needs Improvement"}</span>

                            </div>

                            <div className="mb-[18px]">

                                <label className="block text-[13px] font-semibold text-[#888] mb-[5px]">Your Answer</label>

                                <p className="m-0 text-[15px]">
                                    {result?.userAnswer}
                                </p>

                            </div>

                            {result?.correctedAnswer &&
                                <div className="mb-[18px]">

                                    <label className="block text-[13px] font-semibold text-[#888] mb-[5px]">Correct Answer</label>

                                    <p className="m-0 text-[15px] text-[#00a76f] font-semibold">
                                        {result?.correctedAnswer}
                                    </p>

                                </div>
                            }

                            {result?.explanation &&
                                <div className="mb-[18px]">

                                    <label className="block text-[13px] font-semibold text-[#888] mb-[5px]">Explanation</label>

                                    <p className="m-0 text-[15px]">
                                        {result?.explanation}
                                    </p>

                                </div>
                            }

                            <button
                                className="w-full h-[55px] border-none rounded-2xl bg-[#00cc66] text-white text-base font-semibold"
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