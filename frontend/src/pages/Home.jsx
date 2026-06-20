import React from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import Header from "../components/Header";

export default function Home({ onMenuToggle }) {
    const navigate = useNavigate();

    const modes = [
        {
            id: "chat",
            icon: "bi-chat-dots-fill",
            title: "Chat",
        },
        {
            id: "duolingo",
            icon: "bi-grid-1x2-fill",
            title: "Duolingo Method",
        },
        {
            id: "story",
            icon: "bi-book-half",
            title: "Story",
        },
        {
            id: "foundationalTasks",
            icon: "bi-pencil-square",
            title: "Foundational Tasks",
        },
    ];

    const handleNavigation = (mode) => {
        navigate('/modes', { state: { category: mode.id, categoryTitle: mode.title} })
    };

    return (

        <div className="mode-page">

            <Header
                brandTitle
                onMenuToggle={onMenuToggle}
            />

            <div className="mode-container">

                <div className="mode-list">

                    {modes.map((mode) => (

                        <div
                            key={mode.id}
                            className="mode-card"
                            onClick={() => handleNavigation(mode)}
                        >

                            <div className="mode-icon">
                                <i className={`bi ${mode.icon}`}></i>
                            </div>

                            <div className="mode-content">
                                <h5>{mode.title}</h5>
                                {/* <p>{mode.desc}</p> */}
                            </div>

                            <div className="mode-arrow">
                                <i className="bi bi-chevron-right"></i>
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
}
