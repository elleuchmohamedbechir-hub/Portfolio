import api from './api';

/**
 * Languages Service
 * Handles all language-related API operations
 */
const languagesService = {
    /**
     * Get all languages (Admin)
     * @returns {Promise<Array>} List of languages
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/languages');
        return response.data;
    },

    /**
     * Get a single language by ID (Admin)
     * @param {number} id - Language ID
     * @returns {Promise<Object>} Language data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/languages/${id}`);
        return response.data;
    },

    /**
     * Create a new language (Admin)
     * @param {Object} data - Language data
     * @returns {Promise<Object>} Created language
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/languages', data);
        return response.data;
    },

    /**
     * Update an existing language (Admin)
     * @param {number} id - Language ID
     * @param {Object} data - Updated language data
     * @returns {Promise<Object>} Updated language
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/languages/${id}`, data);
        return response.data;
    },

    /**
     * Delete a language (Admin)
     * @param {number} id - Language ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/languages/${id}`);
    },

    /**
     * Get all languages (Public)
     * @returns {Promise<Array>} List of languages
     */
    getPublic: async () => {
        const response = await api.get('/languages');
        return response.data;
    },
};

export default languagesService;
