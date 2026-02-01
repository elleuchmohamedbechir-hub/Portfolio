import api from './api';

/**
 * Experience Service
 * Handles all experience-related API operations
 */
const experienceService = {
    /**
     * Get all experiences (Admin)
     * @returns {Promise<Array>} List of experiences
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/experiences');
        return response.data;
    },

    /**
     * Get a single experience by ID (Admin)
     * @param {number} id - Experience ID
     * @returns {Promise<Object>} Experience data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/experiences/${id}`);
        return response.data;
    },

    /**
     * Create a new experience (Admin)
     * @param {Object} data - Experience data
     * @returns {Promise<Object>} Created experience
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/experiences', data);
        return response.data;
    },

    /**
     * Update an existing experience (Admin)
     * @param {number} id - Experience ID
     * @param {Object} data - Updated experience data
     * @returns {Promise<Object>} Updated experience
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/experiences/${id}`, data);
        return response.data;
    },

    /**
     * Delete an experience (Admin)
     * @param {number} id - Experience ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/experiences/${id}`);
    },

    /**
     * Get all experiences (Public)
     * @returns {Promise<Array>} List of experiences
     */
    getPublic: async () => {
        const response = await api.get('/experiences');
        return response.data;
    },
};

export default experienceService;
