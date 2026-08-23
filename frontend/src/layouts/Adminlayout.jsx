import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./AdminLayout.css";

/**
 * AdminLayout
 * Shell for every admin page: fixed Header on top, Sidebar on the left,
 * and the current route's page rendered through <Outlet /> in the main area.
 *
 * Usage (in your router):
 *   <Route element={<AdminLayout />}>
 *     <Route path="/student-details" element={<StudentDetails />} />
 *     ...
 *   </Route>
 */
export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="admin-layout">
      <AdminHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="admin-body">
        <AdminSidebar open={sidebarOpen} />

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}