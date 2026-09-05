import React from "react";
import { NavLink } from "react-router";
import {
  ClipboardList, ClipboardCheck, Users, GraduationCap, FileBarChart2,
  ListChecks, ToggleRight, FilePlus2, FileCheck2, AlertTriangle, FileWarning,
} from "lucide-react";

// Sidebar navigation items. `to` maps to a route rendered via <Outlet /> in AdminLayout.
const NAV_ITEMS = [
  { label: "Task Report NU", to: "/task-report-nu", icon: ClipboardList },
  { label: "Task Report UP", to: "/task-report-up", icon: ClipboardCheck },
  { label: "Student Details", to: "/students", icon: Users },
  { label: "Faculty Details", to: "/faculty-details", icon: GraduationCap },
  { label: "Student Report", to: "/student-report", icon: FileBarChart2 },
  { label: "Task Details", to: "/task-details", icon: ListChecks },
  { label: "Task Enable", to: "/task-enable", icon: ToggleRight },
  { label: "Addional Task Report", to: "/addional-task-report", icon: FilePlus2 },
  { label: "Test Report", to: "/test-report", icon: FileCheck2 },
  { label: "Imposition", to: "/imposition", icon: AlertTriangle },
  { label: "Imposition Report", to: "/imposition-report", icon: FileWarning },
];

export default function AdminSidebar({ open = true, welcomeText = "Welcome Superadmin" }) {
  return (
    <aside
      className={`bg-[#0f172a] shrink-0 overflow-y-auto overflow-x-hidden transition-all duration-200 ease-out ${
        open ? "w-[220px] opacity-100" : "w-0 opacity-0"
      }`}
    >
      <div className="w-[220px]">
        <div className="px-4 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-white/40">
          {welcomeText}
        </div>

        <ul className="flex flex-col gap-0.5 px-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={`/admin/${item.to}`}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm border-l-2 transition-colors ${
                      isActive
                        ? "bg-indigo-500/10 text-white border-indigo-500"
                        : "text-white/60 border-transparent hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  <Icon size={16} className="shrink-0" />
                  <span className="truncate">{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}