import axios from 'axios';

/**
 * Centralized Axios Instance Configuration
 * 
 * In development, we use the Vite proxy (/api -> http://localhost:8080/api)
 * In production, this should point to the actual backend URL
 */

// Determine the base URL based on environment
const getBaseURL = () => {
    // In development, use relative path to leverage Vite proxy
    if (import.meta.env.DEV) {
        return '/api';
    }
    // In production, use the configured API URL or default to relative path
    return import.meta.env.VITE_API_URL || '/api';
};

const api = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000, // 10 second timeout
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor
 * - Adds JWT token to Authorization header if present
 * - Logs requests in development mode
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        const lang = localStorage.getItem('i18nextLng') || 'fr'; // Default to FR if not set

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Add Accept-Language header for backend localization
        config.headers['Accept-Language'] = lang;

        // Debug logging in development
        if (import.meta.env.DEV) {
            console.debug(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url} [Lang: ${lang}]`);
        }

        return config;
    },
    (error) => {
        console.error('[API Request Error]', error);
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * - Handles common HTTP error codes
 * - Provides user-friendly error messages
 * - Manages authentication state on 401 errors
 */
api.interceptors.response.use(
    (response) => {
        // Debug logging in development
        if (import.meta.env.DEV) {
            console.debug(`[API Response] ${response.status} ${response.config.url}`);
        }
        return response;
    },
    (error) => {
        // 1. Handle Canceled Requests (Common in React Strict Mode)
        if (axios.isCancel(error)) {
            // Silently reject - do not log as error
            return Promise.reject(error);
        }

        const status = error.response?.status;
        const url = error.config?.url;
        const data = error.response?.data;

        // 2. Handle Network Errors (Server unreachable)
        if (!error.response) {
            console.error('[API] Network error - Backend unresponsive:', error.message);
            error.userMessage = 'Unable to connect to server. Please check your connection.';
            return Promise.reject(error);
        }

        // 3. Log real API errors
        console.error(`[API Error] ${status} at ${url}:`, data || error.message);

        // 4. Handle specific HTTP status codes
        switch (status) {
            case 401:
                handleUnauthorized();
                break;
            case 403:
                console.warn('[API] Access forbidden.');
                break;
            case 404:
                console.warn(`[API] Resource not found: ${url}`);
                break;
            case 500:
                console.error('[API] 500 Internal Server Error');
                break;
        }

        // Enhance error object with user-friendly message
        error.userMessage = getErrorMessage(status, data);

        return Promise.reject(error);
    }
);

/**
 * Handle 401 Unauthorized responses
 * Clears authentication state and redirects to login
 */
const handleUnauthorized = () => {
    const currentPath = window.location.pathname;

    // Only clear auth and redirect if not already on login page
    // This prevents infinite redirect loops
    if (!currentPath.includes('/admin/login')) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        // Only redirect if we're on an admin page
        if (currentPath.includes('/admin')) {
            window.location.href = '/admin/login';
        }
    }
};

/**
 * Get a user-friendly error message based on status code and response data
 */
const getErrorMessage = (status, data) => {
    // First try to use the server's error message
    if (data?.message) {
        return data.message;
    }
    if (data?.error) {
        return data.error;
    }

    // Fallback to generic messages based on status code
    switch (status) {
        case 400:
            return 'Invalid request. Please check your input.';
        case 401:
            return 'Session expired. Please log in again.';
        case 403:
            return 'You do not have permission to perform this action.';
        case 404:
            return 'The requested resource was not found.';
        case 409:
            return 'A conflict occurred. The resource may already exist.';
        case 422:
            return 'Validation failed. Please check your input.';
        case 500:
            return 'Server error. Please try again later.';
        case 502:
        case 503:
            return 'Service temporarily unavailable. Please try again later.';
        default:
            return 'An unexpected error occurred. Please try again.';
    }
};

/**
 * Check if user is authenticated
 * Useful for components that need to verify auth status before making API calls
 */
export const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

/**
 * Get the current auth token
 */
export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export default api;
