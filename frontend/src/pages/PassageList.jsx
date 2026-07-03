import React, { useEffect, useState } from "react";
import "./PassageList.css";
import { getPassages } from "../services/passageService";
import { useNavigate, useLocation } from "react-router";
import Header from "../components/Header";
import MySpinner from "../components/MySpinner";

function PassageList() {
    const location = useLocation();
    const navigate = useNavigate();

    const [passages, setPassages] = useState([]);
    const [loading, setLoading] = useState(true);

    const { type } = location?.state || {};

    useEffect(() => {
        fetchPassages();
    }, [type]);

    const fetchPassages = async () => {
        try {
            setLoading(true);
            const res = await getPassages(type || "Q/A")
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
        if (type === "Translation") {
            navigate("/story-translation", {
                state: {
                    passageId: passage.id
                }
            });
        } else {
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
            });
        }
    }


    return (
        <div>
            <Header
                primaryTitle={type === "Translation" ? "Story Conversion" : "Story Q/A"}
                secondaryTitle={type === "Translation" ? "Read the Tamil passage and translate it into English" : "Read the Tamil passage and answer AI questions"}
            />
            <div className="passage-container">
                <div className="passage-list">
                    {passages.length > 0 ?
                        <>
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

                                        <div className="passage-title-row">

                                            <h6>{passage.title}</h6>

                                            {(type === "Translation" && passage.Attempts?.length > 0) && (
                                                <>
                                                    <span className="attempted-badge">
                                                        Attempted
                                                    </span>

                                                    <span className="score-badge">
                                                        {passage.Attempts[0]?.score}%
                                                    </span>
                                                </>
                                            )}

                                        </div>

                                        <p className="passage-preview">
                                            {passage.tamilText?.slice(0, 80)}...
                                        </p>

                                    </div>

                                    <div className="passage-arrow">
                                        ›
                                    </div>

                                </div>

                            ))}
                        </>
                        :
                        <MySpinner loading={loading} />
                    }
                </div>

            </div>
        </div>
    );
}

export default PassageList;