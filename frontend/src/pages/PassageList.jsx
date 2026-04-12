import React, { useEffect, useState } from "react";
import "./PassageList.css";
import { getPassages } from "../services/passageService";
import { useNavigate } from "react-router";
import Header from "../components/Header";

function PassageList() {

    const [passages, setPassages] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        fetchPassages();
    }, []);

    const fetchPassages = async () => {
        try {
            setLoading(true);
            const res = await getPassages()
            if (!res.success) {
                return;
            }
            setPassages(res.data);
        } catch (e) {
            console.log("createSession error", e)
        } finally {
            setLoading(false);
        }
    };

    const onSelectPassage = (passage) => {
        navigate("/chat", {
            state: {
                sessionPayload: {
                    mode: "passage",
                    passageId: passage.id,
                },
                info: {
                    title: passage.title,
                    tamilText: passage.tamilText,
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="passage-container text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <Header
                primaryTitle="Choose a Passage"
                secondaryTitle="Read the Tamil passage and answer AI questions"
            />
            <div className="passage-container">
                <div className="passage-list">

                    {passages.map((passage) => (

                        <div
                            key={passage.id}
                            className="passage-card"
                            onClick={() => onSelectPassage(passage)}
                        >

                            <div className="passage-icon">
                                📖
                            </div>

                            <div className="passage-content">

                                <h6>{passage.title}</h6>

                                <p className="passage-preview">
                                    {passage.tamilText?.slice(0, 80)}...
                                </p>

                            </div>

                            <div className="passage-arrow">
                                ›
                            </div>

                        </div>

                    ))}

                </div>

            </div>
        </div>
    );
}

export default PassageList;