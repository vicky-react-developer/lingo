import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import "./HistoryCategory.css";

export default function HistoryCategory() {

    const navigate = useNavigate();

    const categories = [
        {
            mode: "normal",
            icon: "bi-chat-dots-fill",
            title: "Normal Chat",
            desc: "Previous free conversations"
        },
        {
            mode: "topic",
            icon: "bi-lightbulb-fill",
            title: "Selected Topic",
            desc: "Topic-based discussions"
        },
        {
            mode: "passage",
            icon: "bi-chat-square-text-fill",
            title: "Story Q & A",
            desc: "Story question sessions"
        },
        {
            mode: "duolingoChat",
            icon: "bi-chat-heart-fill",
            title: "Duolingo Chat",
            desc: "Tamil assisted chat"
        },
        {
            mode: "duolingoTopic",
            icon: "bi-bullseye",
            title: "Duolingo Topic",
            desc: "Tamil assisted topics"
        }
    ];

    return (
        <div>
            <Header
                primaryTitle="Chat History"
                secondaryTitle="Choose a category"
            />

            <div className="history-category-container">

                {categories.map((item) => (
                    <div
                        key={item.mode}
                        className="history-category-card"
                        onClick={() => navigate(`/chat-history`, { state: { mode: item.mode, modeTitle: item.title } })}
                    >

                        <div className="history-category-icon">
                            <i className={`bi ${item.icon}`}></i>
                        </div>

                        <div className="history-category-content">
                            <h6>{item.title}</h6>
                            <p>{item.desc}</p>
                        </div>

                        <div className="history-category-arrow">
                            <i className="bi bi-chevron-right"></i>
                        </div>

                    </div>
                ))}

            </div>
        </div>
    );
}
