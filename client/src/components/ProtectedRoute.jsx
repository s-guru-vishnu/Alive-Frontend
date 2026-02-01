import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verification Logic for Hospital and Blood Bank
  if (user && (user.role === 'hospital' || user.role === 'blood-bank')) {
    const verificationStatus = user.profile?.verificationStatus || 'pending';
    const isVerified = verificationStatus === 'approved';
    const isPendingPage = location.pathname === '/verification-pending';

    // If not verified and trying to access restricted pages (not pending page)
    // We allow access if they are on the pending page
    if (!isVerified && !isPendingPage) {
      return <Navigate to="/verification-pending" replace />;
    }

    // If already verified but trying to access verification pending page
    if (isVerified && isPendingPage) {
      const dashboard = user.role === 'hospital' ? '/hospital/dashboard' : '/blood-bank/dashboard';
      return <Navigate to={dashboard} replace />;
    }
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
