import { useNavigate, useLocation } from "react-router";
import { Home, MessageSquare, UserCircle, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navItems = [
    { path: "/home", icon: Home, label: "Home" },
    { path: "/history-category", icon: MessageSquare, label: "Chat History" },
];

const accountItems = [
    { path: "/profile", icon: UserCircle, label: "My Profile" },
    { path: "/change-password", icon: KeyRound, label: "Change Password" },
];

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth();
    const user = auth?.user;

    const go = (path) => { navigate(path); onClose(); };

    const handleLogout = async () => {
        try {
            await auth.logout();
            navigate("/login");
            onClose();
        } catch (e) {
            console.error("Logout error:", e);
        }
    };

    const NavButton = ({ path, icon: Icon, label, danger, onClick }) => {
        const active = location.pathname === path;
        return (
            <button
                onClick={onClick || (() => go(path))}
                className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left ${
                    danger
                        ? "text-[#D9363E]"
                        : active
                            ? "bg-[#E6F1FB] text-[#185FA5] font-medium"
                            : "text-[#333] font-normal"
                }`}
            >
                <Icon size={16} className="w-5 text-center" />
                {label}
            </button>
        );
    };

    return (
        <>
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black/35 z-40"
                />
            )}
            <div
                className={`fixed top-0 right-0 bottom-0 w-[260px] bg-white border-l border-black/10 z-50 flex flex-col transition-transform duration-300 ease-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* User Header */}
                <div className="p-3 border-b border-slate-300">
                    <div className="w-11 h-11 rounded-full bg-[#E6F1FB] flex items-center justify-center font-semibold text-[#185FA5] text-lg mb-2">
                        {user?.name?.[0]?.toUpperCase()}
                    </div>
                    <div className="font-medium">{user?.name}</div>
                    <div className="text-xs text-gray-500">{user?.userName}</div>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 py-2">
                    {navItems.map(item => (
                        <NavButton key={item.path} {...item} />
                    ))}
                </nav>

                <div className="border-t border-slate-300 py-2">
                    {accountItems.map(item => (
                        <NavButton key={item.path} {...item} />
                    ))}
                    <NavButton icon={LogOut} label="Logout" danger onClick={handleLogout} />
                </div>
            </div>
        </>
    );
}