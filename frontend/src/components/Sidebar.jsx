import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();

    const user = auth?.user

    const navItems = [
        { path: "/home", icon: "bi-house-fill", label: "Home" },
        { path: "/chat", icon: "bi-chat-dots-fill", label: "Normal Chat" },
        { path: "/topic", icon: "bi-lightbulb-fill", label: "Topic Practice" },
        { path: "/passage", icon: "bi-book-fill", label: "Passage Practice" },
        { path: "/chat-history", icon: "bi-chat-dots", label: "Chat History" },
    ];

    const go = (path) => { navigate(path); onClose(); };

    return (
        <>
            {isOpen && (
                <div onClick={onClose}
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 40 }} />
            )}
            <div style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px',
                background: '#fff', borderRight: '0.5px solid rgba(0,0,0,0.1)',
                zIndex: 50, transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.25s ease', display: 'flex', flexDirection: 'column'
            }}>
                <div className="p-3 border-bottom">
                    <div style={{
                        width: 44, height: 44, borderRadius: '50%', background: '#E6F1FB',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 500, color: '#185FA5', marginBottom: 8
                    }}>{user?.name[0]}</div>
                    <div style={{ fontWeight: 500 }}>{user?.name}</div>
                    <div className="text-muted" style={{ fontSize: 12 }}>{user?.userName}</div>
                </div>

                <nav className="flex-grow-1 py-2">
                    {navItems.map(item => (
                        <button key={item.path} onClick={() => go(item.path)}
                            className="btn w-100 text-start d-flex align-items-center gap-3 px-3 py-2 rounded-0"
                            style={{
                                fontSize: 14,
                                background: location.pathname === item.path ? '#E6F1FB' : 'transparent',
                                color: location.pathname === item.path ? '#185FA5' : '#333',
                                fontWeight: location.pathname === item.path ? 500 : 400,
                            }}>
                            <i className={`bi ${item.icon}`} style={{ fontSize: 16, width: 20, textAlign: 'center' }}></i>
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>
        </>
    );
}