import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  if (!user) {
    // If not authenticated, redirect to the auth page
    return <Navigate to="/auth" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}
