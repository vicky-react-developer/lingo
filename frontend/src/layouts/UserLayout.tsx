import { Outlet } from "react-router";
import { useState } from "react";

import Sidebar from "./Sidebar";

export default function UserLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="user-layout h-screen">
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <Outlet context={{ setSidebarOpen }} />
        </div>
    );
}