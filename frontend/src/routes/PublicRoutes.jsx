import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function PublicRoutes({ redirectTo = '/home' }) {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />;
}