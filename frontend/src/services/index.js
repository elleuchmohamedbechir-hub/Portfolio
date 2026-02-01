/**
 * Services Index
 * 
 * This file exports all API services for easy importing throughout the application.
 * Each service is responsible for a specific domain of API operations.
 */

// Core API instance
export { default as api, isAuthenticated, getAuthToken } from './api';

// Internal Service Imports
import authService from './auth.service';
import dashboardService from './dashboard.service';
import experienceService from './experience.service';
import educationService from './education.service';
import skillsService from './skills.service';
import projectsService from './projects.service';
import languagesService from './languages.service';
import interestsService from './interests.service';
import aboutService from './about.service';
import api from './api';

/**
 * Portfolio Services (Public endpoints)
 * These don't require authentication
 */
export const portfolioService = {
    getSkills: (config) => api.get('/v1/skills', config),
    getProjects: (config) => api.get('/v1/projects', config),
    getExperiences: (config) => api.get('/v1/experiences', config),
    getEducation: (config) => api.get('/v1/education', config),
    getLanguages: (config) => api.get('/v1/languages', config),
    getInterests: (config) => api.get('/v1/interests', config),
    getAbout: (config) => api.get('/v1/about', config),
};

/**
 * Contact Service (Public)
 */
export const contactService = {
    sendMessage: (data) => api.post('/v1/contact', data),
};

/**
 * Admin Services (Protected - requires JWT token)
 * These endpoints require authentication
 */
export const adminService = {
    // Skills Management
    getSkills: (config) => api.get('/v1/admin/skills', config),
    createSkill: (data) => api.post('/v1/admin/skills', data),
    updateSkill: (id, data) => api.put(`/v1/admin/skills/${id}`, data),
    deleteSkill: (id) => api.delete(`/v1/admin/skills/${id}`),

    // Projects Management
    getProjects: (config) => api.get('/v1/admin/projects', config),
    createProject: (data) => api.post('/v1/admin/projects', data),
    updateProject: (id, data) => api.put(`/v1/admin/projects/${id}`, data),
    deleteProject: (id) => api.delete(`/v1/admin/projects/${id}`),

    // Experience Management
    getExperiences: (config) => api.get('/v1/admin/experiences', config),
    createExperience: (data) => api.post('/v1/admin/experiences', data),
    updateExperience: (id, data) => api.put(`/v1/admin/experiences/${id}`, data),
    deleteExperience: (id) => api.delete(`/v1/admin/experiences/${id}`),

    // Education Management
    getEducation: (config) => api.get('/v1/admin/education', config),
    createEducation: (data) => api.post('/v1/admin/education', data),
    updateEducation: (id, data) => api.put(`/v1/admin/education/${id}`, data),
    deleteEducation: (id) => api.delete(`/v1/admin/education/${id}`),

    // Languages Management
    getLanguages: (config) => api.get('/v1/admin/languages', config),
    createLanguage: (data) => api.post('/v1/admin/languages', data),
    updateLanguage: (id, data) => api.put(`/v1/admin/languages/${id}`, data),
    deleteLanguage: (id) => api.delete(`/v1/admin/languages/${id}`),

    // Interests Management
    getInterests: (config) => api.get('/v1/admin/interests', config),
    createInterest: (data) => api.post('/v1/admin/interests', data),
    updateInterest: (id, data) => api.put(`/v1/admin/interests/${id}`, data),
    deleteInterest: (id) => api.delete(`/v1/admin/interests/${id}`),

    // About Management
    getAbout: (config) => api.get('/v1/admin/about', config),
    updateAbout: (data) => api.put('/v1/admin/about', data),

    // Messages Management
    getMessages: (params, config) => api.get('/v1/admin/messages', { params, ...config }),
    getMessage: (id, config) => api.get(`/v1/admin/messages/${id}`, config),
    markAsRead: (id) => api.put(`/v1/admin/messages/${id}/read`),
    deleteMessage: (id) => api.delete(`/v1/admin/messages/${id}`),
    replyToMessage: (id, data) => api.post(`/v1/admin/messages/${id}/reply`, data),

    // Dashboard Stats
    getDashboardStats: (config) => api.get('/v1/admin/dashboard/stats', config),
};

// Explicit exports for individual services
export {
    authService,
    dashboardService,
    experienceService,
    educationService,
    skillsService,
    projectsService,
    languagesService,
    interestsService,
    aboutService
};

/**
 * Default export - grouped services object
 * Maintains backward compatibility with existing code
 */
export default {
    auth: authService,
    portfolio: portfolioService,
    contact: contactService,
    admin: adminService,
    dashboard: dashboardService,
    experience: experienceService,
    education: educationService,
    skills: skillsService,
    projects: projectsService,
    languages: languagesService,
    interests: interestsService,
    about: aboutService,
};
