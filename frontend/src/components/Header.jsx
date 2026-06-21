import React from "react";
import { useNavigate } from "react-router";
import { Logo } from "../helpers/Constants";

export default function Header({ primaryTitle, secondaryTitle, onMenuToggle, brandTitle }) {
    const navigate = useNavigate();

    if (brandTitle) {
        return (
            <div
                className="d-flex align-items-center bg-white border-bottom"
                style={{ height: '56px', padding: '0 8px', position: 'relative' }}
            >
                <div style={{ zIndex: 1, minWidth: 40, display: 'flex', alignItems: 'center' }}>
                    <img
                        src={Logo}
                        alt="logo"
                        style={{ width: 40, height: 40, objectFit: 'contain', marginLeft: 5 }}
                    />
                    <span className="mont-boldItalic" style={{ fontSize: '20px', lineHeight: 1.2, letterSpacing: '-0.3px', marginLeft: 5 }}>
                        <span style={{ color: '#07115D' }}>Lingo</span>
                        <span style={{ color: '#00C6FF' }}>Refresh</span>
                    </span>
                </div>

                {/* CENTER — Brand title */}
                {/* <div style={{
                    position: 'absolute', left: 0, right: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none'
                }}>
                    <span className="mont-boldItalic" style={{ fontSize: '20px', lineHeight: 1.2, letterSpacing: '-0.3px' }}>
                        <span style={{ color: '#07115D' }}>Lingo</span>
                        <span style={{ color: '#00C6FF' }}>Refresh</span>
                    </span>
                </div> */}

                {/* RIGHT — Hamburger */}
                <div style={{ marginLeft: 'auto', zIndex: 1 }}>
                    <button onClick={onMenuToggle} className="btn p-2" aria-label="Toggle menu">
                        <i className="bi bi-list" style={{ fontSize: '22px', color: '#185FA5' }}></i>
                    </button>
                </div>
            </div>
        );
    }

    // ── All other pages: back button left | title center | nothing right ──
    return (
        <div
            className="d-flex align-items-center bg-white border-bottom"
            style={{ height: '56px', padding: '0 8px', position: 'relative', justifyContent: "space-between" }}
        >
            {/* LEFT — Back button */}
            <div style={{ zIndex: 1, minWidth: 40 }}>
                <button
                    onClick={() => navigate(-1)}
                    className="btn d-flex align-items-center gap-1 px-2"
                    style={{ color: '#185FA5', fontSize: '15px', whiteSpace: 'nowrap' }}
                >
                    <svg width="9" height="15" viewBox="0 0 9 15" fill="none"
                        stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7.5 1.5L1.5 7.5L7.5 13.5" />
                    </svg>
                </button>
            </div>

            {/* CENTER — Title */}
            <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                pointerEvents: 'none'
            }}>
                <span style={{ fontSize: '14px', fontWeight: 600, lineHeight: 1.2, textAlign: "center" }}>
                    {primaryTitle}
                </span>
                {secondaryTitle && (
                    <span className="text-muted" style={{ fontSize: '12px', lineHeight: 1.3, marginTop: '1px', textAlign: 'center' }}>
                        {secondaryTitle}
                    </span>
                )}
            </div>

            <div style={{ minWidth: 40 }} />
        </div>
    );
}