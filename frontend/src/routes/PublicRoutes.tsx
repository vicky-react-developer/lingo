import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import useRole from '../hooks/useRole';

export default function PublicRoutes() {
    const { isLoggedIn } = useAuth();
    const { role } = useRole();

    if (!isLoggedIn) {
        return <Outlet />
    }

    if (role === "Admin") {
        return <Navigate to="/admin" replace />
    }
    return <Navigate to="/home" replace />;
}