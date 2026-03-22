import React, { useEffect, useState } from "react";
import "./TopicList.css";
import { getTopics } from "../services/topicService";

function TopicList({ onSelectTopic }) {

    const [topics, setTopics] = useState([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return (
            <div className="topic-container text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div className="topic-container">

            <div className="topic-header text-center">
                <h4>Choose a Topic</h4>
                <p>Start a conversation with AI</p>
            </div>

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
    );
}

export default TopicList;