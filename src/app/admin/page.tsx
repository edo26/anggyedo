/**
 * Admin Page - CMS dashboard page with authentication gate.
 * Following Single Responsibility Principle, this page only handles
 * the authentication state check and renders the appropriate view.
 */

'use client';

import React, { useState, useEffect } from 'react';
import CMSLogin from '@/components/cms/CMSLogin';
import CMSDashboard from '@/components/cms/CMSDashboard';
import { authService } from '@/services/authService';

/**
 * This component is the entry point for the admin CMS.
 * It checks authentication state and renders either
 * the login form or the dashboard accordingly.
 */
export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isChecking, setIsChecking] = useState(true);

    // This effect checks the current auth state on mount
    useEffect(() => {
        const authState = authService.getAuthState();
        setIsAuthenticated(authState.isAuthenticated);
        setIsChecking(false);
    }, []);

    /**
     * This function handles successful login
     */
    const handleLoginSuccess = () => {
        setIsAuthenticated(true);
    };

    /**
     * This function handles logout
     */
    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    // This shows a loading spinner while checking auth state
    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="w-10 h-10 border-4 border-teal-500/30 border-t-teal-500 rounded-full animate-spin" />
            </div>
        );
    }

    // This conditionally renders login or dashboard based on auth state
    if (!isAuthenticated) {
        return <CMSLogin onLoginSuccess={handleLoginSuccess} />;
    }

    return <CMSDashboard onLogout={handleLogout} />;
}
