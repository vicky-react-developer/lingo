import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../context/AuthContext';
import useRole from '../hooks/useRole';

export default function ProtectedRoutes() {
  const { isLoggedIn } = useAuth();
  const { role } = useRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  if (role === "Admin") {
    return <Navigate to="/admin" replace />
  }
  
  return <Outlet />;
}

