import React, { useEffect, useState } from "react";
import "./TopicList.css";
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
    }, []);

    const fetchTopics = async () => {
        try {
            setLoading(true);
            const res = await getTopics()
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
                    description: topic.description,
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
            <div className="topic-container">

                <div className="topic-list">
                    {topics?.length > 0 ?
                        <>
                            {
                                topics.map(topic => (
                                    <div
                                        key={topic.id}
                                        className="topic-card"
                                        onClick={() => onSelectTopic(topic)}
                                    >

                                        <div className="topic-icon">
                                            💬
                                        </div>

                                        <div className="topic-content">

                                            <h6>{topic.title}</h6>

                                            <p>{topic.description}</p>

                                        </div>

                                        <div className="topic-arrow">
                                            ›
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
        </div >

    );
}

export default TopicList;