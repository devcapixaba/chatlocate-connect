
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  
  // Add more detailed console logging to help debug
  useEffect(() => {
    console.log('ProtectedRoute - Auth state:', { user, loading });
  }, [user, loading]);
  
  if (loading) {
    console.log('ProtectedRoute - Loading state is true, showing loading indicator');
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
        <p className="ml-3 text-yellow-500">Carregando...</p>
      </div>
    );
  }
  
  if (!user) {
    console.log('ProtectedRoute - User not authenticated, redirecting to /auth');
    return <Navigate to="/auth" replace />;
  }
  
  console.log('ProtectedRoute - User authenticated, rendering children');
  return <>{children}</>;
};

export default ProtectedRoute;
