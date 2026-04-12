import { useEffect, useState } from "react";
import "./ChatHistory.css";
import Header from "../components/Header";
import { getSessions } from "../services/sessionService";
import { useNavigate } from "react-router";

export default function ChatHistory() {

    const [sessions, setSessions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSessions();
    }, []);

    const fetchSessions = async () => {
        try {
            const response = await getSessions();
            if (response?.success) {
                setSessions(response?.data);
            }
        } catch (e) {
            console.log("Error while fetching sessions", e)
        }
    };

    const getModeIcon = (mode) => {
        if (mode === "topic") return "🟡";
        if (mode === "passage") return "🔵";
        return "⚪";
    };

    const getTitle = (session) => {
        if (session.mode === "topic") return session.Topic?.title;
        if (session.mode === "passage") return session.Passage?.title;
        return "General Chat";
    };

    const handleNavigation = (session) => {
        console.log("check", session)
        const info = {};
        switch(session.mode) {
            case "topic":
                info.title = session.Topic.title;
                info.description = session.Topic.description;
                break;
            case "passage":
                info.title = session.Passage.title;
                info.tamilText = session.Passage.tamilText;
                break;
            default:
                break;
        }
        navigate("/chat", {
            state: {
                sessionPayload: {
                    mode: session.mode,
                    sessionId: session.id,
                },
                info
            }
        })
    }

    return (
        <div>
            <Header
                primaryTitle="Chat History"
            />

            <div className="history-page">

                {/* List */}
                <div className="history-list">
                    {sessions.length > 0 ?
                        <>
                            {sessions.map((session) => (

                                <div
                                    key={session.id}
                                    className="history-item"
                                    onClick={() => handleNavigation(session)}
                                >

                                    <div className="history-icon">
                                        {getModeIcon(session.mode)}
                                    </div>

                                    <div className="history-content">

                                        <div className="history-title">
                                            {getTitle(session)}
                                        </div>

                                        <p className="history-preview text-clip">
                                            {session.Messages[0]?.text || "No messages yet"}
                                        </p>

                                    </div>

                                    <div className="history-time">
                                        {new Date(session.updatedAt).toLocaleDateString()}
                                    </div>

                                </div>

                            ))}
                        </>
                        :
                        <p className="text-center text-danger">No data Found</p>
                    }
                </div>
            </div>
        </div>
    );
}