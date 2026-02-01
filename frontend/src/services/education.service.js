import api from './api';

/**
 * Education Service
 * Handles all education-related API operations
 */
const educationService = {
    /**
     * Get all education entries (Admin)
     * @returns {Promise<Array>} List of education entries
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/education');
        return response.data;
    },

    /**
     * Get a single education entry by ID (Admin)
     * @param {number} id - Education ID
     * @returns {Promise<Object>} Education data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/education/${id}`);
        return response.data;
    },

    /**
     * Create a new education entry (Admin)
     * @param {Object} data - Education data
     * @returns {Promise<Object>} Created education entry
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/education', data);
        return response.data;
    },

    /**
     * Update an existing education entry (Admin)
     * @param {number} id - Education ID
     * @param {Object} data - Updated education data
     * @returns {Promise<Object>} Updated education entry
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/education/${id}`, data);
        return response.data;
    },

    /**
     * Delete an education entry (Admin)
     * @param {number} id - Education ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/education/${id}`);
    },

    /**
     * Get all education entries (Public)
     * @returns {Promise<Array>} List of education entries
     */
    getPublic: async () => {
        const response = await api.get('/education');
        return response.data;
    },
};

export default educationService;
