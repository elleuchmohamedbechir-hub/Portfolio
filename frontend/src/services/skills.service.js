import api from './api';

/**
 * Skills Service
 * Handles all skill-related API operations
 */
const skillsService = {
    /**
     * Get all skills (Admin)
     * @returns {Promise<Array>} List of skills
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/skills');
        return response.data;
    },

    /**
     * Get a single skill by ID (Admin)
     * @param {number} id - Skill ID
     * @returns {Promise<Object>} Skill data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/skills/${id}`);
        return response.data;
    },

    /**
     * Create a new skill (Admin)
     * @param {Object} data - Skill data
     * @returns {Promise<Object>} Created skill
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/skills', data);
        return response.data;
    },

    /**
     * Update an existing skill (Admin)
     * @param {number} id - Skill ID
     * @param {Object} data - Updated skill data
     * @returns {Promise<Object>} Updated skill
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/skills/${id}`, data);
        return response.data;
    },

    /**
     * Delete a skill (Admin)
     * @param {number} id - Skill ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/skills/${id}`);
    },

    /**
     * Get all skills (Public)
     * @returns {Promise<Array>} List of skills
     */
    getPublic: async () => {
        const response = await api.get('/skills');
        return response.data;
    },
};

export default skillsService;
