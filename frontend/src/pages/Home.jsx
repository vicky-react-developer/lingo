import React from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
    Languages,
    Wrench,
    BookOpen,
    MessageSquareText,
} from "lucide-react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ModeList from "../components/ModeList";

export default function Home() {
    const navigate = useNavigate();
    const { setSidebarOpen } = useOutletContext();

    const modes = [
        {
            id: "duolingo",
            icon: Languages,
            title: "Dual Language Speaking Practice",
            desc: "Speak naturally in Tamil first and then express the same idea in English."
        },
        {
            id: "functionalTasks",
            icon: Wrench,
            title: "Functional Words Fluency Practice",
            desc: "Build fluency by using essential functional words in meaningful contexts."
        },
        {
            id: "story",
            icon: BookOpen,
            title: "Short Passage Speaking Practice",
            desc: "Develop confidence and fluency through structured passage speaking activities."
        },
        {
            id: "chat",
            icon: MessageSquareText,
            title: "Real-Life Speaking Practice",
            desc: "Practice English in everyday situations through interactive conversations."
        }
    ];

    const handleNavigation = (mode) => {
        navigate("/modes", {
            state: {
                category: mode.id,
                categoryTitle: mode.title
            }
        });
    };

    return (
        <div className="h-screen">
            <Header
                brandTitle
                onMenuToggle={setSidebarOpen}
            />

            <ModeList
                modes={modes}
                onSelect={handleNavigation}
                background="bg-[#00CCFF]"
            />

            <Footer />
        </div>
    );
}
