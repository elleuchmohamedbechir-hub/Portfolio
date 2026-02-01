import api from './api';

/**
 * About Service
 * Handles about section API operations
 */
const aboutService = {
    /**
     * Get about section (Admin)
     * @returns {Promise<Object>} About data
     */
    get: async () => {
        const response = await api.get('/v1/admin/about');
        return response.data;
    },

    /**
     * Update about section (Admin)
     * @param {Object} data - About data
     * @returns {Promise<Object>} Updated about data
     */
    update: async (data) => {
        const response = await api.put('/v1/admin/about', data);
        return response.data;
    },

    /**
     * Get about section (Public)
     * @returns {Promise<Object>} About data
     */
    getPublic: async () => {
        const response = await api.get('/about');
        return response.data;
    },
};

export default aboutService;
