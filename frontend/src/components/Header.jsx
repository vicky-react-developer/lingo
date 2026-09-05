import React from "react";
import { useNavigate } from "react-router";
import { Menu, ChevronLeft } from "lucide-react";
import { Logo } from "../helpers/Constants";

export default function Header({ primaryTitle, secondaryTitle, onMenuToggle, brandTitle }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between h-[70px] px-2 bg-white border-b border-slate-300 relative">

            {/* LEFT */}
            <div className="min-w-10 flex items-center z-10">
                {brandTitle ? (
                    <>
                        <img src={Logo} alt="logo" className="w-10 h-10 object-contain ml-1" />
                        <span className="italic font-bold text-xl leading-tight tracking-[-0.3px] ml-1">
                            <span className="text-[#07115D]">Lingo</span>
                            <span className="text-[#00C6FF]">Refresh</span>
                        </span>
                    </>
                ) : (
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center px-2 py-2 text-[#185FA5]"
                        aria-label="Go back"
                    >
                        <ChevronLeft size={20} strokeWidth={2.5} />
                    </button>
                )}
            </div>

            {/* CENTER — Title (only for non-brand headers) */}
            {!brandTitle && (
                <div className="flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-sm font-semibold leading-tight text-center">
                        {primaryTitle}
                    </span>
                    {secondaryTitle && (
                        <span className="text-xs text-gray-500 leading-snug mt-px text-center">
                            {secondaryTitle}
                        </span>
                    )}
                </div>
            )}

            {/* RIGHT */}
            <div className="min-w-10 flex justify-end z-10">
                {brandTitle && (
                    <button onClick={onMenuToggle} className="p-2" aria-label="Toggle menu">
                        <Menu size={22} className="text-[#185FA5]" />
                    </button>
                )}
            </div>
        </div>
    );
}