import React, { useEffect, useState } from "react";
import { BookOpen, ChevronRight } from "lucide-react";
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
            <div className="mx-auto p-5 min-h-screen bg-[#f7f9fc]">
                <div className="flex flex-col gap-3.5">
                    {passages.length > 0 ?
                        <>
                            {passages.map((passage) => (

                                <div
                                    key={passage.id}
                                    className="flex items-center bg-white p-4 rounded-2xl shadow-[0_6px_16px_rgba(0,0,0,0.06)] cursor-pointer transition-transform duration-200 ease-out active:scale-[0.97]"
                                    onClick={() => onSelectPassage(passage)}
                                >

                                    <div className="flex items-center justify-center bg-[#00CCFF] text-white rounded-xl mr-3.5 p-2.5">
                                        <BookOpen size={20} />
                                    </div>

                                    <div>

                                        <div className="flex items-center gap-1.5 flex-wrap">

                                            <h6 className="m-0 font-semibold">{passage.title}</h6>

                                            {(type === "Translation" && passage.Attempts?.length > 0) && (
                                                <>
                                                    <span className="bg-[#e8f8ee] text-[#198754] text-[10px] font-semibold px-2 py-[3px] rounded-full">
                                                        Attempted
                                                    </span>

                                                    <span className="bg-[#eef7ff] text-[#0d6efd] text-[10px] font-bold px-2 py-[3px] rounded-full">
                                                        {passage.Attempts[0]?.score}%
                                                    </span>
                                                </>
                                            )}

                                        </div>

                                        <p className="text-xs text-[#6c757d] mt-[3px] mb-0">
                                            {passage.tamilText?.slice(0, 80)}...
                                        </p>

                                    </div>

                                    <div className="ml-auto text-[#adb5bd]">
                                        <ChevronRight size={22} />
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