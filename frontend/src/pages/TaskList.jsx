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

    // const tasks = [
    //     {
    //         id: 1,
    //         title: "Basic Greetings",
    //         totalQuestions: 50,
    //         completed: 12
    //     },
    //     {
    //         id: 2,
    //         title: "Daily Activities",
    //         totalQuestions: 50,
    //         completed: 0
    //     },
    //     {
    //         id: 3,
    //         title: "Family Members",
    //         totalQuestions: 50,
    //         completed: 50
    //     },
    //     {
    //         id: 4,
    //         title: "School & Education",
    //         totalQuestions: 50,
    //         completed: 25
    //     }
    // ];

    return (

        <div className="task-page">
            <Header
                primaryTitle="Foundational Tamil → English"
                secondaryTitle="Complete exercises and improve your English sentence formation."
            />

            <div className="task-list mt-3">
                {tasks.length > 0 ?
                    <>
                        {tasks.map((task) => {

                            const progress = (task.completed / task.totalQuestions) * 100;

                            return (

                                <div
                                    key={task.id}
                                    className="task-card"
                                >

                                    <div className="task-top">

                                        <div>

                                            <h5>{task.title}</h5>

                                            <span>
                                                {task.completed}/{task.totalQuestions} Completed
                                            </span>

                                        </div>

                                        {task.completed === task.totalQuestions ? (

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

                                    <button className="task-btn" onClick={() => navigate(`/foundational-task/${task.id}`)}>

                                        {task.completed === 0
                                            ? "Start"
                                            : task.completed === task.totalQuestions
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