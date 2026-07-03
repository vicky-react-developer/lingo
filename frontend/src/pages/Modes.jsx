import React from "react";
import "./Home.css";
import { useNavigate, useLocation } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allModes = {
    chat: [
        {
            id: "normal",
            icon: "bi-chat-left-text-fill",
            title: "Free Conversation",
            desc: "Practice natural English conversations."
        },
        {
            id: "topic",
            icon: "bi-lightbulb-fill",
            title: "Topic Conversation",
            desc: "Speak about a chosen topic."
        }
    ],

    duolingo: [
        {
            id: "duolingoChat",
            icon: "bi-translate",
            title: "Dual Language Chat",
            desc: "Speak Tamil, then English."
        },
        {
            id: "duolingoTopic",
            icon: "bi-globe-central-south-asia",
            title: "Dual Language Topic",
            desc: "Discuss topics in two languages."
        }
    ],

    story: [
        {
            id: "passage",
            icon: "bi-patch-question-fill",
            title: "Story Q & A",
            desc: "Answer questions from stories."
        },
        {
            id: "Translation",
            icon: "bi-journal-text",
            title: "Story Translation",
            desc: "Translate stories into English."
        }
    ],

    functionalTasks: [
        {
            id: "Task",
            icon: "bi-ui-checks-grid",
            title: "Functional Words - Task",
            desc: "Master grammar through structured exercises."
        },
        {
            id: "Practice",
            icon: "bi-journal-check",
            title: "Functional Words - Practice",
            desc: "Reinforce grammar with guided practice."
        }
    ]
};

export default function Modes({ onMenuToggle }) {

    const navigate = useNavigate();
    const location = useLocation();

    const { category, categoryTitle } = location.state || {};

    const handleNavigation = (mode) => {

        switch (mode) {
            case "topic":
                navigate("/topic");
                break;

            case "passage":
                navigate("/passage");
                break;

            case "Translation":
                navigate("/passage", { state: { type: mode } });
                break;

            case "Task":
            case "Practice":
                navigate("/task-list", { state: { taskCategory: mode } });
                break;

            case "duolingoChat":
                navigate("/chat", {
                    state: {
                        sessionPayload: {
                            mode: "duolingoChat"
                        }
                    }
                });
                break;

            case "duolingoTopic":
                navigate("/topic", { state: { type: "duolingo" } });
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

    const modes = allModes[category];

    return (

        <div className="mode-page">

            <Header
                primaryTitle={categoryTitle}
                secondaryTitle="Select a learning mode"
                onMenuToggle={onMenuToggle}
            />

            <div className="mode-container" style={{backgroundColor: "#fff"}}>

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

            <Footer />
        </div>

    );
}
