import { Navigate, Outlet } from "react-router";

export default function AdminProtectedRoutes() {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user.role !== "Admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}