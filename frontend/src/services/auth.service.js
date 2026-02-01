import api, { isAuthenticated } from './api';

/**
 * Authentication Service
 * Handles login, logout, and session management
 */
const authService = {
    /**
     * Authenticate user with credentials
     * @param {Object} credentials - { username, password }
     * @returns {Promise<Object>} User data with token
     */
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);

        if (response.data.token) {
            // Store token
            localStorage.setItem('token', response.data.token);

            // Construct user object from response
            const user = {
                id: response.data.id,
                username: response.data.username,
                email: response.data.email,
                role: response.data.role,
            };

            localStorage.setItem('user', JSON.stringify(user));

            return {
                ...response.data,
                user,
            };
        }

        return response.data;
    },

    /**
     * Log out the current user
     * Clears all stored authentication data
     */
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    /**
     * Get the currently logged in user
     * @returns {Object|null} User object or null if not logged in
     */
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');

        if (userStr) {
            try {
                return JSON.parse(userStr);
            } catch (e) {
                console.error('Error parsing user from localStorage:', e);
                return null;
            }
        }

        return null;
    },

    /**
     * Check if user is currently authenticated
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return isAuthenticated();
    },

    /**
     * Check if the stored token is valid
     * This is a client-side check only; actual validation happens on the server
     * @returns {boolean}
     */
    hasValidToken: () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return false;
        }

        // Basic JWT structure validation (header.payload.signature)
        const parts = token.split('.');
        if (parts.length !== 3) {
            return false;
        }

        try {
            // Decode payload to check expiration
            const payload = JSON.parse(atob(parts[1]));
            const exp = payload.exp;

            if (exp) {
                // Check if token is expired (exp is in seconds)
                const now = Math.floor(Date.now() / 1000);
                return exp > now;
            }

            return true;
        } catch (e) {
            console.error('Error validating token:', e);
            return false;
        }
    },
};

export default authService;
