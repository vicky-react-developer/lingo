import React, { useState, useEffect } from "react";
import { CheckCircle2, BookOpen } from "lucide-react";
import { getTasks } from "../services/functionalTaskservice";
import { useLocation, useNavigate } from "react-router";
import Header from "../components/Header";
import MySpinner from "../components/MySpinner";

export default function TaskList() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    const { taskCategory } = location.state || {};

    useEffect(() => {
        if (taskCategory) {
            fetchTasks();
        }
    }, [taskCategory])


    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await getTasks(taskCategory)
            if (!res.success) {
                return;
            }
            setTasks(res.data);
        } catch (e) {
            console.log("fetchTasks err:", e)
        } finally {
            setLoading(false);
        }
    }

    return (

        <div className="min-h-screen bg-[#f6f8fb]">
            <Header
                primaryTitle={taskCategory === "Task" ? "Functional Words - Task" : taskCategory === "Practice" ? "Functional Words - Practice" : ""}
            />

            <div className="flex flex-col gap-4 p-5 mt-3">
                {tasks.length > 0 ?
                    <>
                        {tasks.map((task) => {
                            const completed = task.Attempts?.length;
                            const totalQuestions = task.FunctionalExercises?.length;
                            const progress = (completed / totalQuestions) * 100;
                            const isCompleted = completed === totalQuestions;

                            return (

                                <div
                                    key={task.id}
                                    className="bg-white rounded-[20px] p-[18px] shadow-[0_6px_20px_rgba(0,0,0,0.05)]"
                                >

                                    <div className="flex justify-between items-center">

                                        <div>

                                            <h5 className="m-0 font-bold text-base">{task.title}</h5>

                                            <span className="text-[13px] text-[#6c757d]">
                                                {completed}/{totalQuestions} Completed
                                            </span>

                                        </div>

                                        <div className={`w-[45px] h-[45px] rounded-xl flex items-center justify-center ${
                                            isCompleted ? "bg-[#e8fff2] text-[#00b26f]" : "bg-[#eaf9ff] text-[#00ccff]"
                                        }`}>
                                            {isCompleted ? <CheckCircle2 size={20} /> : <BookOpen size={20} />}
                                        </div>

                                    </div>

                                    <div className="mt-[15px] h-2 rounded-full bg-[#edf1f5] overflow-hidden">
                                        <div
                                            className="h-full bg-[#00ccff]"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>

                                    <button
                                        className="w-full mt-4 h-12 rounded-2xl bg-[#00ccff] text-white font-semibold text-[15px]"
                                        onClick={() => navigate(`/functional-task/${task.id}`, { state: { taskType: task.type, taskTitle: task.title } })}
                                    >

                                        {completed === 0
                                            ? "Start"
                                            : isCompleted
                                                ? "Review"
                                                : "Continue"}

                                    </button>

                                </div>

                            );

                        })}
                    </>
                    :
                    <MySpinner loading={loading} />
                }
            </div>

        </div>

    );
}