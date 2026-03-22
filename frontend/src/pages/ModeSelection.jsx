import React from "react";
import "./ModeSelection.css";
import { useNavigate } from "react-router";

function ModeSelection() {
    const navigate = useNavigate();

    const modes = [
        {
            id: "normal",
            icon: "bi-chat-dots-fill",
            title: "Normal Chat",
            desc: "Talk freely with AI and improve your English conversation."
        },
        {
            id: "topic",
            icon: "bi-lightbulb-fill",
            title: "Topic Practice",
            desc: "Choose a topic and discuss it with the AI."
        },
        {
            id: "passage",
            icon: "bi-book-fill",
            title: "Passage Practice",
            desc: "Read Tamil passage and answer questions in English."
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
            default:
                navigate("/chat", { state: { mode: "normal" } });

        }
    }

    return (
        <div className="mode-container">

            <div className="mode-header text-center">
                <h4>Practice English</h4>
                <p>Select a learning mode</p>
            </div>

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
    );
}

export default ModeSelection;