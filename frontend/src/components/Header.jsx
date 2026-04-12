import React from "react";
import { useNavigate } from "react-router";

export default function Header({ primaryTitle, secondaryTitle, onMenuToggle }) {
    const navigate = useNavigate();
    return (
        <div
            className="d-flex align-items-center position-relative bg-white border-bottom"
            style={{ height: '56px', padding: '0 8px' }}
        >
            {onMenuToggle ?
                <button onClick={onMenuToggle} className="btn p-2" style={{ zIndex: 1 }}
                    aria-label="Toggle menu">
                    <i className="bi bi-list" style={{ fontSize: '22px', color: '#185FA5' }}></i>
                </button>
                :
                <button
                    onClick={() => navigate(-1)}
                    className="btn d-flex align-items-center gap-1 px-2"
                    style={{ color: '#185FA5', fontSize: '15px', zIndex: 1, whiteSpace: 'nowrap' }}
                >
                    <svg width="9" height="15" viewBox="0 0 9 15" fill="none"
                        stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7.5 1.5L1.5 7.5L7.5 13.5" />
                    </svg>
                </button>
            }

            <div
                className="position-absolute start-0 end-0 top-0 bottom-0 d-flex flex-column align-items-center justify-content-center"
                style={{ pointerEvents: 'none' }}
            >
                <span style={{ fontSize: '16px', fontWeight: 500, lineHeight: 1.2 }}>
                    {primaryTitle}
                </span>
                <span className="text-muted" style={{ fontSize: '12px', lineHeight: 1.3, marginTop: '1px' }}>
                    {secondaryTitle}
                </span>
            </div>
        </div>
    );
}