'use client'

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginPage from './LoginPage';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    // Show login page if user is not authenticated
    if (!user) {
        return <LoginPage />;
    }

    // Render children if user is authenticated
    return <>{children}</>;
};

export default ProtectedRoute;
