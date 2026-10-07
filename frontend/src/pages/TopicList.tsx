import { useEffect, useState } from "react";
import { MessageCircle, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import Header from "../layouts/Header";
import DataState from "../components/DataState";
import type { Topic } from "../types/topic";
import { useFetchTopicsQuery } from "../state/api/topic.api";

function TopicList() {
    const navigate = useNavigate();
    const location = useLocation();

    const { type } = location.state || {};

    const { data, isLoading: loading } = useFetchTopicsQuery(type === "duolingo" ? "Dual Language" : "Real-life Speaking");
    const topics = data?.data || [];

    const onSelectTopic = (topic: Topic) => {
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

                                        </div>

                                        <div className="ml-auto text-[#adb5bd]">
                                            <ChevronRight size={20} />
                                        </div>

                                    </div>

                                ))
                            }
                        </>
                        :
                        <DataState loading={loading} />
                    }
                </div>

            </div>
        </div>

    );
}

export default TopicList;