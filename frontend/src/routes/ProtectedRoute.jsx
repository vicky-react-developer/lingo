import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';

// Wrap protected routes — redirects to /login if not authenticated
export function ProtectedRoute({ redirectTo = '/login' }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} replace />;
}

// Wrap public-only routes (login, register) — redirects to /home if already logged in
export function PublicOnlyRoute({ redirectTo = '/home' }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Navigate to={redirectTo} replace /> : <Outlet />;
}