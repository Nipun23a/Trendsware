import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/authService';

export const ProtectedRoute = ({ children, requireAdmin = false }) => {
    const location = useLocation();
    const token = AuthService.getToken();
    const isAdmin = AuthService.isAdmin();

    if (!token) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};