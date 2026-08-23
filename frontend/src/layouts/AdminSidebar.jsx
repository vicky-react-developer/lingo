import React from "react";
import { NavLink } from "react-router";

// Sidebar navigation items. `to` maps to a route rendered via <Outlet /> in AdminLayout.
const NAV_ITEMS = [
  { label: "Task Report NU", to: "/task-report-nu" },
  { label: "Task Report UP", to: "/task-report-up" },
  { label: "Student Details", to: "/student-details" },
  { label: "Faculty Details", to: "/faculty-details" },
  { label: "Student Report", to: "/student-report" },
  { label: "Task Details", to: "/task-details" },
  { label: "Task Enable", to: "/task-enable" },
  { label: "Addional Task Report", to: "/addional-task-report" },
  { label: "Test Report", to: "/test-report" },
  { label: "Imposition", to: "/imposition" },
  { label: "Imposition Report", to: "/imposition-report" },
];

export default function AdminSidebar({ open = true, welcomeText = "Welcome Superadmin" }) {
  return (
    <aside className={`sidebar bg-dark ${open ? "" : "sidebar-collapsed"}`}>
      <div className="sidebar-welcome px-3 pt-3 pb-2 text-uppercase small text-secondary">
        {welcomeText}
      </div>
      <ul className="nav flex-column">
        {NAV_ITEMS.map((item) => (
          <li className="nav-item" key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                "nav-link sidebar-link d-flex align-items-center gap-2" +
                (isActive ? " active" : "")
              }
            >
              <i className="bi bi-grid" />
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}