import api from './api';

/**
 * Projects Service
 * Handles all project-related API operations
 */
const projectsService = {
    /**
     * Get all projects (Admin)
     * @returns {Promise<Array>} List of projects
     */
    getAll: async () => {
        const response = await api.get('/v1/admin/projects');
        return response.data;
    },

    /**
     * Get a single project by ID (Admin)
     * @param {number} id - Project ID
     * @returns {Promise<Object>} Project data
     */
    getById: async (id) => {
        const response = await api.get(`/v1/admin/projects/${id}`);
        return response.data;
    },

    /**
     * Create a new project (Admin)
     * @param {Object} data - Project data
     * @returns {Promise<Object>} Created project
     */
    create: async (data) => {
        const response = await api.post('/v1/admin/projects', data);
        return response.data;
    },

    /**
     * Update an existing project (Admin)
     * @param {number} id - Project ID
     * @param {Object} data - Updated project data
     * @returns {Promise<Object>} Updated project
     */
    update: async (id, data) => {
        const response = await api.put(`/v1/admin/projects/${id}`, data);
        return response.data;
    },

    /**
     * Delete a project (Admin)
     * @param {number} id - Project ID
     * @returns {Promise<void>}
     */
    delete: async (id) => {
        await api.delete(`/v1/admin/projects/${id}`);
    },

    /**
     * Get all projects (Public)
     * @returns {Promise<Array>} List of projects
     */
    getPublic: async () => {
        const response = await api.get('/projects');
        return response.data;
    },
};

export default projectsService;
