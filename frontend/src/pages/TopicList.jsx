import React, { useEffect, useState } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";
import { getTopics } from "../services/topicService";
import { useNavigate, useLocation } from "react-router";
import Header from "../components/Header";
import MySpinner from "../components/MySpinner";

function TopicList() {
    const navigate = useNavigate();
    const location = useLocation();

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const { type } = location.state || {};

    useEffect(() => {
        fetchTopics();
    }, [type]);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const res = await getTopics(type === "duolingo" ? "Dual Language" : "Real-life Speaking")
            if (!res.success) {
                return;
            }
            setTopics(res.data);
        } catch (e) {
            console.log("createSession error", e)
        } finally {
            setLoading(false);
        }
    };

    const onSelectTopic = (topic) => {
        navigate("/chat", {
            state: {
                sessionPayload: {
                    mode: type === "duolingo" ? "duolingoTopic" : "topic",
                    topicId: topic.id,
                },
                info: {
                    title: topic.title,
                }
            }
        })
    }

    return (
        <div>
            <Header
                primaryTitle="Choose a Topic"
                secondaryTitle="Start a conversation with AI"
            />
            <div className="mx-auto p-5 min-h-screen bg-[#f7f9fc]">

                <div className="flex flex-col gap-3.5">
                    {topics?.length > 0 ?
                        <>
                            {
                                topics.map(topic => (
                                    <div
                                        key={topic.id}
                                        className="flex items-center bg-white p-[15px] rounded-2xl shadow-[0_5px_14px_rgba(0,0,0,0.06)] cursor-pointer transition-transform duration-200 ease-out active:scale-[0.97]"
                                        onClick={() => onSelectTopic(topic)}
                                    >

                                        <div className="flex items-center justify-center bg-[#00CCFF] text-white rounded-xl mr-3.5 p-2.5">
                                            <MessageCircle size={18} />
                                        </div>

                                        <div>

                                            <h6 className="m-0 font-semibold">{topic.title}</h6>

                                            <p className="m-0 text-xs text-[#6c757d]">{topic.description}</p>

                                        </div>

                                        <div className="ml-auto text-[#adb5bd]">
                                            <ChevronRight size={20} />
                                        </div>

                                    </div>

                                ))
                            }
                        </>
                        :
                        <MySpinner loading={loading} />
                    }
                </div>

            </div>
        </div>

    );
}

export default TopicList;