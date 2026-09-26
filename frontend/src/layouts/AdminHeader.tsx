import React, { useEffect, useRef, useState } from "react";
import { Menu, User, ChevronDown, LogOut, UserCircle, GraduationCap } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AdminHeaderProps {
  onToggleSidebar: () => void
}

export default function AdminHeader({ onToggleSidebar }: AdminHeaderProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        e.target instanceof Node &&
        !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
    } catch (e) {
      console.error("Logout error:", e);
    }
  };

  return (
    <nav className="flex items-center justify-between h-14 shrink-0 px-4 bg-[#0f172a] border-b border-white/10">
      <div className="flex items-center gap-3">
        <button
          className="flex items-center justify-center w-8 h-8 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-400">
            <GraduationCap size={16} />
          </div>
          <span className="text-white font-semibold text-sm">Spoken English-I</span>
        </div>
      </div>

      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 h-9 pl-2 pr-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-expanded={menuOpen}
        >
          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10">
            <User size={14} />
          </div>
          <ChevronDown size={14} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
        </button>

        {menuOpen && (
          <ul className="absolute right-0 mt-2 w-44 py-1.5 rounded-xl bg-white shadow-lg ring-1 ring-black/5 z-20">
            <li>
              <a
                href="#profile"
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <UserCircle size={16} className="text-slate-400" /> Profile
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2.5 px-3.5 py-2 text-sm text-red-600 hover:bg-red-50 w-100"
              >
                <LogOut size={16} /> Logout
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}