import React, { useState, useEffect } from "react";
import "./TaskList.css";
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

        <div className="task-page">
            <Header
                primaryTitle={taskCategory === "Task" ? "Functional Words - Task" : taskCategory === "Practice" ? "Functional Words - Practice" : ""}
            />

            <div className="task-list mt-3">
                {tasks.length > 0 ?
                    <>
                        {tasks.map((task) => {
                            const completed = task.Attempts?.length;
                            const totalQuestions = task.FunctionalExercises?.length;
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

                                    <button className="task-btn" onClick={() => navigate(`/functional-task/${task.id}`, { state: { taskType: task.type, taskTitle: task.title } })}>

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