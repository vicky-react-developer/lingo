import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import useRole from "../hooks/useRole";

export default function AdminProtectedRoutes() {
    const { isLoggedIn } = useAuth();
    const { role } = useRole();

    if (!isLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    if (role !== "Admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}