import React from "react";
import "./ModeSelection.css";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function ModeSelection({ onMenuToggle }) {

    const navigate = useNavigate();

    const modes = [
        {
            id: "duolingo",
            icon: "bi-grid-1x2-fill",
            title: "Duolingo Method",
            desc: "Practice English freely using English + Tamil. AI helps correct your grammar while you speak naturally."
        },
        {
            id: "foundational-tof",
            icon: "bi-translate",
            title: "Foundational Tamil to English",
            desc: "Translate Tamil sentences into English."
        },
        {
            id: "foundational-oww",
            icon: "bi-pencil-square",
            title: "Foundational Own Words",
            desc: "Create English sentences using given words and improve sentence formation."
        },
        {
            id: "passage",
            icon: "bi-chat-square-text-fill",
            title: "Story Q & A",
            desc: "Read Tamil stories and answer AI questions in English to improve understanding."
        },
        {
            id: "story-conversion",
            icon: "bi-book-half",
            title: "Story Conversion",
            desc: "Convert complete Tamil passages into English."
        },
        {
            id: "normal",
            icon: "bi-chat-dots-fill",
            title: "Normal Chat",
            desc: "Talk freely with AI and improve your English conversation skills."
        },
        {
            id: "topic",
            icon: "bi-lightbulb-fill",
            title: "Selected Topic",
            desc: "Choose a topic and continue conversations with AI around that subject."
        }
    ];

    const handleNavigation = (mode) => {

        switch (mode) {

            case "topic":
                navigate("/topic");
                break;

            case "passage":
                navigate("/passage");
                break;

            case "story-conversion":
                navigate("/passage", { state: { type: "story-conversion" } });
                break;

            case "foundational-tof":
                navigate("/task-list", { state: { tasktype: "tamil_to_english" } });
                break;

            case "foundational-oww":
                navigate("/task-list", { state: { tasktype: "own_words" } });
                break;

            case "duolingo":
                navigate("/duolingo");
                break;

            default:
                navigate("/chat", {
                    state: {
                        sessionPayload: {
                            mode: "normal"
                        }
                    }
                });

        }
    };

    return (

        <div className="mode-page">

            <Header
                primaryTitle="Practice English"
                secondaryTitle="Select a learning mode"
                onMenuToggle={onMenuToggle}
            />

            <div className="mode-container">

                <div className="mode-list">

                    {modes.map((mode) => (

                        <div
                            key={mode.id}
                            className="mode-card"
                            onClick={() => handleNavigation(mode.id)}
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

        </div>

    );
}

export default ModeSelection;