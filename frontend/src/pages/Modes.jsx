import React from "react";
import { useNavigate, useLocation } from "react-router";
import {
    MessageSquareText,
    Lightbulb,
    Languages,
    Globe2,
    CircleHelp,
    BookOpenText,
    ListChecks,
    ClipboardCheck,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ModeList from "../components/ModeList";

const allModes = {
    chat: [
        {
            id: "normal",
            icon: MessageSquareText,
            title: "Free Conversation",
            desc: "Practice natural English conversations."
        },
        {
            id: "topic",
            icon: Lightbulb,
            title: "Topic Conversation",
            desc: "Speak about a chosen topic."
        }
    ],

    duolingo: [
        {
            id: "duolingoChat",
            icon: Languages,
            title: "Dual Language Chat",
            desc: "Speak Tamil, then English."
        },
        {
            id: "duolingoTopic",
            icon: Globe2,
            title: "Dual Language Topic",
            desc: "Discuss topics in two languages."
        }
    ],

    story: [
        {
            id: "passage",
            icon: CircleHelp,
            title: "Story Q & A",
            desc: "Answer questions from stories."
        },
        {
            id: "Translation",
            icon: BookOpenText,
            title: "Story Translation",
            desc: "Translate stories into English."
        }
    ],

    functionalTasks: [
        {
            id: "Task",
            icon: ListChecks,
            title: "Functional Words - Task",
            desc: "Master grammar through structured exercises."
        },
        {
            id: "Practice",
            icon: ClipboardCheck,
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
                navigate("/task-list", {
                    state: { taskCategory: mode }
                });
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
                navigate("/topic", {
                    state: { type: "duolingo" }
                });
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
        <div>
            <Header
                primaryTitle={categoryTitle}
                secondaryTitle="Select a learning mode"
                onMenuToggle={onMenuToggle}
            />

            <ModeList
                modes={modes}
                onSelect={(mode) => handleNavigation(mode.id)}
                background="bg-white"
            />

            <Footer />
        </div>
    );
}
