import React, { useEffect, useState } from "react";
import "./TopicList.css";
import { getTopics } from "../services/topicService";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function TopicList() {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

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
                    mode: "topic",
                    topicId: topic.id,
                },
                info: {
                    title: topic.title,
                    description: topic.description,
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="topic-container text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <Header
                primaryTitle="Choose a Topic"
                secondaryTitle="Start a conversation with AI"
            />
            <div className="topic-container">

                <div className="topic-list">

                    {topics.map(topic => (

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

                    ))}

                </div>

            </div>
        </div>

    );
}

export default TopicList;