import React from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router";
import {
    MessageCircle,
    Lightbulb,
    MessageSquareText,
    Heart,
    Target,
} from "lucide-react";
import ModeList from "../components/ModeList";

export default function HistoryCategory() {
    const navigate = useNavigate();

    const categories = [
        {
            mode: "normal",
            icon: MessageCircle,
            title: "Free Conversation",
            desc: "Practice natural English conversations."
        },
        {
            mode: "topic",
            icon: Lightbulb,
            title: "Topic Conversation",
            desc: "Speak about a chosen topic."
        },
        {
            mode: "passage",
            icon: MessageSquareText,
            title: "Story Q & A",
            desc: "Answer questions from stories."
        },
        {
            mode: "duolingoChat",
            icon: Heart,
            title: "Dual Language Chat",
            desc: "Speak Tamil, then English."
        },
        {
            mode: "duolingoTopic",
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
                            mode: item.mode,
                            modeTitle: item.title
                        }
                    })
                }
            />
        </div>
    );
}
