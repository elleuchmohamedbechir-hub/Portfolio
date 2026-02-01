import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './Loading';

/**
 * Protected Route Component
 * Wraps routes that require authentication and admin role
 * 
 * Features:
 * - Redirects to login if not authenticated
 * - Validates admin role before allowing access
 * - Shows loading state while checking auth
 * - Preserves intended destination for redirect after login
 */
const ProtectedRoute = ({ children }) => {
    const { user, isAuthenticated, loading, isAdmin, hasValidSession } = useAuth();
    const location = useLocation();

    // Show loading state while checking authentication
    if (loading) {
        return <Loading fullScreen />;
    }

    // Check if user is not authenticated or token is invalid
    if (!isAuthenticated || !hasValidSession()) {
        // Save the attempted location for redirect after login
        return (
            <Navigate
                to="/admin/login"
                replace
                state={{ from: location.pathname }}
            />
        );
    }

    // Check if user has admin role
    if (!isAdmin()) {
        console.warn(`[ProtectedRoute] Access denied for user:`, user?.username);
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
