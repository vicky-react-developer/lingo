import { Lightbulb, BookText, Circle } from "lucide-react";
import Header from "../layouts/Header";
import { useNavigate, useLocation } from "react-router";
import DataState from "../components/DataState";
import type { ChatExtraInfo } from "../types/chat";
import { useFetchsessionsQuery } from "../state/api/session.api";
import type { SessionResponse } from "../types/chat";

export default function ChatHistory() {
    const location = useLocation();
    const navigate = useNavigate();

    const { mode, modeTitle } = location.state || {}

    const { data, isLoading: loading } = useFetchsessionsQuery(mode);
    const sessions = data?.data || [];

    const getModeIcon = (mode: string) => {
        if (mode === "topic") return <Lightbulb size={18} className="text-[#f0ad4e]" />;
        if (mode === "passage") return <BookText size={18} className="text-[#0d6efd]" />;
        return <Circle size={18} className="text-[#adb5bd]" />;
    };

    const getTitle = (session: SessionResponse) => {
        if (session.mode === "topic") return session.Topic?.title;
        // if (session.mode === "passage") return session.Passage?.title;

        return modeTitle;
    };

    const handleNavigation = (session: SessionResponse) => {
        const info: ChatExtraInfo = {};
        switch (session.mode) {
            case "topic":
                info.title = session.Topic?.title;
                break;
            case "passage":
                info.tamilText = session.Passage?.tamilText;
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
                secondaryTitle={modeTitle}
            />

            <div className="p-3 min-h-screen bg-[#f7f8fc]">

                {/* List */}
                <div className="flex flex-col gap-2.5">
                    {sessions.length > 0 ?
                        <>
                            {sessions.map((session) => (

                                <div
                                    key={session.id}
                                    className="flex items-center gap-3 bg-white p-3 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.05)] cursor-pointer"
                                    onClick={() => handleNavigation(session)}
                                >

                                    <div>
                                        {getModeIcon(session.mode)}
                                    </div>

                                    <div className="flex-1 min-w-0">

                                        <div className="font-semibold text-sm text-[#212529]">
                                            {getTitle(session)}
                                        </div>

                                        <p className="text-[13px] text-[#6c757d] mt-0.5 truncate">
                                            {session.Messages[0]?.text || "No messages yet"}
                                        </p>

                                    </div>

                                    <div className="text-[11px] text-[#adb5bd] shrink-0">
                                        {new Date(session.updatedAt).toLocaleDateString()}
                                    </div>

                                </div>

                            ))}
                        </>
                        :
                        <DataState loading={loading} />
                    }
                </div>
            </div>
        </div>
    );
}