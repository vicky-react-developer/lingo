import React, { useState, useEffect } from "react";
import "./TaskList.css";
import { getTasks } from "../services/foundationalTaskservice";
import { useLocation, useNavigate } from "react-router";
import Header from "../components/Header";
import MySpinner from "../components/MySpinner";

export default function TaskList() {
    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    const { tasktype } = location.state || {};

    useEffect(() => {
        if (tasktype) {
            fetchTasks();
        }
    }, [tasktype])


    const fetchTasks = async () => {
        try {
            setLoading(true);
            const res = await getTasks(tasktype)
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

        <div className="task-page">
            <Header
                primaryTitle={tasktype === "tamil_to_english" ? "Foundational Tamil → English" : tasktype === "own_words" ? "Foundational Own Words" : ""}
                secondaryTitle={tasktype === "tamil_to_english" ? "Translate Tamil sentences into English." : tasktype === "own_words" ? "Create English sentences using given words and improve sentence formation." : ""}
            />

            <div className="task-list mt-3">
                {tasks.length > 0 ?
                    <>
                        {tasks.map((task) => {
                            const completed = task.Attempts?.length;
                            const totalQuestions = tasktype === "tamil_to_english" ? task.TamilSentences?.length : task.WordTasks?.length;
                            const progress = (completed / totalQuestions) * 100;

                            return (

                                <div
                                    key={task.id}
                                    className="task-card"
                                >

                                    <div className="task-top">

                                        <div>

                                            <h5>{task.title}</h5>

                                            <span>
                                                {completed}/{totalQuestions} Completed
                                            </span>

                                        </div>

                                        {completed === totalQuestions ? (

                                            <div className="task-status completed">
                                                <i className="bi bi-check-circle-fill"></i>
                                            </div>

                                        ) : (

                                            <div className="task-status">
                                                <i className="bi bi-book-fill"></i>
                                            </div>

                                        )}

                                    </div>

                                    <div className="progress task-progress">

                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: `${progress}%`
                                            }}
                                        />
                                    </div>

                                    <button className="task-btn" onClick={() => navigate(`/foundational-task/${task.id}`, { state: { taskType: task.type } })}>

                                        {completed === 0
                                            ? "Start"
                                            : completed === totalQuestions
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