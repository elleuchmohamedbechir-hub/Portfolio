import api from './api';

/**
 * Interests Service
 * Handles all interest-related API operations
 */
const interestsService = {
    /**
     * Get all interests (Admin)
     * @returns {Promise<Array>} List of interests
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/interests');
        return response.data;
    },

    /**
     * Get a single interest by ID (Admin)
     * @param {number} id - Interest ID
     * @returns {Promise<Object>} Interest data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/interests/${id}`);
        return response.data;
    },

    /**
     * Create a new interest (Admin)
     * @param {Object} data - Interest data
     * @returns {Promise<Object>} Created interest
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/interests', data);
        return response.data;
    },

    /**
     * Update an existing interest (Admin)
     * @param {number} id - Interest ID
     * @param {Object} data - Updated interest data
     * @returns {Promise<Object>} Updated interest
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/interests/${id}`, data);
        return response.data;
    },

    /**
     * Delete an interest (Admin)
     * @param {number} id - Interest ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/interests/${id}`);
    },

    /**
     * Get all interests (Public)
     * @returns {Promise<Array>} List of interests
     */
    getPublic: async () => {
        const response = await api.get('/interests');
        return response.data;
    },
};

export default interestsService;
