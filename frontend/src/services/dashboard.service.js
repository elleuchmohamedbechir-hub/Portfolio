import api from './api';

/**
 * Dashboard Service
 * Handles dashboard statistics API operations
 */
const dashboardService = {
    /**
     * Get dashboard statistics (Admin)
     * @returns {Promise<Object>} Dashboard stats
     */
    getStats: async () => {
        const response = await api.get('/v1/admin/dashboard/stats');
        return response.data;
    },
};

export default dashboardService;
