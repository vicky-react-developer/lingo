import React from "react";
import "./ModeSelection.css";
import { useNavigate } from "react-router";
import Header from "../components/Header";

export default function Duolingo({ onMenuToggle }) {

    const navigate = useNavigate();

    const modes = [
        {
            id: "duolingoChat",
            icon: "bi-chat-dots-fill",
            title: "Duolingo Chat",
            desc: "Talk freely with AI and improve your English conversation skills."
        },
        {
            id: "duolingoTopic",
            icon: "bi-lightbulb-fill",
            title: "Duolingo Topic",
            desc: "Choose a topic and continue conversations with AI around that subject."
        }
    ];

    const handleNavigation = (mode) => {

        switch (mode) {

            case "duolingoTopic":
                navigate("/topic", { state: { type: "duolingo" } });
                break;

            default:
                navigate("/chat", {
                    state: {
                        sessionPayload: {
                            mode: "duolingoChat"
                        }
                    }
                });

        }
    };

    return (

        <div className="mode-page">

            <Header
                primaryTitle="Duolingo"
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
