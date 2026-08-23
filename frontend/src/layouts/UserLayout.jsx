import { Outlet } from "react-router";
import { useState } from "react";

import Sidebar from "../components/Sidebar";

export default function UserLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <Outlet context={{ setSidebarOpen }} />
        </>
    );
}