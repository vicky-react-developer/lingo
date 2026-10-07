import React from "react";
import Header from "../layouts/Header";
import { useNavigate } from "react-router";
import {
    MessageCircle,
    Lightbulb,
    MessageSquareText,
    Heart,
    Target,
} from "lucide-react";
import ModeList from "../components/ModeList";
import type { Mode } from "../types/common";

export default function HistoryCategory() {
    const navigate = useNavigate();

    const categories: Mode[] = [
        {
            id: "normal",
            icon: MessageCircle,
            title: "Free Conversation",
            desc: "Practice natural English conversations."
        },
        {
            id: "topic",
            icon: Lightbulb,
            title: "Topic Conversation",
            desc: "Speak about a chosen topic."
        },
        {
            id: "passage",
            icon: MessageSquareText,
            title: "Story Q & A",
            desc: "Answer questions from stories."
        },
        {
            id: "duolingoChat",
            icon: Heart,
            title: "Dual Language Chat",
            desc: "Speak Tamil, then English."
        },
        {
            id: "duolingoTopic",
            icon: Target,
            title: "Dual Language Topic",
            desc: "Discuss topics in two languages."
        }
    ];

    return (
        <div>
            <Header
                primaryTitle="Chat History"
                secondaryTitle="Choose a category"
            />

            <ModeList
                modes={categories}
                onSelect={(item) =>
                    navigate("/chat-history", {
                        state: {
                            mode: item.id,
                            modeTitle: item.title
                        }
                    })
                }
            />
        </div>
    );
}
