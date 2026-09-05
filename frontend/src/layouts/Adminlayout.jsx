import React, { useState } from "react";
import { Outlet } from "react-router";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <AdminHeader onToggleSidebar={() => setSidebarOpen((v) => !v)} />

      <div className="flex flex-1 min-h-0">
        <AdminSidebar open={sidebarOpen} />

        <main className="flex-1 min-w-0 overflow-y-auto p-6 bg-[#f4f6f9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}