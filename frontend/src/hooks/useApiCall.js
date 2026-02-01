import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

/**
 * Custom hook for making authenticated API calls
 * Provides loading, error, and data state management with retry functionality
 * 
 * @param {Function} apiFunction - The API function to call
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, execute, reset }
 */
export const useApiCall = (apiFunction, options = {}) => {
    const { hasValidSession } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const {
        onSuccess,
        onError,
        showToastOnError = true,
        requiresAuth = true,
    } = options;

    const execute = useCallback(async (...args) => {
        // Check session validity if auth is required
        if (requiresAuth && !hasValidSession()) {
            console.warn('[useApiCall] No valid session, skipping API call');
            return null;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await apiFunction(...args);
            const result = response?.data ?? response;
            setData(result);

            if (onSuccess) {
                onSuccess(result);
            }

            return result;
        } catch (err) {
            console.error('[useApiCall] API error:', err);

            const errorMessage = err.userMessage || err.response?.data?.message || 'An error occurred';
            setError(errorMessage);

            // Don't show toast for auth errors (handled globally)
            if (showToastOnError && err.response?.status !== 401 && err.response?.status !== 403) {
                toast.error(errorMessage);
            }

            if (onError) {
                onError(err);
            }

            throw err;
        } finally {
            setLoading(false);
        }
    }, [apiFunction, hasValidSession, onSuccess, onError, showToastOnError, requiresAuth]);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    return {
        data,
        loading,
        error,
        execute,
        reset,
    };
};

/**
 * Custom hook for fetching data on mount with loading and error state
 * 
 * @param {Function} fetchFunction - The API function to call
 * @param {Array} dependencies - Dependencies for re-fetching
 * @param {Object} options - Configuration options
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = [], options = {}) => {
    const { hasValidSession } = useAuth();
    const [data, setData] = useState(options.initialData ?? null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);

    const {
        fallbackData = null,
        maxRetries = 2,
        showToastOnError = true,
    } = options;

    const fetchData = useCallback(async () => {
        if (!hasValidSession()) {
            console.warn('[useFetch] No valid session, skipping fetch');
            setLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await fetchFunction();
            const result = response?.data ?? response;
            setData(result);
            setRetryCount(0);
        } catch (err) {
            console.error('[useFetch] Fetch error:', err);

            // Don't show toast for auth errors
            if (err.response?.status !== 401 && err.response?.status !== 403) {
                const errorMessage = err.userMessage || 'Failed to load data';
                setError(errorMessage);

                if (showToastOnError && retryCount < maxRetries) {
                    toast.error(errorMessage);
                    setRetryCount(prev => prev + 1);
                }
            }

            // Use fallback data if provided
            if (fallbackData) {
                setData(fallbackData);
            }
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, hasValidSession, fallbackData, maxRetries, showToastOnError, retryCount]);

    const refetch = useCallback(() => {
        setLoading(true);
        setRetryCount(0);
        return fetchData();
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch,
        fetchData,
    };
};

export default useApiCall;
