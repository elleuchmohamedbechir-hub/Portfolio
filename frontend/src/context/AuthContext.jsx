import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/auth.service';

const AuthContext = createContext(null);

/**
 * Custom hook to access auth context
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

/**
 * Authentication Provider Component
 * Manages user authentication state and provides auth methods
 */
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Initialize auth state on mount
     * Checks for existing session and validates token
     */
    useEffect(() => {
        const initializeAuth = () => {
            try {
                // Check if user is logged in and token is valid
                if (authService.hasValidToken()) {
                    const currentUser = authService.getCurrentUser();
                    if (currentUser) {
                        setUser(currentUser);
                    } else {
                        // Token exists but no user data - clear auth
                        authService.logout();
                    }
                } else {
                    // No valid token - ensure clean state
                    authService.logout();
                }
            } catch (err) {
                console.error('Error initializing auth:', err);
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    /**
     * Login with credentials
     * @param {Object} credentials - { username, password }
     * @returns {Promise<Object>} User data
     */
    const login = useCallback(async (credentials) => {
        setError(null);
        setLoading(true);

        try {
            const data = await authService.login(credentials);
            setUser(data.user);
            return data;
        } catch (err) {
            const errorMessage = err.userMessage || err.response?.data?.message || 'Login failed';
            setError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Logout current user
     * Clears all auth state and tokens
     */
    const logout = useCallback(() => {
        authService.logout();
        setUser(null);
        setError(null);
    }, []);

    /**
     * Check if current user has admin role
     * @returns {boolean}
     */
    const isAdmin = useCallback(() => {
        if (!user) return false;

        const rawRole = user.role?.name || user.role || '';
        const userRole = rawRole.toString().toUpperCase();

        return userRole === 'ADMIN' || userRole === 'ROLE_ADMIN';
    }, [user]);

    /**
     * Refresh user data from storage
     * Useful after token refresh or profile updates
     */
    const refreshUser = useCallback(() => {
        const currentUser = authService.getCurrentUser();
        setUser(currentUser);
    }, []);

    /**
     * Check if token is valid
     * @returns {boolean}
     */
    const hasValidSession = useCallback(() => {
        return authService.hasValidToken() && !!user;
    }, [user]);

    const value = {
        user,
        loading,
        error,
        login,
        logout,
        isAdmin,
        refreshUser,
        hasValidSession,
        isAuthenticated: !!user && authService.hasValidToken(),
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
