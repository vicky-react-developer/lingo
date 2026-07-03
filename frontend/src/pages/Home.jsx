import React from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ onMenuToggle }) {
    const navigate = useNavigate();

    const modes = [
        {
            id: "duolingo",
            icon: "bi-translate",
            title: "Dual Language Speaking Practice",
            desc: "Speak naturally in Tamil first and then express the same idea in English."
        },
        {
            id: "functionalTasks",
            icon: "bi-tools",
            title: "Functional Words Fluency Practice",
            desc: "Build fluency by using essential functional words in meaningful contexts."
        },
        {
            id: "story",
            icon: "bi-book",
            title: "Short Passage Speaking Practice",
            desc: "Develop confidence and fluency through structured passage speaking activities."
        },
        {
            id: "chat",
            icon: "bi-chat-left-text-fill",
            title: "Real-Life Speaking Practice",
            desc: "Practice English in everyday situations through interactive conversations."
        }
    ];

    const handleNavigation = (mode) => {
        navigate('/modes', { state: { category: mode.id, categoryTitle: mode.title } })
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
                                <p>{mode.desc}</p>
                            </div>

                            <div className="mode-arrow">
                                <i className="bi bi-chevron-right"></i>
                            </div>

                        </div>

                    ))}

                </div>

            </div>

            <Footer />
        </div>

    );
}
